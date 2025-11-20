'use client';
import { useEffect, use, useState } from 'react';

export default function RacePage({ params }) {
  const [raceData,setRaceData] = useState('')
  const param = use(params)

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('races')); // ローカルストレージからレースを取得
    const selectedRace = saved.find((r) => r.id === param.id);
    setRaceData(selectedRace);
  },[]);


  return (
    <div className='w-2xl p-6'>
      {/* レース概要 */}
      <div>
        <ul>
          <li>{raceData.venue}<span>{raceData.raceNumber}R</span></li>
          <li>{raceData.field}：{raceData.distance}m【{raceData.surface}】</li>
          <li>天気：{raceData.weather}</li>
          <li></li>
        </ul>
        <ul>
          <li>作成日：{raceData.createdAt}</li>
          <li>更新日：{raceData.editedAt}</li>
        </ul>
      </div>

      {/* 将来モデルを置く場所 */}
      <div className='w-full h-[540px] border border-gray-100 rounded-xl'>
        <div className='w-full h-full flex justify-center items-center'>モデルが入る</div>
      </div>

      {/* 順位 */}
      <div>
        <h2>馬券内予想順位</h2>
        <ul>
          <li>
            <label id='first'>1位</label>
            <input></input>
          </li>
          <li>
            <label id='second'>2位</label>
            <input></input>
          </li>
          <li>
            <label id='third'>3位</label>
            <input></input>
          </li>
        </ul>
      </div>

      {/* メモ */}
      <div>
        <ul>
          <li>
            予想メモ
          </li>
          <li>
            回顧メモ
          </li>
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
    </div>
  );
}
