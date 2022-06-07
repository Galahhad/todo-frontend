import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  currentTodo: {},
};

export const fetchTodos = createAsyncThunk(
  "todos/fetch",
  async (_, thunkApi) => {
    try {
      const res = await fetch("http://localhost:3000/todos");
      return await res.json();
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const getTodoById = createAsyncThunk(
  "todo/fetchId",
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3000/todos/${id}`);
      return res.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/delete",
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        return id;
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const postTodo = createAsyncThunk(
  "todos/post",
  async (item, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: item.title,
          text: item.text,
        }),
      });
      return res.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const patchTodoInfo = createAsyncThunk(
  "todos/patchInfo",
  async (item, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3000/todos/${item._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: item.title,
          text: item.text,
          completed: !item.completed,
        }),
      });
      return res.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const patchTodo = createAsyncThunk(
  "todos/patch",
  async (item, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3000/todos/${item._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !item.completed,
        }),
      });
      return res.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const patchTodoTextInfo = createAsyncThunk(
  "todos/patchTodosText",
  async ({ id, title, text }, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          text: text,
        }),
      });
      return res.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        console.log(action);
        state.todos = state.todos.filter((item) => item._id !== action.payload);
      })
      .addCase(postTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(patchTodo.fulfilled, (state, action) => {
        state.todos = state.todos.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          }
          return item;
        });
      })
      .addCase(getTodoById.fulfilled, (state, action) => {
        state.currentTodo = action.payload;
        state.loading = false;
      })
      .addCase(getTodoById.pending, (state) => {
        state.loading = true;
      })
      .addCase(patchTodoInfo.fulfilled, (state, action) => {
        state.currentTodo = action.payload;
      })
      .addCase(patchTodoTextInfo.fulfilled, (state, action) => {
        state.currentTodo.title = action.payload.title;
        state.currentTodo.text = action.payload.text;
      });
  },
});

export default todoSlice.reducer;
