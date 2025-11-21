'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

import PredictionsForm from './components/PredictionsForm';
import PredictionCard from './components/PredictionCard';
import Button from './components/common/Button';

export default function Home() {

  /* ------------------------------------
    状態関数の宣言
  ------------------------------------ */
  // レース一覧の状態関数
  const [races, setRaces] = useState([]); // 予想一覧
  const [venue, setVenue] = useState('') // 会場
  const [raceNumber, setRaceNumber] = useState('') // レース番号
  const [field, setField] = useState('') // レース場
  const [surface, setSurface] = useState('') // 場状態
  const [distance, setDistance] = useState('') // 距離
  const [weather, setWeather] = useState('') // 天候
  const [horseNumber,setHorseNumber] = useState('') // 頭数

  // その他の状態関数

  /* ------------------------------------
  初回ロード時にローカルストレージからデータを取得し、オブジェクトに格納
  ------------------------------------ */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('races')); // ローカルストレージからキー名のデータを取得
    if (saved) {
      setRaces(saved);
    }
  }, []);


  /* ------------------------------------
    登録関数
  ------------------------------------ */
  const handleSubmit = (e) => {
    e.preventDefault();

    // 保存されているレースを取得
    const savedRaces = JSON.parse(localStorage.getItem('races')) || [];

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
      predictions: [], // 予想について（各ページにて編集）
      createdAt: generateID('-', ':', ' '), // 作成日時
      editedAt: '', // 編集日時
      isNew: true, // 新規追加フラグ
    };

    // 新規レースの追加
    const updateRaces = [...savedRaces, newRace]; // スプレッド構文で新規レースを既存レースに上書き
    localStorage.setItem('races', JSON.stringify(updateRaces)); // ローカルストレージに上書きした配列を保存
    setRaces(updateRaces); // 状態関数にも保存

    alert('予想を編集しました'); // TODO:モーダル表示にしてデザイン性を高める

    // フォームのリセット
    setVenue('');
    setRaceNumber('');
    setField('');
    setSurface('');
    setDistance('');
    setWeather('');
    setHorseNumber('');
  }

  /* ------------------------------------
    削除関数
  ------------------------------------ */
  const handleDelete = (id) => {
    // パラメーターにidを使用
    if (!confirm('削除しますか？')) return;

    // 保存されているレースを取得
    const deletedRaces =  JSON.parse(localStorage.getItem('races'));

    // 選択されたレース情報を配列の各オブジェクトで照合し、”それ以外の配列(updatedRaces)”を作成
    const updatedRaces = deletedRaces.filter((p) => p.id !== id);
    localStorage.setItem('races', JSON.stringify(updatedRaces)); // ローカルストレージに上書きした配列を保存
    setRaces(updatedRaces); // 状態関数にも保存

    // フォームのリセット
    setVenue('');
    setRaceNumber('');
    setField('');
    setSurface('');
    setDistance('');
    setWeather('');
    setHorseNumber('');

    console.log('削除しました'); // TODO:モーダル表示にしてデザイン性を高める
  };

  /* ------------------------------------ 
    ID生成
  ------------------------------------ */
  const generateID = (dateSep = '', timeSep = '', sep = '') => {
    const now = new Date();
    const year = now.getFullYear(); // YYYY
    const month = String(now.getMonth() + 1).padStart(2, '0'); // MM(一桁の場合は0が入る)
    const day = String(now.getDate()).padStart(2, '0'); // MM(一桁の場合は0が入る)
    const hours = String(now.getHours()).padStart(2, '0'); // hh(一桁の場合は0が入る)
    const mins = String(now.getMinutes()).padStart(2, '0'); // mm(一桁の場合は0が入る)
    const secs = String(now.getSeconds()).padStart(2, '0'); // ss(一桁の場合は0が入る)

    return `${year}${dateSep}${month}${dateSep}${day}${sep}${hours}${timeSep}${mins}${timeSep}${secs}`;
  };

  return (
    <div className='max-w-2xl p-6'>
      <div className='py-6 rounded-3xl bg-amber-50 border-2 border-amber-100'>
        <h1 className='text-3xl font-bold mb-6 text-center border-b-amber-400 border-b-2 pb-2'>競馬予想メモ</h1>

        {/* 入力フォーム
        ------------------------------*/}
        <div className='px-6'>
          <form
            onSubmit={handleSubmit}
            className='bg-gray-100 p-6 rounded-xl border-gray-200 border-2 mb-6 drop-shadow-lg'
          >
            <h2
              className='text-2xl pl-2 border-l-4 mb-4 font-bold border-l-green-500'
              >
              登録フォーム
            </h2>
            <PredictionsForm
              raceInfo={{
                venue, setVenue,
                raceNumber, setRaceNumber,
                field, setField,
                surface, setSurface,
                distance, setDistance,
                weather, setWeather,
                horseNumber, setHorseNumber
              }}
            />
            <div className='flex gap-2'>
              <Button variant='green' size='sml' type='submit' onClick={handleSubmit}>
                登録
              </Button>
              <Button
                variant='gray'
                size='sml'
                onClick={() => {
                  setVenue('');
                  setRaceNumber('');
                  setField('');
                  setSurface('');
                  setDistance('');
                  setWeather('');
                  setHorseNumber('');
                }}
              >
                リセット
              </Button>
            </div>
          </form>
        </div>

        {/* 予想一覧
        ------------------------------*/}
        <div className='px-6'>
          <div className='mb-4 flex justify-between'>
            <h2 className='text-2xl pl-2 border-l-4 border-l-amber-200 font-bold'>予想一覧</h2>
            {races.length !== 0 && (
              <Button
                variant='red'
                size='sml'
                onClick={() =>{
                  if (!confirm('すべての予想を削除しますか？')) return;
                  localStorage.removeItem('races');
                  setRaces([]);
                }}
              >
                すべて削除
              </Button>
              
            )}
          </div>
          <div className='flex flex-col gap-2 max-h-[400px] overflow-y-auto overflow-x-hidden'>
            {races.length === 0 && <p className='text-gray-800 text-lg'>予想がありません</p>}
            {/* 各カード */}
            {races.slice().reverse().map((race) => (
              <Link href={`/race/${race.id}`} key={race.id}>
                <PredictionCard
                race={race}
                onDelete={() => {
                  handleDelete(race.id);
                }}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
