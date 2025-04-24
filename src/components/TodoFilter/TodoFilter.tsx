import { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setVisibleTodos: (todos: Todo[]) => void;
};

export const TodoFilter: React.FC<Props> = ({ todos, setVisibleTodos }) => {
  const [query, setQuery] = useState('all');
  const [search, setSearch] = useState('');

  const handleFilter = (query, search) => {
    if (query === 'active') {
      const filteredTodos = todos.filter(todo => !todo.completed);

      setVisibleTodos(
        filteredTodos.filter(todo =>
          todo.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
        ),
      );
    }

    if (query === 'completed') {
      const filteredTodos = todos.filter(todo => todo.completed);

      setVisibleTodos(
        filteredTodos.filter(todo =>
          todo.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
        ),
      );
    }

    if (query === 'all') {
      setVisibleTodos(
        todos.filter(todo =>
          todo.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
        ),
      );
    }
  };

  useEffect(() => {
    handleFilter(query, search);
  }, [query, search]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            onChange={event => setQuery(event.target.value)}
            data-cy="statusSelect"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          onChange={event => setSearch(event.target.value)}
          value={search}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {search !== '' && (
            <button
              onClick={() => setSearch('')}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          )}
        </span>
      </p>
    </form>
  );
};
