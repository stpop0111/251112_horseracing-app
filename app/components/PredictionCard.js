"use client";

import PredictionsForm from "./PredictionsForm";
import Button from "./common/Button";
import { TabComponent, Tab } from "./common/TabComponent";
import CheckIcon from "./icons/CheckIcon";

import gsap from "gsap";
import { useRef, useEffect } from "react";

export default function PredictionCard({ race, isDeleting, isSelected, isChecked }) {
  /* ------------------------------------
    カード追加時のアニメーション
  ------------------------------------ */
  const cardRef = useRef(null);
  const hasAnimated = useRef(false); // アニメーション実行済みフラグ

  useEffect(() => {
    if (race.isNew && !hasAnimated.current) {
      gsap.fromTo(
        cardRef.current,
        {
          x: -100,
        },
        {
          x: 0,
          duration: 1.6,
          ease: "elastic.out(1,0.3)",
        },
      );
      hasAnimated.current = true; // 実行済みにマーク
    }
  }, [race.isNew]);

  /* ------------------------------------
    チェックボックスのアニメーション
  ------------------------------------ */
  const checkBoxRef = useRef(null);

  useEffect(() => {
    if (isChecked) {
      gsap.fromTo(
        checkBoxRef.current,
        {
          opacity: 0.5,
          scale: 0,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "elastic.out(1,0.3)",
        },
      );
    } else {
      gsap.fromTo(
        checkBoxRef.current,
        {
          scale: 1,
        },
        {
          scale: 0,
          duration: 0.4,
          ease: "power2.in",
        },
      );
    }
  }, [isChecked]);

  const positions = [
    { rank: "1着", data: race.predictions.first },
    { rank: "2着", data: race.predictions.second },
    { rank: "3着", data: race.predictions.third },
  ];

  return (
    <div key={race.id}>
      <div
        className="relative rounded-xl border-3 border-gray-200 bg-gray-200/20 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-green-300 hover:shadow-lg"
        ref={cardRef}
      >
        <div className="mb-4 space-y-2">
          <div className="flex items-center gap-2">
            {/* レース名 */}
            {race.raceRank && (
              <div
                className={`rounded-lg px-4 py-1 font-semibold ${race.raceRank === "G1" && "bg-red-600 text-white"} ${race.raceRank === "G2" && "bg-blue-600 text-white"} ${race.raceRank === "G3" && "bg-green-600 text-white"} `}
              >
                {race.raceRank}
              </div>
            )}
            {race.raceName && <h2 className="text-3xl font-bold">{race.raceName}</h2>}
            <div className="text-2xl font-semibold">
              {race.venue}
              {race.raceNumber}R
            </div>
          </div>
          <div>
            {race.field}：{race.distance}m【{race.surface}】 天気：{race.weather}
            {race.horseNumber}頭立て
          </div>
        </div>

        {/* 予想 */}
        {race.predictions?.first?.frameColor && (
          <div className="mb-4">
            <ul className="flex gap-3 font-semibold">
              {positions.map((pos) => (
                <li key={pos.rank} className="inline-flex h-12 items-center gap-2 rounded-sm border px-3 py-2">
                  <span
                    className={`inline-flex aspect-square h-full items-center justify-center rounded-full border text-sm ${pos.data.frameColor}`}
                  >
                    {pos.data.frameNumber}
                  </span>
                  <span className="inline-block">{pos.data.horseName}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* メモ */}
        <div className="mb-4">
          <TabComponent
            tabs={[
              { label: "予想メモ", value: "preMemo" },
              { label: "回顧メモ", value: "recoMemo" },
            ]}
          >
            <Tab tabValue={"preMemo"}>
              {race.preMemo ? (
                <>
                  <p className="mb-2 text-lg font-semibold">予想メモ</p>
                  <p className="rounded-lg border p-2">{race.preMemo}</p>
                </>
              ) : (
                <>
                  <p>メモがありません</p>
                </>
              )}
            </Tab>
            <Tab tabValue={"recoMemo"}>
              {race.recoMemo ? (
                <>
                  <p className="mb-2 text-lg font-semibold">回顧メモ</p>
                  <p className="rounded-lg border p-2">{race.recoMemo}</p>
                </>
              ) : (
                <>
                  <p>メモがありません</p>
                </>
              )}
            </Tab>
          </TabComponent>

        </div>

        <div>
          <p className="text-sm text-gray-800">作成日：{race.createdAt}</p>
          {race.editedAt && <p className="text-sm text-gray-800">最終更新日：{race.editedAt}</p>}
        </div>

        {/* 削除サークル */}
        {isDeleting && (
          <div
            className={`absolute top-0 right-0 z-10 m-4 aspect-square w-[5%] max-w-8 min-w-4 rounded-full border-3 p-0.5 duration-400 ${
              isChecked ? "border-gray-400" : "border-gray-800"
            }`}
            onClick={(e) => {
              isSelected();
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <div
              className="flex h-full items-center justify-center rounded-full bg-blue-800 p-1 text-lg font-bold text-gray-100"
              ref={checkBoxRef}
              style={{ opacity: 0, transform: "scale(0)" }}
            >
              <CheckIcon fill="rgb(255,255,255)" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
