import { takeLatest, put, call } from "redux-saga/effects";
import {
  fetchAllBranchesList, postBranchAddition, updateBranchLocationRadius, postEnableBranchRefence, fetchEmployeeCheckinAssociations,
  postEmployeeCheckinAssociations,
  PostEditBranchNameApi,fetchListAllBranchesList
} from "../../helpers/backend_helper";
import {
  FETCH_ALL_BRANCHES_LIST, POST_BRANCH_ADDITION, UPDATE_BRANCH_LOCATION_RADIUS, ENABLE_BRANCH_REFENCE,
  GET_EMPLOYEE_CHECKIN_ASSOCIATIONS,
  UPDATE_EMPLOYEE_CHECKIN_ASSOCIATIONS,
  EDIT_BRANCH_NAME,
  FETCH_LIST_ALL_BRANCHES_LIST
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
  updatetEmployeeCheckinAssociationsFailure,
  editBranchNameSuccess,
  editBranchNameFailure,
  getListAllBranchesListSuccess,
  getListAllBranchesListFailure
} from "./actions";


import {
  showLoader,
  hideLoader
} from '../loader/actions'


function* getAllBranches(action) {
  try {

    yield put(showLoader());

    const response = yield call(fetchAllBranchesList, action.payload.params);

    if (response.success) {

      yield put(hideLoader());

      yield put(getAllBranchesListSuccess(response.details));
      yield call(action.payload.onSuccess(response.details));

    } else {

      yield put(hideLoader());
      yield put(getAllBranchesListFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
    }
  } catch (error) {

    yield put(hideLoader());
    yield put(getAllBranchesListFailure("Invalid Request"));

  }
}

function* branchAddition(action) {

  try {

    yield put(showLoader());

    const response = yield call(postBranchAddition, action.payload.params);

    if (response.success) {

      yield put(hideLoader());
      yield put(branchAdditionSuccess(response.details));
      yield call(action.payload.onSuccess);

    } else {

      yield put(hideLoader());
      yield put(branchAdditionFailure(response.error_message));
      yield call(action.payload.onError);

    }
  } catch (error) {

    yield put(hideLoader());
    yield put(branchAdditionFailure("Invalid Request"));

  }
}

function* updateLocationRadius(action) {
  try {

    yield put(showLoader());

    const response = yield call(updateBranchLocationRadius, action.payload.params);

    if (response.success) {

      yield put(hideLoader());
      yield put(updateBranchLocationRadiusSuccess(response.details));
      yield call(action.payload.onSuccess(response));

    } else {

      yield put(hideLoader());
      yield put(updateBranchLocationRadiusFailure(response.error_message));
      yield call(action.payload.onError);

    }
  } catch (error) {

    yield put(hideLoader());
    yield put(updateBranchLocationRadiusFailure("Invalid Request"));

  }
}

function* enableBranchRefence(action) {
  try {

    yield put(showLoader());

    const response = yield call(postEnableBranchRefence, action.payload.params);
    if (response.success) {

      yield put(hideLoader());
      yield put(enableBranchRefenceSuccess(response.details));
      yield call(action.payload.onSuccess(response));

    } else {

      yield put(hideLoader());
      yield put(enableBranchRefenceFailure(response.error_message));
      yield call(action.payload.onError(response));

    }
  } catch (error) {

    yield put(hideLoader());
    yield put(enableBranchRefenceFailure("Invalid Request"));

  }
}

function* getEmployeeCheckinAssociations(action) {

  try {

    yield put(showLoader());

    const response = yield call(fetchEmployeeCheckinAssociations, action.payload);

    if (response.success) {

      yield put(hideLoader());
      yield put(getEmployeeCheckinAssociationsSuccess(response.details));
      yield call(action.payload.onSuccess);

    } else {

      yield put(hideLoader());
      yield put(getEmployeeCheckinAssociationsFailure(response.error_message));
      yield call(action.payload.onError);

    }
  } catch (error) {

    yield put(hideLoader());
    yield put(getEmployeeCheckinAssociationsFailure("Invalid Request"));

  }
}

function* updateEmployeeCheckinAssociations(action) {
  try {

    yield put(showLoader());

    const response = yield call(postEmployeeCheckinAssociations, action.payload.params);

    if (response.success) {

      yield put(hideLoader());
      yield put(updateEmployeeCheckinAssociationsSuccess(response.details));
      yield call(action.payload.onSuccess(response));

    } else {

      yield put(hideLoader());
      yield put(updatetEmployeeCheckinAssociationsFailure(response.error_message));
      yield call(action.payload.onError);

    }
  } catch (error) {

    yield put(hideLoader());
    yield put(updatetEmployeeCheckinAssociationsFailure("Invalid Request"));

  }
}

function* updatedBranchName(action) {
  try {

    yield put(showLoader());
    const response = yield call(PostEditBranchNameApi, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(editBranchNameSuccess(response.details));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(editBranchNameFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(editBranchNameFailure("Invalid Request"));

  }
}

function* getListAllBranches(action) {
  try {

    yield put(showLoader());

    const response = yield call(fetchListAllBranchesList, action.payload.params);

    if (response.success) {

      yield put(hideLoader());

      yield put(getListAllBranchesListSuccess(response.details));
      yield call(action.payload.onSuccess(response.details));

    } else {

      yield put(hideLoader());
      yield put(getListAllBranchesListFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
    }
  } catch (error) {

    yield put(hideLoader());
    yield put(getListAllBranchesListFailure("Invalid Request"));

  }
}


function* LocationSaga() {

  yield takeLatest(FETCH_ALL_BRANCHES_LIST, getAllBranches)
  yield takeLatest(FETCH_LIST_ALL_BRANCHES_LIST, getListAllBranches)
  yield takeLatest(POST_BRANCH_ADDITION, branchAddition);
  yield takeLatest(UPDATE_BRANCH_LOCATION_RADIUS, updateLocationRadius);
  yield takeLatest(ENABLE_BRANCH_REFENCE, enableBranchRefence);
  yield takeLatest(GET_EMPLOYEE_CHECKIN_ASSOCIATIONS, getEmployeeCheckinAssociations);
  yield takeLatest(UPDATE_EMPLOYEE_CHECKIN_ASSOCIATIONS, updateEmployeeCheckinAssociations);
  yield takeLatest(EDIT_BRANCH_NAME, updatedBranchName)

}

export default LocationSaga;