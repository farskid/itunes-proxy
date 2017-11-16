import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import uuid from 'uuid';

// Lodash
import { isEqual } from 'lodash';

// Notification
import NotificationSystem from 'react-notification-system';

// Actions
import { clearNotifications } from '../../actions';

// Config
import { NOTIFICATION_DURATION } from '../../constants';

class Notification extends React.Component {
  constructor() {
    super();
    this.notificationSystem = null;
    // Bind
    this.emit = this.emit.bind(this);
    this.setRef = this.setRef.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.messages, this.props.messages)) {
      this.emit(nextProps.messages);
    }
  }

  setRef(node) {
    this.notificationSystem = node;
  }

  emit(messages) {
    if (!messages || !Array.isArray(messages) || !messages.length) {
      return;
    }
    messages.forEach(msg => {
      const uid = uuid.v4();
      this.notificationSystem.addNotification({
        message: msg.message,
        level: msg.level,
        position: 'tl',
        autoDismiss: msg.duration || NOTIFICATION_DURATION,
        uid
      });
      setTimeout(() => {
        this.notificationSystem.removeNotification(uid);
        this.props.clearNotifications();
      }, NOTIFICATION_DURATION);
    });
  }

  render() {
    return <NotificationSystem ref={this.setRef} />;
  }
}

const mapStateToProps = state => {
  const { messages } = state.message;
  return { messages };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      clearNotifications
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Notification);

Notification.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string,
      type: PropTypes.string,
      code: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    }).isRequired
  )
};

Notification.defaultProps = {
  messages: []
};
