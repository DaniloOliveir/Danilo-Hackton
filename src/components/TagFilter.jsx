import styles from "./TagFilter.module.css";

export default function TagFilter({ tags, selected, onToggle }) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Filtrar:</span>
      <div className={styles.tags}>
        {tags.map((tag) => (
          <button
            key={tag}
            className={`${styles.tag} ${selected === tag ? styles.active : ""}`}
            onClick={() => onToggle(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
