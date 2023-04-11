


/// util

import { runHttpQuery } from "./common.ts";

import type { GQLOptions, GQLRequest, GraphQLParams } from "./utility/types.ts";



/// export

export function GraphQLHTTP<
  Req extends GQLRequest = GQLRequest,
  Ctx extends { request: Req } = { request: Req }>({
    playgroundOptions = {},
    headers = {},
    ...options
  }: GQLOptions<Ctx, Req>) {
  /**
   * Create a new GraphQL HTTP middleware with schema, context etc
   * @param {GQLOptions} options
   *
   * @example
   * ```ts
   * const graphql = await GraphQLHTTP({ schema })
   *
   * for await (const req of s) graphql(req)
   * ```
   */

  return async (request: Req) => {
    const accept = request.headers.get("Accept") || "";

    const typeList = ["application/json", "text/html", "text/plain", "*/*"]
      .map(contentType => ({
        contentType,
        index: accept.indexOf(contentType)
      }))
      .filter(({ index }) => index >= 0)
      .sort((a, b) => a.index - b.index)
      .map(({ contentType }) => contentType);

    if (accept && !typeList.length) {
      return new Response("Not Acceptable", {
        headers: new Headers(headers),
        status: 406
      });
    } else if (!["GET", "PUT", "POST", "PATCH"].includes(request.method)) {
      return new Response("Method Not Allowed", {
        headers: new Headers(headers),
        status: 405
      });
    }

    let params: Promise<GraphQLParams>;

    if (request.method === "GET") {
      const urlQuery = request.url.substring(request.url.indexOf("?"));
      const queryParams = new URLSearchParams(urlQuery);

      if (options.graphiql && typeList[0] === "text/html" && !queryParams.has("raw")) {
        const { renderPlaygroundPage } = await import("./graphiql/render.ts");

        const playground = renderPlaygroundPage({
          ...playgroundOptions,
          endpoint: "/graphql"
        });

        return new Response(playground, {
          headers: new Headers({
            "Content-Type": "text/html",
            ...headers
          })
        });
      } else if (typeList.length === 1 && typeList[0] === "text/html") {
        return new Response("Not Acceptable", {
          headers: new Headers(headers),
          status: 406
        });
      } else if (queryParams.has("query")) {
        params = Promise.resolve({ query: queryParams.get("query") } as GraphQLParams);
      } else {
        params = Promise.reject(new Error("No query given!"));
      }
    } else if (typeList.length === 1 && typeList[0] === "text/html") {
      return new Response("Not Acceptable", {
        headers: new Headers(headers),
        status: 406
      });
    } else {
      params = request.json();
    }

    try {
      const result = await runHttpQuery<Req, Ctx>(await params, options, { request });
      let contentType = "text/plain";

      if (!typeList.length || typeList.includes("application/json") || typeList.includes("*/*"))
        contentType = "application/json";

      return new Response(JSON.stringify(result, null, 2), {
        headers: new Headers({
          "Content-Type": contentType,
          ...headers
        }),
        status: 200
      });
    } catch(e) {
      console.error(e);

      return new Response(
        "Malformed Request " + (request.method === "GET" ? "Query" : "Body"), {
          headers: new Headers(headers),
          status: 400
        }
      );
    }
  }
}
