#!/usr/bin/env node
const Configstore = require("configstore");
const figlet = require("figlet");
const inquirer = require("inquirer");
const pkg = require("../package.json");
const program = require("commander");
const { run, readCmdListFromFile } = require("../lib/index.js");

const conf = new Configstore(pkg.name, {});
const getDefaultCmd = () =>
  conf.get("cmd") === undefined ? "terminator" : conf.get("cmd");
const setDefaultCmd = cmd => conf.set("cmd", cmd);

const introMessage = msg => {
  console.log(
    figlet.textSync(msg, {
      font: "Standard",
      horizontalLayout: "default",
      verticalLayout: "default"
    })
  );
};

program
  .version(pkg.version)
  .option("-i, --interactive", "interactive mode")
  .option("-c, --cmd [cmd]", "command")
  .option("-s, --show", "show commands")
  .parse(process.argv);

function activate(option) {
  if (option.interactive) {
    introMessage("xmenu");
    inquirer
      .prompt([
        {
          type: "input",
          name: "cmd",
          message: "명령어",
          default: getDefaultCmd()
        }
      ])
      .then(answers => {
        if (answers.cmd) {
          setDefaultCmd(answers.cmd);
          run(answers.cmd);
        }
      });
  }

  if (option.show) {
    console.log(JSON.stringify(readCmdListFromFile()));
  }
}

activate(program);
