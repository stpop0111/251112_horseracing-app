import Button from "./common/Button"
import { raceOptions } from "../data/raceOptions"
import { selector } from "gsap"

export default function FilterComponent ({
  filterdRace,
  handleFilter
}) {

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
    }
  ]
  return (
    <div className="mb-4">
      <div className="flex justify-between gap-10">
        <div className="flex gap-2">
          {selectorOptions.map((selector) => (
            <select key={selector.label} value={selector.value} onChange={(e) => selector.onChange(e.target.value)}>
              <option>選択してください</option>
              {selector.options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ))}
        </div>
        <Button
          variant="orange"
          size="full"
          onClick={handleFilter}
        >
          検索する
        </Button>
      </div>
    </div>
  )
}