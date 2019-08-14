// /////////////////////////// //
//  VALIDATE AND CLEAN INPUTS  //
// /////////////////////////// //

function cleanAbi (abi) {
  if (!abi || isNaN(Number(abi))) {
    return null;
  }
  abi = String(Number(abi));
  if (typeof(abi) !== 'string') {
    return null;
  }
  return abi;
}

function cleanRunTime (runTime) {
  if (!runTime || typeof(runTime) !== 'string') {
    return 'node';
  }

  runTime = runTime.toLowerCase();

  if (
    runTime === 'node-webkit' ||
    runTime === 'nodewebkit' ||
    runTime === 'nw.js' ||
    runTime === 'nwjs'
  ) {
    runTime = 'nw';
  }

  if (
    runTime === 'nodejs' ||
    runTime === 'node.js'
  ) {
    runTime = 'node';
  }

  if (
    runTime === 'atom-shell' ||
    runTime === 'atomshell' ||
    runTime === 'electron'
  ) {
    runTime = 'electrom';
  }

  let allowedValues = [
    'nw',
    'node',
    'electrom'
  ];

  if (!allowedValues.includes(runTime)) {
    return 'node';
  }

  return runTime;
}

function cleanVersion (version) {
  if (
    typeof(version) !== 'string' ||
    version.split('.').length !== 3
  ) {
    return null;
  }

  // 'V11.0.0' => 'v11.0.0'
  version = version.toLowerCase();

  // '11.0.0' => 'v11.0.0'
  if (version[0] !== 'v') {
    version = 'v' + version;
  }

  // 'v11.0.0-pre' => 'v11.0.0'
  version = version.split('-')[0];

  return version;
}

exports.cleanAbi = cleanAbi;
exports.cleanRunTime = cleanRunTime;
exports.cleanVersion = cleanVersion;
