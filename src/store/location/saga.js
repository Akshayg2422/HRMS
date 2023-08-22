import { takeLatest, put, call } from "redux-saga/effects";
import {
  fetchAllBranchesList, postBranchAddition, updateBranchLocationRadius, postEnableBranchRefence, fetchEmployeeCheckinAssociations,
  postEmployeeCheckinAssociations,
  PostEditBranchNameApi, fetchListAllBranchesList, deleteBranchApi
} from "../../helpers/backend_helper";
import {
  FETCH_ALL_BRANCHES_LIST, POST_BRANCH_ADDITION, UPDATE_BRANCH_LOCATION_RADIUS, ENABLE_BRANCH_REFENCE,
  GET_EMPLOYEE_CHECKIN_ASSOCIATIONS,
  UPDATE_EMPLOYEE_CHECKIN_ASSOCIATIONS,
  EDIT_BRANCH_NAME,
  FETCH_LIST_ALL_BRANCHES_LIST,
  DELETE_BRANCH
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
  getListAllBranchesListFailure,
  deleteBranchSuccess,
  deleteBranchFailure
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
      yield put(getAllBranchesListSuccess(response));
      yield call(action.payload.onSuccess(response.details));
    } else {
      yield put(hideLoader());
      yield put(getAllBranchesListFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
    }
  } catch (error) {

    yield put(hideLoader());
    yield put(getAllBranchesListFailure("Invalid Request"));
    yield call(action.payload.onError(error));


  }
}

function* branchAddition(action) {

  try {

    yield put(showLoader());

    const response = yield call(postBranchAddition, action.payload.params);

    if (response.success) {

      yield put(hideLoader());
      yield put(branchAdditionSuccess(response.details));
      yield call(action.payload.onSuccess(response.details));

    } else {

      yield put(hideLoader());
      yield put(branchAdditionFailure(response.error_message));
      yield call(action.payload.onError((response.error_message)));

    }
  } catch (error) {

    yield put(hideLoader());
    yield put(branchAdditionFailure("Invalid Request"));
    yield call(action.payload.onError(error));


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
      yield call(action.payload.onError(response.error_message));

    }
  } catch (error) {

    yield put(hideLoader());
    yield put(updateBranchLocationRadiusFailure("Invalid Request"));
    yield call(action.payload.onError(error));


  }
}

function* enableBranchRefence(action) {
  try {

    yield put(showLoader());

    const response = yield call(postEnableBranchRefence, action.payload.params);
    if (response.success) {

      yield put(hideLoader());
      yield put(enableBranchRefenceSuccess(response.details));
      yield call(action.payload.onSuccess(response.details));

    } else {

      yield put(hideLoader());
      yield put(enableBranchRefenceFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));

    }
  } catch (error) {

    yield put(hideLoader());
    yield put(enableBranchRefenceFailure("Invalid Request"));
    yield call(action.payload.onError(error));


  }
}

function* getEmployeeCheckinAssociations(action) {

  try {

    yield put(showLoader());

    const response = yield call(fetchEmployeeCheckinAssociations, action.payload);

    if (response.success) {

      yield put(hideLoader());
      yield put(getEmployeeCheckinAssociationsSuccess(response.details));
      yield call(action.payload.onSuccess(response.details));

    } else {

      yield put(hideLoader());
      yield put(getEmployeeCheckinAssociationsFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));

    }
  } catch (error) {

    yield put(hideLoader());
    yield put(getEmployeeCheckinAssociationsFailure("Invalid Request"));
    yield call(action.payload.onError(error));


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
      yield call(action.payload.onError(response.error_message));

    }
  } catch (error) {

    yield put(hideLoader());
    yield put(updatetEmployeeCheckinAssociationsFailure("Invalid Request"));
    yield call(action.payload.onError(error));


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
    yield call(action.payload.onError(error));


  }
}

function* getListAllBranches(action) {
  try {

    yield put(showLoader());

    const response = yield call(fetchListAllBranchesList, action.payload.params);

    if (response.success) {
      yield put(hideLoader());
      yield call(action.payload.onSuccess(response.details));
      yield put(getListAllBranchesListSuccess(response.details));

    } else {
      yield put(hideLoader());
      yield put(getListAllBranchesListFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getListAllBranchesListFailure("Invalid Request"));
    yield call(action.payload.onError(error));


  }
}

// delete Branch

function* deleteBranchSaga(action) {
  try {

    yield put(showLoader());

    const response = yield call(deleteBranchApi, action.payload.params);

    if (response.success) {
      yield put(hideLoader());
      yield call(action.payload.onSuccess(response));
      yield put(deleteBranchSuccess(response.details));

    } else {
      yield put(hideLoader());
      yield put(deleteBranchFailure(response.error_message));
      yield call(action.payload.onError(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(deleteBranchFailure("Invalid Request"));
    yield call(action.payload.onError(error));


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
  yield takeLatest(DELETE_BRANCH, deleteBranchSaga)

}

export default LocationSaga;