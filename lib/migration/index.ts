export type { MigrationSource, MigrationResult, MuiTheme, AntTheme, ChakraTheme } from "./types";
export { importMuiTheme } from "./mui-importer";
export { importAntTheme } from "./ant-importer";
export { importChakraTheme } from "./chakra-importer";
export { importExtractorTheme } from "./extractor-importer";
export { muiExample, antExample, chakraExample } from "./examples";

import type { MigrationSource, MigrationResult } from "./types";
import { importMuiTheme } from "./mui-importer";
import { importAntTheme } from "./ant-importer";
import { importChakraTheme } from "./chakra-importer";
import { importExtractorTheme } from "./extractor-importer";

export function importTheme(source: MigrationSource): MigrationResult {
  switch (source.type) {
    case "material-ui":
      return importMuiTheme(source.themeConfig);
    case "ant-design":
      return importAntTheme(source.themeConfig);
    case "chakra-ui":
      return importChakraTheme(source.themeConfig);
    case "style-extractor":
      return importExtractorTheme(source.themeConfig);
  }
}
