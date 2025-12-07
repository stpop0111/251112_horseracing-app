import { ROCIcon } from "./common/Icons";
import { useState } from "react";

export default function StatsCard({ title, stat, color, changeRate }) {
  // 変化率の計算
  let roc = "";
  if (changeRate < 0) roc = "decrease";
  if (changeRate > 0) roc = "increase";

  // カラーマッピング
  const colorClasses = {
    yellow: {
      border: "border-yellow-500",
      bg: "bg-yellow-500/10",
      text: "text-yellow-500",
    },
    red: {
      border: "border-red-500",
      bg: "bg-red-500/10",
      text: "text-red-500",
    },
    green: {
      border: "border-green-500",
      bg: "bg-green-500/10",
      text: "text-green-500",
    },
    gray: {
      border: "border-gray-300",
      bg: "bg-gray-300/10",
      text: "text-gray-700",
    },
  };

  const colors = colorClasses[color] || colorClasses.yellow;

  return (
    <div
      className={`relative flex h-32 w-full flex-col justify-center rounded-xl border-2 px-5 ${colors.border} ${colors.bg}`}
    >
      <div className={colors.text}>{title}</div>
      <div className={`text-3xl font-bold ${colors.text}`}>{stat}</div>
      {changeRate && (
        <div
          className={`absolute top-0 right-0 m-2 flex gap-2 rounded-lg p-2 font-bold ${
            roc === "increase" ? "bg-green-500/20 text-green-400" : ""
          } ${roc === "decrease" ? "bg-red-500/20 text-red-400" : ""}`}
        >
          <ROCIcon roc={roc} />
          {changeRate * 100}%
        </div>
      )}
    </div>
  );
}
