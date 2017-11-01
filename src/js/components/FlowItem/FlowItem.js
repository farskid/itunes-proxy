import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class FlowItem extends React.Component {
  constructor() {
    super();
    this.collapse = this.collapse.bind(this);
    this.state = {
      collapsed: false
    };
  }

  collapse(bool) {
    this.setState({
      collapsed: bool
    });
  }

  render() {
    const { rule } = this.props;
    let { id, name, passed, originalRuleBody, true_id, false_id } = rule;

    // Make them as type {String} to make sure they show up in the UI
    true_id = String(true_id);
    false_id = String(false_id);

    return (
      <div
        className={classnames('rule card', {
          'card--collapsed': this.state.collapsed
        })}
      >
        <header
          onClick={() => this.collapse(!this.state.collapsed)}
          className={classnames('card__header', {
            'bg--success': passed,
            'bg--danger': !passed
          })}
        >
          <div className="card__counter">{id}</div>
          <h2 className="card__title">{name}</h2>
        </header>
        <div className="card__main">
          <div className="card__main__inner">
            <div>
              <h3 className="card__subtitle">Rule Body</h3>
              <pre>{originalRuleBody}</pre>
            </div>
            <div className="row">
              <div className="col-half">
                <h3 className="card__subtitle">Next rule-id if passed</h3>
                <pre>{true_id}</pre>
              </div>
              <div className="col-half">
                <h3 className="card__subtitle">Next rule-id if failed</h3>
                <pre>{false_id}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FlowItem;

FlowItem.propTypes = {
  rule: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    ruleBody: PropTypes.func.isRequired,
    // true_id and false_id can be null as well, since prop-types does not suppert type Null right now, not marking a property as isRequired means it can be null as well. so feel free to pass null too.
    true_id: PropTypes.number,
    false_id: PropTypes.number
  }).isRequired
};
