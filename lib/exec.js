// Copyright © 2018 Jan Keromnes.
// The following code is covered by the MIT license.

const child_process = require('child_process');
const minimist = require('minimist');
const util = require('util');
const exec = util.promisify(child_process.exec);

const argv = minimist(process.argv.slice(2));

module.exports = async (cmd) => {
  if (argv.dry || argv.verbose) {
    console.log(`  Running: ${cmd}`);
  }

  if (argv.dry) {
    return '';
  }

  const { stdout, stderr } = await exec(cmd);
  if (stderr) {
    throw stderr;
  }

  return stdout;
};