import React from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

class LazyAudio extends React.Component {
  constructor() {
    super();
    this.uuid = uuid.v4();
    this.elem = null;
    this.state = {
      activated: false
    };

    // Bindings
    this.activate = this.activate.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.activated !== this.state.activated;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activated !== this.state.activated) {
      this.elem = document.getElementById(this.uuid);
      this.elem.addEventListener('loadeddata', () => {
        this.play();
      });
    }
  }

  play() {
    this.elem.play();
  }
  pause() {
    this.elem.pause();
  }

  activate() {
    this.setState({
      activated: true
    });
  }

  render() {
    if (!this.props.src) {
      return null;
    }
    return (
      <div className="ui-audio">
        {this.state.activated && (
          /* eslint-disable jsx-a11y/media-has-caption */
          <audio
            id={this.uuid}
            className="audio"
            src={this.props.src}
            controls
          />
        )}
        {!this.state.activated && <Button onClick={this.activate}>Play</Button>}
      </div>
    );
  }
}

export default LazyAudio;

LazyAudio.propTypes = {
  src: PropTypes.string
};

LazyAudio.defaultProps = {
  src: ''
};
