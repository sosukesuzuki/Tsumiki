import { SagaIterator } from "redux-saga";
import { fork, call, put, take, select, all } from "redux-saga/effects";
import {
  setBoardData,
  setNewColumn,
  ActionTypes,
  setNewTodo,
  setNewComment,
  fetchBoardData,
  setUpdatedColumn,
  setUpdatedTodo
} from "./actionCreators";
import * as DB from "./db";
import {
  generateColumn,
  generateTodo,
  generateComment
} from "./ItemGenerators";
import { State } from "./reducer";
import { Todo, TodoComment, UpdateDiffColumn, UpdateDiffTodo } from "./type";
import _ from "lodash";

function* fetchBoardDataSaga(): SagaIterator {
  while (true) {
    yield take(ActionTypes.FetchBoardData);
    const data = yield call(DB.fetchData);
    yield put(setBoardData(data));
  }
}

function* addColumnSaga(): SagaIterator {
  while (true) {
    yield take(ActionTypes.AddColumn);
    const column = generateColumn({ name: "" });
    yield call(DB.addColumn, column);
    yield put(setNewColumn({ column }));
  }
}

function* deleteColumnSaga(): SagaIterator {
  while (true) {
    const { payload } = yield take(ActionTypes.DeleteColumn);
    const { columnId } = payload;
    const todos: Todo[] = yield select((state: State) => state.todos);
    const comments: TodoComment[] = yield select(
      (state: State) => state.comments
    );

    const relatedTodos = todos.filter(todo => todo.columnId === columnId);
    const relatedComments = _.flatMap(relatedTodos, todo => {
      return comments.filter(comment => comment.todoId === todo.id);
    });

    yield all(relatedTodos.map(todo => call(DB.deleteTodo, todo.id)));
    yield all(
      relatedComments.map(comment => call(DB.deleteComment, comment.id))
    );
    yield call(DB.deleteColumn, columnId);

    yield put(fetchBoardData);
  }
}

function* updateColumnSaga(): SagaIterator {
  while (true) {
    const { payload } = yield take(ActionTypes.UpdateColumn);
    const { id, diff }: { id: string; diff: UpdateDiffColumn } = payload;
    yield put(setUpdatedColumn({ id, diff }));
    const columns = yield select((state: State) => state.columns);
    const updatedColumn = _.find(columns, ["id", id]);
    yield call(DB.updateColumn, updatedColumn);
  }
}

function* addTodoSaga(): SagaIterator {
  while (true) {
    const { payload } = yield take(ActionTypes.AddTodo);
    const { columnId } = payload;
    const todo = generateTodo({ name: "", columnId });
    yield call(DB.addTodo, todo);
    yield put(setNewTodo({ todo }));
  }
}

function* updateTodoSaga(): SagaIterator {
  while (true) {
    const { payload } = yield take(ActionTypes.UpdateTodo);
    const { id, diff }: { id: string; diff: UpdateDiffTodo } = payload;
    yield put(setUpdatedTodo({ id, diff }));
    const todos = yield select((state: State) => state.todos);
    const updatedTodo = _.find(todos, ["id", id]);
    yield call(DB.updateTodo, updatedTodo);
  }
}

function* deleteTodoSaga(): SagaIterator {
  while (true) {
    const { payload } = yield take(ActionTypes.DeleteTodo);
    const { todoId } = payload;

    const comments: TodoComment[] = yield select(
      (state: State) => state.comments
    );

    const relatedComments = comments.filter(
      comment => comment.todoId === todoId
    );

    yield all(
      relatedComments.map(comment => call(DB.deleteComment, comment.id))
    );
    yield call(DB.deleteTodo, todoId);

    yield put(fetchBoardData);
  }
}

function* addCommentSaga(): SagaIterator {
  while (true) {
    const { payload } = yield take(ActionTypes.AddComment);
    const { todoId, content } = payload;
    const comment = generateComment({ content, todoId });
    yield call(DB.addComment, comment);
    yield put(setNewComment({ comment }));
  }
}

function* deleteCommentSaga(): SagaIterator {
  while (true) {
    const { payload } = yield take(ActionTypes.DeleteComment);
    const { commentId } = payload;
    yield call(DB.deleteComment, commentId);
    yield put(fetchBoardData);
  }
}

export default function*(): SagaIterator {
  yield fork(fetchBoardDataSaga);
  yield fork(addColumnSaga);
  yield fork(updateColumnSaga);
  yield fork(addTodoSaga);
  yield fork(updateTodoSaga);
  yield fork(addCommentSaga);
  yield fork(deleteColumnSaga);
  yield fork(deleteTodoSaga);
  yield fork(deleteCommentSaga);
}
