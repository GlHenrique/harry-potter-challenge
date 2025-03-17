import type { Dispatch, SetStateAction } from "react";

import type { Options } from "../HomeContent/types";

type FilterProps = {
  options: Options[];
  optionValue: string;
  setValue: Dispatch<SetStateAction<string>>;
};

export default function Filter({
  options,
  setValue,
  optionValue,
}: FilterProps) {
  return (
    <div className="flex border-y-1 border-gray-200 py-3 px-6">
      <label className="max-sm:text-sm mr-1">Filter:</label>
      <select
        className="max-sm:text-sm text-amber-400"
        id="filter"
        name="filter"
        onChange={(e) => setValue(e.target.value)}
        value={optionValue}
      >
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
