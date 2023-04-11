


/// import

import { filterXSS } from "npm:xss@1.0.14";

/// util

import { getLoadingMarkup } from "./markup.ts";

const CONFIG_ID = "playground-config";
const loading = getLoadingMarkup();

const filter = (val: string) => {
  return filterXSS(val, {
    stripIgnoreTag: true,
    stripIgnoreTagBody: ["script"],
    whiteList: {}
  });
}

const getCdnMarkup = ({ cdnUrl = "//cdn.jsdelivr.net/npm", faviconUrl, version }: {
  cdnUrl?: string
  faviconUrl?: string | null
  version?: string
}) => {
  const buildCDNUrl = (packageName: string, suffix: string) =>
    filter(`${cdnUrl}/${packageName}${version ? `@${version}` : ""}/${suffix}` || "");

  return `
    <link rel="stylesheet" href="${buildCDNUrl("graphql-playground-react", "build/static/css/index.css")}"/>
    ${typeof faviconUrl === "string" ? `<link rel="shortcut icon" href="${filter(faviconUrl || "")}" />` : ""}
    ${faviconUrl === undefined ? `<link rel="shortcut icon" href="${buildCDNUrl("graphql-playground-react", "build/favicon.png")}" />` : ""}
    <script src="${buildCDNUrl("graphql-playground-react", "build/static/js/middleware.js")}"></script>
  `;
}

const renderConfig = (config: unknown) => {
  return filterXSS(`<div id="${CONFIG_ID}">${JSON.stringify(config)}</div>`, {
    whiteList: { div: ["id"] }
  });
};



/// export

export interface MiddlewareOptions {
  codeTheme?: EditorColours;
  config?: any;
  endpoint?: string;
  env?: any;
  schema?: IntrospectionResult;
  settings?: ISettings;
  subscriptionEndpoint?: string;
  tabs?: Tab[];
  workspaceName?: string;
}

export type CursorShape = "line" | "block" | "underline";
export type Theme = "dark" | "light";

export interface ISettings {
  "editor.cursorShape": CursorShape;
  "editor.fontFamily": string;
  "editor.fontSize": number;
  "editor.reuseHeaders": boolean;
  "editor.theme": Theme;
  "general.betaUpdates": boolean;
  "request.credentials": string;
  "request.globalHeaders": { [key: string]: string };
  "schema.polling.enable": boolean;
  "schema.polling.endpointFilter": string;
  "schema.polling.interval": number;
  "tracing.hideTracingResponse": boolean;
  "tracing.tracingSupported": boolean;
}

export interface EditorColours {
  atom: string;
  attribute: string;
  builtin: string;
  comment: string;
  cursorColor: string;
  def: string;
  editorBackground: string;
  keyword: string;
  leftDrawerBackground: string;
  meta: string;
  number: string;
  property: string;
  punctuation: string;
  qualifier: string;
  resultBackground: string;
  rightDrawerBackground: string;
  selection: string;
  string: string;
  string2: string;
  variable: string;
  ws: string;
}

export interface IntrospectionResult {
  __schema: any;
}

export interface RenderPageOptions extends MiddlewareOptions {
  cdnUrl?: string;
  env?: any;
  faviconUrl?: string | null;
  title?: string;
  version?: string;
}

export interface Tab {
  endpoint: string;
  headers?: { [key: string]: string };
  name?: string;
  query: string;
  responses?: string[];
  variables?: string;
}

export function renderPlaygroundPage(options: RenderPageOptions) {
  const extendedOptions:
    & Partial<{
      canSaveConfig: boolean
      configString: string
    }>
    & RenderPageOptions = {
      ...options,
      canSaveConfig: false
    };

  if (options.config)
    extendedOptions.configString = JSON.stringify(options.config, null, 2);

  if (!extendedOptions.endpoint && !extendedOptions.configString)
    console.warn("WARNING: You did not provide an endpoint and do not have a .graphqlconfig. Make sure you have at least one of them.");
  else if (extendedOptions.endpoint)
    extendedOptions.endpoint = filter(extendedOptions.endpoint || "");

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset=utf-8/>
      <meta name="viewport" content="user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui"/>
      <link href="https://brick.a.ssl.fastly.net/Open+Sans:300,400,600,700/Source+Code+Pro:400,700" rel="stylesheet"/>
      <title>${extendedOptions.title || "GraphQL Playground"}</title>
      ${extendedOptions.env === "react" || extendedOptions.env === "electron" ? "" : getCdnMarkup(extendedOptions)}
    </head>

    <body>
      <style>
        html {
          font-family: "Open Sans", sans-serif;
          overflow: hidden;
        }

        body {
          background-color: #172a3a;
          margin: 0;
        }

        #${CONFIG_ID} {
          display: none;
        }

        .playgroundIn {
          animation: playgroundIn 0.5s ease-out forwards;
        }

        @keyframes playgroundIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      </style>

      ${loading.container}
      ${renderConfig(extendedOptions)}
      <div id="root"/>

      <script>
        window.addEventListener("load", () => {
          ${loading.script}

          const root = document.getElementById("root");
          root.classList.add("playgroundIn");
          const configText = document.getElementById("${CONFIG_ID}").innerText;

          if (configText && configText.length) {
            try {
              GraphQLPlayground.init(root, JSON.parse(configText));
            } catch(_) {
              console.error("could not find config");
            }
          } else {
            GraphQLPlayground.init(root);
          }
        });
      </script>
    </body>
  </html>
  `;
}
