var path = require('path');

var _root = path.resolve(__dirname, '..', '..');

function buildPathFromRoot(args) {
  args = Array.prototype.slice.call(arguments, 0);
  let p = path.join.apply(path, [_root].concat(args));
  console.log(`helper.buildPathFromRoot() ${p}`);
  return p;
}

exports.buildPathFromRoot = buildPathFromRoot;
