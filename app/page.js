'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [ raceName, setRaceName ] = useState('');
  const [ horseName, setHorseName ]= useState('');
  const [ rank, setRank ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('レース名：', raceName, '馬の名前：', horseName, '予想順位：', rank);
  };

  return (
    <div>
      <h1>競馬予想メモ</h1>
      <form onSubmit={handleSubmit} className='flex'>
        <div>
          <label htmlFor=''>レース名：</label>
          <input value={raceName} onChange={(e) => setRaceName(e.target.value)} type='text' className='border-2' />
        </div>

        <div>
          <label htmlFor=''>馬の名前：</label>
          <input value={horseName} onChange={(e) => setHorseName(e.target.value)} type='text' className='border-2' />
        </div>

        <div>
          <label htmlFor=''>予想順位：</label>
          <input value={rank} onChange={(e) => setRank(e.target.value)} type='text' className='border-2' />
        </div>

        <button type='submit'>登録</button>
      </form>
    </div>
  );
}
