import { SagaIterator } from "redux-saga";
import { fork, call, put, take, select, all } from "redux-saga/effects";
import {
  setBoardData,
  setColumn,
  ActionTypes,
  setTodo,
  setComment,
  fetchBoardData
} from "./actionCreators";
import * as DB from "./db";
import {
  generateColumn,
  generateTodo,
  generateComment
} from "./ItemGenerators";
import { State } from "./reducer";
import { Todo, TodoComment } from "./type";
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
    yield put(setColumn({ column }));
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
    const { column } = payload;
    yield call(DB.updateColumn, column);
    yield put(setColumn({ column }));
  }
}

function* addTodoSaga(): SagaIterator {
  while (true) {
    const { payload } = yield take(ActionTypes.AddTodo);
    const { columnId } = payload;
    const todo = generateTodo({ name: "", columnId });
    yield call(DB.addTodo, todo);
    yield put(setTodo({ todo }));
  }
}

function* updateTodoSaga(): SagaIterator {
  while (true) {
    const { payload } = yield take(ActionTypes.UpdateTodo);
    const { todo } = payload;
    yield call(DB.updateTodo, todo);
    yield put(setTodo({ todo }));
  }
}

function* addCommentSaga(): SagaIterator {
  while (true) {
    const { payload } = yield take(ActionTypes.AddComment);
    const { todoId, content } = payload;
    const comment = generateComment({ content, todoId });
    yield call(DB.addComment, comment);
    yield put(setComment({ comment }));
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
}
