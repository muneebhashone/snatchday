import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export interface RadialChartProps {
  /**
   * The value to display (0-100)
   */
  value: number;
  /**
   * The label to display in the center
   */
  label?: string;
  /**
   * The size of the chart
   * @default 120
   */
  size?: number;
  /**
   * The color of the progress
   * @default "#6366f1"
   */
  color?: string;
  /**
   * The color of the track
   * @default "#f1f5f9"
   */
  trackColor?: string;
  /**
   * The thickness of the progress ring
   * @default 8
   */
  thickness?: number;
}

export function RadialChart({
  value = 0,
  label,
  size = 120,
  color = "#6366f1",
  trackColor = "#f1f5f9",
  thickness = 8,
}: RadialChartProps) {
  // Ensure value is between 0 and 100
  const safeValue = Math.min(Math.max(value, 0), 100);
  
  // Data for the chart
  const data = [
    { name: "Progress", value: safeValue },
    { name: "Remaining", value: 100 - safeValue },
  ];

  const renderCustomLabel = (props) => {
    const { cx, cy } = props;
    return (
      <>
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-bold"
          fontSize="1.5rem"
        >
          {safeValue}%
        </text>
        {label && (
          <text
            x={cx}
            y={cy + 20}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-gray-500"
            fontSize="0.8rem"
          >
            {label}
          </text>
        )}
      </>
    );
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={size / 2 - thickness}
            outerRadius={size / 2}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            label={renderCustomLabel}
            labelLine={false}
            isAnimationActive={true}
          >
            <Cell fill={color} />
            <Cell fill={trackColor} />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
} 