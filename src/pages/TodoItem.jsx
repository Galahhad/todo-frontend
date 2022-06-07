import React, { useState } from "react";
import { HiPencilAlt } from "react-icons/hi";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import styles from "../components/Main/Main.module.css";
import { deleteTodo, patchTodo } from "../features/todos/todoSlice";
import { Link } from "react-router-dom";

const TodoItem = ({ item, dispatch }) => {
  const [change, setChange] = useState(false);

  const handleChange = () => {
    setChange(!change);
  };

  const handleDelete = () => {
    setChange(false);
    dispatch(deleteTodo(item._id));
  };

  const handlePatch = () => {
    dispatch(patchTodo(item));
  };
  return (
    <div className={`${styles.todo} ${item.completed ? styles.completed : ""}`}>
      <button className={styles.star_button} onClick={handlePatch}>
        {!item.completed ? (
          <AiOutlineStar className={styles.todo_star} />
        ) : (
          <AiFillStar
            className={`${styles.todo_star} ${styles.complete_star}`}
          />
        )}
      </button>
      <p>
        <Link to={`/todos/${item._id}`}>{item.title}</Link>
      </p>
      <button
        className={styles.update_button}
        onClick={handleChange}
        onMouseLeave={() => setChange(false)}
      >
        <HiPencilAlt className={styles.todo_update} />
        {change && <span onClick={handleDelete}>Удалить</span>}
      </button>
    </div>
  );
};

export default TodoItem;
