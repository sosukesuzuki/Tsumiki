import React, {
  useState,
  useCallback,
  ChangeEvent,
  KeyboardEvent,
  useRef
} from "react";
import styled from "styled-components";
import TextareaAtom from "../../atoms/Textarea";

const Container = styled.section``;
const SectionTitle = styled.h3``;
const Textarea = styled(TextareaAtom)`
  width: 100%;
`;

interface Props {
  addCommentToParentTodo: (content: string) => void;
}

const TodoCommentTextareaSection: React.SFC<Props> = ({
  addCommentToParentTodo
}) => {
  const [textareaValue, setTextareaValue] = useState("");
  const textareaEl = useRef<HTMLTextAreaElement>(null);

  const onChangeTextarea = useCallback(function(
    ev: ChangeEvent<HTMLTextAreaElement>
  ) {
    ev.persist();
    const value = (ev.target as any).value;
    setTextareaValue(value);
  },
  []);

  const onKeyPressTextarea = useCallback(
    function(ev: KeyboardEvent<HTMLTextAreaElement>) {
      if (ev.key === "Enter") {
        ev.preventDefault();
        addCommentToParentTodo(textareaValue);
        setTextareaValue("");
        textareaEl.current!.blur();
      }
    },
    [textareaValue]
  );

  return (
    <Container>
      <SectionTitle>コメントを追加</SectionTitle>
      <Textarea
        placeholder="コメントを入力してください。"
        onChange={onChangeTextarea}
        ref={textareaEl}
        onKeyPress={onKeyPressTextarea}
        value={textareaValue}
      />
    </Container>
  );
};

export default TodoCommentTextareaSection;
