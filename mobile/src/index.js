import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Text,
  StyleSheet,
  StatusBar,
} from "react-native";

import api from "./services/api";

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("projects").then((response) => {
      setProjects(response.data);
      console.log(response.data);
    });
  }, []);

  async function handleAddProject() {
    const response = await api.post("projects", {
      title: `Novo projeto ${Date.now()}`,
      owner: "Bruno",
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <StatusBar backgroundColor="#7159c1" />

      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.title}
          data={projects}
          keyExtractor={(project) => project.id}
          renderItem={({ item: project }) => (
            <Text style={styles.title}>{project.title}</Text>
          )}
        />
        {/* <View>
          {projects.map((project) => (
            <Text key={project.id} style={styles.title}>
              {project.title}
            </Text>
          ))}
        </View> */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={handleAddProject}
        >
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  title: {
    fontSize: 32,
    color: "#FFF",
  },
  button: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    margin: 20,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
