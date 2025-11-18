'use client';

import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function PredictionsForm({
  raceName,
  setRaceName,
  horseName,
  setHorseName,
  rank,
  setRank,
  editingID,
}) 
{
  // 入力欄のアニメーション
  const formContainer = useRef(null);
  
  useEffect(() => {
    const formItem = formContainer.current.querySelectorAll('li');
    gsap.fromTo(formItem, {
      opacity:0,
      y: 30
    },{
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power4.out"
    })
  },[])

  return (
    <ul className='flex gap-2 mb-4' ref={formContainer}>
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
  );
}
