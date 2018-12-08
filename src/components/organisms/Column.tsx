import React, { useCallback, useMemo } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Column, Todo } from "../../lib/type";
import colors from "../../lib/colors";
import { ActionTypes } from "../../lib/actionCreators";
import { State as RootState } from "../../lib/reducer";
import TodoComponent from "./TodoItem";
import BoxButton from "../atoms/BoxButton";
import HeaderSection from "../molecules/Column/HeaderSection";

const Container = styled.div`
  width: 200px;
  height: fit-content;
  background-color: ${colors.light};
  color: ${colors.heavy};
  margin: 0 15px;
  padding: 15px;
  overflow-x: auto;
  border-radius: 1px;
`;
const AddCardButton = styled(BoxButton)`
  width: 100%;
  margin-top: 10px;
`;
const Columns = styled.div`
  margin-top: 15px;
`;

type Props = Column & {
  todos: Todo[];
  updateColumn: (column: Column) => { type: ActionTypes };
  addTodo: (columnId: string) => { type: ActionTypes };
  deleteColumn: (columnId: string) => { type: ActionTypes };
};

const ColumnComponent: React.SFC<Props> = ({
  todos,
  updateColumn,
  addTodo,
  deleteColumn,
  ...column
}) => {
  const onClickAddTodoButton = useCallback(
    function() {
      addTodo(column.id);
    },
    [column.id]
  );

  const updateColumnName = useCallback(
    function(name: string) {
      updateColumn({
        ...column,
        name
      });
    },
    [column]
  );

  const deleteOwn = useCallback(function() {
    deleteColumn(column.id);
  }, []);

  const relatedTodos = useMemo(
    () => todos.filter(todo => todo.columnId === column.id),
    [todos, column.id]
  );

  return (
    <Container>
      <HeaderSection
        name={column.name}
        relatedTodos={relatedTodos}
        deleteThisColumn={deleteOwn}
        updateColumnName={updateColumnName}
      />
      <Columns>
        {relatedTodos.map(todo => (
          <TodoComponent {...todo} key={todo.id} />
        ))}
      </Columns>
      <AddCardButton onClick={onClickAddTodoButton}>
        + さらにカードを追加
      </AddCardButton>
    </Container>
  );
};

export default connect(
  (state: RootState) => ({
    todos: state.todos
  }),
  dispatch => ({
    updateColumn: (column: Column) =>
      dispatch({ type: ActionTypes.UpdateColumn, payload: { column } }),
    addTodo: (columnId: string) =>
      dispatch({ type: ActionTypes.AddTodo, payload: { columnId } }),
    deleteColumn: (columnId: string) =>
      dispatch({ type: ActionTypes.DeleteColumn, payload: { columnId } })
  })
)(ColumnComponent);
