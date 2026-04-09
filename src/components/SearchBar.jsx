import styles from "./SearchBar.module.css";

export default function SearchBar({ value, onChange }) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.icon}>🔍</span>
      <input
        type="text"
        className={styles.input}
        placeholder="Buscar por nome ou tag..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          className={styles.clear}
          onClick={() => onChange("")}
          aria-label="Limpar busca"
        >
          ✕
        </button>
      )}
    </div>
  );
}
