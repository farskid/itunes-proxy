import React from 'react';
import PropTypes from 'prop-types';
import withLogger from 'components/withLogger/withLogger';
import withEngine from 'components/withEngine/withEngine';
import FlowItem from 'components/FlowItem/FlowItem';

class Flow extends React.Component {
  constructor() {
    super();
    this.sortRules = this.sortRules.bind(this);
    this.state = {
      flow: null,
      path: null
    };
  }
  componentDidCatch(error, errorInfo) {
    window.alert('Caught Error in Flow');
    this.props.logger.error(error, errorInfo);
  }

  componentDidMount() {
    // The original flow
    const flow = this.props.runRules(
      this.props.prepareRules(this.props.rules),
      this.props.data
    );
    // The path that the flow follows
    const path = this.sortRules(flow);

    this.setState({
      flow,
      path
    });
  }

  sortRules(flow) {
    // Since the logic of path detection only cares about the next item, we have to manually add the 0th item to start the process
    const path = [flow[0]];

    // Create the path by starting from the 0th item
    next(flow[0]);

    /**
     * Recursively gets an item and decides what's the next item in the path
     */
    function next(item) {
      // Boundary of recursion
      if (!item) {
        return;
      }

      // Always check for the next item (no matter it passes), in order not to be undefined, unless the path array will raise an error in render phase
      if (item.passed && flow[item.true_id] !== undefined) {
        path.push(flow[item.true_id]);
        next(flow[item.true_id]);
      }
      if (!item.passed && flow[item.false_id] !== undefined) {
        path.push(flow[item.false_id]);
        next(flow[item.false_id]);
      }
    }

    return path;
  }

  render() {
    if (!this.state.flow) {
      return <p>Running the flow...</p>;
    }
    return (
      <div className="flow">
        {this.state.path.map(rule => {
          return <FlowItem key={rule.id} rule={rule} />;
        })}
      </div>
    );
  }
}

export default withLogger(withEngine(Flow));

Flow.propTypes = {
  // Should be of type json (lack of validator on prop-types)
  // TODO: turn it into a custom validator for json detection
  data: PropTypes.object.isRequired,
  rules: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      ruleBody: PropTypes.string.isRequired,
      // true_id and false_id can be null as well, since prop-types does not suppert type Null right now, not marking a property as isRequired means it can be null as well. so feel free to pass null too.
      true_id: PropTypes.number,
      false_id: PropTypes.number
    })
  ).isRequired
};
