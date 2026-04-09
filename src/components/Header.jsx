import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo} aria-hidden="true">
            DH
          </span>
          <div className={styles.texts}>
            <h1 className={styles.title}>DocHub</h1>
            <span className={styles.subtitle}>Hub de projetos e documentacoes internas</span>
          </div>
        </div>
      </div>
    </header>
  );
}
