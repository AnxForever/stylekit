// Knowledge Base - Chart Recommendations
// Data converted from charts.csv

import type { ChartRecommendation } from "./types";
import { BM25 } from "./search";

export const chartRecommendations: ChartRecommendation[] = [
  {
    dataType: "Trend Over Time",
    keywords: ["trend", "time-series", "line", "growth", "timeline", "progress"],
    bestChartType: "Line Chart",
    secondaryOptions: ["Area Chart", "Smooth Area"],
    colorGuidance: "Primary: #0080FF. Multiple series: use distinct colors. Fill: 20% opacity",
    performanceImpact: "Excellent (optimized)",
    accessibilityNotes: "Clear line patterns for colorblind users. Add pattern overlays.",
    libraryRecommendation: ["Chart.js", "Recharts", "ApexCharts"],
    interactiveLevel: "Hover + Zoom",
  },
  {
    dataType: "Compare Categories",
    keywords: ["compare", "categories", "bar", "comparison", "ranking"],
    bestChartType: "Bar Chart (Horizontal or Vertical)",
    secondaryOptions: ["Column Chart", "Grouped Bar"],
    colorGuidance: "Each bar: distinct color. Category: grouped same color. Sorted: descending order",
    performanceImpact: "Excellent",
    accessibilityNotes: "Easy to compare. Add value labels on bars for clarity.",
    libraryRecommendation: ["Chart.js", "Recharts", "D3.js"],
    interactiveLevel: "Hover + Sort",
  },
  {
    dataType: "Part-to-Whole",
    keywords: ["part-to-whole", "pie", "donut", "percentage", "proportion", "share"],
    bestChartType: "Pie Chart or Donut",
    secondaryOptions: ["Stacked Bar", "Treemap"],
    colorGuidance: "Colors: 5-6 max. Contrasting palette. Large slices first. Use labels.",
    performanceImpact: "Good (limit 6 slices)",
    accessibilityNotes: "Hard for accessibility. Better: Stacked bar with legend. Avoid pie if >5 items.",
    libraryRecommendation: ["Chart.js", "Recharts", "D3.js"],
    interactiveLevel: "Hover + Drill",
  },
  {
    dataType: "Correlation/Distribution",
    keywords: ["correlation", "distribution", "scatter", "relationship", "pattern"],
    bestChartType: "Scatter Plot or Bubble Chart",
    secondaryOptions: ["Heat Map", "Matrix"],
    colorGuidance: "Color axis: gradient (blue-red). Size: relative. Opacity: 0.6-0.8 to show density",
    performanceImpact: "Moderate (many points)",
    accessibilityNotes: "Provide data table alternative. Use pattern + color distinction.",
    libraryRecommendation: ["D3.js", "Plotly", "Recharts"],
    interactiveLevel: "Hover + Brush",
  },
  {
    dataType: "Heatmap/Intensity",
    keywords: ["heatmap", "heat-map", "intensity", "density", "matrix"],
    bestChartType: "Heat Map or Choropleth",
    secondaryOptions: ["Grid Heat Map", "Bubble Heat"],
    colorGuidance: "Gradient: Cool (blue) to Hot (red). Scale: clear legend. Divergent for data",
    performanceImpact: "Excellent (color CSS)",
    accessibilityNotes: "Colorblind: Use pattern overlay. Provide numerical legend.",
    libraryRecommendation: ["D3.js", "Plotly", "ApexCharts"],
    interactiveLevel: "Hover + Zoom",
  },
  {
    dataType: "Geographic Data",
    keywords: ["geographic", "map", "location", "region", "geo", "spatial"],
    bestChartType: "Choropleth Map or Bubble Map",
    secondaryOptions: ["Geographic Heat Map"],
    colorGuidance: "Regional: single color gradient or categorized colors. Legend: clear scale",
    performanceImpact: "Moderate (rendering)",
    accessibilityNotes: "Include text labels for regions. Provide data table alternative.",
    libraryRecommendation: ["D3.js", "Mapbox", "Leaflet"],
    interactiveLevel: "Pan + Zoom + Drill",
  },
  {
    dataType: "Funnel/Flow",
    keywords: ["funnel", "flow", "conversion", "pipeline", "stages"],
    bestChartType: "Funnel Chart or Sankey",
    secondaryOptions: ["Waterfall (for flows)"],
    colorGuidance: "Stages: gradient (starting color to ending color). Show conversion %",
    performanceImpact: "Good",
    accessibilityNotes: "Clear stage labels + percentages. Good for accessibility if labeled.",
    libraryRecommendation: ["D3.js", "Recharts", "Custom SVG"],
    interactiveLevel: "Hover + Drill",
  },
  {
    dataType: "Performance vs Target",
    keywords: ["performance", "target", "gauge", "kpi", "goal", "metric"],
    bestChartType: "Gauge Chart or Bullet Chart",
    secondaryOptions: ["Dial", "Thermometer"],
    colorGuidance: "Performance: Red to Yellow to Green gradient. Target: marker line. Threshold colors",
    performanceImpact: "Good",
    accessibilityNotes: "Add numerical value + percentage label beside gauge.",
    libraryRecommendation: ["D3.js", "ApexCharts", "Custom SVG"],
    interactiveLevel: "Hover",
  },
  {
    dataType: "Time-Series Forecast",
    keywords: ["forecast", "prediction", "future", "projection", "estimate"],
    bestChartType: "Line with Confidence Band",
    secondaryOptions: ["Ribbon Chart"],
    colorGuidance: "Actual: solid line #0080FF. Forecast: dashed #FF9500. Band: light shading",
    performanceImpact: "Good",
    accessibilityNotes: "Clearly distinguish actual vs forecast. Add legend.",
    libraryRecommendation: ["Chart.js", "ApexCharts", "Plotly"],
    interactiveLevel: "Hover + Toggle",
  },
  {
    dataType: "Anomaly Detection",
    keywords: ["anomaly", "outlier", "alert", "exception", "abnormal"],
    bestChartType: "Line Chart with Highlights",
    secondaryOptions: ["Scatter with Alert"],
    colorGuidance: "Normal: blue #0080FF. Anomaly: red #FF0000 circle/square marker + alert",
    performanceImpact: "Good",
    accessibilityNotes: "Circle/marker for anomalies. Add text alert annotation.",
    libraryRecommendation: ["D3.js", "Plotly", "ApexCharts"],
    interactiveLevel: "Hover + Alert",
  },
  {
    dataType: "Hierarchical/Nested Data",
    keywords: ["hierarchical", "nested", "tree", "parent", "child", "drill"],
    bestChartType: "Treemap",
    secondaryOptions: ["Sunburst", "Nested Donut", "Icicle"],
    colorGuidance: "Parent: distinct hues. Children: lighter shades. White borders 2-3px.",
    performanceImpact: "Moderate",
    accessibilityNotes: "Poor - provide table alternative. Label large areas.",
    libraryRecommendation: ["D3.js", "Recharts", "ApexCharts"],
    interactiveLevel: "Hover + Drilldown",
  },
  {
    dataType: "Flow/Process Data",
    keywords: ["flow", "process", "sankey", "alluvial", "stream"],
    bestChartType: "Sankey Diagram",
    secondaryOptions: ["Alluvial", "Chord Diagram"],
    colorGuidance: "Gradient from source to target. Opacity 0.4-0.6 for flows.",
    performanceImpact: "Moderate",
    accessibilityNotes: "Poor - provide flow table alternative.",
    libraryRecommendation: ["D3.js (d3-sankey)", "Plotly"],
    interactiveLevel: "Hover + Drilldown",
  },
  {
    dataType: "Cumulative Changes",
    keywords: ["cumulative", "waterfall", "cascade", "changes", "delta"],
    bestChartType: "Waterfall Chart",
    secondaryOptions: ["Stacked Bar", "Cascade"],
    colorGuidance: "Increases: #4CAF50. Decreases: #F44336. Start: #2196F3. End: #0D47A1.",
    performanceImpact: "Good",
    accessibilityNotes: "Good - clear directional colors with labels.",
    libraryRecommendation: ["ApexCharts", "Highcharts", "Plotly"],
    interactiveLevel: "Hover",
  },
  {
    dataType: "Multi-Variable Comparison",
    keywords: ["multi-variable", "radar", "spider", "polygon", "dimensions"],
    bestChartType: "Radar/Spider Chart",
    secondaryOptions: ["Parallel Coordinates", "Grouped Bar"],
    colorGuidance: "Single: #0080FF 20% fill. Multiple: distinct colors per dataset.",
    performanceImpact: "Good",
    accessibilityNotes: "Moderate - limit 5-8 axes. Add data table.",
    libraryRecommendation: ["Chart.js", "Recharts", "ApexCharts"],
    interactiveLevel: "Hover + Toggle",
  },
  {
    dataType: "Stock/Trading OHLC",
    keywords: ["stock", "trading", "ohlc", "candlestick", "financial", "price"],
    bestChartType: "Candlestick Chart",
    secondaryOptions: ["OHLC Bar", "Heikin-Ashi"],
    colorGuidance: "Bullish: #26A69A. Bearish: #EF5350. Volume: 40% opacity below.",
    performanceImpact: "Good",
    accessibilityNotes: "Moderate - provide OHLC data table.",
    libraryRecommendation: ["Lightweight Charts (TradingView)", "ApexCharts"],
    interactiveLevel: "Real-time + Hover + Zoom",
  },
  {
    dataType: "Network/Relationship",
    keywords: ["network", "relationship", "graph", "connection", "node", "edge"],
    bestChartType: "Network Graph",
    secondaryOptions: ["Hierarchical Tree", "Adjacency Matrix"],
    colorGuidance: "Node types: categorical colors. Edges: #90A4AE 60% opacity.",
    performanceImpact: "Poor (500+ nodes struggles)",
    accessibilityNotes: "Very Poor - provide adjacency list alternative.",
    libraryRecommendation: ["D3.js (d3-force)", "Vis.js", "Cytoscape.js"],
    interactiveLevel: "Drilldown + Hover + Drag",
  },
  {
    dataType: "Distribution/Statistical",
    keywords: ["distribution", "statistical", "box", "violin", "quartile"],
    bestChartType: "Box Plot",
    secondaryOptions: ["Violin Plot", "Beeswarm"],
    colorGuidance: "Box: #BBDEFB. Border: #1976D2. Median: #D32F2F. Outliers: #F44336.",
    performanceImpact: "Excellent",
    accessibilityNotes: "Good - include stats table (min, Q1, median, Q3, max).",
    libraryRecommendation: ["Plotly", "D3.js", "Chart.js (plugin)"],
    interactiveLevel: "Hover",
  },
  {
    dataType: "Proportional/Percentage",
    keywords: ["proportional", "percentage", "waffle", "pictogram", "ratio"],
    bestChartType: "Waffle Chart",
    secondaryOptions: ["Pictogram", "Stacked Bar 100%"],
    colorGuidance: "10x10 grid. 3-5 categories max. 2-3px spacing between squares.",
    performanceImpact: "Good",
    accessibilityNotes: "Good - better than pie for accessibility.",
    libraryRecommendation: ["D3.js", "React-Waffle", "Custom CSS Grid"],
    interactiveLevel: "Hover",
  },
  {
    dataType: "Real-Time Streaming",
    keywords: ["streaming", "real-time", "ticker", "live", "velocity", "pulse"],
    bestChartType: "Streaming Area Chart",
    secondaryOptions: ["Ticker Tape", "Moving Gauge"],
    colorGuidance: "Current: Bright Pulse (#00FF00). History: Fading opacity. Grid: Dark.",
    performanceImpact: "Optimized (canvas/webgl)",
    accessibilityNotes: "Flashing elements - provide pause button. High contrast.",
    libraryRecommendation: ["Smoothed D3.js", "CanvasJS"],
    interactiveLevel: "Real-time",
  },
  {
    dataType: "Sentiment/Emotion",
    keywords: ["sentiment", "emotion", "nlp", "opinion", "feeling", "word cloud"],
    bestChartType: "Word Cloud with Sentiment",
    secondaryOptions: ["Sentiment Arc", "Radar Chart"],
    colorGuidance: "Positive: #22C55E. Negative: #EF4444. Neutral: #94A3B8. Size = Frequency.",
    performanceImpact: "Good",
    accessibilityNotes: "Word clouds poor for screen readers. Use list view.",
    libraryRecommendation: ["D3-cloud", "Highcharts", "Nivo"],
    interactiveLevel: "Hover + Filter",
  },
];

// Pre-built BM25 index for chart search
let chartSearchIndex: BM25<ChartRecommendation> | null = null;

function getChartSearchIndex(): BM25<ChartRecommendation> {
  if (!chartSearchIndex) {
    chartSearchIndex = new BM25(
      chartRecommendations,
      (c) =>
        `${c.dataType} ${c.keywords.join(" ")} ${c.bestChartType} ${c.accessibilityNotes}`
    );
  }
  return chartSearchIndex;
}

/**
 * Search chart recommendations by query
 */
export function searchCharts(
  query: string,
  maxResults = 5
): ChartRecommendation[] {
  return getChartSearchIndex().search(query, maxResults);
}

/**
 * Get chart recommendation by data type
 */
export function getChartByDataType(dataType: string): ChartRecommendation | undefined {
  const typeLower = dataType.toLowerCase();
  return chartRecommendations.find(
    (c) => c.dataType.toLowerCase() === typeLower
  );
}

/**
 * Get chart recommendations by keyword
 */
export function getChartsByKeyword(keyword: string): ChartRecommendation[] {
  const keywordLower = keyword.toLowerCase();
  return chartRecommendations.filter((c) =>
    c.keywords.some((k) => k.toLowerCase().includes(keywordLower))
  );
}

/**
 * Get all chart recommendations
 */
export function getAllCharts(): ChartRecommendation[] {
  return chartRecommendations;
}
