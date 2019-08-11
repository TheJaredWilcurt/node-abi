const nodeReleases = require('node-releases/data/raw/nodejs.json');
const nwVersions = require('nw-version/src/versions.json').versions;

function nwFromAbi (abi) {
  console.log(abi);

}

function getAbi (version, runTime) {
  console.log(version, runTime);
  console.log(nodeReleases);
}

/**
 * Get's a version number for the supplied run time
 * environment that supports the supplied ABI.
 * @param  {number|string}  abi      The Application Binary Interface (ABI) version (like 11, 14, 46, 47, 72, etc)
 * @param  {string}         runTime  The Run Time Environment (RTE) like Node.js or NW.js.
 * @return {string}                  The value matching value
 */
function getTarget (abi, runTime) {
  console.log(abi, runTime);
}

exports.nwFromAbi = nwFromAbi;
exports.getAbi = getAbi;
exports.getTarget = getTarget;
