import endpoints from "../../../api/endpoints";

export const FETCH_LIST_PENDING = "FETCH_LIST_PENDING";
export const FETCH_LIST_SUCCESS = "FETCH_LIST_SUCCESS";
export const FETCH_LIST_FAILED = "FETCH_LIST_FAILED";
export const VOLUNTEER_CHANGE_SUCCESS = "VOLUNTEER_CHANGE_SUCCESS";
export const VOLUNTEER_CHANGE_PENDING = "VOLUNTEER_CHANGE_PENDING";
export const VOLUNTEER_CHANGE_FAILED = "VOLUNTEER_CHANGE_FAILED";

export const fetchVolunteerList = () => async (dispatch) => {
  try {
    const res = await endpoints.listVolunteers();
    dispatch({ type: FETCH_LIST_SUCCESS, payload: res.data });
  } catch (e) {
    dispatch({ type: FETCH_LIST_FAILED });
  }
};

export const changeAccess = (volunteerId, newAccessStatus) => async (
  dispatch
) => {
  dispatch({ type: VOLUNTEER_CHANGE_PENDING, payload: { _id: volunteerId } });
  try {
    const res = await endpoints.changeVolunteerAccess(
      newAccessStatus,
      volunteerId
    );

    dispatch({
      type: VOLUNTEER_CHANGE_SUCCESS,
      payload: res.data,
    });
  } catch (e) {
    dispatch({ type: VOLUNTEER_CHANGE_FAILED, payload: { _id: volunteerId } });
  }
};