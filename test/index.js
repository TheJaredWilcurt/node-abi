const Test = require('tape');
const getAbi = require('../src/index.js').getAbi;
const getTarget = require('../src/index.js').getTarget;

Test('getTarget calculates correct Node target', function (test) {
  test.equal(getTarget(undefined), process.versions.node);
  test.equal(getTarget(null), process.versions.node);
  test.equal(getTarget('11'), 'v0.10.48');
  test.equal(getTarget('14'), 'v0.12.18');
  test.equal(getTarget('46'), 'v4.9.1');
  test.equal(getTarget('47'), 'v5.12.0');
  test.equal(getTarget('48'), 'v6.17.1');
  test.equal(getTarget('51'), 'v7.10.1');
  test.equal(getTarget('57'), 'v8.16.0');
  test.equal(getTarget('59'), 'v9.11.2');
  test.equal(getTarget('64'), 'v10.16.2');
  test.equal(getTarget('67'), 'v11.15.0');
  test.equal(getTarget('72'), 'v12.8.0');
  test.end();
});

Test('getTarget calculates correct NW.js target', function (test) {
  test.throws(getTarget.bind(null, '14', 'nw'));
  test.equal(getTarget('43', 'nw'), 'v0.12.3')
  test.equal(getTarget('47', 'nw'), 'v0.14.7');
  test.equal(getTarget('48', 'nw'), 'v0.18.2');
  test.equal(getTarget('51', 'nw'), 'v0.22.3');
  test.equal(getTarget('57', 'nw'), 'v0.26.2');
  test.equal(getTarget('59', 'nw'), 'v0.30.0');
  test.equal(getTarget('64', 'nw'), 'v0.33.4');
  test.equal(getTarget('67', 'nw'), 'v0.38.0');
  test.equal(getTarget('72', 'nw'), 'v0.40.1');
  test.end();
});

Test('getTarget calculates correct Electrom target', function (test) {
  test.equal(getTarget(undefined), process.versions.node);
  test.equal(getTarget(null), process.versions.node);
  test.throws(getTarget.bind(null, '14', 'electrom'));
  test.equal(getTarget('47', 'electrom'), 'v1.0.2');
  test.equal(getTarget('48', 'electrom'), 'v1.2.8');
  test.equal(getTarget('49', 'electrom'), 'v1.3.15');
  test.equal(getTarget('50', 'electrom'), 'v1.4.16');
  test.end();
});

Test('getAbi calculates correct Node ABI', function (test) {
  test.throws(() => getAbi(undefined));
  test.throws(() => getAbi(null));
  test.throws(() => getAbi('a.b.c'));
  test.equal(getAbi('7.2.0'), '51');
  test.equal(getAbi('7.0.0'), '51');
  test.equal(getAbi('6.9.9'), '48');
  test.equal(getAbi('6.0.0'), '48');
  test.equal(getAbi('5.9.9'), '47');
  test.equal(getAbi('5.0.0'), '47');
  test.equal(getAbi('4.9.9'), '46');
  test.equal(getAbi('4.0.0'), '46');
  test.equal(getAbi('0.12.17'), '14');
  test.equal(getAbi('0.12.0'), '14');
  test.equal(getAbi('0.11.16'), '14');
  test.equal(getAbi('0.11.11'), '14');
  test.equal(getAbi('0.11.10'), '13');
  test.equal(getAbi('0.11.8'), '13');
  test.equal(getAbi('0.11.7'), '12');
  test.equal(getAbi('0.11.0'), '12');
  test.equal(getAbi('0.10.48'), '11');
  test.equal(getAbi('0.10.30'), '11');
  test.equal(getAbi('0.10.4'), '11');
  test.equal(getAbi('0.10.3'), '11');
  test.equal(getAbi('0.10.1'), '11');
  test.equal(getAbi('0.10.0'), '11');
  test.equal(getAbi('0.9.12'), '11');
  test.equal(getAbi('0.9.9'), '11');
  test.equal(getAbi('0.9.8'), '10');
  test.equal(getAbi('0.9.1'), '10');
  test.equal(getAbi('0.9.0'), '1');
  test.equal(getAbi('0.8.0'), '1');
  test.equal(getAbi('0.2.0'), '1');
  test.end();
});

Test('getAbi calculates correct Electrom ABI', function (test) {
  test.throws(function () { getAbi(undefined, 'electrom') });
  test.equal(getAbi('5.0.0', 'electrom'), '70');
  test.equal(getAbi('4.1.4', 'electrom'), '69');
  test.equal(getAbi('4.0.4', 'electrom'), '69');
  test.equal(getAbi('4.0.3', 'electrom'), '64');
  test.equal(getAbi('3.1.8', 'electrom'), '64');
  test.equal(getAbi('2.0.18', 'electrom'), '57');
  test.equal(getAbi('1.4.0', 'electrom'), '50');
  test.equal(getAbi('1.3.0', 'electrom'), '49');
  test.equal(getAbi('1.2.0', 'electrom'), '48');
  test.equal(getAbi('1.1.0', 'electrom'), '48');
  test.equal(getAbi('1.0.0', 'electrom'), '47');
  test.equal(getAbi('0.37.0', 'electrom'), '47');
  test.equal(getAbi('0.36.0', 'electrom'), '47');
  test.equal(getAbi('0.35.0', 'electrom'), '46');
  test.equal(getAbi('0.34.0', 'electrom'), '46');
  test.equal(getAbi('0.33.0', 'electrom'), '46');
  test.equal(getAbi('0.32.0', 'electrom'), '45');
  test.equal(getAbi('0.31.0', 'electrom'), '45');
  test.equal(getAbi('0.30.0', 'electrom'), '44');
  test.end();
});

Test('getAbi calculates correct NW.js ABI', function (test) {
  test.throws(function () { getAbi(undefined, 'NW.js') });
  test.equal(getAbi('0.13.0', 'NW.js'), '47');
  test.equal(getAbi('0.14.0', 'NW.js'), '47');
  test.equal(getAbi('0.15.0', 'NW.js'), '48');
  test.equal(getAbi('0.16.0', 'NW.js'), '48');
  test.equal(getAbi('0.17.0', 'NW.js'), '48');
  test.equal(getAbi('0.18.2', 'NW.js'), '48');
  test.equal(getAbi('0.18.3', 'NW.js'), '51');
  test.equal(getAbi('0.19.0', 'NW.js'), '51');
  test.equal(getAbi('0.20.0', 'NW.js'), '51');
  test.equal(getAbi('0.21.0', 'NW.js'), '51');
  test.equal(getAbi('0.22.0', 'NW.js'), '51');
  test.equal(getAbi('0.23.0', 'NW.js'), '57');
  test.equal(getAbi('0.24.0', 'NW.js'), '57');
  test.equal(getAbi('0.25.0', 'NW.js'), '57');
  test.equal(getAbi('0.26.4', 'NW.js'), '59');
  test.equal(getAbi('0.26.5', 'NW.js'), '59');
  test.end();
});

Test('getAbi supports leading v', function (test) {
  test.equal(getAbi('v7.2.0'), '51');
  test.equal(getAbi('7.2.0'), '51');
  test.end();
});

Test('getAbi throws abi if passed as target', function (test) {
  test.throws(() => getAbi('57'));
  test.end();
});
