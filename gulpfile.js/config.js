/*!
Copyright 2024 apHarmony

This file is part of jsHarmony.

jsHarmony is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

jsHarmony is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with this package.  If not, see <http://www.gnu.org/licenses/>.
*/

const nPath = require('path');

const ROOT = nPath.resolve(nPath.join(__dirname, '../'));

const paths = {
  /** The path to the root of the project */
  root: ROOT,
  /** The path to the output build files */
  distRoot: nPath.join(ROOT, 'dist'),
  /** The path to the output documentation files */
  docsRoot: nPath.join(ROOT, 'docs'),
  /** The path to the root folder for the Gulp files */
  gulpRoot: nPath.join(ROOT, 'gulpfile.js'),
  /** The path to the root folder for source files */
  srcRoot: nPath.join(ROOT, 'src')
}



module.exports.paths = paths;
