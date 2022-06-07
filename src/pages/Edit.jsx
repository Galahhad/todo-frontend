import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../components/Main/Main.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getTodoById } from "../features/todos/todoSlice";
import { useParams } from "react-router-dom";
import { MdOutlineError } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import { patchTodoTextInfo } from "../features/todos/todoSlice";

const Edit = () => {
  const { id } = useParams();
  const todo = useSelector((state) => state.currentTodo);

  const [title, setTitle] = useState(todo?.title);
  const [text, setText] = useState(todo?.text);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodoById(id));
  }, [dispatch, id]);

  // useEffect(() => {
  //   setTitle();
  //   setText();
  // }, [todo.text, todo.title]);

  if (title === undefined || text === undefined) {
    return (
      <div className={styles.error}>
        <MdOutlineError className={styles.error_icon} />
        <p>Произошла ошибка пожалуйста повторите попытку</p>
        <Link to={`/todos/${id}`}>Повторить</Link>
      </div>
    );
  }

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleText = (e) => {
    setText(e.target.value);
  };

  const handlePatchTextInfo = () => {
    dispatch(
      patchTodoTextInfo({
        id: todo._id,
        title: title,
        text: text,
      })
    );
  };

  const handleClose = () => {
    setText(text);
    setTitle(title);
  };

  return (
    <div className={styles.edit_wrapper}>
      <Link to={`/todos/${id}`} className={styles.back}>
        <BiArrowBack />
      </Link>
      <div className={styles.modal_wrapper}>
        <textarea
          value={title}
          onChange={handleTitle}
          style={{ marginTop: "10px" }}
        />
        <textarea rows="15" value={text} onChange={handleText} />
      </div>
      <button className={styles.close_button} onClick={handleClose}>
        <Link
          to={`/todos/${todo._id}`}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          Отменить
        </Link>
      </button>
      <button className={styles.edit} onClick={handlePatchTextInfo}>
        <Link
          to={`/todos/${todo._id}`}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          Изменить
        </Link>
      </button>
    </div>
  );
};

export default Edit;
