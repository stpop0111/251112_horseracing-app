import PredictionsForm from './PredictionsForm';
import Button from './common/Button';

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
  return (
    <div key={prediction.id} className='border-2 bg-amber-50 border-amber-200 rounded-xl p-4'>
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

      {/* 編集モーダルの表示 
        ------------------------------*/}
      {editingID === prediction.id && (
        <div
          className='h-screen w-screen fixed top-0 left-0 flex justify-center items-center bg-black/30'
          onClick={onCancelEdit}
        >
          <div className='bg-white w-xl p-6 rounded-xl' onClick={(e) => e.stopPropagation()}>
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
                  <Button variant='red' size='full' onClick={() => {onDelete(prediction)}} className='py-4'>
                    削除
                  </Button>
                </div>
              </form>
            )}

            <button
              type='button'
              onClick={onCancelEdit}
              className='block w-full cursor-pointer bg-gray-200 text-gray-900 rounded-full py-4 font-bold hover:bg-gray-900 hover:text-gray-200 duration-200'
            >
              キャンセル
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
