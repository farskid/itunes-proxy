const types = {
  CLEAR_NOTIFICATIONS: 'CLEAR_NOTIFICATIONS'
};

export default types;

export function clearNotifications() {
  return {
    type: types.CLEAR_NOTIFICATIONS
  };
}
