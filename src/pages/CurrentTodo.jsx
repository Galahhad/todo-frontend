import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTodoById, patchTodoInfo } from "../features/todos/todoSlice";
import { useParams, Link } from "react-router-dom";
import styles from "../components/Main/Main.module.css";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const CurrentTodo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentTodo = useSelector((state) => state.currentTodo);
  const currentTodoLoader = useSelector((state) => state.currentTodoLoader);

  useEffect(() => {
    dispatch(getTodoById(id));
  }, [dispatch, id]);

  const handleFavorite = () => {
    dispatch(patchTodoInfo(currentTodo));
  };

  if (currentTodoLoader) {
    return (
      <div className={styles['line-wobble']}></div>
    );
  }

  return (
    <div className={styles.modal_wrapper}>
      <Link to="/todos" className={styles.back}>
        <BiArrowBack />
      </Link>
      <h1 className={currentTodo.completed ? styles.completed_text : ""}>
        {currentTodo.title}
      </h1>
      <p className={currentTodo.completed ? styles.completed_text : ""}>
        {currentTodo.text}
      </p>
      <button
        onClick={handleFavorite}
        className={`${styles.fav_button} ${
          currentTodo.completed ? styles.favorite : ""
        }`}
      >
        {!currentTodo.completed ? <AiOutlineStar /> : <AiFillStar />}
      </button>
      <Link to={`/todos/${id}/edit`} className={styles.edit}>
        Редактировать
      </Link>
    </div>
  );
};

export default CurrentTodo;
