'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

import PredictionsForm from './components/PredictionsForm';
import PredictionCard from './components/PredictionCard';

export default function Home() {
  const [predictions, setPredictions] = useState([]); // 予想一覧
  const [raceName, setRaceName] = useState(''); // レース名
  const [horseName, setHorseName] = useState(''); // 馬名
  const [rank, setRank] = useState(''); // 順位
  const [editingID, setEditingID] = useState(''); // 編集中のID

  // 初回ロード時にローカルストレージからデータを取得し、オブジェクトに格納
  useEffect(() => {
    const saved = localStorage.getItem('predictions'); // ローカルストレージからキー名のデータを取得
    if (saved) {
      setPredictions(JSON.parse(saved));
      console.log(predictions);
    }
  }, []);

  /* ------------------------------------
    登録関数
  ------------------------------------ */
  const handleSubmit = (e) => {
    e.preventDefault();

    const saved = localStorage.getItem('predictions'); // ローカルストレージからキー名のデータを取得
    const predictions = saved ? JSON.parse(saved) : []; // 予想がすでにローカルストレージにあれば、空のデータを。新しければsavedのデータを

    if (editingID) {
      // 編集モード
      const updatedPredictions = predictions.map((p) =>
        p.id === editingID ? { ...p, raceName, horseName, rank, editedAt: generateID('-', ':', ' ') } : p
      );
      localStorage.setItem('predictions', JSON.stringify(updatedPredictions)); // ローカルストレージに更新された予想を入れる
      setPredictions(updatedPredictions);
      setEditingID('');
    } else {
      // 新規追加
      const newID = generateID();
      const prediction = {
        id: newID,
        raceName: raceName,
        horseName: horseName,
        rank: rank,
        createdAt: generateID('-', ':', ' '),
        editedAt: '',
      };
      predictions.push(prediction); // 予想をデータに入れる
      localStorage.setItem('predictions', JSON.stringify(predictions)); // ローカルストレージに文字列でpredictionsを入れる
      setPredictions(predictions);
    }

    // フォームのリセット
    setRaceName('');
    setHorseName('');
    setRank('');

    alert(editingID ? '予想を編集しました' : '予想を保存しました');
  };

  /* ------------------------------------
    削除関数
  ------------------------------------ */
  const handleDelete = (id) => {
    // 1. 確認ダイアログを表示(本当に削除する?)
    // 2. キャンセルされたら何もせず終了
    if (!confirm('削除しますか？')) return;

    // 3. localStorageから全データを取得
    const saved = localStorage.getItem('predictions');
    const predictions = saved ? JSON.parse(saved) : [];

    // 4. 削除したいID以外のデータだけを残す(filter)
    const updatedPredictions = predictions.filter((p) => p.id !== id);

    // 5. 残ったデータをlocalStorageに保存
    localStorage.setItem('predictions', JSON.stringify(updatedPredictions));
    // 6. stateを更新(再レンダリング)
    setPredictions(updatedPredictions);

    // フォームのリセット]
    setEditingID('');
    setRaceName('');
    setHorseName('');
    setRank('');

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
              raceName={raceName}
              setRaceName={setRaceName}
              horseName={horseName}
              setHorseName={setHorseName}
              rank={rank}
              setRank={setRank}
              handleSubmit={handleSubmit}
              editingID={editingID}
            />
            <div className='flex gap-2'>
              <button
                type='submit'
                className={`
                  cursor-pointer text-center block w-[25%] font-bold transition-colors ease duration-200 rounded-xl py-2 ${
                    editingID
                      ? 'bg-orange-200 text-orange-900 hover:bg-orange-900 hover:text-orange-200'
                      : 'bg-green-200 text-green-900 hover:bg-green-900 hover:text-green-200'
                  }`}
              >
                {editingID ? `編集` : `登録`}
              </button>
              {editingID && (
                <button
                  type='button'
                  onClick={() => {
                    setEditingID('');
                    setRaceName('');
                    setHorseName('');
                    setRank('');
                  }}
                  className='cursor-pointer text-center block w-[25%] font-bold transition-colors ease rounded-xl py-2  bg-gray-200 text-gray-900 hover:bg-gray-900 hover:text-gray-200 duration-200'
                >
                  キャンセル
                </button>
              )}
            </div>
          </form>
        </div>

        {/* 予想一覧
        ------------------------------*/}
        <div className='px-6'>
          <div className='mb-4 flex justify-between'>
            <h2 className='text-2xl pl-2 border-l-4 border-l-amber-200 font-bold'>予想一覧</h2>
            {predictions.length !== 0 && (
              <button
                onClick={() => {
                  if (!confirm('すべての予想を削除しますか？')) return;
                  localStorage.removeItem('predictions');
                  setPredictions([]);
                }}
                className='cursor-pointer'
              >
                すべての予想を削除する
              </button>
            )}
          </div>
          <div className='flex flex-col gap-2 max-h-[400px] overflow-y-auto'>
            {predictions.length === 0 && <p className='text-gray-800 text-lg'>予想がありません</p>}
            {/* 各カード */}
            {predictions.map((p) => (
              <PredictionCard
                raceName={raceName} // ← 追加
                setRaceName={setRaceName} // ← 追加
                horseName={horseName} // ← 追加
                setHorseName={setHorseName} // ← 追加
                rank={rank} // ← 追加
                setRank={setRank} // ← 追加
                id={p.id}
                prediction={p}
                editingID={editingID}
                onEdit={() => {
                  setEditingID(p.id);
                  setRaceName(p.raceName);
                  setHorseName(p.horseName);
                  setRank(p.rank);
                }}
                onDelete={() => {
                  handleDelete(p);
                }}
                onCancelEdit={() => {
                  setEditingID('');
                }}
                handleSubmit={handleSubmit}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
