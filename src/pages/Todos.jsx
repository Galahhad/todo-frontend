import { useDispatch, useSelector } from "react-redux";
import styles from "../components/Main/Main.module.css";
import TodoItem from "./TodoItem";
import { useEffect } from "react";
import { fetchTodos } from "../features/todos/todoSlice";

const Todos = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const todosLoader = useSelector((state) => state.todosLoader);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (todosLoader) {
    return (
      <div className={styles['line-wobble']}></div>
    )
  }

  return (
    <div className={styles.todos_wrapper}>
      {todos.map((item, index) => {
        return <TodoItem item={item} key={item._id} dispatch={dispatch} />;
      })}
    </div>
  );
};

export default Todos;
