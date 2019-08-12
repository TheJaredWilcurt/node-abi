let dummy;
let releases;
try {
  // If this is not available, we are in dist
  dummy = require('nw-version/src/versi-ons.json');
  releases = require('./data.js');
} catch (err) {
  // use flattened dist data
  releases = require('./data.json');
}



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
  if (typeof(runTime) !== 'string') {
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


// ///// //
//  API  //
// ///// //

/**
 * Get the ABI of the passed in run time environment at the passed in version.
 * @param  {string}  version  The version number of the Run Time Environment (RTE)
 * @param  {string}  runTime  The name of the Run Time Enviroment, like Node.js or NW.js
 * @return {string}           The Application Binary Interface (ABI) version (like 11, 14, 46, 47, 72, etc) or false if bad inputs
 */
function getAbi (version, runTime) {
  const errorMessage = 'Could not detect ABI for version: "' + version + '" of Run Time: "' + runTime + '".';
  version = cleanVersion(version);
  runTime = cleanRunTime(runTime);

  if (!version || !runTime) {
    throw new Error(errorMessage);
    return false;
  }

  let release = false;

  release = releases[runTime].find(function (release) {
    return release.version === version;
  });

  if (!release) {
    throw new Error(errorMessage);
    return false;
  }

  return release.modules;
}

/**
 * Get's a version number for the supplied run time
 * environment that supports the supplied ABI.
 * @param  {number|string}  abi      The Application Binary Interface (ABI) version (like 11, 14, 46, 47, 72, etc)
 * @param  {string}         runTime  The Run Time Environment (RTE) like Node.js or NW.js.
 * @return {string}                  The version with matching ABI or false if bad inputs
 */
function getTarget (abi, runTime) {
  const errorMessage = 'Could not detect target for ABI: "' + abi + '" and Run Time: "' + runTime + '".';
  abi = cleanAbi(abi);
  runTime = cleanRunTime(runTime);

  if (!abi || !runTime) {
    throw new Error(errorMessage);
    return;
  }

  let release = false;

  release = releases[runTime].find(function (release) {
    return release.modules === abi;
  });

  if (!release) {
    throw new Error(errorMessage);
    return false;
  }

  return release.version;
}

exports.getAbi = getAbi;
exports.getTarget = getTarget;
