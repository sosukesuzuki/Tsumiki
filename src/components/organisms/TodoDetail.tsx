import React, { useCallback } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Todo, TodoComment } from "../../lib/type";
import colors from "../../lib/colors";
import { ActionTypes } from "../../lib/actionCreators";
import { State as RootState } from "../../lib/reducer";
import TodoNameSection from "../molecules/TodoDetail/TodoNameSection";
import TodoDescriptionSection from "../molecules/TodoDetail/TodoDescriptionSection";
import TodoCommentTextareaSection from "../molecules/TodoDetail/TodoCommentTextareaSection";
import CommentLogsSection from "../molecules/TodoDetail/CommentLogsSection";
import SideNavigation from "../molecules/TodoDetail/SideNavigation";

const Container = styled.article`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background-color: ${colors.light};
  color: ${colors.heavy};
  width: 800px;
  height: 600px;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  padding: 30px;
  section {
    margin: 15px;
  }
`;
const MainContent = styled.div`
  width: 100%;
`;

type TodoDetailProps = Todo & {
  updateTodo: (todo: Todo) => { type: ActionTypes };
  addComment: (
    { todoId, content }: { todoId: string; content: string }
  ) => { type: ActionTypes };
  deleteTodo: ({ todoId }: { todoId: string }) => { type: ActionTypes };
  comments: TodoComment[];
};

const TodoDetail: React.SFC<TodoDetailProps> = ({
  updateTodo,
  addComment,
  deleteTodo,
  comments,
  ...todo
}) => {
  const deleteThisTodo = useCallback(
    function() {
      deleteTodo({ todoId: todo.id });
    },
    [todo.id]
  );

  const updateTodoName = useCallback(
    function(name: string) {
      updateTodo({
        ...todo,
        name
      });
    },
    [todo]
  );

  const updateTodoDetail = useCallback(
    function(detail: string) {
      updateTodo({
        ...todo,
        detail
      });
    },
    [todo]
  );

  const addCommentToTodo = useCallback(
    function(content: string) {
      addComment({
        todoId: todo.id,
        content
      });
    },
    [todo.id]
  );

  return (
    <Container>
      <MainContent>
        <TodoNameSection name={todo.name} updateTodoName={updateTodoName} />
        <TodoDescriptionSection
          detail={todo.detail}
          updateTodoDetail={updateTodoDetail}
        />
        <TodoCommentTextareaSection addCommentToParentTodo={addCommentToTodo} />
        <CommentLogsSection
          comments={comments.filter(comment => comment.todoId === todo.id)}
        />
      </MainContent>
      <SideNavigation deleteTodo={deleteThisTodo} />
    </Container>
  );
};

export default connect(
  (state: RootState) => ({
    comments: state.comments
  }),
  dispatch => ({
    updateTodo: (todo: Todo) =>
      dispatch({
        type: ActionTypes.UpdateTodo,
        payload: {
          todo
        }
      }),
    addComment: ({ todoId, content }: { todoId: string; content: string }) =>
      dispatch({
        type: ActionTypes.AddComment,
        payload: {
          todoId,
          content
        }
      }),
    deleteTodo: ({ todoId }: { todoId: string }) =>
      dispatch({
        type: ActionTypes.DeleteTodo,
        payload: {
          todoId
        }
      })
  })
)(TodoDetail);
