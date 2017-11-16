import { apiEndpoints } from '../constants';

const types = {
  LOOKUP_REQUEST: 'LOOKUP_REQUEST',
  LOOKUP_SUCCESS: 'LOOKUP_SUCCESS',
  LOOKUP_FAILURE: 'LOOKUP_FAILURE'
};

export default types;

const lookupRequest = () => {
  return {
    type: types.LOOKUP_REQUEST
  };
};

const lookupSuccess = ({ resultCount, results }) => {
  return {
    type: types.LOOKUP_SUCCESS,
    count: resultCount,
    list: results
  };
};

const lookupFailure = error => {
  return {
    type: types.LOOKUP_FAILURE,
    error
  };
};

export const lookup = (id, media, entity, type) => {
  return function lookupDispatcher(dispatch) {
    let url = `${apiEndpoints.lookup}?${type}=${id}`;

    // Request
    dispatch(lookupRequest());

    fetch(url)
      .then(json => json.json())
      .then(result => {
        dispatch(lookupSuccess(result.data));
      })
      .catch(error => {
        dispatch(lookupFailure(error));
      });
  };
};
