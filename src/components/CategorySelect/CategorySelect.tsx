import { Dispatch, SetStateAction } from "react";
import "./CategorySelect.css";

export function CategorySelect({
  category,
  categoryData,
  categoryInput,
  setCategoryInput,
  id = "",
}: {
  category: string;
  categoryData: string[];
  categoryInput: string;
  setCategoryInput: Dispatch<SetStateAction<string>>;
  id?: string;
}) {
  return (
    <select
      value={categoryInput}
      onChange={(e) => setCategoryInput(e.target.value)}
      id={id !== "" ? id : undefined}
    >
      <option disabled value="">
        {category}
      </option>
      <option value="All">All</option>
      {categoryData.map((data) => (
        <option key={data} value={data}>
          {data}
        </option>
      ))}
    </select>
  );
}
