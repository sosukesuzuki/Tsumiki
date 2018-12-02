import React, {
  useState,
  useCallback,
  SyntheticEvent,
  KeyboardEvent,
  useRef,
  useEffect,
  ChangeEvent
} from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Todo, TodoComment } from "../../lib/type";
import colors from "../../lib/colors";
import { ActionTypes } from "../../lib/actionCreators";
import { State as RootState } from "../../lib/reducer";
import CommentComponent from "./CommentComponent";

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
  section {
    margin: 15px;
  }
`;
const DetailDisplay = styled.div``;
const DetailTextarea = styled.textarea``;
const NameInput = styled.input``;
const CommentTextarea = styled.textarea``;

type TodoDetailProps = Todo & {
  updateTodo: (todo: Todo) => { type: ActionTypes };
  addComment: (
    { todoId, content }: { todoId: string; content: string }
  ) => { type: ActionTypes };
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
  const [
    {
      isTypingDetailInput,
      contentInDetailInput,
      isTypingNameInput,
      contentInNameInput,
      isTypingCommentTextarea,
      contentInCommentTextare
    },
    setState
  ] = useState(initialState);

  const nameInputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (nameInputEl && nameInputEl.current) nameInputEl.current.focus();
  });

  const onClickName = useCallback(function() {
    setState((state: State) => ({
      ...state,
      isTypingNameInput: true
    }));
  }, []);

  const onChangeNameInput = useCallback(
    function(ev: SyntheticEvent<HTMLInputElement>) {
      ev.persist();
      const value = (ev.target as any).value;
      setState((state: State) => ({
        ...state,
        contentInNameInput: value
      }));
    },
    [contentInNameInput]
  );

  const onKeyPressNameInput = useCallback(
    function(ev: KeyboardEvent<HTMLInputElement>) {
      if (ev.key === "Enter") {
        (async () => {
          if (contentInNameInput == null) return;
          updateTodo({
            ...todo,
            name: contentInNameInput
          });
          setState((state: State) => ({
            ...state,
            isTypingNameInput: false
          }));
        })();
      }
    },
    [contentInNameInput]
  );

  const onBlurNameInput = useCallback(function() {
    setState((state: State) => ({
      ...state,
      isTypingNameInput: false
    }));
  }, []);

  const onClickDetailDisplay = useCallback(function() {
    setState((state: State) => ({
      ...state,
      isTypingDetailInput: true
    }));
  }, []);

  const onChangeDetailTextarea = useCallback(function(
    ev: SyntheticEvent<HTMLTextAreaElement>
  ) {
    const value = (ev.target as any).value;
    setState((state: State) => ({
      ...state,
      contentInDetailInput: value
    }));
  },
  []);

  const onClickDetailSaveButton = useCallback(
    function() {
      (async () => {
        await updateTodo({
          ...todo,
          updatedAt: Date.now().toString(),
          detail: contentInDetailInput
        });
        setState((state: State) => ({
          ...state,
          isTypingDetailInput: false
        }));
      })();
    },
    [contentInDetailInput]
  );

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
      (async () => {
        if (ev.key === "Enter") {
          await addComment({
            todoId: todo.id,
            content: contentInCommentTextare
          });
          setState((state: State) => ({
            ...state,
            contentInCommentTextare: "",
            isTypingCommentTextarea: false
          }));
        }
      })();
    },
    [contentInCommentTextare]
  );

  return (
    <Container>
      <section>
        {!isTypingNameInput ? (
          <h2 onClick={onClickName}>{todo.name || "名前はありません"}</h2>
        ) : (
          <NameInput
            value={contentInNameInput}
            onChange={onChangeNameInput}
            onKeyPress={onKeyPressNameInput}
            onBlur={onBlurNameInput}
            ref={nameInputEl}
          />
        )}
      </section>
      <section>
        <h3>詳細説明</h3>
        {!isTypingDetailInput ? (
          <DetailDisplay onClick={onClickDetailDisplay}>
            {todo.detail || "詳しい説明を追加してください。"}
          </DetailDisplay>
        ) : (
          <div>
            <DetailTextarea
              value={contentInDetailInput}
              placeholder="詳しい説明を追加してください..."
              onChange={onChangeDetailTextarea}
              autoFocus
            />
            <button onClick={onClickDetailSaveButton}>保存</button>
          </div>
        )}
      </section>
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
        <button disabled={!isTypingCommentTextarea}>保存</button>
      </section>
      <section>
        <h3>コメントログ</h3>
        {comments
          .filter(comment => comment.todoId === todo.id)
          .map(comment => {
            return <CommentComponent key={comment.id} {...comment} />;
          })}
      </section>
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
      })
  })
)(TodoDetail);
