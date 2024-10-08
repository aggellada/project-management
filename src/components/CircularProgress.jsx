import React from "react";

const CircularProgress = ({ progress, max, isDone }) => {
  const radius = 50; // Radius of the circle
  const strokeWidth = 10; // Width of the stroke
  const normalizedRadius = radius - strokeWidth * 0.5; // Adjusted radius
  const circumference = normalizedRadius * 2 * Math.PI; // Circumference of the circle
  const offset = isDone
    ? circumference - 1 * circumference
    : circumference - (progress / max) * circumference; // Offset based on progress
  const percentage = isDone ? 100 : (progress / max) * 100;
  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke="#e6e6e6"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="#4caf50"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        strokeDasharray={circumference + " " + circumference}
        strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="16"
        fill="#4caf50"
      >
        {percentage.toFixed(2)}%
      </text>
    </svg>
  );
};

export default CircularProgress;
