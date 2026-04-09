import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./ProjectModal.module.css";

const techColors = {
  "Node.js": "#3c873a",
  React: "#61dafb",
  "React Native": "#61dafb",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Go: "#00acd7",
  "Vue.js": "#41b883",
  Java: "#b07219",
  Docker: "#2496ed",
  PostgreSQL: "#336791",
  MongoDB: "#4db33d",
  Redis: "#d82c20",
  "AWS S3": "#ff9900",
};

function techBadgeStyle(tech) {
  const color = techColors[tech] || "#522B5B";
  return {
    background: `${color}18`,
    color: color,
    borderColor: `${color}44`,
  };
}

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <div
      className={styles.overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={`Detalhes do projeto ${project.name}`}
    >
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div className={styles.headerLeft}>
            <span className={styles.headerIcon}>📁</span>
            <div>
              <h2 className={styles.modalTitle}>{project.name}</h2>
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.repoUrl}
              >
                {project.repoUrl}
              </a>
            </div>
          </div>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Fechar modal"
          >
            ✕
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.infoPanel}>
            <div className={styles.infoSection}>
              <h3 className={styles.infoLabel}>Resumo</h3>
              <p className={styles.summary}>{project.summary}</p>
            </div>

            <div className={styles.infoSection}>
              <h3 className={styles.infoLabel}>Tecnologias</h3>
              <div className={styles.techs}>
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className={styles.techBadge}
                    style={techBadgeStyle(tech)}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.infoSection}>
              <h3 className={styles.infoLabel}>Tags</h3>
              <div className={styles.tags}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.readmePanel}>
            <h3 className={styles.readmeTitle}>📄 README</h3>
            <div className={styles.readmeContent}>
              <ReactMarkdown>{project.readme}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
