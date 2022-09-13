import { takeLatest, put, call } from "redux-saga/effects";
import {
  fetchAllBranchesList, postBranchAddition, updateBranchLocationRadius, postEnableBranchRefence, fetchEmployeeCheckinAssociations,
  postEmployeeCheckinAssociations
} from "../../helpers/backend_helper";
import {
  FETCH_ALL_BRANCHES_LIST, POST_BRANCH_ADDITION, UPDATE_BRANCH_LOCATION_RADIUS, ENABLE_BRANCH_REFENCE,
  GET_EMPLOYEE_CHECKIN_ASSOCIATIONS,
  UPDATE_EMPLOYEE_CHECKIN_ASSOCIATIONS
} from "./actionsType";
import {
  getAllBranchesListFailure, getAllBranchesListSuccess, branchAdditionSuccess, branchAdditionFailure,
  updateBranchLocationRadiusSuccess,
  updateBranchLocationRadiusFailure,
  enableBranchRefenceSuccess,
  enableBranchRefenceFailure,
  getEmployeeCheckinAssociationsSuccess,
  getEmployeeCheckinAssociationsFailure,
  updateEmployeeCheckinAssociationsSuccess,
  updatetEmployeeCheckinAssociationsFailure
} from "./actions";




function* getAllBranches(action) {
  try {
    const response = yield call(fetchAllBranchesList, action.payload.params);
    console.log(JSON.stringify(response));
    if (response.success) {
      yield put(getAllBranchesListSuccess(response.details));
    } else {
      yield put(getAllBranchesListFailure(response.error_message));
    }
  } catch (error) {
    yield put(getAllBranchesListFailure("Invalid Request"));
  }
}

function* branchAddition(action) {
  console.log("saga", action)
  try {
    const response = yield call(postBranchAddition, action.payload.params);
    console.log("add emp response ", response);
    if (response.success) {
      yield put(branchAdditionSuccess(response.details));
      yield call(action.payload.onSuccess);
    } else {
      yield put(branchAdditionFailure(response.error_message));
      yield call(action.payload.onError);
    }
  } catch (error) {
    yield put(branchAdditionFailure("Invalid Request"));
  }
}

function* updateLocationRadius(action) {
  try {
    const response = yield call(updateBranchLocationRadius, action.payload.params);
    if (response.success) {
      yield put(updateBranchLocationRadiusSuccess(response.details));
      yield call(action.payload.onSuccess);
    } else {
      yield put(updateBranchLocationRadiusFailure(response.error_message));
      yield call(action.payload.onError);
    }
  } catch (error) {
    yield put(updateBranchLocationRadiusFailure("Invalid Request"));
  }
}

function* enableBranchRefence(action) {
  try {
    const response = yield call(postEnableBranchRefence, action.payload.params);
    if (response.success) {
      yield put(enableBranchRefenceSuccess(response.details));
      yield call(action.payload.onSuccess);
    } else {
      yield put(enableBranchRefenceFailure(response.error_message));
      yield call(action.payload.onError);
    }
  } catch (error) {
    yield put(enableBranchRefenceFailure("Invalid Request"));
  }
}

function* getEmployeeCheckinAssociations(action) {

  try {
    const response = yield call(fetchEmployeeCheckinAssociations, action.payload);
    console.log(JSON.stringify(response) + "======getEmployeeCheckinAssociations");
    if (response.success) {
      yield put(getEmployeeCheckinAssociationsSuccess(response.details));
      yield call(action.payload.onSuccess);
    } else {
      yield put(getEmployeeCheckinAssociationsFailure(response.error_message));
      yield call(action.payload.onError);
    }
  } catch (error) {
    yield put(getEmployeeCheckinAssociationsFailure("Invalid Request"));
  }
}

function* updateEmployeeCheckinAssociations(action) {
  try {
    const response = yield call(postEmployeeCheckinAssociations, action.payload.params);
    console.log(JSON.stringify(response));

    if (response.success) {
      yield put(updateEmployeeCheckinAssociationsSuccess(response.details));
      yield call(action.payload.onSuccess);
    } else {
      yield put(updatetEmployeeCheckinAssociationsFailure(response.error_message));
      yield call(action.payload.onError);
    }
  } catch (error) {
    yield put(updatetEmployeeCheckinAssociationsFailure("Invalid Request"));
  }
}


function* LocationSaga() {

  yield takeLatest(FETCH_ALL_BRANCHES_LIST, getAllBranches)
  yield takeLatest(POST_BRANCH_ADDITION, branchAddition);
  yield takeLatest(UPDATE_BRANCH_LOCATION_RADIUS, updateLocationRadius);
  yield takeLatest(ENABLE_BRANCH_REFENCE, enableBranchRefence);
  yield takeLatest(GET_EMPLOYEE_CHECKIN_ASSOCIATIONS, getEmployeeCheckinAssociations);
  yield takeLatest(UPDATE_EMPLOYEE_CHECKIN_ASSOCIATIONS, updateEmployeeCheckinAssociations);
}

export default LocationSaga;