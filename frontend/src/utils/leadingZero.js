export default function leadingZero(num) {
  if (typeof num !== 'number' && !isNaN(num)) {
    throw Error('leadingZeros expects parameter 1 to be number');
  }

  if (num < 0) {
    throw Error('leadingZeros expects parameter 1 to be positive');
  }

  if (num < 10) {
    return `0${num}`;
  }
  return `${num}`;
}
