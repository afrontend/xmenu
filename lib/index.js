"use strict";

const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const DEFAULT_RC_FILE = ".xmenu.json";

const run = (program, args = []) => {
  if (!program) return;
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
    program: cmd.program.split(" ")[0],
    args: _.tail(cmd.program.split(" "))
  };
};

const getCmdListFromFile = () => {
  const rcFilePath = path.resolve(process.env.HOME, DEFAULT_RC_FILE);

  let cmdList = [];

  if (fs.existsSync(rcFilePath)) {
    let obj = {};
    try {
      obj = JSON.parse(fs.readFileSync(rcFilePath, "utf8"));
    } catch (e) {
      console.log(`parse error (~/${DEFAULT_RC_FILE})`);
      obj.cmdList = [];
    }
    cmdList = obj.cmdList;
  }

  return _.map(cmdList, makeCmd);
};

const getCmdNames = () => {
  return _.map(getCmdListFromFile(), cmd => {
    return cmd.name;
  });
};

const getCmdByName = name => {
  var found = _.find(getCmdListFromFile(), cmd => {
    return cmd.name === name;
  });
  return found ? found : {};
};

module.exports = {
  run,
  getCmdNames,
  getCmdByName
};
