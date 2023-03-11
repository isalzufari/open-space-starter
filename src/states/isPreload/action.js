/**
 * @TODO: Define all the actions (creator) for the isPreLoad state
 */
import api from '../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action';

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
    try {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      dispatch(setAuthUserActionCreator(null));
    } finally {
      dispatch(setIsPreloadActionCreator(false));
    }
  };
}

export {
  ActionType,
  setIsPreloadActionCreator,
  asyncPreloadProcess,
};
