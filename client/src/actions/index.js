import searchTypes, { search } from './search';
import lookupTypes, { lookup } from './lookup';
import dataTypes, { emptyResult } from './data';
import notificationTypes, { clearNotifications } from './notification';

// Export action creators
export { search, lookup, emptyResult, clearNotifications };
// Export action types
export default {
  ...searchTypes,
  ...lookupTypes,
  ...dataTypes,
  ...notificationTypes
};
