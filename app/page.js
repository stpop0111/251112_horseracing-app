"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import PredictionsForm from "./components/PredictionsForm";
import PredictionCard from "./components/PredictionCard";
import Button from "./components/common/Button";
import PageWrapper from "./components/common/PageWrapper";
import FilterComponent from "./components/FilterComponent";

export default function Home() {
  /* ------------------------------------
    状態関数の宣言
  ------------------------------------ */
  // レース一覧の状態管理
  const [races, setRaces] = useState([]); // 予想一覧
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
    const updatedRaces = savedRaces.filter(
      (race) =>
        !selectedRaces.some((selectedRace) => selectedRace.id === race.id),
    );

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

  return (
    <PageWrapper>
      <div className="w-4xl p-6">
        <div className="rounded-3xl border-2 border-amber-100 py-6">
          {/* タイトル */}
          <div className="mb-6 border-b-2 border-b-amber-400 pb-2">
            <h1 className="text-center text-3xl font-bold">競馬予想メモ</h1>
          </div>

          {/* トータルスコア */}
          <div className="mb-4">
            <div className="px-6">
              あなたの通算スコア
              <ul>
                <li>設定予算：</li>
                <li>賭け金：</li>
                <li>払戻金：</li>
              </ul>
            </div>
          </div>

          {/* 予想の追加 */}
          <div className="mb-4">
            <div className="flex gap-4 px-6">
              <Button
                variant="green"
                size="full"
                onClick={() => setIsRegistering(!isRegistering)}
              >
                予想を追加する
              </Button>
              <Button
                variant="red"
                size="full"
                onClick={() => {
                  setSelectedRaces([]);
                  setIsDeleting(!isDeleting);
                }}
              >
                予想を削除する
              </Button>
            </div>
          </div>

          {/* 入力フォーム
        ------------------------------*/}
          {isRegistering && (
            <div
              className="fixed top-0 left-0 z-99 h-screen w-screen bg-black/50"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              <div className="flex h-full items-center justify-center">
                <form
                  onSubmit={handleSubmit}
                  className="mb-6 rounded-xl border-2 border-gray-200 bg-gray-100 p-6 drop-shadow-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2 className="mb-4 border-l-4 border-l-green-500 pl-2 text-2xl font-bold">
                    登録フォーム
                  </h2>
                  <PredictionsForm
                    raceInfo={{
                      venue,
                      setVenue,
                      raceNumber,
                      setRaceNumber,
                      field,
                      setField,
                      surface,
                      setSurface,
                      distance,
                      setDistance,
                      weather,
                      setWeather,
                      horseNumber,
                      setHorseNumber,
                    }}
                  />
                  <div className="flex gap-2">
                    <Button
                      variant="green"
                      size="sml"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      登録
                    </Button>
                    <Button
                      variant="gray"
                      size="sml"
                      onClick={() => {
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
            <FilterComponent
              filterdRace={{
                filteredVenue,
                setFilteredVenue,
                filteredField,
                setFilteredField,
                filteredDistance,
                setFilteredDistance,
              }}
              handleFilter={handleFilter}
              filtered={filtered}
              setFiltered={setFiltered}
            />
            <div className="flex flex-col gap-2 overflow-x-hidden">
              {races.length === 0 && (
                <p className="text-lg text-gray-800">予想がありません</p>
              )}
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
                          isChecked={selectedRaces.some(
                            (r) => r.id === race.id,
                          )}
                          isSelected={() => {
                            setSelectedRaces((prev) => {
                              const alreadySelected = prev.some(
                                (r) => r.id === race.id,
                              );
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
                  <div>何もありません</div>
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
                            const alreadySelected = prev.some(
                              (r) => r.id === race.id,
                            );
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
    </PageWrapper>
  );
}
