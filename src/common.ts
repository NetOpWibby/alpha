


/// import

import { graphql } from "npm:graphql@16.6.0";
import type { ExecutionResult } from "npm:graphql@16.6.0";

/// util

import type { GQLOptions, GQLRequest, GraphQLParams } from "./utility/types.ts";



/// export

export async function runHttpQuery<
  Req extends GQLRequest = GQLRequest,
  Context = { request?: Req }>(
    params: GraphQLParams,
    options: GQLOptions<Context, Req>,
    context?: Context | any): Promise<ExecutionResult> {
  /**
   * Execute a GraphQL query
   * @param {GraphQLParams} params
   * @param {GQLOptions} options
   * @param context GraphQL context to use inside resolvers
   *
   * @example
   * ```ts
   * const { errors, data } = await runHttpQuery<ServerRequest, typeof context>({ query: `{ hello }` }, { schema }}, context)
   * ```
   */

  const contextValue = options.context && context?.request ?
    await options.context?.(context?.request) :
    context;
  const source = params.query! || params.mutation!;

  return await graphql({
    source,
    ...options,
    contextValue,
    operationName: params.operationName,
    variableValues: params.variables
  });
}
