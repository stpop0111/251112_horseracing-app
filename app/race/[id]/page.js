"use client";

import { useEffect, use, useState, useRef } from "react";
import Link from "next/link";

import Button from "@/app/components/common/Button";
import PageWrapper from "@/app/components/common/PageWrapper";
import { TabComponent, Tab } from "@/app/components/common/TabComponent";

export default function RacePage({ params }) {
  const [raceData, setRaceData] = useState(null);

  // 予想カードの状態関数
  const [predictions, setPredictions] = useState({
    first: { horseName: "", frameNumber: "", frameColor: "" },
    second: { horseName: "", frameNumber: "", frameColor: "" },
    third: { horseName: "", frameNumber: "", frameColor: "" },
  });

  const [preMemo, setPreMemo] = useState(""); // 予想メモ
  const [recoMemo, setRecoMemo] = useState(""); // 反省メモ

  const param = use(params);

  /* ------------------------------------
    初回ロード時にローカルストレージからデータを取得し、オブジェクトに格納
  ------------------------------------ */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("races")); // ローカルストレージからレースを取得
    const selectedRace = saved.find((r) => r.id === param.id); // 現在表示されているレースの内容を取得
    setRaceData(selectedRace); // 状態関数にレース情報を保存

    // レースの情報がある時、状態関数にその値を代入
    if (selectedRace?.predictions?.first) {
      setPredictions(selectedRace.predictions); // 予想
      setPreMemo(selectedRace.preMemo || ""); // 予想メモ
      setRecoMemo(selectedRace.recoMemo || ""); // 回顧メモ
    }
  }, []);

  /* ------------------------------------
    入力された文字列の変更の時
  ------------------------------------ */
  const handleChange = (position, field, value) => {
    // 引数に「順位」「キー」「値」を受け取る
    setPredictions({
      ...predictions,
      [position]: {
        ...predictions[position],
        [field]: value,
      },
      // 予想の状態関数にて引数で受け取ったキーと値を相当する順位にて代入する
    });
  };

  /* ------------------------------------
    予想の保存
  ------------------------------------ */
  const handleSubmit = (e) => {
    e.preventDefault(); // イベントを無視

    const saved = JSON.parse(localStorage.getItem("races")); // ローカルデータからレース情報を全て取得する
    const index = saved.findIndex((r) => r.id === raceData.id); // レースデータのIDをsavedから照合し、その配列番号を記録する

    // 照合した配列番号のレースを”直接”上書きする
    saved[index] = {
      ...saved[index], // レース情報はそのまま
      predictions: predictions, // 予想を状態変数から取得
      preMemo: preMemo, // 予想メモを状態変数から取得
      recoMemo: recoMemo, // 回顧メモを状態変数から取得
    };

    localStorage.setItem("races", JSON.stringify(saved)); // 上書きしたデータをローカルストレージにそのまま上書き
    setRaceData(saved[index]); // 状態関数には照合した配列番号のレースデータを入れる（ページでの情報）

    alert("保存しました"); // TODO:モーダル表示にしてデザイン性を高める
  };

  /* ------------------------------------
    タブ切り替え
  ------------------------------------ */
  const [activeTab, setActiveTab] = useState("preMemo"); // 現在開いているメモの種類を保存する（デフォルト：予想メモ）
  const tabContainerRef = useRef(null); // CSSが切り替わる要素のコンテナをuseRefで宣言

  useEffect(() => {
    if (!tabContainerRef.current) return; // DOMがない場合は強制終了
    const tabs = tabContainerRef.current.querySelectorAll("button"); // 変化させる要素を取得

    tabs.forEach((tab) => {
      if (tab.value === activeTab) {
        tab.classList.add("bg-neutral-50", "shadow-lg", "font-bold"); // activeTabに入っている値と押されたボタンの値が一致している場合にクラスを付与する
      } else {
        tab.classList.remove("bg-neutral-50", "shadow-lg", "font-bold");
      }
    });
  }, [activeTab]); // 表示されているタブの情報が変わるたびにマウントされる

  /* ------------------------------------
    馬番による色変更
  ------------------------------------ */
  const getFrameColor = (frameNumber) => {
    const num = Number(frameNumber); // 馬番を数値に変換
    const horseNum = Number(raceData.horseNumber); // 頭数を数値に変換

    if (!num || num < 1) return "bg-gray-200 text-black"; // 無効な値

    const colors = {
      1: "bg-white text-black",
      2: "bg-black text-white",
      3: "bg-red-500 text-white",
      4: "bg-blue-500 text-white",
      5: "bg-yellow-400 text-black",
      6: "bg-green-500 text-white",
      7: "bg-orange-500 text-white",
      8: "bg-pink-400 text-white",
    };

    // 8頭以下のとき...そのまま返す
    if (horseNum <= 8) {
      return colors[num] || "bg-gray-200 text-black";
    }

    // 9~16頭のとき...2頭で割る
    if (horseNum <= 16) {
      return colors[Math.ceil(num / 2)] || "bg-gray-200 text-black";
    }

    // 17頭立ての時...1 / 2枠が3頭残りは2頭ずつ
    if (horseNum === 17) {
      if (num <= 3) return colors[1];
      return colors[Math.ceil((num - 3) / 2) + 1] || "bg-gray-200 text-black";
    }

    // 18頭立ての時...1 / 2枠が3頭残りは2頭ずつ
    if (horseNum === 18) {
      if (num <= 3) return colors[1];
      if (num <= 6) return colors[2];
      return colors[Math.ceil((num - 6) / 2) + 2] || "bg-gray-200 text-black";
    }

    return "bg-gray-200 text-black"; // デフォルト
  };

  return (
    <PageWrapper>
      <div className="w-4xl p-6">
        {raceData ? (
          <div>
            {/* レース概要 */}
            <div className="mb-4 flex items-center justify-between">
              <ul className="flex items-center gap-2">
                <li className="text-2xl font-bold">
                  {raceData.venue}
                  <span className="ml-1 bg-green-600 p-2 text-gray-50">{raceData.raceNumber}R</span>
                </li>
                <li>
                  {raceData.field}：{raceData.distance}m【{raceData.surface}】
                </li>
                <li>天気：{raceData.weather}</li>
                <li>{raceData.horseNumber}頭立て</li>
              </ul>
              <ul className="flex flex-col text-sm text-gray-900">
                <li>作成日：{raceData.createdAt}</li>
                <li>更新日：{raceData.editedAt}</li>
              </ul>
            </div>

            {/* 将来モデルを置く場所 */}
            <div className="mb-6 h-[540px] w-full rounded-xl border border-gray-100">
              <div className="flex h-full w-full items-center justify-center">モデルが入る</div>
            </div>

            {/* 予想メモ */}
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <h2 className="mb-2 text-2xl">馬券内予想順位</h2>
                <ul className="flex gap-4">
                  <li>
                    <label>1位</label>
                    <div className="h-xl flex">
                      <input
                        value={predictions.first.frameNumber}
                        onChange={(e) => {
                          handleChange("first", "frameNumber", e.target.value);
                          handleChange("first", "frameColor", getFrameColor(predictions.first.frameNumber));
                        }}
                        type="number"
                        max={raceData.horseNumber}
                        className={`aspect-square w-[30%] rounded-l-xl border border-gray-800 text-center text-xl font-bold caret-transparent transition-all duration-200 outline-none ${getFrameColor(predictions.first.frameNumber)}`}
                      ></input>
                      <input
                        value={predictions.first.horseName}
                        onChange={(e) => handleChange("first", "horseName", e.target.value)}
                        type="text"
                        className="w-full rounded-r-xl border border-l-0 px-2 outline-none"
                      ></input>
                    </div>
                  </li>
                  <li>
                    <label>2位</label>
                    <div className="h-xl flex">
                      <input
                        value={predictions.second.frameNumber}
                        onChange={(e) => {
                          handleChange("second", "frameNumber", e.target.value);
                          handleChange("second", "frameColor", getFrameColor(predictions.second.frameNumber));
                        }}
                        type="number"
                        max={raceData.horseNumber}
                        className={`aspect-square w-[30%] rounded-l-xl border border-gray-800 text-center text-xl font-bold caret-transparent transition-all duration-200 outline-none ${getFrameColor(predictions.second.frameNumber)}`}
                      ></input>
                      <input
                        value={predictions.second.horseName}
                        onChange={(e) => handleChange("second", "horseName", e.target.value)}
                        type="text"
                        className="w-full rounded-r-xl border border-l-0 px-2 outline-none"
                      ></input>
                    </div>
                  </li>
                  <li>
                    <label>3位</label>
                    <div className="h-xl flex">
                      <input
                        value={predictions.third.frameNumber}
                        onChange={(e) => {
                          handleChange("third", "frameNumber", e.target.value);
                          handleChange("third", "frameColor", getFrameColor(predictions.third.frameNumber));
                        }}
                        type="number"
                        max={raceData.horseNumber}
                        className={`aspect-square w-[30%] rounded-l-xl border border-gray-800 text-center text-xl font-bold caret-transparent transition-all duration-200 outline-none ${getFrameColor(predictions.third.frameNumber)}`}
                      ></input>
                      <input
                        value={predictions.third.horseName}
                        onChange={(e) => handleChange("third", "horseName", e.target.value)}
                        type="text"
                        className="w-full rounded-r-xl border border-l-0 px-2 outline-none"
                      ></input>
                    </div>
                  </li>
                </ul>
              </div>

              {/* メモ */}
              <div className="mb-6">
                <TabComponent
                  tabs={[
                    { label: "予想メモ", value: "preMemo" },
                    { label: "回顧メモ", value: "recoMemo" },
                  ]}
                >
                  <Tab tabValue={"preMemo"}>
                    <div>
                      <label className="mb-2 block text-2xl">予想メモ</label>
                      <input
                        className="w-full leading-loose outline-0"
                        value={preMemo}
                        placeholder="メモを入力"
                        onChange={(e) => setPreMemo(e.target.value)}
                      ></input>
                    </div>
                  </Tab>
                  <Tab tabValue={"recoMemo"}>
                    <div>
                      <label className="mb-2 block text-2xl">反省メモ</label>
                      <input
                        className="w-full leading-loose outline-0"
                        value={recoMemo}
                        placeholder="メモを入力"
                        onChange={(e) => setRecoMemo(e.target.value)}
                      ></input>
                    </div>
                  </Tab>
                  <Tab tabValue={"other"}>

                  </Tab>
                </TabComponent>

              </div>
              {/* ボタン */}
              <div className="flex gap-2">
                <Button variant="green" type="submit" size="mid">
                  保存
                </Button>
                <Button isLink="true" variant="gray" size="mid" href="/">
                  一覧に戻る
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div>読み込み中</div>
        )}
      </div>
    </PageWrapper>
  );
}
