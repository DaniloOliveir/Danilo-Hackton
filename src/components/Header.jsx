import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>📚</span>
          <h1 className={styles.title}>DocHub</h1>
          <span className={styles.subtitle}>Documentações da Organização</span>
        </div>
      </div>
    </header>
  );
}
