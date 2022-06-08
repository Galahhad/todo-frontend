import React, { useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import styles from "../components/Main/Main.module.css";
import { useDispatch, useSelector } from "react-redux";
import { postTodo } from "../features/todos/todoSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Button = () => {
  const [down, setDown] = useState(false);
  const [headerText, setHeaderText] = useState("");
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const postLoader = useSelector((state) => state.postLoader);

  const handleDown = () => {
    setDown(true);
  };

  const handleCloseDown = () => {
    setDown(false);
    setText("");
    setHeaderText("");
  };

  const handleHeaderText = (e) => {
    setHeaderText(e.target.value);
  };

  const handleText = (e) => {
    setText(e.target.value);
  };

  const handleAdd = () => {
    dispatch(
      postTodo({
        title: headerText,
        text: text,
      })
      
    )
    setText("");
    setHeaderText("");
    toast.success("Дело успешно добавлено!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <>
      {!down && (
        <button className={styles.add_button} onClick={handleDown}>
          <BiAddToQueue className={styles.add_icon} />
          <p>Добавить дело</p>
        </button>
      )}
      {down && (
        <div className={styles.todo_info}>
          <textarea
            placeholder="Заголовок"
            onChange={handleHeaderText}
            value={headerText}
            maxLength='50'
            autoFocus
          />
          <textarea
            placeholder="Введите текст"
            rows="15"
            onChange={handleText}
            value={text}
          />
          <div className={styles.buttons}>
            <button onClick={handleCloseDown} className={styles.close}>
              Отменить
            </button>
            {!postLoader ? <button
              className={styles.add}
              disabled={!headerText.trim().length || !text.trim().length}
              onClick={handleAdd}
            >
              Добавить
            </button>
            :
            <div className={styles['line-wobble']}></div>
            }
          </div>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      )}
    </>
  );
};

export default Button;
