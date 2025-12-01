"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { raceOptions } from "../data/raceOptions";

export default function PredictionsForm({ raceInfo, editingID }) {
  const formInfo = [
    {
      label: "レース名",
      value: raceInfo.raceName,
      onChange: raceInfo.setRaceName,
      type: "text",
    },
    {
      label: "グレード",
      value: raceInfo.raceRank,
      onChange: raceInfo.setRaceRank,
      type: "select",
      options: raceOptions.raceRank,
    },
    {
      label: "レース会場",
      value: raceInfo.venue,
      onChange: raceInfo.setVenue,
      type: "select",
      options: raceOptions.venue,
    },
    {
      label: "レース番号",
      value: raceInfo.raceNumber,
      onChange: raceInfo.setRaceNumber,
      type: "select",
      options: raceOptions.raceNumber,
    },
    {
      label: "レース場",
      value: raceInfo.field,
      onChange: raceInfo.setField,
      type: "select",
      options: raceOptions.field,
    },
    {
      label: "場状態",
      value: raceInfo.surface,
      onChange: raceInfo.setSurface,
      type: "select",
      options: raceOptions.surface[raceInfo.field] || [],
    },
    {
      label: "距離",
      value: raceInfo.distance,
      onChange: raceInfo.setDistance,
      type: "select",
      options: raceOptions.distance[raceInfo.field] || [],
    },
    {
      label: "天候",
      value: raceInfo.weather,
      onChange: raceInfo.setWeather,
      type: "select",
      options: raceOptions.weather,
    },
    {
      label: "出馬数",
      value: raceInfo.horseNumber,
      onChange: raceInfo.setHorseNumber,
      type: "text",
    },
  ];

  // 入力欄のアニメーション
  const formContainer = useRef(null);

  useEffect(() => {
    const formItem = formContainer.current.querySelectorAll("li");
    gsap.fromTo(
      formItem,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power4.out",
      },
    );
  }, []);

  return (
    <div className="mb-4">
      <ul className="grid grid-cols-3 gap-2" ref={formContainer}>
        {formInfo.map((item) => (
          <li key={item.label}>
            <label className="mb-2 block font-bold">{item.label}</label>
            {item.type === "select" && item.options ? (
              <select
                value={item.value}
                onChange={(e) => item.onChange(e.target.value)}
                className="w-full rounded-xl border-2 p-2 outline-none"
              >
                <option value="">選択してください</option>
                {item.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                value={item.value}
                onChange={(e) => item.onChange(e.target.value)}
                type="text"
                className="w-full rounded-xl border-2 p-2 outline-none"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
