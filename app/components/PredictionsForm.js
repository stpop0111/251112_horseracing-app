'use client';

import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function PredictionsForm({
  raceInfo,
  editingID,
})
{
  const formInfo = [
    {
      label:"レース会場",
      value: raceInfo.venue,
      onChange: raceInfo.setVenue,
    },
    {
      label:"レース番号",
      value: raceInfo.raceNumber,
      onChange: raceInfo.setRaceNumber,
    },
    {
      label:"レース場",
      value: raceInfo.field,
      onChange: raceInfo.setField,
    },
    {
      label:"場状態",
      value: raceInfo.surface,
      onChange: raceInfo.setSurface,
    },
    {
      label:"距離",
      value: raceInfo.distance,
      onChange: raceInfo.setDistance,
    },
    {
      label:"天候",
      value: raceInfo.weather,
      onChange: raceInfo.setWeather,
    },
  ]

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
    <div className="mb-4">
      <ul className='grid grid-cols-3 gap-2' ref={formContainer}>
        {formInfo.map((item) => (
          <li key={item.label}>
            <label className='block mb-2 font-bold'>{item.label}</label>
            <input
              value={item.value}
              onChange={(e) => item.onChange(e.target.value)}
              type='text'
              className={`w-full p-2 border-2 rounded-xl outline-none ${
                editingID ? 'border-amber-500 focus:border-amber-700' : 'border-green-500 focus:border-green-700'
              }`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
