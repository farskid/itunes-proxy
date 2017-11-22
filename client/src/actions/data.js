const types = {
  EMPTY_RESULT: 'EMPTY_RESULT'
};

export default types;

export function emptyResult() {
  return {
    type: types.EMPTY_RESULT
  };
}
