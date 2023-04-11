


/// import

import { parse } from "npm:graphql@16.6.0";
import type { DefinitionNode, DocumentNode, Location } from "npm:graphql@16.6.0";

/// util

const docCache = new Map<string, DocumentNode>();         // a map docString -> graphql document
const fragmentSourceMap = new Map<string, Set<string>>(); // a map fragmentName -> [normalized source]

let allowLegacyFragmentVariables = false;
let printFragmentWarnings = true;



/// export

export function disableExperimentalFragmentVariables() {
  allowLegacyFragmentVariables = false;
}

export function disableFragmentWarnings() {
  printFragmentWarnings = false;
}

export function enableExperimentalFragmentVariables() {
  allowLegacyFragmentVariables = true;
}

export function gql(literals: string | readonly string[], ...args: any[]) {
  /**
   * Create a GraphQL AST from template literal
   * @param literals
   * @param args
   *
   * @example
   * ```ts
   * import { buildASTSchema, graphql } from "https://deno.land/x/graphql_deno@v15.0.0/mod.ts"
   * import { gql } from "https://deno.land/x/graphql_tag/mod.ts"
   *
   * const typeDefs = gql`
   *  type Query {
   *    hello: String
   *  }
   * `
   *
   * const query = `{ hello }`
   *
   * const resolvers = { hello: () => "world" }
   *
   * console.log(await graphql(buildASTSchema(typeDefs), query, resolvers))
   * ```
   */

  if (typeof literals === "string")
    literals = [literals];

  let result = literals[0];

  args.forEach((arg, i) => {
    if (arg && arg.kind === "Document")
      result += arg.loc.source.body;
    else
      result += arg;

    result += literals[i + 1];
  });

  return parseDocument(result);
}

export function resetCaches() {
  docCache.clear();
  fragmentSourceMap.clear();
}



/// helper

function normalize(string: string) {
  // Strip insignificant whitespace
  // Note that this could do a lot more, such as reorder fields etc.
  return string.replace(/[\s,]+/g, " ").trim();
}

function cacheKeyFromLoc(loc: Location) {
  return normalize(loc.source.body.substring(loc.start, loc.end));
}

function processFragments(ast: DocumentNode) {
  // Take a unstripped parsed document (query/mutation or even fragment), and
  // check all fragment definitions, checking for name->source uniqueness.
  // We also want to make sure only unique fragments exist in the document.

  const definitions: DefinitionNode[] = [];
  const seenKeys = new Set<string>();

  ast.definitions.forEach((fragmentDefinition) => {
    if (fragmentDefinition.kind === "FragmentDefinition") {
      const fragmentName = fragmentDefinition.name.value;
      const sourceKey = cacheKeyFromLoc(fragmentDefinition.loc!);

      // We know something about this fragment
      let sourceKeySet = fragmentSourceMap.get(fragmentName)!;

      if (sourceKeySet && !sourceKeySet.has(sourceKey)) {
        // this is a problem because the app developer is trying to register another fragment with
        // the same name as one previously registered. So, we tell them about it.
        if (printFragmentWarnings) {
          console.warn(
            `Warning: fragment with name ${fragmentName} already exists.\n` +
            "gql enforces all fragment names across your application to be unique; read more about\n" +
            "this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names"
          );
        }
      } else if (!sourceKeySet) {
        fragmentSourceMap.set(fragmentName, (sourceKeySet = new Set()));
      }

      sourceKeySet.add(sourceKey);

      if (!seenKeys.has(sourceKey)) {
        seenKeys.add(sourceKey);
        definitions.push(fragmentDefinition);
      }
    } else {
      definitions.push(fragmentDefinition);
    }
  })

  return {
    ...ast,
    definitions
  };
}

function stripLoc(doc: DocumentNode) {
  const workSet = new Set<Record<string, any>>(doc.definitions);

  workSet.forEach((node) => {
    if (node.loc)
      delete node.loc;

    Object.keys(node).forEach((key) => {
      const value = node[key];

      if (value && typeof value === "object")
        workSet.add(value);
    });
  });

  const loc = doc.loc as { endToken: unknown; startToken: unknown; };

  if (loc) {
    delete loc.startToken;
    delete loc.endToken;
  }

  return doc;
}

function parseDocument(source: string) {
  const cacheKey = normalize(source);

  if (!docCache.has(cacheKey)) {
    const parsed = parse(source, { allowLegacyFragmentVariables });

    if (!parsed || parsed.kind !== "Document")
      throw new Error("Not a valid GraphQL document.");

    docCache.set(
      cacheKey,
      // check that all "new" fragments inside the documents are consistent with
      // existing fragments of the same name
      stripLoc(processFragments(parsed))
    );
  }

  return docCache.get(cacheKey)!;
}



/// via https://github.com/deno-libs/graphql_tag
