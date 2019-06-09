"use strict";

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

module.exports = {
  run
};
