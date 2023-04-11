


/// import

import { dirname, join } from "https://deno.land/std/path/mod.ts";
import { gql } from "./gql.ts";

import type { DocumentNode } from "npm:graphql@16.6.0";

/// util

const { cwd, readFileSync } = Deno;
const importRegex = /^#\s(import)\s.*(.graphql")/gm;
const fileRegex = /\w*(.graphql)/g;



/// export

export function importQL(path: string): DocumentNode | Record<string, unknown> {
  try {
    const decoder = new TextDecoder("utf-8");
    const file = readFileSync(join(cwd(), String(path)));
    const imports = decoder.decode(file).match(importRegex) || [];
    let parsedFile = decoder.decode(file);

    /// `import` statements in the supplied schema file
    /// are parsed to dynamically bring in linked files

    imports.map(imp => {
      const matchedFilename: null | Array<string> = imp.match(fileRegex);

      if (!matchedFilename || !matchedFilename.length || matchedFilename.length < 1)
        return;

      const filename = matchedFilename[0];
      const importedFileDecoder = new TextDecoder("utf-8");
      const importedFile = readFileSync(join(cwd(), dirname(String(path)), filename));
      const decodedFile = importedFileDecoder.decode(importedFile);

      parsedFile = parsedFile.replace(imp, decodedFile);
    });

    return gql`
      ${parsedFile}
    `;
  } catch(parseError) {
    console.error(new Error(`error parsing file [${String(path)}]`), parseError);
    return {};
  }
}



/// fork of https://github.com/crewdevio/importql
