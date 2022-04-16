import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SingleTodo({ Todo, Todos, setTodos }) {
  const [edit, setEdit] = useState(false);
  const [editedTodo, setEditedTodo] = useState(Todo.text);

  const handleTodoDelete = () => {
    setTodos(Todos.filter((todo) => todo.id !== Todo.id));
    AsyncStorage.setItem("todos", JSON.stringify(Todos));
  };
  const handleTodoEdit = () => {
    if (!edit) setEdit(!edit);
    else {
      setEdit(!edit);
      setTodos(
        Todos.map((todo) =>
          todo.id === Todo.id ? { id: Todo.id, text: editedTodo } : todo
        )
      );
      AsyncStorage.setItem("todos", JSON.stringify(Todos));
    }
  };

  useEffect(() => {
    AsyncStorage.setItem("todos", JSON.stringify(Todos));
  }, [Todos]);

  return (
    <View style={styles.todo}>
      {edit ? (
        <TextInput
          value={editedTodo}
          style={styles.edit_todo}
          onChangeText={(e) => setEditedTodo(e)}
        />
      ) : (
        <Text style={styles.todo_text}>{Todo.text}</Text>
      )}

      <View style={styles.actions}>
        {edit ? (
          <TouchableOpacity onPress={handleTodoEdit}>
            <MaterialIcons
              name="save"
              size={25}
              color="white"
              style={styles.edit_action}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleTodoEdit}>
            <MaterialIcons
              name="edit"
              size={25}
              color="white"
              style={styles.edit_action}
            />
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={handleTodoDelete}>
          <MaterialIcons
            name="delete"
            size={25}
            color="white"
            style={styles.delete_action}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  todo: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#0094ff",
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  todo_text: {
    color: "#fff",
  },
  edit_todo: {
    backgroundColor: "#fff",
    width: "70%",
    height: 30,
    borderRadius: 10,
    paddingLeft: 10,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  edit_action: {
    marginHorizontal: 10,
  },
  delete_action: {
    marginHorizontal: 10,
  },
});
