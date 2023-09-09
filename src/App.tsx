import styles from "./App.module.css";
import React, { useState } from 'react';

// components
import Modal from "./components/Modal/Modal";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";

// interfaces
import { ITask } from "./interfaces/Task";

function App() {
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null);

  const deleteTask = (title: string): void => {
    setTaskList(
      taskList.filter((task) => {
        return task.title !== title;
      })
    );
  };

  const hideOrShowModal = (display: boolean) => {
    const modal = document.getElementById("modal");
    display
      ? modal!.classList.remove("hide")
      : modal!.classList.add("hide");
  };

  const editTask = (task: ITask): void => {
    hideOrShowModal(true);
    setTaskToUpdate(task);
  };

  const updateTask = (id: number, title: string, difficulty: number) => {
    const updatedTask: ITask = { id, title, difficulty };

    const updatedItems = taskList.map((task) => {
      return task.id === updatedTask.id ? updatedTask : task;
    });

    setTaskList(updatedItems);

    hideOrShowModal(false);
  };

  return (
    <div>
      <Modal
        title="Edit task"
        children={
          <TaskForm
            btnText="Edit"
            taskList={taskList}
            task={taskToUpdate}
            handleUpdate={updateTask}
          />
        }
      />
      <Header />
      <main className={styles.main}>
        <div className={styles.todo_form}>
          <h2>What's on your mind?</h2>
          <TaskForm
            taskList={taskList}
            setTaskList={setTaskList}
            btnText="Add new task"
          />
        </div>
        <div className="todo-container">
          <h2>Your tasks:</h2>
          <TaskList
            taskList={taskList}
            handleDelete={deleteTask}
            handleEdit={editTask}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;