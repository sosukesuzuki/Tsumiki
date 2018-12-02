import { SagaIterator } from "redux-saga";
import { fork, call, put, take } from "redux-saga/effects";
import {
  setBoardData,
  setColumn,
  ActionTypes,
  setTodo
} from "./actionCreators";
import * as DB from "./db";
import {
  generateColumn,
  generateTodo,
  generateComment
} from "./ItemGenerators";

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

function* addCommentSaga(): SagaIterator {
  while (true) {
    const { payload } = yield take(ActionTypes.AddComment);
    const { todoId } = payload;
    const comment = generateComment({ content: "", todoId });
    yield call(DB.addComment, comment);
  }
}

export default function*(): SagaIterator {
  yield fork(fetchBoardDataSaga);
  yield fork(addColumnSaga);
  yield fork(updateColumnSaga);
  yield fork(addTodoSaga);
  yield fork(addCommentSaga);
}
