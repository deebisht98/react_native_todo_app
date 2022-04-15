import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import SingleTodo from "./components/SingleTodo";

export default function App() {
  const [todo, setTodo] = useState("");
  const [Todos, setTodos] = useState([]);

  const handleAddTodo = () => {
    if (!todo) return;
    setTodos([...Todos, { id: Date.now(), text: todo }]);
    setTodo("");
  };
  const fetchTodos = async () => {
    const data = await AsyncStorage.getItem("todos");
    if (data) setTodos(JSON.parse(data));
  };
  useEffect(() => {
    fetchTodos();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.app_heading}>TASKER</Text>
      <View style={styles.todo_container}>
        <TextInput
          placeholder="Enter a todo"
          value={todo}
          style={styles.input}
          onChangeText={(e) => setTodo(e)}
        />
        <TouchableOpacity
          activeOpacity={0.3}
          style={styles.add}
          onPress={handleAddTodo}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Add</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "100%",
        }}
      >
        <FlatList
          style={styles.all_todos}
          data={Todos}
          renderItem={({ item }) => (
            <SingleTodo Todo={item} Todos={Todos} setTodos={setTodos} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#121212",
    alignItems: "center",
    textTransform: "uppercase",
    fontFamily: "Roboto",
  },
  app_heading: {
    marginTop: 50,
    fontSize: 50,
    fontWeight: "700",
    color: "#fff",
  },
  todo_container: {
    marginTop: 30,
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    width: "60%",
    color: "#000",
    borderRadius: 10,
  },
  add: {
    marginLeft: 10,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "center",
    width: "15%",
    backgroundColor: "#0094ff",
    borderRadius: 10,
  },
  all_todos: {
    flexDirection: "column",
    width: "100%",
    paddingHorizontal: 20,
  },
});
