import { apiEndpoints } from '../constants';

const types = {
  LOOKUP_REQUEST: 'LOOKUP_REQUEST',
  LOOKUP_SUCCESS: 'LOOKUP_SUCCESS',
  LOOKUP_FAILURE: 'LOOKUP_FAILURE'
};

export default types;

const lookupRequest = () => ({
  type: types.LOOKUP_REQUEST
});

const lookupSuccess = ({ resultCount, results }) => ({
  type: types.LOOKUP_SUCCESS,
  count: resultCount,
  list: results
});

const lookupFailure = error => ({
  type: types.LOOKUP_FAILURE,
  error
});

export const lookup = (id, media, entity, type) =>
  function lookupDispatcher(dispatch) {
    const url = `${apiEndpoints.lookup}?${type}=${id}`;

    // Request
    dispatch(lookupRequest());

    fetch(url)
      .then(json => json.json())
      .then(result => {
        if (result.error) {
          return dispatch(
            lookupFailure({
              message: result.exception.errorMessage
            })
          );
        }
        return dispatch(lookupSuccess(result.data));
      })
      .catch(error => dispatch(lookupFailure(error)));
  };
