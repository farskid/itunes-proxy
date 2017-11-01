/**
 * @name rules
 * @description Array of rules objects
 * @type Object[]
 */
const rules = [
  {
    id: 0,
    name: 'increment',
    ruleBody: 'return arguments[0].total += arguments[0].incrementer',
    true_id: 2,
    false_id: null
  },
  {
    id: 1,
    name: 'modulo',
    ruleBody: 'return arguments[0].total % arguments[0].modulo',
    true_id: null,
    false_id: 3
  },
  {
    id: 2,
    name: 'substract',
    ruleBody: 'return arguments[0].total -= arguments[0].substractor',
    true_id: 1,
    false_id: null
  },
  {
    id: 3,
    name: 'substract',
    ruleBody: 'return arguments[0].total -= arguments[0].substractor',
    true_id: null,
    false_id: 4
  },
  {
    id: 4,
    name: 'increment',
    ruleBody: 'return true',
    true_id: null,
    false_id: null
  }
];

// Export rules as JSON (Flow Engine works with an input of type json)
export default JSON.stringify(rules);
