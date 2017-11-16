import { apiEndpoints } from '../constants';

const types = {
  SEARCH_REQUEST: 'SEARCH_REQUEST',
  SEARCH_SUCCESS: 'SEARCH_SUCCESS',
  SEARCH_FAILURE: 'SEARCH_FAILURE'
};

export default types;

const searchRequest = () => {
  return {
    type: types.SEARCH_REQUEST
  };
};

const searchSuccess = ({ resultCount, results }) => {
  return {
    type: types.SEARCH_SUCCESS,
    count: resultCount,
    list: results
  };
};

const searchFailure = error => {
  return {
    type: types.SEARCH_FAILURE,
    error
  };
};

export const search = (term, media, entity) => {
  console.log(term, media, entity);
  return function searchDispatcher(dispatch) {
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
        dispatch(searchSuccess(result.data));
      })
      .catch(error => {
        dispatch(searchFailure(error));
      });
  };
};
