import { useState } from 'react';
import * as React from 'react' 
import { Checkbox, Button ,Text, Input,ListItem,Box,List  } from "@chakra-ui/react"

function App() {
  const [ inputValue, setInputValue ] = useState("");
  const [ todos, setTodos ] = useState<Todo[]>([]); //stateの中にはTodoの配列しか入れない

  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo: Todo = {
      inputValue: inputValue,
      id: todos.length,
      checked: false,
    };
    setTodos([newTodo, ...todos]);
    // setInputValue("");
  };

  const handleEdit = (id: number, inputValue: string) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo;
    })
    setTodos(newTodos);
  };

  const handleChecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === id) {
        todo.checked = !checked; //!反転
      }
      return todo;
    })
    setTodos(newTodos);
  };

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <>
      <Box maxWidth={"50%"} textAlign="center" margin="0px auto" marginTop="150px">
        <Text fontSize='3em' marginBottom={"50px"}>ToDoリスト</Text>
        <form style={{marginBottom:"30px"}} onSubmit={(e)  => handleSubmit(e)}>
          <Input style={{marginBottom:"20px"}} type="text" onChange={(e) => handleChange(e)}  />
          <Input type="submit" value="作成" width={"5rem"}/>
        </form>
        
        <List >
          {todos.map((todo) => (
            <ListItem key={todo.id} >
              <Input 
                width={"40em"}
                marginBottom={"15px"}
                onChange={(e) => handleEdit(todo.id, e.target.value)} 
                value={todo.inputValue}
                disabled={todo.checked}
              />
              <Checkbox 
                iconSize='2rem' paddingRight="20px" paddingLeft="20px"
                onChange={(e) => handleChecked(todo.id, todo.checked)}/>
                <Button colorScheme="blue" onClick={() => handleDelete(todo.id)}>削除</Button>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
}

export default App;
