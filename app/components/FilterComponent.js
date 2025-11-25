import Button from "./common/Button"

export default function FilterComponent ({
raceInfo,
handleFiltered
}) {

  return (
    <div className="mb-4">
      <div className="flex justify-between gap-10">
        <div className="flex gap-2">
          <select name="" id="" className="border rounded-lg">
            <option value="">オプション</option>
            <option value="">オプション</option>
            <option value="">オプション</option>
          </select>
          <select name="" id="" className="border rounded-lg">
            <option value="">オプション</option>
            <option value="">オプション</option>
            <option value="">オプション</option>
          </select>
          <select name="" id="" className="border rounded-lg">
            <option value="">オプション</option>
            <option value="">オプション</option>
            <option value="">オプション</option>
          </select>
          <select name="" id="" className="border rounded-lg">
            <option value="">オプション</option>
            <option value="">オプション</option>
            <option value="">オプション</option>
          </select>
        </div>
        <Button
          variant="orange"
          size="full"
          onClick={handleFiltered}
        >
          検索する
        </Button>
      </div>
    </div>
  )
}