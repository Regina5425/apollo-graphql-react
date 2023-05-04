import { useState } from "react";
import { Button, FormControl, Input } from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { ADD_TODO, ALL_TODOS } from "../apollo/todos";

const AddTodo = () => {
  const [addTodo, { error }] = useMutation(ADD_TODO, {
    // refetchQueries: [
    //   {
    //     query: ALL_TODOS,
    //   },
    // ],
    update(cache, { data: { newTodo } }) {
      const { todos } = cache.readQuery({ query: ALL_TODOS });

      cache.writeQuery({
        query: ALL_TODOS,
        data: {
          todos: [newTodo, ...todos],
        },
      });
    },
  });
  const [text, setText] = useState("");

  const handleAddTodo = () => {
    if (text.trim().length) {
      addTodo({
        variables: {
          title: text,
          userId: 123,
          completed: false,
        },
      });
      setText("");
    }
  };

  const handleKey = (event) => {
    if (event.key === "Enter") handleAddTodo();
  };

  if (error) {
    return <h2>Error...</h2>;
  }

  return (
    <FormControl display={"flex"} mt={6}>
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKey}
      />
      <Button onClick={handleAddTodo}>Add todo</Button>
    </FormControl>
  );
};

export default AddTodo;
