import PredictionsForm from './PredictionsForm';
import Button from './common/Button';

import gsap from 'gsap';
import { useRef, useEffect } from 'react';

export default function PredictionCard({
  prediction,
  editingID,
  onEdit,
  onDelete,
  onCancelEdit,
  handleSubmit,
  raceName,
  setRaceName,
  horseName,
  setHorseName,
  rank,
  setRank,
}) {
  // 新しい予想の追加アニメーション
  const cardRef = useRef(null);

  useEffect(() => {
    if (prediction.isNew) {
      gsap.fromTo(
        cardRef.current,
        {
          x: -100,
        },
        {
          x: 0,
          duration: 1.6,
          ease: "elastic.out(1,0.3)"
          onComplete: () => {
            prediction.isNew = false
          }
        }
      );
    }
  }, []);

  // モーダル表示の出現アニメーション
  const modalRef = useRef(null);

  useEffect(() => {
    if (editingID === prediction.id) {
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
    }
  },[editingID, prediction.id]);

  return (
    <div key={prediction.id} className='border-2 bg-amber-50 border-amber-200 rounded-xl p-4'>
      <div ref={cardRef}>
        <div className='flex justify-between'>
          <div className='flex flex-col gap-1'>
            <h3 className='font-semibold'>
              レース名：<span className='font-normal'>{prediction.raceName}</span>
            </h3>
            <p className='font-semibold'>
              馬名：<span className='font-normal'>{prediction.horseName}</span>
            </p>
            <p className='font-semibold'>
              順位：<span className='font-normal'>{prediction.rank}</span>
            </p>
          </div>
          <div className='flex w-[30%]'>
            <Button variant='gray' size='full' onClick={() => onEdit(prediction)}>
              編集モード
            </Button>
          </div>
        </div>
        <hr className='my-4 border-0.5 border-amber-400' />
        <div>
          <p className='text-gray-800 text-sm'>作成日：{prediction.createdAt}</p>
          {prediction.editedAt && <p className='text-gray-800 text-sm'>最終更新日：{prediction.editedAt}</p>}
        </div>
      </div>

      {/* 編集モーダルの表示 
        ------------------------------*/}
      {editingID === prediction.id && (
        <div
          className='h-screen w-screen fixed top-0 left-0 flex justify-center items-center bg-black/30 z-99'
          onClick={onCancelEdit}
        >
          <div className='bg-white w-xl p-6 rounded-xl' onClick={(e) => e.stopPropagation()} ref={modalRef}>
            {editingID === prediction.id && (
              <form onSubmit={handleSubmit}>
                <h2 className='text-xl mb-2 font-bold'>編集する予想</h2>
                <PredictionsForm
                  raceName={raceName}
                  setRaceName={setRaceName}
                  horseName={horseName}
                  setHorseName={setHorseName}
                  rank={rank}
                  setRank={setRank}
                  editingID={editingID}
                />
                <div className='flex gap-2 w-full mb-6'>
                  <Button variant='orange' size='full' type={'submit'}>
                    編集モード
                  </Button>
                  <Button
                    variant='red'
                    size='full'
                    onClick={() => {
                      onDelete(prediction);
                    }}
                    className='py-4'
                  >
                    削除
                  </Button>
                </div>
              </form>
            )}

            <Button variant='gray' size='full' onClick={onCancelEdit} className='py-4'>
              キャンセル
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
