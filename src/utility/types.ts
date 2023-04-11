


/// import

import type { GraphQLArgs, GraphQLSchema } from "npm:graphql@16.6.0";

/// util

import type { RenderPageOptions } from "../graphiql/render.ts";

interface MutationParams {
  mutation: string;
  operationName?: string;
  query?: never;
  variables?: Record<string, unknown>;
}

interface QueryParams {
  mutation?: never;
  operationName?: string;
  query: string;
  variables?: Record<string, unknown>;
}



/// export

export interface GQLOptions<Context = any, Req extends GQLRequest = GQLRequest> extends Omit<GraphQLArgs, "source"> {
  context?: (val: Req) => Context | Promise<Context>;
  /// GraphQL playground
  graphiql?: boolean;
  /// Custom headers for responses
  headers?: HeadersInit;
  /// Custom options for GraphQL Playground
  playgroundOptions?: Omit<RenderPageOptions, "endpoint">;
  schema: GraphQLSchema;
}

export type GraphQLParams = QueryParams | MutationParams;

export type GQLRequest = {
  headers: Headers;
  json: () => Promise<GraphQLParams>;
  method: string;
  url: string;
};
