import React, { useState, useCallback, SyntheticEvent } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Todo, OnlyIdRequiredTodo } from "../../lib/type";
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

type TodoDetailProps = Todo & {
  updateTodo: (todo: OnlyIdRequiredTodo) => { type: ActionTypes };
};

interface State {
  isTypingDetailInput: boolean;
  contentInDetailInput: string | undefined;
}

const TodoDetail: React.SFC<TodoDetailProps> = ({
  name,
  detail,
  id,
  columnId,
  updateTodo
}) => {
  const initialState: State = {
    isTypingDetailInput: false,
    contentInDetailInput: detail
  };
  const [{ isTypingDetailInput, contentInDetailInput }, setState] = useState(
    initialState
  );

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
          name,
          detail: contentInDetailInput,
          updatedAt: Date.now().toString(),
          columnId,
          id
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
        <h2>{name || "名前はありません"}</h2>
      </section>
      <section>
        <h3>詳細説明</h3>
        {!isTypingDetailInput ? (
          <DetailDisplay onClick={onClickDetailDisplay}>
            {detail || "詳しい説明を追加してください。"}
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
    updateTodo: (todo: OnlyIdRequiredTodo) =>
      dispatch({
        type: ActionTypes.UpdateTodo,
        payload: {
          todo
        }
      })
  })
)(TodoDetail);
