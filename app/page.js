"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import PredictionsForm from "./components/PredictionsForm";
import PredictionCard from "./components/PredictionCard";
import Button from "./components/common/Button";
import PageWrapper from "./components/common/PageWrapper";
import StatsCard from "./components/StatsCard";
import { TabComponent, Tab } from "./components/common/TabComponent";

export default function Home() {
  /* ------------------------------------
    状態関数の宣言
  ------------------------------------ */
  // レース一覧の状態管理
  const [races, setRaces] = useState([]); // 予想一覧
  const [raceName, setRaceName] = useState(""); // レース名
  const [raceRank, setRaceRank] = useState(""); // レースのランク
  const [venue, setVenue] = useState(""); // 会場
  const [raceNumber, setRaceNumber] = useState(""); // レース番号
  const [field, setField] = useState(""); // レース場
  const [surface, setSurface] = useState(""); // 場状態
  const [distance, setDistance] = useState(""); // 距離
  const [weather, setWeather] = useState(""); // 天候
  const [horseNumber, setHorseNumber] = useState(""); // 頭数

  // 絞り込み用の状態管理
  const [filteredVenue, setFilteredVenue] = useState("");
  const [filteredField, setFilteredField] = useState("");
  const [filteredDistance, setFilteredDistance] = useState("");
  const [filteredRaces, setFilteredRaces] = useState([]);

  // その他の状態関数管理
  const [isRegistering, setIsRegistering] = useState(false); // 登録中
  const [isDeleting, setIsDeleting] = useState(false); // 削除中
  const [selectedRaces, setSelectedRaces] = useState([]); // 選択された予想

  /* ------------------------------------
  初回ロード時にローカルストレージからデータを取得し、オブジェクトに格納
  ------------------------------------ */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("races")); // ローカルストレージからキー名のデータを取得
    if (saved) {
      setRaces(
        saved.map((race) => ({
          ...race,
          isNew: false,
        })),
      );
      localStorage.setItem("races", JSON.stringify(saved)); // isNewをfalseにした配列で上書き保存
    }
    setFilteredRaces([]);
  }, []);

  /* ------------------------------------
    登録関数
  ------------------------------------ */
  const handleSubmit = (e) => {
    e.preventDefault();

    // 保存されているレースを取得
    const savedRaces = JSON.parse(localStorage.getItem("races")) || [];

    // レース情報の入力
    const newID = generateID(); // ID作成関数の呼び出し
    const newRace = {
      id: newID,
      raceName: raceName, // レース名
      raceRank: raceRank, // レースのランク
      venue: venue, // 会場
      raceNumber: raceNumber, // レース番号
      field: field, // レース場
      surface: surface, // 場状態
      distance: distance, // 距離
      weather: weather, // 天候
      horseNumber: horseNumber, // 頭数
      predictions: [], // 予想について（各ページにて編集）
      createdAt: generateID("-", ":", " "), // 作成日時
      editedAt: "", // 編集日時
      isNew: true, // 新規追加フラグ
    };

    console.log(newRace);

    // 新規レースの追加
    const updateRaces = [...savedRaces, newRace]; // スプレッド構文で新規レースを既存レースに上書き
    localStorage.setItem("races", JSON.stringify(updateRaces)); // ローカルストレージに上書きした配列を保存
    setRaces(updateRaces); // 状態関数にも保存

    alert("予想を編集しました"); // TODO:モーダル表示にしてデザイン性を高める

    // フォームのリセット
    setRaceName("");
    setRaceRank("");
    setVenue("");
    setRaceNumber("");
    setField("");
    setSurface("");
    setDistance("");
    setWeather("");
    setHorseNumber("");
    setIsRegistering(false);
  };

  /* ------------------------------------
    削除関数
  ------------------------------------ */
  const handleDelete = (selectedRaces) => {
    // パラメーターにidを使用
    if (!confirm("削除しますか？")) return; // TODO:モーダル表示にしてデザイン性を高める

    // 保存されているレースを取得
    const savedRaces = JSON.parse(localStorage.getItem("races"));

    // 選択されたレース情報を配列の各オブジェクトで照合し、”それ以外の配列(updatedRaces)”を作成
    const updatedRaces = savedRaces.filter((race) => !selectedRaces.some((selectedRace) => selectedRace.id === race.id));

    localStorage.setItem("races", JSON.stringify(updatedRaces)); // ローカルストレージに上書きした配列を保存

    setRaces(updatedRaces); // 状態関数にも保存
    setIsDeleting(!isDeleting);
    setSelectedRaces([]); // 選択配列をリセット

    console.log("削除しました"); // TODO:モーダル表示にしてデザイン性を高める
  };

  /* ------------------------------------ 
    ID生成
  ------------------------------------ */
  const generateID = (dateSep = "", timeSep = "", sep = "") => {
    const now = new Date();
    const year = now.getFullYear(); // YYYY
    const month = String(now.getMonth() + 1).padStart(2, "0"); // MM(一桁の場合は0が入る)
    const day = String(now.getDate()).padStart(2, "0"); // MM(一桁の場合は0が入る)
    const hours = String(now.getHours()).padStart(2, "0"); // hh(一桁の場合は0が入る)
    const mins = String(now.getMinutes()).padStart(2, "0"); // mm(一桁の場合は0が入る)
    const secs = String(now.getSeconds()).padStart(2, "0"); // ss(一桁の場合は0が入る)

    return `${year}${dateSep}${month}${dateSep}${day}${sep}${hours}${timeSep}${mins}${timeSep}${secs}`;
  };

  /* ------------------------------------ 
    絞り込み
  ------------------------------------ */
  const [filtered, setFiltered] = useState(false);

  const handleFilter = () => {
    setFiltered(true);
    if (!(filteredVenue || filteredField || filteredDistance)) {
      setFiltered(false);
      return;
    } else {
      const savedRaces = JSON.parse(localStorage.getItem("races")) || [];
      setFilteredRaces(
        savedRaces.filter(
          (race) =>
            (filteredVenue === "" || race.venue === filteredVenue) &&
            (filteredField === "" || race.field === filteredField) &&
            (filteredDistance === "" || race.distance === filteredDistance),
        ),
      );
    }
  };

  /* ------------------------------------ 
    絞り込み
  ------------------------------------ */
  const handleTabChange = (tabValue, key) => {
    // 絞り込み項目”全て”の場合は終了
    if (tabValue === "all") {
      const filteredValue = {
        venue: key === "venue" ? "" : filteredVenue, // ← "all" なら空文字
        field: key === "field" ? "" : filteredField,
        distance: key === "distance" ? "" : filteredDistance,
      };

      if (key === "venue") {
        setFilteredVenue("");
      }
      if (key === "field") {
        setFilteredField("");
      }
      if (key === "distance") {
        setFilteredDistance("");
      }
      if (!filteredValue.venue && !filteredValue.field && !filteredValue.distance) {
        setFiltered(false);
        return;
      }

      setFilteredRaces(
        races.filter(
          (race) =>
            (filteredValue.venue === "" || race.venue === filteredValue.venue) &&
            (filteredValue.field === "" || race.field === filteredValue.field) &&
            (filteredValue.distance === "" || race.distance === filteredValue.distance),
        ),
      );
      return;
    }

    // 絞り込み設定
    const filteredValue = {
      venue: key === "venue" ? tabValue : filteredVenue,
      field: key === "field" ? tabValue : filteredField,
      distance: key === "distance" ? tabValue : filteredDistance,
    };

    //
    setFiltered(true);
    if (key === "venue") {
      setFilteredVenue(tabValue);
    }
    if (key === "field") {
      setFilteredField(tabValue);
    }
    if (key === "distance") {
      setFilteredDistance(tabValue);
    }

    setFilteredRaces(
      races.filter(
        (race) =>
          (filteredValue.venue === "" || race.venue === filteredValue.venue) &&
          (filteredValue.field === "" || race.field === filteredValue.field) &&
          (filteredValue.distance === "" || race.distance === filteredValue.distance),
      ),
    );
  };

  return (
    <PageWrapper>
      <div className="w-6xl">
        <div className="">
          {/* タイトル */}
          <div className="mb-6">
            <div className="flex items-center justify-between border-b-2 border-b-amber-400 px-6 py-4">
              <h1 className="text-3xl font-bold">競馬予想メモ</h1>
              <div className="flex gap-2">
                <Button variant="green" size="mid" onClick={() => setIsRegistering(!isRegistering)}>
                  予想を追加する
                </Button>
                <Button
                  variant="red"
                  size="mid"
                  onClick={() => {
                    setSelectedRaces([]);
                    setIsDeleting(!isDeleting);
                  }}
                >
                  予想を削除する
                </Button>
              </div>
            </div>
          </div>

          {/* トータルスコア */}
          <div className="mb-4">
            <div className="px-6">
              <ul className="flex justify-between gap-4">
                <li className="w-full">
                  <StatsCard title={"収支"} stat={"3,000円"} color={"gray"} changeRate={-0.23} />
                </li>
                <li className="w-full">
                  <StatsCard title={"予想数"} stat={"10"} color={"gray"} changeRate={0.8} />
                </li>
                <li className="w-full">
                  <StatsCard title={"的中率"} stat={"30%"} color={"gray"} changeRate={1.5} />
                </li>
              </ul>
            </div>
          </div>

          {/* 入力フォーム
          ------------------------------*/}
          {isRegistering && (
            <div className="fixed top-0 left-0 z-99 h-screen w-screen bg-black/50" onClick={() => setIsRegistering(!isRegistering)}>
              <div className="flex h-full items-center justify-center">
                <form
                  onSubmit={handleSubmit}
                  className="mb-6 rounded-xl border-2 border-gray-200 bg-gray-100 p-6 drop-shadow-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2 className="mb-4 border-l-4 border-l-green-500 pl-2 text-2xl font-bold">登録フォーム</h2>
                  {/* prettier-ignore */}
                  <PredictionsForm 
                  raceInfo={
                    {
                    raceName, setRaceName,
                    raceRank, setRaceRank,
                    venue, setVenue,
                    raceNumber, setRaceNumber,
                    field, setField,
                    surface, setSurface,
                    distance, setDistance,
                    weather, setWeather,
                    horseNumber, setHorseNumber,
                    }}/>
                  <div className="flex gap-2">
                    <Button variant="green" size="sml" type="submit" onClick={handleSubmit}>
                      登録
                    </Button>
                    <Button
                      variant="gray"
                      size="sml"
                      onClick={() => {
                        setRaceName("");
                        setRaceRank("");
                        setVenue("");
                        setRaceNumber("");
                        setField("");
                        setSurface("");
                        setDistance("");
                        setWeather("");
                        setHorseNumber("");
                      }}
                    >
                      リセット
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* 予想一覧
          ------------------------------*/}
          <div className="mb-6">
            <div className="px-6">
              <div className="mb-4 flex justify-between gap-4">
                <div className="flex w-full items-center border-l-4 border-l-amber-200 p-4">
                  <h2 className="text-2xl font-bold">予想一覧</h2>
                </div>
                {races.length !== 0 && isDeleting && (
                  <div className="flex w-full gap-4">
                    <Button
                      variant="red"
                      size="full"
                      onClick={() => {
                        if (!confirm("すべての予想を削除しますか？")) return;
                        localStorage.removeItem("races");
                        setRaces([]);
                      }}
                    >
                      すべて削除
                    </Button>
                    <Button
                      variant="red"
                      size="full"
                      onClick={() => {
                        handleDelete(selectedRaces);
                      }}
                    >
                      選択した項目を削除
                    </Button>
                  </div>
                )}
              </div>

              {/* 切り替え表示用のタブ */}
              <div className="mb-4">
                <ul className="flex flex-col gap-2">
                  <li className="flex items-center gap-1">
                    <span className="min-w-[5%]">会場：</span>
                    <TabComponent
                      tabs={[
                        { value: "all", label: "全て" },
                        ...[...new Set(races.map((race) => race.venue))]
                          .filter((venue) => venue !== "")
                          .map((venue) => ({ value: venue, label: venue })),
                      ]}
                      onTabChange={handleTabChange}
                      size="sml"
                      filterKey={"venue"}
                    ></TabComponent>
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="min-w-[5%]">馬場：</span>
                    <TabComponent
                      tabs={[
                        { value: "all", label: "全て" },
                        ...[...new Set(races.map((race) => race.field))]
                          .filter((field) => field !== "")
                          .map((field) => ({ value: field, label: field })),
                      ]}
                      onTabChange={handleTabChange}
                      size="sml"
                      filterKey={"field"}
                    ></TabComponent>
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="min-w-[5%]">距離：</span>
                    <TabComponent
                      tabs={[
                        { value: "all", label: "全て" },
                        ...[...new Set(races.map((race) => race.distance))]
                          .filter((distance) => distance !== "")
                          .map((distance) => ({ value: distance, label: distance })),
                      ]}
                      onTabChange={handleTabChange}
                      size="sml"
                      filterKey={"distance"}
                    ></TabComponent>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-4">
                {races.length === 0 && <p className="text-center text-lg text-gray-800">予想がありません</p>}
                {/* 各カード */}
                {filtered ? (
                  filteredRaces.length !== 0 ? (
                    filteredRaces
                      .slice()
                      .reverse()
                      .map((race) => (
                        <Link href={`/race/${race.id}`} key={race.id}>
                          <PredictionCard
                            race={race}
                            isDeleting={isDeleting}
                            isChecked={selectedRaces.some((r) => r.id === race.id)}
                            isSelected={() => {
                              setSelectedRaces((prev) => {
                                const alreadySelected = prev.some((r) => r.id === race.id);
                                if (alreadySelected) {
                                  return prev.filter((r) => r.id !== race.id);
                                } else {
                                  return [...prev, race];
                                }
                              });
                            }}
                          />
                        </Link>
                      ))
                  ) : (
                    <p className="text-center text-lg text-gray-800">条件に合う予想がありませんでした</p>
                  )
                ) : (
                  races
                    .slice()
                    .reverse()
                    .map((race) => (
                      <Link href={`/race/${race.id}`} key={race.id}>
                        <PredictionCard
                          race={race}
                          isDeleting={isDeleting}
                          isChecked={selectedRaces.some((r) => r.id === race.id)}
                          isSelected={() => {
                            setSelectedRaces((prev) => {
                              const alreadySelected = prev.some((r) => r.id === race.id);
                              if (alreadySelected) {
                                return prev.filter((r) => r.id !== race.id);
                              } else {
                                return [...prev, race];
                              }
                            });
                          }}
                        />
                      </Link>
                    ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
