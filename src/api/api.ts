import {todo} from "../types";

const api = {
  todos: {
    list: (): todo[] => {
      try {
        return JSON.parse(
          localStorage.getItem("todos") ||
            `[            {
      id: 1,
      text: "Complete online Javascript course",
      completed: true,
    },
    {
      id: 2,
      text: "Jog around the park 3x",
      completed: false,
    },
    {
      id: 3,
      text: "10 minutes meditation",
      completed: false,
    },
    {
      id: 4,
      text: "Read for 1 hour",
      completed: false,
    },
    {
      id: 5,
      text: "Pick up groceries",
      completed: false,
    },
    {
      id: 6,
      text: "Complete Todo App on Frontend Mentor",
      completed: false,
    },]`,
        );
      } catch (error) {
        return [
          {
            id: 1,
            text: "Complete online Javascript course",
            completed: true,
          },
          {
            id: 2,
            text: "Jog around the park 3x",
            completed: false,
          },
          {
            id: 3,
            text: "10 minutes meditation",
            completed: false,
          },
          {
            id: 4,
            text: "Read for 1 hour",
            completed: false,
          },
          {
            id: 5,
            text: "Pick up groceries",
            completed: false,
          },
          {
            id: 6,
            text: "Complete Todo App on Frontend Mentor",
            completed: false,
          },
        ];
      }
    },
    set: (todos: todo[]) => localStorage.setItem("todos", JSON.stringify(todos)),
  },
};

export default api;
