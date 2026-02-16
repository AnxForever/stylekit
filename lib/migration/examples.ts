// Example theme configurations for testing the importers

export const muiExample = JSON.stringify(
  {
    palette: {
      primary: { main: "#1976d2", light: "#42a5f5", dark: "#1565c0" },
      secondary: { main: "#9c27b0", light: "#ba68c8", dark: "#7b1fa2" },
      error: { main: "#d32f2f" },
      warning: { main: "#ed6c02" },
      info: { main: "#0288d1" },
      success: { main: "#2e7d32" },
      background: { default: "#ffffff", paper: "#f5f5f5" },
      text: { primary: "#212121", secondary: "#757575", disabled: "#bdbdbd" },
    },
    typography: {
      fontFamily: "Roboto, Arial, sans-serif",
      fontSize: 14,
      h1: { fontSize: "2.5rem", fontWeight: 700 },
      h2: { fontSize: "2rem", fontWeight: 600 },
      body1: { fontSize: "1rem", lineHeight: 1.5 },
      body2: { fontSize: "0.875rem" },
      button: { textTransform: "uppercase" },
    },
    shape: { borderRadius: 4 },
    spacing: 8,
    shadows: [
      "none",
      "0px 2px 1px -1px rgba(0,0,0,0.2)",
      "0px 3px 3px -2px rgba(0,0,0,0.2)",
      "0px 3px 4px -2px rgba(0,0,0,0.2)",
      "0px 2px 5px -1px rgba(0,0,0,0.2)",
      "0px 3px 5px -1px rgba(0,0,0,0.2)",
      "0px 3px 6px -1px rgba(0,0,0,0.2)",
      "0px 4px 6px -2px rgba(0,0,0,0.2)",
      "0px 5px 8px -3px rgba(0,0,0,0.2),0px 8px 12px -4px rgba(0,0,0,0.14)",
    ],
  },
  null,
  2
);

export const antExample = JSON.stringify(
  {
    token: {
      colorPrimary: "#1677ff",
      colorSuccess: "#52c41a",
      colorWarning: "#faad14",
      colorError: "#ff4d4f",
      colorInfo: "#1677ff",
      colorBgBase: "#ffffff",
      colorTextBase: "#000000",
      fontFamily:
        "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial",
      fontSize: 14,
      borderRadius: 6,
      controlHeight: 32,
      padding: 16,
      margin: 16,
      boxShadow:
        "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12)",
      lineHeight: 1.5714,
    },
  },
  null,
  2
);

export const chakraExample = JSON.stringify(
  {
    colors: {
      brand: {
        50: "#e3f2fd",
        100: "#bbdefb",
        200: "#90caf9",
        300: "#64b5f6",
        400: "#42a5f5",
        500: "#2196f3",
        600: "#1e88e5",
        700: "#1976d2",
        800: "#1565c0",
        900: "#0d47a1",
      },
      gray: {
        50: "#fafafa",
        100: "#f5f5f5",
        200: "#eeeeee",
        300: "#e0e0e0",
        400: "#bdbdbd",
        500: "#9e9e9e",
        600: "#757575",
        700: "#616161",
        800: "#424242",
        900: "#212121",
      },
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      mono: "Fira Code, monospace",
    },
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
    },
    space: {
      1: "0.25rem",
      2: "0.5rem",
      3: "0.75rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      8: "2rem",
      10: "2.5rem",
      12: "3rem",
    },
    radii: {
      none: "0",
      sm: "0.125rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem",
      full: "9999px",
    },
    shadows: {
      xs: "0 0 0 1px rgba(0, 0, 0, 0.05)",
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    },
    lineHeights: {
      normal: "normal",
      none: 1,
      shorter: 1.25,
      short: 1.375,
      base: 1.5,
      tall: 1.625,
      taller: 2,
    },
  },
  null,
  2
);
