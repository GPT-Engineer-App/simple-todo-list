// Simple To-Do List Application using Chakra UI and React Icons
import { useState } from "react";
import { Box, Input, Button, List, ListItem, ListIcon, IconButton, Heading, VStack } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaCheck } from "react-icons/fa";

import { Progress } from "@chakra-ui/react";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const completedCount = tasks.filter((task) => task.completed).length;
  const totalCount = tasks.length;
  const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const handleAddTask = () => {
    if (input.trim() !== "") {
      setTasks([...tasks, { description: input, completed: false }]);
      setInput("");
    }
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleCompleteTask = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <VStack p={8}>
      <Heading mb={6}>To-Do List</Heading>
      <Box display="flex" mb={4}>
        <Input placeholder="Add a new task" value={input} onChange={handleInputChange} onKeyPress={handleKeyPress} />
        <Button leftIcon={<FaPlus />} ml={2} onClick={handleAddTask} colorScheme="blue">
          Add
        </Button>
      </Box>
      {totalCount > 0 && completedCount !== totalCount && <Progress value={completionPercentage} size="sm" colorScheme="green" width="100%" mb={4} />}
      <List spacing={3} width="100%">
        {tasks.map((task, index) => (
          <ListItem key={index} display="flex" justifyContent="space-between" alignItems="center">
            <Box as={task.completed ? "s" : "span"}>{task.description}</Box>
            <IconButton icon={<FaTrash />} aria-label="Delete task" colorScheme="red" onClick={() => handleDeleteTask(index)} />
            <IconButton icon={<FaCheck />} aria-label="Complete task" colorScheme="green" onClick={() => handleCompleteTask(index)} />
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};

export default Index;
