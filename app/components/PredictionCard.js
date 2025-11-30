"use client";

import PredictionsForm from "./PredictionsForm";
import Button from "./common/Button";
import CheckIcon from "./icons/CheckICon";

import gsap from "gsap";
import { useRef, useEffect } from "react";

export default function PredictionCard({
  race,
  isDeleting,
  isSelected,
  isChecked,
}) {
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

  return (
    <div key={race.id}>
      <div
        className="relative overflow-hidden rounded-xl border-2 border-amber-200 bg-amber-50 p-4"
        ref={cardRef}
      >
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold">
              レース会場：<span className="font-normal">{race.venue} </span>
            </h3>
            <p className="font-semibold">
              馬名：<span className="font-normal">{race.horseName}</span>
            </p>
            <p className="font-semibold">
              順位：<span className="font-normal">{race.rank}</span>
            </p>
          </div>
        </div>
        <hr className="border-0.5 my-4 border-amber-400" />
        <div>
          <p className="text-sm text-gray-800">作成日：{race.createdAt}</p>
          {race.editedAt && (
            <p className="text-sm text-gray-800">最終更新日：{race.editedAt}</p>
          )}
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
