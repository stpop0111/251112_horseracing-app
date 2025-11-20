'use client';

import PredictionsForm from './PredictionsForm';
import Button from './common/Button';

import gsap from 'gsap';
import { useRef, useEffect } from 'react';

export default function PredictionCard({
  race
}) {
  // 新しい予想の追加アニメーション
  const cardRef = useRef(null);

  useEffect(() => {
    if (race.isNew) {
      gsap.fromTo(
        cardRef.current,
        {
          x: -100,
        },
        {
          x: 0,
          duration: 1.6,
          ease: "elastic.out(1,0.3)"
        }
      );
    }
  }, []);

  // モーダル表示の出現アニメーション
  const modalRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      modalRef.current,
      {
        scale: 0.5,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "power4.out",
      }
    );
  },[race.id]);

  return (
    <div key={race.id}>
      <div className='border-2 bg-amber-50 border-amber-200 rounded-xl p-4' ref={cardRef}>
        <div className='flex justify-between'>
          <div className='flex flex-col gap-1'>
            <h3 className='font-semibold'>
              レース会場：<span className='font-normal'>{race.venue} </span>
            </h3>
            <p className='font-semibold'>
              馬名：<span className='font-normal'>{race.horseName}</span>
            </p>
            <p className='font-semibold'>
              順位：<span className='font-normal'>{race.rank}</span>
            </p>
          </div>
        </div>
        <hr className='my-4 border-0.5 border-amber-400' />
        <div>
          <p className='text-gray-800 text-sm'>作成日：{race.createdAt}</p>
          {race.editedAt && <p className='text-gray-800 text-sm'>最終更新日：{race.editedAt}</p>}
        </div>
      </div>
    </div>
  );
}
