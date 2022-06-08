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
  const currentTodoLoader = useSelector((state) => state.currentTodoLoader);

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

  if(currentTodoLoader) {
    return (
      <div className={styles['line-wobble']}></div>
    )
  }

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
          autoFocus
        />
        <textarea rows="15" value={text} onChange={handleText} />
      </div>
        <Link
          className={styles.close_button}
          to={`/todos/${todo._id}`}
          onClick={handleClose}
        >
          Отменить
        </Link>
        <Link
          className={styles.edit}
          to={`/todos/${todo._id}`}
          onClick={handlePatchTextInfo}
        >
          Изменить
        </Link>
    </div>
  );
};

export default Edit;
