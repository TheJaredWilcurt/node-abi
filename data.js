// /////////////////////////////// //
//  IMPORT AND CLEAN UP RELEASES:  //
// /////////////////////////////// //

let nodeReleases = require('node-releases/data/raw/nodejs.json');
const iojsReleases = require('node-releases/data/raw/iojs.json');
const nwReleases = require('nw-version/src/versions.json').versions;
let internsSideProject = require('electron-releases/lite.json');

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
  return release.modules;
});


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


internsSideProject = internsSideProject.filter(function (jank) {
  return jank.version && jank.deps && jank.deps.modules;
});
internsSideProject.forEach(function (jank) {
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



const releases = {
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
  require('fs').writeFileSync('./data.json', JSON.stringify(releases, null, 2) + '\n');
} catch (err) {
  console.log(err);
}

exports.releases = releases;
