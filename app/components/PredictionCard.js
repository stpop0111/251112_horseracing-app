import PredictionsForm from './PredictionsForm';

export default function PredictionCard({ 
  prediction, 
  editingID, 
  onEdit, 
  onDelete,
  onCancelEdit,
  handleSubmit
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
        <div className='flex gap-2 w-[30%]'>
          {editingID === prediction.id ? (
            <button className='block w-full rounded-lg py-2 font-bold bg-gray-900 text-gray-200'>編集中</button>
          ) : (
            <button
              onClick={() => {
                onEdit(prediction);
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
                  <button
                    type='submit'
                    className='block w-full cursor-pointer bg-orange-200 text-orange-900 rounded-lg py-4 font-bold hover:bg-orange-900 hover:text-orange-200 duration-200'
                  >
                    編集
                  </button>
                  <button
                    type='button'
                    onClick={() => {
                      onDelete(prediction);
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
