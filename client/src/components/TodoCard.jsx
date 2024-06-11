import React from "react";
import { Box, Button, Card, IconButton, useMediaQuery } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import DeleteIcon from "@mui/icons-material/Delete";

const TodoCard = ({ todos = [], updateTodo, deleteTodo }) => {
  const mobileScreen = useMediaQuery("(max-width:600px)");
  return (
    <>
      {!!todos.length ? (
        todos.map((todo, index) => {
          return (
            <Card
              key={index}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
                padding: "1rem",
                minWidth: mobileScreen ? "80%" : "50%",
                marginTop: "1rem",
              }}
            >
              <Box sx={{ flexBasis: "60%", textTransform: "capitalize" }}>
                {todo?.status ? (
                  <strike style={{ color: "red" }}>{todo.todo}</strike>
                ) : (
                  <>{todo.todo}</>
                )}
              </Box>
              <Box
                sx={{
                  flexBasis: "10%",
                  cursor: "pointer",
                  color: "blue",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => updateTodo(todo._id, todo.status)}
              >
                {todo?.status ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
              </Box>
              <DeleteIcon
                onClick={() => deleteTodo(todo._id)}
                sx={{
                  flexBasis: "10%",
                  cursor: "pointer",
                  color: "red",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            </Card>
          );
        })
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Add Some Todos
        </div>
      )}
    </>
  );
};

export default TodoCard;
