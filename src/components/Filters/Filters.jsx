import { useEffect, useRef, useState } from "react";

import css from "./Filters.module.css";

const languages = [
  "English",
  "French",
  "German",
  "Spanish",
  "Italian",
  "Ukrainian",
  "Polish",
  "Korean",
  "Mandarin Chinese",
  "Vietnamese",
];

const levels = [
  "A1 Beginner",
  "A2 Elementary",
  "B1 Intermediate",
  "B2 Upper-Intermediate",
  "C1 Advanced",
  "C2 Proficient",
];

const prices = [10, 20, 25, 30, 35, 40];

function FilterSelect({
  label,
  value,
  options,
  placeholder,
  onChange,
  formatOption = (option) => option,
  isCompact = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const hasValue = value !== "";
  const selectedLabel = hasValue ? formatOption(value) : placeholder;

  return (
    <div
      ref={rootRef}
      className={`${css.field} ${isCompact ? css.compactField : ""}`}
    >
      <span className={css.label}>{label}</span>

      <button
        className={`${css.trigger} ${!hasValue ? css.placeholder : ""}`}
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={css.triggerText}>{selectedLabel}</span>
        <span
          className={`${css.chevron} ${isOpen ? css.chevronOpen : ""}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <ul className={css.options} role="listbox" aria-label={label}>
          {options.map((option) => {
            const optionValue = String(option);
            const isSelected = String(value) === optionValue;

            return (
              <li key={optionValue} role="presentation">
                <button
                  className={`${css.option} ${
                    isSelected ? css.selectedOption : ""
                  }`}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(optionValue);
                    setIsOpen(false);
                  }}
                >
                  {formatOption(option)}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function Filters({ filters, onChange, onReset }) {
  const hasFilters = Object.values(filters).some(Boolean);

  return (
    <section className={css.filters} aria-label="Teacher filters">
      <FilterSelect
        label="Languages"
        value={filters.language}
        options={languages}
        placeholder="Language"
        onChange={(value) => onChange("language", value)}
      />

      <FilterSelect
        label="Level of knowledge"
        value={filters.level}
        options={levels}
        placeholder="Level"
        onChange={(value) => onChange("level", value)}
      />

      <FilterSelect
        label="Price"
        value={filters.price}
        options={prices}
        placeholder="Price"
        formatOption={(price) => `${price} $`}
        onChange={(value) => onChange("price", value)}
        isCompact
      />

      {hasFilters && (
        <button className={css.resetButton} type="button" onClick={onReset}>
          Clear filters
        </button>
      )}
    </section>
  );
}

export default Filters;
