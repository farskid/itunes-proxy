import { isPlainObject } from 'root/utils';

/**
 * @function prepareExecute - Prepare exectution of rules
 * @param {Object[]} rules
 * @param {OBject} data
 */
function prepareExecute(rules, data) {
  return function execute(rule) {
    // End of flow
    if (rule === undefined) {
      return false;
    }
    // Validate rule object to have an id property
    if (!isPlainObject(rule) || rule.id === undefined) {
      throw new Error(
        'Invalid rule passed to `extecute`, expected rule to be plain object with an `id` property'
      );
    }

    // If Flow reaches an already executed rule, it's looping!
    if (rule.extecuted) {
      throw new Error('Infinite Loop in Flow');
    }

    // Mark as executed to avoid infinite loop
    rule.executed = true;
    // Check to decide the next path
    if (rule.ruleBody(data)) {
      // The rule passes when the body function return True by passing the data, hence running the true_id as next step
      rule.passed = true;
      execute(rules[rule.true_id]);
    } else {
      // The rule fails when the body function return False by passing the data, hence running the false_id as next step
      rule.passed = false;
      execute(rules[rule.false_id]);
    }
  };
}

export default prepareExecute;
