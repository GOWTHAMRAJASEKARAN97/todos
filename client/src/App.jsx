import React, { useEffect, useState } from "react";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import { Box, Grid, IconButton, TextField, useMediaQuery } from "@mui/material";
import TodoCard from "./components/TodoCard";
import Alert from "./components/Alert";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const mobileScreen = useMediaQuery("(max-width:600px)");

  const addTodo = async () => {
    if (!newTodo) {
      setOpenAlert(true);
      setAlertMessage(`Enter a todo to add!`);
      return;
    }
    if (
      todos.some((todo) => todo.todo?.toLowerCase() === newTodo?.toLowerCase())
    ) {
      setOpenAlert(true);
      setAlertMessage(`Enter a different todo to add!`);
      return;
    }
    try {
      const res = await axios.post("/api/todos", { todo: newTodo });
      if (res.status === 201) {
        setOpenAlert(true);
        setAlertMessage(`${newTodo} was added!`);
        setNewTodo("");
        setTodos([...todos, res.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodo = async (id, status) => {
    try {
      const res = await axios.put(`/api/todos/${id}`, { status });
      if (res.status === 200) {
        const selectedTodo = todos.find((todo) => todo._id === id);
        setOpenAlert(true);
        setAlertMessage(`${selectedTodo.todo} was updated!`);
        setTodos(
          todos.map((todo) =>
            todo._id === id ? { ...todo, status: !status } : todo
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await axios.delete(`/api/todos/${id}`);
      if (res.status === 200) {
        const selectedTodo = todos.find((todo) => todo._id === id);
        setOpenAlert(true);
        setAlertMessage(`${selectedTodo.todo} was deleted!`);
        setTodos(todos.filter((todo) => todo._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await fetch("/api/todos");
        const todos = await res.json();
        setTodos(todos);
      } catch (error) {
        console.log(error);
      }
    };
    getTodos();
  }, []);

  return (
    <Grid
      container
      spacing={3}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Grid item xs={12}>
        <Box
          sx={{
            fontSize: mobileScreen ? "2rem" : "3rem",
            textAlign: "center",
            marginTop: "1rem",
          }}
        >
          Todo List
        </Box>
      </Grid>

      <Grid
        item
        xs={10}
        sm={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <TextField
          type="text"
          value={newTodo || ""}
          placeholder="Enter todo"
          onChange={(e) => setNewTodo(e.target.value)}
          size="small"
          fullWidth
        />
        <IconButton
          onClick={addTodo}
          sx={{
            backgroundColor: "limegreen",
            border: "1px solid green",
          }}
        >
          <AddIcon />
        </IconButton>
      </Grid>

      <Grid
        item
        xs={10}
        sm={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box
          sx={{
            maxHeight: mobileScreen ? "450px" : "600px",
            width: "100%",
            overflowY: "auto",
            border: "1px solid gray",
            backgroundColor: "grey",
            borderRadius: "4px",
            padding: "1rem",
          }}
        >
          <TodoCard
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
            todos={todos}
          />
        </Box>
      </Grid>
      <Alert
        vertical={mobileScreen ? "bottom" : "top"}
        horizontal={"right"}
        message={alertMessage}
        open={openAlert}
        handleClose={() => setOpenAlert(false)}
      />
    </Grid>
  );
};

export default App;
