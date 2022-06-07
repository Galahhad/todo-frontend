import React from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import Button from "../../pages/Button";
import Todos from "../../pages/Todos";
import styles from "./Main.module.css";
import CurrentTodo from "../../pages/CurrentTodo";
import Edit from "../../pages/Edit";
import Favorites from "../../pages/Favorites";

const Main = () => {
  return (
    <main>
      <div className={styles.routes}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.list} ${styles.active}` : styles.list
          }
        >
          Главная страница
        </NavLink>
        <NavLink
          to="/todos"
          className={({ isActive }) =>
            isActive ? `${styles.list} ${styles.active}` : styles.list
          }
        >
          Список дел
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive ? `${styles.list} ${styles.active}` : styles.list
          }
        >
          Избранные
        </NavLink>
      </div>
      <Routes>
        <Route path="/" element={<Button />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/todos/:id" element={<CurrentTodo />} />
        <Route path="/todos/:id/edit" element={<Edit />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </main>
  );
};

export default Main;
