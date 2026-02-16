import type { StyleTokens } from "@/lib/styles/tokens";

export interface MigrationSource {
  type: "material-ui" | "ant-design" | "chakra-ui" | "style-extractor";
  themeConfig: string; // JSON string of the source theme
}

export interface MigrationResult {
  success: boolean;
  tokens: Partial<StyleTokens>;
  warnings: string[]; // things that couldn't be mapped
  unmapped: string[]; // source properties with no StyleKit equivalent
  coverage: number; // % of source properties successfully mapped (0-100)
}

// Material UI theme shape (simplified)
export interface MuiTheme {
  palette?: {
    primary?: { main?: string; light?: string; dark?: string };
    secondary?: { main?: string; light?: string; dark?: string };
    error?: { main?: string };
    warning?: { main?: string };
    info?: { main?: string };
    success?: { main?: string };
    background?: { default?: string; paper?: string };
    text?: { primary?: string; secondary?: string; disabled?: string };
  };
  typography?: {
    fontFamily?: string;
    fontSize?: number;
    h1?: { fontSize?: string; fontWeight?: number };
    h2?: { fontSize?: string; fontWeight?: number };
    body1?: { fontSize?: string; lineHeight?: number };
    body2?: { fontSize?: string };
    button?: { textTransform?: string };
  };
  shape?: { borderRadius?: number };
  spacing?: number; // base spacing unit (default 8)
  shadows?: string[];
}

// Ant Design theme shape (simplified)
export interface AntTheme {
  token?: {
    colorPrimary?: string;
    colorSuccess?: string;
    colorWarning?: string;
    colorError?: string;
    colorInfo?: string;
    colorBgBase?: string;
    colorTextBase?: string;
    fontFamily?: string;
    fontSize?: number;
    borderRadius?: number;
    controlHeight?: number;
    padding?: number;
    margin?: number;
    boxShadow?: string;
    lineHeight?: number;
  };
}

// Chakra UI theme shape (simplified)
export interface ChakraTheme {
  colors?: Record<string, string | Record<string, string>>;
  fonts?: { heading?: string; body?: string; mono?: string };
  fontSizes?: Record<string, string>;
  space?: Record<string, string>;
  radii?: Record<string, string>;
  shadows?: Record<string, string>;
  lineHeights?: Record<string, string | number>;
}
