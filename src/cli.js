#!/usr/bin/env node
const Configstore = require("configstore");
const figlet = require("figlet");
const inquirer = require("inquirer");
const pkg = require("../package.json");
const program = require("commander");
const { run, getCmdNames, getCmdByName } = require("../lib/index.js");

const conf = new Configstore(pkg.name, {});
const getDefaultName = () =>
  conf.get("name") === undefined ? "terminator" : conf.get("name");
const setDefaultCmd = name => conf.set("name", name);

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
          default: getDefaultName()
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
    inquirer
      .prompt([
        {
          type: "list",
          name: "name",
          message: "What?",
          choices: getCmdNames(),
          default: getDefaultName()
        }
      ])
      .then(answers => {
        if (answers.name) {
          setDefaultCmd(answers.name);
          const c = getCmdByName(answers.name);
          run(c.program, c.args);
          process.exit(0);
        } else {
          process.exit(1);
        }
      });
  }
}

activate(program);
