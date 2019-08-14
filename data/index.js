// /////////////////////////////// //
//  IMPORT AND CLEAN UP RELEASES:  //
// /////////////////////////////// //

const semver = require('semver');
const iojsReleases = require('node-releases/data/raw/iojs.json');
let nodeReleases = require('node-releases/data/raw/nodejs.json');
let nwReleases = require('nw-version/src/versions.json').versions;
let internsSideProject = require('electron-releases/lite.json');

function sortByVersion (releases) {
  return releases.sort(function (a,b) {
    if (semver.gt(a.version, b.version)) {
      return -1;
    } else if (semver.lt(a.version, b.version)) {
      return 1;
    }
    return 0;
  });
}

iojsReleases.forEach(function (release) {
  nodeReleases.push(release);
});

nodeReleases.forEach(function (release) {
  if (release.modules) {
    // '0x000C' => 12 => '12'
    release.modules = String(Number(release.modules));
  }
  delete release.date;
  delete release.files;
  delete release.lts;
  delete release.npm;
  delete release.openssl;
  delete release.security;
  delete release.uv;
  delete release.v8;
  delete release.zlib;
});
nodeReleases = nodeReleases.filter(function (release) {
  return release.version && release.modules;
});
nodeReleases = sortByVersion(nodeReleases);

nwReleases.forEach(function (release) {
  let nwNodeRelease = 'v' + release.components.node.split('-')[0];
  let matchingNodeRelease = nodeReleases.find(function (nodeRelease) {
    return nodeRelease.version === nwNodeRelease;
  });
  release.modules = matchingNodeRelease.modules;

  delete release.files;
  delete release.flavors;
  delete release.components;
});
nwReleases = nwReleases.filter(function (release) {
  return release.modules && release.version;
});
nwReleases = sortByVersion(nwReleases);


internsSideProject = internsSideProject.filter(function (jank) {
  return jank.version && jank.deps && jank.deps.modules;
});
internsSideProject.forEach(function (jank) {
  jank.version = 'v' + jank.version;
  jank.modules = jank.deps.modules;
  delete jank.node_id;
  delete jank.tag_name;
  delete jank.name;
  delete jank.prerelease;
  delete jank.published_at;
  delete jank.npm_package_name;
  delete jank.deps;
  delete jank.npm_dist_tags;
  delete jank.total_downloads;
});
internsSideProject = sortByVersion(internsSideProject);


const allReleases = {
  /*
    [
      { version: 'v12.1.0',  modules: '72' },
      { version: 'v12.0.0',  modules: '72' },
      { version: 'v11.15.0', modules: '67' },
      { version: 'v11.14.0', modules: '67' },
      ...
    ]
  */
  node: nodeReleases,
  /*
    [
      { version: 'v0.39.0-beta1', modules: '72' },
      { version: 'v0.38.2',       modules: '72' },
      { version: 'v0.38.1',       modules: '72' },
      { version: 'v0.38.0',       modules: '67' },
      ...
    ]
  */
  nw: nwReleases,
  /*
    [
      { version: '3.0.0-beta.1',               modules: '64' },
      { version: '2.1.0-unsupported.20180809', modules: '57' },
      { version: '2.0.18',                     modules: '57' },
      { version: '2.0.17',                     modules: '57' },
      ...
    ]
  */
  electrom: internsSideProject
};

try {
  const file = require('path').join(__dirname, 'releases.json');
  require('fs').writeFileSync(file, JSON.stringify(allReleases, null, 2) + '\n');
} catch (err) {
  console.log(err);
}

exports.releases = allReleases;
