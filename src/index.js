const semver = require('semver');
const validation = require('./validation.js');
const cleanAbi = validation.cleanAbi;
const cleanRunTime = validation.cleanRunTime;
const cleanVersion = validation.cleanVersion;

let dummy;
let releases;
try {
  // If this is not available, we are in dist
  dummy = require('nw-version/src/versions.json');
  releases = require('../data/index.js');
} catch (err) {
  // use flattened dist data
  releases = require('../data/releases.json');
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

  // List is sorted newest to oldest.
  // Find closest or exact match without going over.
  // 'v6.7.1' => { version: 'v6.7.1', modules: '48' }
  // 'v6.9.9' => { version: 'v6.7.1', modules: '48' }
  for (let i = (releases[runTime].length - 1); i > -1; i--) {
    let currentRelease = releases[runTime][i];
    if (semver.lte(currentRelease.version, version)) {
      release = currentRelease;
    }
  }

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

  if (!abi && runTime === 'node') {
    return process.versions.node;
  }

  if (!abi || !runTime) {
    throw new Error(errorMessage);
    return;
  }

  let release = false;

  const filteredReleases = releases[runTime].filter(function (release) {
    return (
      !release.version.includes('alpha') &&
      !release.version.includes('beta') &&
      !release.version.includes('rc') &&
      !release.version.includes('nightly') &&
      !release.version.includes('unsupported')
    );
  });

  // Find newest stable release with matching ABI
  // '48' => { version: 'v6.7.1', modules: '48' }
  release = filteredReleases.find(function (release) {
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
