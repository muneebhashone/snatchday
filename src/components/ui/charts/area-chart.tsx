import React from "react";
import {
  ResponsiveContainer,
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";

export interface AreaChartProps {
  /**
   * The data to be displayed in the chart
   */
  data: Record<string, any>[];
  /**
   * The key to be used for the x-axis
   */
  xAxisKey: string;
  /**
   * The series data to be displayed in the chart
   * Each series should have a key and name
   */
  series: {
    key: string;
    name: string;
  }[];
  /**
   * The height of the chart in pixels
   * @default 300
   */
  height?: number;
  /**
   * The colors to be used for the series
   * If not provided, default Recharts colors will be used
   */
  colors?: string[];
  /**
   * Whether to show the grid lines
   * @default true
   */
  showGrid?: boolean;
  /**
   * The type of curve to use for the areas
   * @default "monotone"
   */
  curveType?: "basis" | "linear" | "monotone" | "natural" | "step" | "stepAfter" | "stepBefore";
  /**
   * Whether to stack the areas
   * @default false
   */
  stacked?: boolean;
  /**
   * The opacity of the area fill
   * @default 0.6
   */
  fillOpacity?: number;
  /**
   * The width of the stroke for each area
   * @default 2
   */
  strokeWidth?: number;
}

export function AreaChart({
  data,
  xAxisKey,
  series,
  height = 300,
  colors,
  showGrid = true,
  curveType = "monotone",
  stacked = false,
  fillOpacity = 0.6,
  strokeWidth = 2,
}: AreaChartProps) {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis
            dataKey={xAxisKey}
            tick={{ fontSize: 12 }}
            tickLine={{ strokeWidth: 1 }}
          />
          <YAxis tick={{ fontSize: 12 }} tickLine={{ strokeWidth: 1 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--background)",
              borderColor: "var(--border)",
              borderRadius: "var(--radius)",
              boxShadow: "var(--shadow)",
            }}
          />
          <Legend />
          {series.map((s, index) => (
            <Area
              key={s.key}
              type={curveType}
              dataKey={s.key}
              name={s.name}
              stackId={stacked ? "stack" : undefined}
              stroke={colors?.[index]}
              fill={colors?.[index]}
              fillOpacity={fillOpacity}
              strokeWidth={strokeWidth}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
} 