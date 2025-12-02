import Button from "./common/Button";
import { raceOptions } from "../data/raceOptions";
import CrossIcon from "./icons/CrossIcon";
import SearchIcon from "./icons/SearchIcon";

export default function FilterComponent({ filterdRace, handleFilter, filtered, setFiltered }) {
  // 絞り込みフォームの配列
  const selectorOptions = [
    {
      label: "会場",
      value: filterdRace.filteredVenue,
      onChange: filterdRace.setFilteredVenue,
      options: raceOptions.venue,
    },
    {
      label: "馬場",
      value: filterdRace.filteredField,
      onChange: filterdRace.setFilteredField,
      options: raceOptions.field,
    },
    {
      label: "距離",
      value: filterdRace.filteredDistance,
      onChange: filterdRace.setFilteredDistance,
      options: raceOptions.distance[filterdRace.filteredField] || [],
    },
  ];

  // カード配列
  const filterCards = [
    {
      value: filterdRace.filteredVenue,
      onReset: () => filterdRace.setFilteredVenue(""),
      suffix: "",
    },
    {
      value: filterdRace.filteredField,
      onReset: () => filterdRace.setFilteredField(""),
      suffix: "",
    },
    {
      value: filterdRace.filteredDistance,
      onReset: () => filterdRace.setFilteredDistance(""),
      suffix: "m",
    },
  ];

  return (
    <div className="mb-4">
      <div>
        <div className="flex items-center justify-between gap-10 rounded-full border p-2">
          {/* 絞り込みフォーム */}
          <div className="flex w-full gap-2 divide-x divide-gray-600">
            {selectorOptions.map((selector) => (
              <div className="w-full px-2" key={selector.label}>
                <div className="text-gray-600 text-sm">{selector.label}</div>
                <select
                  value={selector.value}
                  onChange={(e) => selector.onChange(e.target.value)}
                  className="block w-full outline-none"
                >
                  <option value="">選択してください</option>
                  {selector.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <div className="h-10 cursor-pointer rounded-full bg-orange-200 p-3 text-orange-900 hover:bg-orange-900 hover:text-orange-200"
          onClick={handleFilter}
          >
            <SearchIcon />
          </div>
        </div>
      </div>

      {/* 絞り込み表示カード */}
      {filtered && (
        <div className="mt-3">
          <div className="flex gap-2">
            {filterCards.map(
              (filterCard) =>
                filterCard.value && (
                  <div
                    key={filterCard.value}
                    className="h-8 text-sm inline-flex cursor-pointer items-center gap-4 rounded-lg border px-2 py-2 transition-colors hover:bg-gray-900 hover:text-gray-50"
                    onClick={() => {
                      filterCard.onReset();
                      setFiltered(false);
                    }}
                  >
                    {filterCard.value}
                    {filterCard.suffix}
                    <div className="h-full">
                      <CrossIcon />
                    </div>
                  </div>
                ),
            )}
          </div>
        </div>
      )}
    </div>
  );
}
