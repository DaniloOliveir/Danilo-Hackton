import { useState, useMemo } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import TagFilter from "./components/TagFilter";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import AddProjectModal from "./components/AddProjectModal";
import { mockProjects } from "./data/mockProjects";
import styles from "./App.module.css";

export default function App() {
  const [projects, setProjects] = useState(mockProjects);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const tags = useMemo(
    () => [...new Set(projects.flatMap((p) => p.tags))],
    [projects]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return projects.filter((p) => {
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.summary.toLowerCase().includes(q);
      const matchesTag = !selectedTag || p.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [projects, search, selectedTag]);

  function handleTagToggle(tag) {
    setSelectedTag((prev) => (prev === tag ? null : tag));
  }

  function handleAddProject(project) {
    setProjects((prev) => [project, ...prev]);
  }

  return (
    <div className={styles.app}>
      <Header />

      <main className={styles.main}>
        <div className={styles.controls}>
          <div className={styles.searchRow}>
            <SearchBar value={search} onChange={setSearch} />
            <button
              className={styles.addBtn}
              onClick={() => setShowAddModal(true)}
            >
              <span aria-hidden="true">+</span>
              Novo Projeto
            </button>
          </div>

          {tags.length > 0 && (
            <TagFilter
              tags={tags}
              selected={selectedTag}
              onToggle={handleTagToggle}
            />
          )}
        </div>

        <div className={styles.resultsBar}>
          <span className={styles.count}>
            {filtered.length}{" "}
            {filtered.length === 1 ? "projeto encontrado" : "projetos encontrados"}
          </span>
          {(search || selectedTag) && (
            <button
              className={styles.clearFilters}
              onClick={() => {
                setSearch("");
                setSelectedTag(null);
              }}
            >
              Limpar filtros
            </button>
          )}
        </div>

        {filtered.length > 0 ? (
          <div className={styles.grid}>
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setActiveProject(project)}
              />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <span className={styles.emptyIcon} aria-hidden="true">○</span>
            <p className={styles.emptyTitle}>Nenhum projeto encontrado</p>
            <p className={styles.emptySubtitle}>
              Tente ajustar os filtros ou cadastrar um novo projeto.
            </p>
          </div>
        )}
      </main>

      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}

      {showAddModal && (
        <AddProjectModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddProject}
        />
      )}
    </div>
  );
}
