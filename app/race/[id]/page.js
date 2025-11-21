'use client';
import { useEffect, use, useState } from 'react';
import Link from 'next/link';
import Button from '@/app/components/common/Button';

export default function RacePage({ params }) {
  const [raceData, setRaceData] = useState(null);

  // 予想カードの状態関数
  const [predictions, setPredictions] = useState({
    first: { horseName: '', frameNumber: '' },
    second: { horseName: '', frameNumber: '' },
    third: { horseName: '', frameNumber: '' },
  });

  const [preMemo, setPreMemo] = useState(''); // 予想メモ
  const [recoMemo, setRecoMemo] = useState(''); // 反省メモ

  const param = use(params);

  // 初回ロード時にローカルストレージからデータを取得し、オブジェクトに格納
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('races')); // ローカルストレージからレースを取得
    const selectedRace = saved.find((r) => r.id === param.id);
    setRaceData(selectedRace);

    if(selectedRace?.predictions?.first) {
      setPredictions(selectedRace.predictions)
    }

  }, []);

  // inputの値が変わった時
  const handleChange = (position, field, value) => {
    setPredictions({
      ...predictions,
      [position]: { 
        ...predictions[position],
        [field]: value },
    });

    console.log(predictions)
  };

  // 保存ボタンを押した時
  const handleSubmit = (e) => {
    e.preventDefault(); // イベントを無視

    const saved = JSON.parse(localStorage.getItem("races")); // ローカルデータからレース情報を全て取得する
    const index = saved.findIndex((r) => r.id === raceData.id); // レースデータのIDをsavedから照合し、その配列番号を記録する

    // 照合した配列番号のレースを”直接”上書きする
    saved[index] = {
      ...saved[index], // レース情報はそのまま
      predictions: predictions, // 予想は現在の状態変数から取得
    }

    localStorage.setItem("races", JSON.stringify(saved)) // 上書きしたデータをローカルストレージにそのまま上書き
    setRaceData(saved[index]) // 状態関数には照合した配列番号のレースデータを入れる（ページでの情報）

    alert('保存しました') // TODO:モーダル表示にしてデザイン性を高める
  };

  return (
    <div className='w-4xl p-6'>
      {raceData ? (
        <div>

          {/* レース概要 */}
          <div className='flex justify-between items-center mb-4'>
            <ul className='flex items-center gap-2'>
              <li className='font-bold text-2xl'>
                {raceData.venue}<span className='p-2 ml-1 bg-green-600 text-gray-50'>{raceData.raceNumber}R</span>
              </li>
              <li>
                {raceData.field}：{raceData.distance}m【{raceData.surface}】
              </li>
              <li>天気：{raceData.weather}</li>
              <li>{raceData.horseNumber}頭立て</li>
            </ul>
            <ul className='flex flex-col text-sm text-gray-900'>
              <li>作成日：{raceData.createdAt}</li>
              <li>更新日：{raceData.editedAt}</li>
            </ul>
          </div>

          {/* 将来モデルを置く場所 */}
          <div className='w-full h-[540px] border border-gray-100 rounded-xl mb-4'>
            <div className='w-full h-full flex justify-center items-center'>モデルが入る</div>
          </div>

          {/* 予想メモ */}
                <form
                onSubmit={handleSubmit}
                >
                <div>
                  <h2 className='text-2xl'>馬券内予想順位</h2>
                  <ul className='flex'>
                    <li>
                      <label>1位</label>
                      <div className='flex'>
                      <input 
                      value={predictions.first.frameNumber} onChange={(e) => handleChange("first", "frameNumber", e.target.value)} 
                      type='text' 
                      className='border border-r-0 text-center w-[20%] rounded-l-xl aspect-square'></input>
                      <input value={predictions.first.horseName} onChange={(e) => handleChange("first", "horseName", e.target.value)} 
                      type='text'
                      className='border rounded-r-xl p-2'></input>
                      </div>
                    </li>
                    <li>
                      <label id='second'>2位</label>
                      <div className='flex'>
                      <input 
                      value={predictions.second.frameNumber} 
                      onChange={(e) => handleChange("second", "frameNumber", e.target.value)} 
                      type='text'
                      className='border border-r-0 text-center w-[20%] rounded-l-xl aspect-square'></input>
                      <input value={predictions.second.horseName} onChange={(e) => handleChange("second", "horseName", e.target.value)} type='text'
                      className='border rounded-r-xl p-2'></input>
                      </div>
                    </li>
                    <li>
                      <label id='third'>3位</label>
                      <div className='flex'>
                      <input value={predictions.third.frameNumber} onChange={(e) => handleChange("third", "frameNumber", e.target.value)} type='text'
                      className='border border-r-0 text-center w-[20%] rounded-l-xl aspect-square'></input>
                      <input value={predictions.third.horseName} onChange={(e) => handleChange("third", "horseName", e.target.value)} type='text'
                      className='border rounded-r-xl p-2'></input>
                      </div>
                    </li>
                  </ul>
              </div>
                {/* メモ */}
            <div>
              <ul>
                <li>予想メモ</li>
                <li>回顧メモ</li>
              </ul>
              {/* 予想メモ */}
              <div>
                <label id='preMemo'>予想メモ</label>
                <input></input>
              </div>
              {/* 回願メモ */}
              <div>
                <label id='recoMemo'>反省メモ</label>
                <input></input>
              </div>
            </div>
            {/* ボタン */}
            <div>
              <Button
                variant='green'
                type='submit'
                size='mid'
              >
                保存
              </Button>
              <Button
                isLink='true'
                variant='gray'
                size='mid'
                href='/'
              >
                一覧に戻る
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div>読み込み中</div>
      )}
    </div>
  );
}
