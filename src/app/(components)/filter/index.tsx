const options = [
  { label: "Characters", value: "characters" },
  { label: "Students", value: "students" },
  { label: "Staff", value: "staff" },
];

export default function Filter() {
  return (
    <div className="flex border-y-1 border-gray-200 py-3 px-6">
      <label className="text-blue-500 mr-1">Filter:</label>
      <select className="text-amber-400" id="filter" name="filter">
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
