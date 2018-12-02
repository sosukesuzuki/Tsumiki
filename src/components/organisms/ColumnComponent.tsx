import React, {
  useState,
  useCallback,
  useRef,
  SyntheticEvent,
  KeyboardEvent
} from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Column } from "../../lib/type";
import colors from "../../lib/colors";
import { ActionTypes } from "../../lib/actionCreators";
import { Omit } from "lodash";

type OnlyIdRequiredColumn = Partial<Omit<Column, "id">> & { id: string };

const Container = styled.div`
  width: 200px;
  background-color: ${colors.light};
  color: ${colors.heavy};
  margin: 0 15px;

  display: flex;
  overflow-x: auto;
  overflow-y: hidden;

  display: inline-block;
`;

type ColumnComponentProps = Column & {
  updateColumn: (
    column: OnlyIdRequiredColumn
  ) => {
    type: ActionTypes;
  };
};

interface State {
  isTypingColumnName: boolean;
  contentInColumnNameInput?: string;
}

const initialState: State = {
  isTypingColumnName: false,
  contentInColumnNameInput: undefined
};

const ColumnComponent: React.SFC<ColumnComponentProps> = ({
  name,
  id,
  updateColumn
}) => {
  const [state, setState] = useState(initialState);

  const columnInputEl = useRef<HTMLInputElement>(null);

  const onClickColumnName = useCallback(
    function() {
      const { isTypingColumnName } = state;
      if (!isTypingColumnName) {
        setState((state: State) => ({
          ...state,
          isTypingColumnName: true,
          contentInColumnNameInput: ""
        }));
      }
    },
    [state.isTypingColumnName]
  );

  const onKeyPressColumnNameInput = useCallback(
    function(ev: KeyboardEvent<HTMLInputElement>) {
      if (ev.key === "Enter") {
        updateColumn({
          name: state.contentInColumnNameInput,
          id
        });
        setState((state: State) => ({
          ...state,
          contentInColumnNameInput: undefined,
          isTypingColumnName: false
        }));
      }
    },
    [state.contentInColumnNameInput, state.isTypingColumnName]
  );

  const onChangeColumnNameInput = useCallback(
    function(ev: SyntheticEvent<HTMLInputElement>) {
      ev.persist();
      const value = (ev.target as any).value;
      setState((state: State) => ({
        ...state,
        contentInColumnNameInput: value
      }));
    },
    [state.contentInColumnNameInput]
  );

  const onBlurColumnNameInput = useCallback(
    function() {
      setState((state: State) => ({
        ...state,
        isTypingColumnName: false,
        contentInColumnNameInput: undefined
      }));
    },
    [state.contentInColumnNameInput, state.isTypingColumnName]
  );

  const { isTypingColumnName, contentInColumnNameInput } = state;
  return (
    <Container>
      {!isTypingColumnName ? (
        <h3 onClick={onClickColumnName}>{name || "名前はありません。"}</h3>
      ) : (
        <input
          type="text"
          value={contentInColumnNameInput}
          onKeyPress={onKeyPressColumnNameInput}
          onChange={onChangeColumnNameInput}
          onBlur={onBlurColumnNameInput}
          ref={columnInputEl}
        />
      )}
    </Container>
  );
};

export default connect(
  null,
  dispatch => ({
    updateColumn: (column: OnlyIdRequiredColumn) =>
      dispatch({ type: ActionTypes.UpdateColumn, payload: { column } })
  })
)(ColumnComponent);
