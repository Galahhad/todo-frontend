import { useDispatch, useSelector } from "react-redux";
import styles from "../components/Main/Main.module.css";
import TodoItem from "./TodoItem";
import { useEffect } from "react";
import { fetchTodos } from "../features/todos/todoSlice";

const Favorites = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const filtered = todos.filter((item) => item.completed);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className={styles.todos_wrapper}>
      {filtered.map((item) => {
        return <TodoItem item={item} key={item._id} dispatch={dispatch} />;
      })}
    </div>
  );
};

export default Favorites;
