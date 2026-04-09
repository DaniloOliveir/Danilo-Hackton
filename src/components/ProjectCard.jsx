import styles from "./ProjectCard.module.css";

const techColors = {
  "Node.js": "#3c873a",
  "React": "#61dafb",
  "React Native": "#61dafb",
  "TypeScript": "#3178c6",
  "Python": "#3572A5",
  "Go": "#00acd7",
  "Vue.js": "#41b883",
  "Java": "#b07219",
  "Docker": "#2496ed",
  "PostgreSQL": "#336791",
  "MongoDB": "#4db33d",
  "Redis": "#d82c20",
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

export default function ProjectCard({ project, onClick }) {
  return (
    <article className={styles.card} onClick={onClick} tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      role="button"
      aria-label={`Ver detalhes de ${project.name}`}
    >
      <div className={styles.top}>
        <div className={styles.repoIcon}>📁</div>
        <div className={styles.meta}>
          <h2 className={styles.name}>{project.name}</h2>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.repoUrl}
            onClick={(e) => e.stopPropagation()}
          >
            {project.repoUrl.replace("https://", "")}
          </a>
        </div>
      </div>

      <p className={styles.summary}>{project.summary}</p>

      <div className={styles.section}>
        <span className={styles.sectionLabel}>Tecnologias</span>
        <div className={styles.techs}>
          {project.technologies.map((tech) => (
            <span key={tech} className={styles.techBadge} style={techBadgeStyle(tech)}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>#{tag}</span>
          ))}
        </div>
      </div>

      <div className={styles.footer}>
        <span className={styles.readmeLink}>Ver README completo →</span>
      </div>
    </article>
  );
}
