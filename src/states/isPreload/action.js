/**
 * @TODO: Define all the actions (creator) for the isPreLoad state
 */
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { setAuthUserActionCreator } from '../authUser/action';
import api from '../../utils/api';

const ActionType = {
  SET_IS_PRELOAD: 'SET_ID_PRELOAD',
};

function setIsPreloadActionCreator(isPreLoad) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreLoad,
    },
  };
}

function asyncPreloadProcess() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      dispatch(setAuthUserActionCreator(null));
    } finally {
      dispatch(setIsPreloadActionCreator(false));
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  setIsPreloadActionCreator,
  asyncPreloadProcess,
};
