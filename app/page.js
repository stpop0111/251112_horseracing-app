'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

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

        {/* 入力フォーム */}
        <div className='px-6'>
          <form onSubmit={handleSubmit} className='bg-gray-100 p-6 rounded-xl border-gray-200 border-2 mb-6 drop-shadow-lg'>
            <h2
              className={`text-2xl pl-2 border-l-4 mb-4 font-bold ${
                editingID ? 'border-l-amber-500' : 'border-l-green-500'
              }`}
            >
              {editingID ? '編集フォーム' : '登録フォーム'}
            </h2>
            <ul className='flex gap-2 mb-4'>
              <li>
                <label className='block mb-2 font-bold'>レース名</label>
                <input
                  value={raceName}
                  onChange={(e) => setRaceName(e.target.value)}
                  type='text'
                  className={`w-full p-2 border-2 rounded-xl outline-none ${
                    editingID ? 'border-amber-500 focus:border-amber-700' : 'border-green-500 focus:border-green-700'
                  }`}
                />
              </li>
              <li>
                <label className='block mb-2 font-bold'>馬の名前</label>
                <input
                  value={horseName}
                  onChange={(e) => setHorseName(e.target.value)}
                  type='text'
                  className={`w-full p-2 border-2 rounded-xl outline-none ${
                    editingID ? 'border-amber-500 focus:border-amber-700' : 'border-green-500 focus:border-green-700'
                  }`}
                />
              </li>
              <li>
                <label className='block mb-2 font-bold'>予想順位</label>
                <input
                  value={rank}
                  onChange={(e) => setRank(e.target.value)}
                  type='text'
                  className={`w-full p-2 border-2 rounded-xl outline-none ${
                    editingID ? 'border-amber-500 focus:border-amber-700' : 'border-green-500 focus:border-green-700'
                  }`}
                />
              </li>
            </ul>
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

        {/* 予想一覧 */}
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
              <div key={p.id} className='border-2 bg-amber-50 border-amber-200 rounded-xl p-4'>
                <div className='flex justify-between'>
                  <div className='flex flex-col gap-1'>
                    <h3 className='font-semibold'>
                      レース名：<span className='font-normal'>{p.raceName}</span>
                    </h3>
                    <p className='font-semibold'>
                      馬名：<span className='font-normal'>{p.horseName}</span>
                    </p>
                    <p className='font-semibold'>
                      順位：<span className='font-normal'>{p.rank}</span>
                    </p>
                  </div>
                  <div className='flex gap-2 w-[30%]'>
                    {editingID === p.id ? (
                      <button className='block w-full rounded-lg py-2 font-bold bg-gray-900 text-gray-200'>
                        編集中
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingID(p.id);
                          setRaceName(p.raceName);
                          setHorseName(p.horseName);
                          setRank(p.rank);
                        }}
                        className='block w-full cursor-pointer bg-gray-200 text-gray-900 rounded-lg py-2 font-bold hover:bg-gray-900 hover:text-gray-200 duration-200'
                      >
                        編集モード
                      </button>
                    )}
                  </div>
                </div>
                <hr className='my-4 border-0.5 border-amber-400' />
                <div>
                  <p className='text-gray-800 text-sm'>作成日：{p.createdAt}</p>
                  {p.editedAt && <p className='text-gray-800 text-sm'>最終更新日：{p.editedAt}</p>}
                </div>

                {/* 編集モーダルの表示 */}
                {editingID === p.id && (
                  <div
                    className='h-screen w-screen fixed top-0 left-0 flex justify-center items-center bg-black/30'
                    onClick={() => {
                      setEditingID('');
                      setRaceName('');
                      setHorseName('');
                      setRank('');
                    }}
                  >
                    <div className='bg-white w-xl p-6 rounded-xl' onClick={(e) => e.stopPropagation()}>
                      {editingID === p.id && (
                        <form onSubmit={handleSubmit}>
                          <h2 className='text-xl mb-2 font-bold'>編集する予想</h2>
                          <ul className='flex gap-2 mb-4'>
                            <li>
                              <label className='block mb-2 font-bold'>レース名</label>
                              <input
                                value={raceName}
                                onChange={(e) => setRaceName(e.target.value)}
                                type='text'
                                className='w-full p-2 border-2 rounded-xl outline-none border-amber-500 focus:border-amber-700'
                              />
                            </li>
                            <li>
                              <label className='block mb-2 font-bold'>馬の名前</label>
                              <input
                                value={horseName}
                                onChange={(e) => setHorseName(e.target.value)}
                                type='text'
                                className='w-full p-2 border-2 rounded-xl outline-none border-amber-500 focus:border-amber-700'
                              />
                            </li>
                            <li>
                              <label className='block mb-2 font-bold'>予想順位</label>
                              <input
                                value={rank}
                                onChange={(e) => setRank(e.target.value)}
                                type='text'
                                className='w-full p-2 border-2 rounded-xl outline-none border-amber-500 focus:border-amber-700'
                              />
                            </li>
                          </ul>
                          <div className='flex gap-2 w-full mb-6'>
                            <button
                              type='submit'
                              className='block w-full cursor-pointer bg-orange-200 text-orange-900 rounded-lg py-4 font-bold hover:bg-orange-900 hover:text-orange-200 duration-200'
                            >
                              編集
                            </button>
                            <button
                              type='button'
                              onClick={() => {
                                handleDelete(p.id);
                              }}
                              className='block w-full cursor-pointer bg-red-200 text-red-900 rounded-lg py-4 font-bold hover:bg-red-900 hover:text-red-200 duration-200'
                            >
                              削除
                            </button>
                          </div>
                        </form>
                      )}

                      <button
                        type='button'
                        onClick={() => setEditingID('')}
                        className='block w-full cursor-pointer bg-gray-200 text-gray-900 rounded-full py-4 font-bold hover:bg-gray-900 hover:text-gray-200 duration-200'
                      >
                        キャンセル
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
