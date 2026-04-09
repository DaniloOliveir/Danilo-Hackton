import { useState } from "react";
import { mockRepoData } from "../data/mockProjects";
import styles from "./AddProjectModal.module.css";

function randomMockData() {
  return mockRepoData[Math.floor(Math.random() * mockRepoData.length)];
}

function extractNameFromUrl(url) {
  try {
    const parts = url.replace(/\/$/, "").split("/");
    return parts[parts.length - 1] || "novo-projeto";
  } catch {
    return "novo-projeto";
  }
}

export default function AddProjectModal({ onClose, onAdd }) {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!repoUrl.trim()) {
      setError("Informe o link do repositório.");
      return;
    }
    if (!repoUrl.startsWith("http")) {
      setError("Informe uma URL válida (ex: https://github.com/org/repo).");
      return;
    }
    setError("");
    setLoading(true);

    // Simulate async AI enrichment
    setTimeout(() => {
      const mock = randomMockData();
      const name = extractNameFromUrl(repoUrl);
      onAdd({
        id: Date.now(),
        name,
        repoUrl: repoUrl.trim(),
        summary: mock.summary,
        tags: mock.tags,
        technologies: mock.technologies,
        readme: mock.readme.replace(/new-microservice|frontend-portal|analytics-service/g, name),
      });
      setLoading(false);
      onClose();
    }, 1800);
  };

  return (
    <div
      className={styles.overlay}
      onClick={(e) => !loading && e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Cadastrar Projeto</h2>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            disabled={loading}
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.body}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="repoUrl">
              Link do Repositório
            </label>
            <input
              id="repoUrl"
              type="text"
              className={styles.input}
              placeholder="https://github.com/org/repo"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              disabled={loading}
              autoFocus
            />
            {error && <span className={styles.error}>{error}</span>}
          </div>

          {loading && (
            <div className={styles.loading}>
              <div className={styles.spinner} />
              <div>
                <p className={styles.loadingTitle}>Gerando documentação...</p>
                <p className={styles.loadingSubtitle}>
                  Analisando repositório e enriquecendo informações com IA
                </p>
              </div>
            </div>
          )}

          {!loading && (
            <div className={styles.hint}>
              <span className={styles.hintIcon} aria-hidden="true">i</span>
              <p>
                O sistema irá gerar automaticamente o resumo, tags e tecnologias
                do projeto com base no repositório informado.
              </p>
            </div>
          )}

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? "Processando..." : "Cadastrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
