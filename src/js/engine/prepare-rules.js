/**
 * @function prepareRules - Prepare rules to ease access to their properties on next methods
 * @param {Object[]} rules - Array of rules
 * rule: {
 *  id: {number} - ID of the rule
 *  body: {string} - A string indicating the bofy of the rule logic (Body of function)
 *  true_id: {number|null} - Runs in case the rule passes: ID of the next rule or null to terminate the flow
 *  false_id: {number|null} - Runs in case the rule fails: ID of the next rule or null to terminate the flow
 * }
*/
export default function prepareRules(rules) {
  // Validate if rules is an array of objects with at least an `id` property
  if (!Array.isArray(rules) || !rules.every(item => item.id !== undefined)) {
    throw new Error(
      'prepareRules expects rules to be an array of objects with a unique id proerty'
    );
  }
  // convert ids to object keys for easier access
  return rules.reduce((rulesObject, rule) => {
    // create function out of ruleBody
    rule.originalRuleBody = rule.ruleBody;
    rule.ruleBody = new Function(rule.ruleBody);

    rulesObject[rule.id] = rule;

    return rulesObject;
  }, {});
}
