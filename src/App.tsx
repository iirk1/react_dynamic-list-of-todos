/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { getTodos, getUser } from './api';
import { User } from './types/User';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState([]);
  const [visibleTodos, setVisibleTodos] = useState([]);
  const [user, setUser] = useState<User | null>();
  const [modalWindow, setModalWindow] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [userLoading, setUserLoading] = useState<boolean>(false);

  const [currentTodo, setCurrentTodo] = useState<Todo | null>();

  useEffect(() => {
    setLoading(true);
    getTodos().then((res: Todo[]) => {
      setTodos(res);
      setVisibleTodos(res);
      setLoading(false);
    });
  }, []);

  const handleSetUser = (userId: number) => {
    setUserLoading(true);
    getUser(userId)
      .then(res => {
        setUser(res);
      })
      .finally(() => {
        setModalWindow(true);
        setUserLoading(false);
      });
  };

  const handleModalWindow = (value: boolean) => {
    setModalWindow(value);
  };

  const handleSetVisibleTodos = (value: Todo[]) => {
    setVisibleTodos(value);
  };

  const handleSetLoading = (value: boolean) => {
    setLoading(value);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todos={todos}
                setVisibleTodos={handleSetVisibleTodos}
              />
            </div>

            <div className="block">
              <TodoList
                modalWindow={modalWindow}
                todos={visibleTodos}
                loading={loading}
                getCurrentUser={handleSetUser}
                currentTodo={currentTodo}
                setModalWindow={handleModalWindow}
                getCurrentTodo={(value: Todo[]) => setCurrentTodo(value)}
              />
            </div>
          </div>
        </div>
      </div>

      {modalWindow && (
        <TodoModal
          modalWindow={modalWindow}
          loading={userLoading}
          currentUser={user}
          currentTodo={currentTodo}
          setModalWindow={handleModalWindow}
        />
      )}
    </>
  );
};
