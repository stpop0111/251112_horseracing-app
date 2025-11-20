'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

import PredictionsForm from './components/PredictionsForm';
import PredictionCard from './components/PredictionCard';
import Button from './components/common/Button';

export default function Home() {
  // レース一覧の状態関数
  const [races, setRaces] = useState([]); // 予想一覧
  const [venue, setVenue] = useState('') // 会場
  const [raceNumber, setRaceNumber] = useState('') // レース番号
  const [field, setField] = useState('') // レース場
  const [surface, setSurface] = useState('') // 場状態
  const [distance, setDistance] = useState('') // 距離
  const [weather, setWeather] = useState('') // 天候

  // 予想カードの状態関数
  const [horseName, setHorseName] = useState(''); // 馬名
  const [frameNumber, setFrameNumber] = useState('') // 枠番
  const [rank, setRank] = useState('') // 予想順位
  const [preMemo, setPreMemo] = useState('') // 予想メモ
  const [recoMemo, setRecoMemo] = useState(''); // 反省メモ

  // その他の状態関数
  const [editingID, setEditingID] = useState(''); // 編集中のID

  /* ------------------------------------
    登録関数
  ------------------------------------ */
  const handleSubmit = (e) => {
    e.preventDefault();

    const saved = localStorage.getItem('races'); // ローカルストレージからキー名のデータを取得
    const savedRaces = saved ? JSON.parse(saved) : []; // 予想がすでにローカルストレージにあれば、空のデータを。新しければsavedのデータを
    // 新規追加
    const newID = generateID();
    const newRace = {
      id: newID,
      venue: venue, // 会場
      raceNumber: raceNumber, // レース番号
      field: field, // レース場
      surface: surface, // 場状態
      distance: distance, // 距離
      weather: weather, // 天候
      predictions: [], // 予想について
      createdAt: generateID('-', ':', ' '), // 作成日時
      editedAt: '', // 編集日時
      isNew: true, // 新規追加フラグ
    };

    const updateRaces = [...savedRaces, newRace];
    localStorage.setItem('races', JSON.stringify(updateRaces)); // ローカルストレージに文字列でracesを入れる
    setRaces(updateRaces);

    alert('予想を編集しました');

    // フォームのリセット
    setVenue('');
    setRaceNumber('');
    setField('');
    setSurface('');
    setDistance('');
    setWeather('');
  }

  /* ------------------------------------
    削除関数
  ------------------------------------ */
  const handleDelete = (id) => {

    if (!confirm('削除しますか？')) return;

    const saved = localStorage.getItem('races');
    const deletedRaces = saved ? JSON.parse(saved) : [];

    const updatedRaces = deletedRaces.filter((p) => p.id !== id);
    localStorage.setItem('races', JSON.stringify(updatedRaces));
    setRaces(updatedRaces);

    // フォームのリセット
    setVenue('');
    setRaceNumber('');
    setField('');
    setSurface('');
    setDistance('');
    setWeather('');

    // 7. 削除完了メッセージを表示
    console.log('削除しました');
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

  // 初回ロード時にローカルストレージからデータを取得し、オブジェクトに格納
  useEffect(() => {
    const savedRaces = localStorage.getItem('races'); // ローカルストレージからキー名のデータを取得
    if (savedRaces) {
      setRaces(JSON.parse(savedRaces));
    }
  }, []);

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
              className={`text-2xl pl-2 border-l-4 mb-4 font-bold ${
                editingID ? 'border-l-amber-500' : 'border-l-green-500'
              }`}
            >
              {editingID ? '編集フォーム' : '登録フォーム'}
            </h2>
            <PredictionsForm
              raceInfo={{
                venue, setVenue,
                raceNumber, setRaceNumber,
                field, setField,
                surface, setSurface,
                distance, setDistance,
                weather, setWeather,
              }}
              editingID={editingID}
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
            {races.slice().reverse().map((p) => (
              <PredictionCard
              key={p.id}
              race={p}
              editingID={editingID}
              onDelete={() => {
                handleDelete(p.id);
              }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
