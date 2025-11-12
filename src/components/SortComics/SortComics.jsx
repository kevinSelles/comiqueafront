import "./SortComics.css";
import { useState } from "react";

export default function SortComics({ selectedSort, onSortChange }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Ordenar por...");

  const options = [
    { label: "Título A-Z", value: "title-asc" },
    { label: "Título Z-A", value: "title-desc" },
    { label: "Año → Descendente", value: "date-desc" },
    { label: "Año → Ascendente", value: "date-asc" },
    { label: "Autor A-Z", value: "author-asc" },
    { label: "Autor Z-A", value: "author-desc" },
    { label: "Restablecer orden", value: "" },
  ];

  const handleSelect = (option) => {
    setSelected(option.label);
    setOpen(false);
    onSortChange(option.value);
  };

  return (
    <div className="sort-dropdown">
      <button className="sort-button" onClick={() => setOpen(!open)}>
        {selected} ▼
      </button>
      {open && (
        <ul className="sort-menu">
          {options.map((option) => (
            <li
              key={option.value}
              className="sort-option"
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}