export default function PredictionsForm({
  raceName,
  setRaceName,
  horseName,
  setHorseName,
  rank,
  setRank,
  editingID,
}) {
  return (
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
  );
}
