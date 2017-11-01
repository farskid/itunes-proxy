import prepareExecute from './prepare-execution';

/**
 * @function runRules - Runs rules in sequential order
 * @param {Object[]} rules
 * @param {Object} data
 */
export default function runRules(rules, data) {
  const firstRule = rules[0];
  // Prepare all rules
  const execute = prepareExecute(rules, data);

  if (!execute(firstRule)) {
    // Finish the flow if anywhere caught return false
    return rules;
  }
}
