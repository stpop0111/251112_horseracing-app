import Button from "./common/Button"
import { raceOptions } from "../data/raceOptions"
import { selector } from "gsap"

export default function FilterComponent ({
  filterdRace,
  handleFiltered
}) {

  const selectorOptions = [
    {
      label: "会場",
      options: raceOptions.venue,
    },
    {
      label: "馬場",
      options: raceOptions.field,
    },
    {
      label: "距離",
      options: raceOptions.distance[filterdRace.filteredField] || [],
    }
  ]
  return (
    <div className="mb-4">
      <div className="flex justify-between gap-10">
        <div className="flex gap-2">
          {selectorOptions.map((selectors) => (
            <select key={selectors.label}>
              <option>選択してください</option>
              {selectors.options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ))}
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