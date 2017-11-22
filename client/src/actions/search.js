import { apiEndpoints } from '../constants';

const types = {
  SEARCH_REQUEST: 'SEARCH_REQUEST',
  SEARCH_SUCCESS: 'SEARCH_SUCCESS',
  SEARCH_FAILURE: 'SEARCH_FAILURE'
};

export default types;

const searchRequest = () => ({
  type: types.SEARCH_REQUEST
});

const searchSuccess = ({ resultCount, results }) => ({
  type: types.SEARCH_SUCCESS,
  count: resultCount,
  list: results
});

const searchFailure = error => ({
  type: types.SEARCH_FAILURE,
  error
});

export const search = (term, media, entity) =>
  function searchDispatcher(dispatch) {
    let url = `${apiEndpoints.search}?term=${encodeURIComponent(term)}`;

    if (media) {
      url += `&media=${media}`;
    }
    if (entity) {
      url += `&entity=${entity}`;
    }

    // Request
    dispatch(searchRequest());

    fetch(url)
      .then(json => json.json())
      .then(result => {
        if (result.error) {
          return dispatch(
            searchFailure({
              message: result.exception.errorMessage
            })
          );
        }
        return dispatch(searchSuccess(result.data));
      })
      .catch(error => dispatch(searchFailure(error)));
  };
