'use strict';

const parser = require('graphql/language/parser'),
  parse = parser.parse;

// A LRU cache with key: docString and value: graphql document
const LRU = require('lru-cache'),
  options = { max: 1000, maxAge: 1000 * 60 * 60 * 24 }, // default 1 day
  docCache = LRU(options);

// Strip insignificant whitespace
// Note that this could do a lot more, such as reorder fields etc.
function normalize(string) {
  return string.replace(/[\s,]+/g, ' ').trim();
}

// A map fragmentName -> [normalized source]
let fragmentSourceMap = {};

function cacheKeyFromLoc(loc) {
  return normalize(loc.source.body.substring(loc.start, loc.end));
}

// set cache option [https://github.com/isaacs/node-lru-cache]
// only support max and maxAge
function setCacheOptions(options) {
  if (options) {
    const { max, maxAge } = options;
    if (max && typeof (max) === 'number') {
      docCache.max = max;
    }
    if (maxAge && typeof (maxAge) === 'number') {
      docCache.maxAge = maxAge;
    }
  }
}

// get cached items count
function getCachedItemsCount() {
  return docCache.itemCount;
}

// For testing.
function resetCaches() {
  docCache.reset();
  fragmentSourceMap = {};
}

// Take a unstripped parsed document (query/mutation or even fragment), and
// check all fragment definitions, checking for name->source uniqueness.
// We also want to make sure only unique fragments exist in the document.
function processFragments(ast) {
  const astFragmentMap = {};
  const definitions = [];
  for (let i = 0; i < ast.definitions.length; i++) {
    const fragmentDefinition = ast.definitions[i];

    if (fragmentDefinition.kind === 'FragmentDefinition') {
      const fragmentName = fragmentDefinition.name.value;
      const sourceKey = cacheKeyFromLoc(fragmentDefinition.loc);

      // We know something about this fragment
      if (fragmentSourceMap.hasOwnProperty(fragmentName) && !fragmentSourceMap[fragmentName][sourceKey]) {

        // this is a problem because the app developer is trying to register another fragment with
        // the same name as one previously registered. So, we tell them about it.
        console.warn('Warning: fragment with name ' + fragmentName + ' already exists.\n'
            + 'graphql-tag enforces all fragment names across your application to be unique; read more about\n'
            + 'this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names');

        fragmentSourceMap[fragmentName][sourceKey] = true;

      } else if (!fragmentSourceMap.hasOwnProperty(fragmentName)) {
        fragmentSourceMap[fragmentName] = {};
        fragmentSourceMap[fragmentName][sourceKey] = true;
      }

      if (!astFragmentMap[sourceKey]) {
        astFragmentMap[sourceKey] = true;
        definitions.push(fragmentDefinition);
      }
    } else {
      definitions.push(fragmentDefinition);
    }
  }

  ast.definitions = definitions;
  return ast;
}

function stripLoc(doc, removeLocAtThisLevel) {
  const docType = Object.prototype.toString.call(doc);
  if (docType === '[object Array]') {
    return doc.map(function(d) {
      return stripLoc(d, removeLocAtThisLevel);
    });
  }

  if (docType !== '[object Object]') {
    throw new Error('Unexpected input.');
  }

  // We don't want to remove the root loc field so we can use it
  // for fragment substitution (see below)
  if (removeLocAtThisLevel && doc.loc) {
    delete doc.loc;
  }

  // https://github.com/apollographql/graphql-tag/issues/40
  if (doc.loc) {
    delete doc.loc.startToken;
    delete doc.loc.endToken;
  }

  const keys = Object.keys(doc);
  let key;
  let value;
  let valueType;

  for (key in keys) {
    if (keys.hasOwnProperty(key)) {
      value = doc[keys[key]];
      valueType = Object.prototype.toString.call(value);

      if (valueType === '[object Object]' || valueType === '[object Array]') {
        doc[keys[key]] = stripLoc(value, true);
      }
    }
  }

  return doc;
}

let experimentalFragmentVariables = false;
function parseDocument(doc) {
  const cacheKey = normalize(doc);
  const cachedItem = docCache.get(cacheKey);
  if (cachedItem) {
    return cachedItem;
  }
  let parsed;
  try {
    parsed = parse(doc, { experimentalFragmentVariables });
  } catch (error) {
    throw new Error(error);
  }
  // check that all "new" fragments inside the documents are consistent with
  // existing fragments of the same name
  parsed = processFragments(parsed);
  parsed = stripLoc(parsed, false);
  docCache.set(cacheKey, parsed);

  return parsed;
}

function enableExperimentalFragmentVariables() {
  experimentalFragmentVariables = true;
}

function disableExperimentalFragmentVariables() {
  experimentalFragmentVariables = false;
}
// XXX This should eventually disallow arbitrary string interpolation, like Relay does
function gql(/* arguments */) {
  const args = Array.prototype.slice.call(arguments);
  const literals = args[0];

  // We always get literals[0] and then matching post literals for each arg given
  let result = (typeof (literals) === 'string') ? literals : literals[0];

  for (let i = 1; i < args.length; i++) {
    result += args[i];
    result += literals[i];
  }
  return parseDocument(result);
}

// Support typescript, which isn't as nice as Babel about default exports
gql.default = gql;
gql.resetCaches = resetCaches;
gql.getCachedItemsCount = getCachedItemsCount;
gql.setCacheOptions = setCacheOptions;
gql.enableExperimentalFragmentVariables = enableExperimentalFragmentVariables;
gql.disableExperimentalFragmentVariables = disableExperimentalFragmentVariables;
gql.parseDocument = parseDocument;
gql.stripLoc = stripLoc;

module.exports = gql;
