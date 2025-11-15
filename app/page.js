'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Home() {
  const [predictions, setPredictions] = useState([]);
  const [raceName, setRaceName] = useState('');
  const [horseName, setHorseName] = useState('');
  const [rank, setRank] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('predictions'); // ローカルストレージからキー名のデータを取得
    if (saved) {
      setPredictions(JSON.parse(saved));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const prediction = {
      id: Date.now(),
      raceName: raceName,
      horseName: horseName,
      rank: rank,
    };

    const saved = localStorage.getItem('predictions'); // ローカルストレージからキー名のデータを取得
    const predictions = saved ? JSON.parse(saved) : []; // 予想がすでにローカルストレージにあれば、空のデータを。新しければsavedのデータを
    predictions.push(prediction); // 予想をデータに入れる
    localStorage.setItem('predictions', JSON.stringify(predictions)); // ローカルストレージに文字列でpredictionsを入れる
    setPredictions(predictions);

    setRaceName('');
    setHorseName('');
    setRank('');

    alert('予想を保存しました');
  };

  return (
    <div className='max-w-2xl mx-auto p-6'>
      <div className="p-6 rounded-3xl bg-amber-50 border-2 border-amber-100">
        <h1 className='text-3xl font-bold mb-6 text-center border-b-amber-400 border-b-2 pb-2'>競馬予想メモ</h1>

        {/* 入力フォーム */}
        <div className='bg-gray-100 p-6 rounded-xl border-gray-200 border-2 mb-6 drop-shadow-xl'>
          <form onSubmit={handleSubmit}>
            <h2 className='text-2xl pl-2 border-l-4 border-l-amber-500 mb-4 font-bold'>登録フォーム</h2>
            <ul className='flex gap-2 mb-4'>
              <li>
                <label className='block mb-2 font-bold'>レース名</label>
                <input value={raceName} onChange={(e) => setRaceName(e.target.value)} type='text' className='focus:border-gray-500 w-full p-2 border-gray-300 border-2 rounded-xl' />
              </li>
              <li>
                <label className='block mb-2 font-bold'>馬の名前</label>
                <input value={horseName} onChange={(e) => setHorseName(e.target.value)} type='text' className='focus:border-gray-500 w-full p-2 border-gray-300 border-2 rounded-xl' />
              </li>
              <li>
                <label className='block mb-2 font-bold'>予想順位</label>
                <input value={rank} onChange={(e) => setRank(e.target.value)} type='text' className='focus:border-gray-500 w-full p-2 border-gray-300 border-2 rounded-xl' />
              </li>
            </ul>
            <button type='submit' className='text-center block w-[25%] bg-green-200 rounded-xl py-2 text-green-900 font-bold transition-colors ease duration-200 hover:bg-green-900 hover:text-green-200'>登録</button>
          </form>
        </div>

        {/* 予想一覧 */}
        <div>
          <h2 className='text-2xl pl-2 border-l-4 border-l-amber-500 mb-4 font-bold'>予想一覧</h2>
          <div className="flex flex-col gap-2">
            {predictions.map((prediction) => (
              <div key={prediction.id} className='border-2 bg-amber-50 border-amber-200 rounded-xl flex flex-col p-2 gap-1'>
                <h3 className='font-semibold'>レース名：<span className='font-normal'>{prediction.raceName}</span></h3>
                <p className='font-semibold'>馬名：<span className='font-normal'>{prediction.horseName}</span></p>
                <p className='font-semibold'>順位：<span className='font-normal'>{prediction.rank}</span></p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
