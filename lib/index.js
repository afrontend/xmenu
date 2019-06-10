"use strict";

const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const run = (program, args = []) => {
  const child = spawn(program, args);
  child.stdout.on("data", data => {
    console.log(`${program} stdout: ${data}`);
  });
  child.stderr.on("data", data => {
    console.log(`${program} stderr: ${data}`);
  });
  child.on("close", code => {
    console.log(`${program} child process exited with code ${code}`);
  });
};

const makeCmd = (cmd, index) => {
  return {
    id: `id${index}`,
    name: cmd.title,
    program: cmd.program.split(' ')[0],
    args: _.tail(cmd.program.split(' '))
  }
}

const readCmdListFromFile = () => {

/*
 * ~/.fp-menu.json
 *
 * {
 *   "cmdList": [
 *     {
 *       "title": "xeyes",
 *       "program": "xeyes"
 *     }
 *   ]
 * }
 */

  const rc_file_path = path.resolve(process.env.HOME, '.xmenu.json')

  let cmdList = [];

  if (fs.existsSync(rc_file_path)) {
    let obj = {};
    try {
      obj = JSON.parse(fs.readFileSync(rc_file_path, 'utf8'));
    } catch (e) {
      notify("parse error (~/xmenu.json) ");
      obj.cmdList = [];
    }
    cmdList = obj.cmdList;
  }

  return _.map(cmdList, makeCmd);
}

module.exports = {
  run,
  readCmdListFromFile
};
