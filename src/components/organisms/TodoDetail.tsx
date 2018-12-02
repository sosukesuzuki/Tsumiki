import React, {
  useState,
  useCallback,
  SyntheticEvent,
  KeyboardEvent,
  useRef,
  useEffect
} from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Todo } from "../../lib/type";
import colors from "../../lib/colors";
import { ActionTypes } from "../../lib/actionCreators";

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
`;
const DetailDisplay = styled.div``;
const DetailTextarea = styled.textarea``;
const NameInput = styled.input``;

type TodoDetailProps = Todo & {
  updateTodo: (todo: Todo) => { type: ActionTypes };
};

interface State {
  isTypingDetailInput: boolean;
  contentInDetailInput: string | undefined;
  isTypingNameInput: boolean;
  contentInNameInput: string | undefined;
}

const TodoDetail: React.SFC<TodoDetailProps> = ({ updateTodo, ...todo }) => {
  const initialState: State = {
    isTypingDetailInput: false,
    contentInDetailInput: todo.detail,
    isTypingNameInput: false,
    contentInNameInput: todo.name
  };
  const [
    {
      isTypingDetailInput,
      contentInDetailInput,
      isTypingNameInput,
      contentInNameInput
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
    </Container>
  );
};

export default connect(
  null,
  dispatch => ({
    updateTodo: (todo: Todo) =>
      dispatch({
        type: ActionTypes.UpdateTodo,
        payload: {
          todo
        }
      })
  })
)(TodoDetail);
