import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./App.css";

import Header from "./components/Header";

function App() {
  const [projects, setProjects] = useState(["Desenvolvimento web", "mobile"]);

  useEffect(() => {
    api.get("projects").then((response) => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject() {
    const response = await api.post("projects", {
      title: `Novo projeto ${Date.now()}`,
      owner: "Souto",
    });

    const project = response.data;

    setProjects([...projects, project]);
  }
  return (
    <Header title="Gostack">
      <ul>
        {projects.map((project, index) => (
          <li key={index}>{project.id}</li>
        ))}
      </ul>
      <button type="button" onClick={handleAddProject}>
        Adicionar Projeto
      </button>
    </Header>
  );
}

export default App;
