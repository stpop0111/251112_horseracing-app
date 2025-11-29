import Button from "./common/Button";
import { raceOptions } from "../data/raceOptions";
import Cross from "./icons/Cross";

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
      <div className="flex justify-between gap-10">
        {/* 絞り込みフォーム */}
        <div className="flex gap-2">
          {selectorOptions.map((selector) => (
            <div>
              {selector.label}
              <select
                key={selector.label}
                value={selector.value}
                onChange={(e) => selector.onChange(e.target.value)}
                className="outline-none border rounded-lg p-2"
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
        <Button variant="orange" size="full" onClick={handleFilter}>
          検索する
        </Button>
      </div>

      {/* 絞り込み表示カード */}
      {filtered && (
        <div className="flex gap-4">
          {filterCards.map(
            (filterCard) =>
              filterCard.value && (
                <div
                  key={filterCard.value}
                  className="inline-flex items-center gap-4 rounded-full border px-4 py-2 hover:bg-gray-900 hover:text-gray-50 cursor-pointer transition-colors"
                                      onClick={() => {
                      filterCard.onReset();
                      setFiltered(false);
                    }}
                >
                  {filterCard.value}
                  {filterCard.suffix}
                  <div
                    className="h-8 p-2"
                  >
                    <Cross/>
                  </div>
                </div>
              ),
          )}
        </div>
      )}
    </div>
  );
}
