import React, {
  useState,
  useCallback,
  KeyboardEvent,
  ChangeEvent
} from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Todo, TodoComment } from "../../lib/type";
import colors from "../../lib/colors";
import { ActionTypes } from "../../lib/actionCreators";
import { State as RootState } from "../../lib/reducer";
import CommentComponent from "./CommentComponent";
import Textarea from "../atoms/Textarea";
import TodoNameSection from "../molecules/TodoDetail/TodoNameSection";
import TodoDescriptionSection from "../molecules/TodoDetail/TodoDescriptionSection";

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
const CommentTextarea = styled(Textarea)`
  width: 100%;
  height: 60px;
  box-shadow: none;
  box-shadow: 0 0 0 1px ${colors.middle};
  &:focus {
    border: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
  }
`;

type TodoDetailProps = Todo & {
  updateTodo: (todo: Todo) => { type: ActionTypes };
  addComment: (
    { todoId, content }: { todoId: string; content: string }
  ) => { type: ActionTypes };
  deleteTodo: ({ todoId }: { todoId: string }) => { type: ActionTypes };
  comments: TodoComment[];
};

interface State {
  isTypingDetailInput: boolean;
  contentInDetailInput: string | undefined;
  isTypingNameInput: boolean;
  contentInNameInput: string | undefined;
  isTypingCommentTextarea: boolean;
  contentInCommentTextare: string;
}

const TodoDetail: React.SFC<TodoDetailProps> = ({
  updateTodo,
  addComment,
  deleteTodo,
  comments,
  ...todo
}) => {
  const initialState: State = {
    isTypingDetailInput: false,
    contentInDetailInput: todo.detail,
    isTypingNameInput: false,
    contentInNameInput: todo.name,
    isTypingCommentTextarea: false,
    contentInCommentTextare: ""
  };
  const [{ contentInCommentTextare }, setState] = useState(initialState);

  const onFocusCommentTextarea = useCallback(function() {
    setState((state: State) => ({
      ...state,
      isTypingCommentTextarea: true
    }));
  }, []);

  const onBlurCommentTextarea = useCallback(function() {
    setState((state: State) => ({
      ...state,
      isTypingCommentTextarea: false
    }));
  }, []);

  const onChangeCommentTextarea = useCallback(function(
    ev: ChangeEvent<HTMLTextAreaElement>
  ) {
    ev.persist();
    const value = (ev.target as any).value;
    setState((state: State) => ({
      ...state,
      contentInCommentTextare: value
    }));
  },
  []);

  const onKeyPressCommentTextarea = useCallback(
    function(ev: KeyboardEvent<HTMLTextAreaElement>) {
      if (ev.key === "Enter") {
        ev.preventDefault();
        addComment({
          todoId: todo.id,
          content: contentInCommentTextare
        });
        setState((state: State) => ({
          ...state,
          contentInCommentTextare: "",
          isTypingCommentTextarea: false
        }));
      }
    },
    [contentInCommentTextare]
  );

  const onClickDeleteTodoButton = useCallback(function(todoId: string) {
    deleteTodo({ todoId });
  }, []);

  return (
    <Container>
      <MainContent>
        <TodoNameSection {...todo} />
        <TodoDescriptionSection {...todo} />
        <section>
          <h3>コメントを追加</h3>
          <CommentTextarea
            placeholder="コメントを入力してください。"
            onFocus={onFocusCommentTextarea}
            onBlur={onBlurCommentTextarea}
            value={contentInCommentTextare}
            onChange={onChangeCommentTextarea}
            onKeyPress={onKeyPressCommentTextarea}
          />
        </section>
        <section>
          <h3>コメントログ</h3>
          {comments
            .filter(comment => comment.todoId === todo.id)
            .map(comment => (
              <CommentComponent key={comment.id} {...comment} />
            ))}
        </section>
      </MainContent>
      <div>
        <button onClick={() => onClickDeleteTodoButton(todo.id)}>
          このカードを削除する。
        </button>
      </div>
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
