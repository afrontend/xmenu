#!/usr/bin/env node
const _ = require("lodash");
const Configstore = require("configstore");
const figlet = require("figlet");
const inquirer = require("inquirer");
const pkg = require("../package.json");
const program = require("commander");
const { run, getCmdList, getCmdListFromFile } = require("../lib/index.js");

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
  .option("-s, --show-config-file", "show config file")
  .option("-c, --config-file <file>", "use config file")
  .parse(process.argv);

const getCommand = (name, list) => {
  const found = _.find(list, cmd => {
    return cmd.name.includes(name);
  });
  return found ? found : {};
};

const onlyName = (list) => {
  return _.map(list, cmd => {
    return cmd.name;
  });
}

const displayMenu = (cmdList) => {
  if (cmdList.length > 0) {
    inquirer
      .prompt([
        {
          type: "list",
          name: "name",
          message: "choice",
          choices: onlyName(cmdList),
          default: getDefaultName()
        }
      ])
      .then(answers => {
        const c = getCommand(answers.name, cmdList);
        if (c.program) {
          if (answers.name) {
            setDefaultCmd(answers.name);
            run(c.program, c.args);
            process.exit(0);
          } else {
            process.exit(1);
          }
        } else {
          if (c.cmdList) {
            displayMenu(c.cmdList);
          } else {
            process.exit(1);
          }
        }
      });
  }
}

function activate(option) {
  if (option.showConfigFile) {
    console.log(`
{
  "cmdList": [
    {
      "title": "xeyes",
      "program": "xeyes"
    },
    {
      "title": "terminal",
      "cmdList": [
        {
          "title": "xterm",
          "program": "xterm"
        },
        {
          "title": "gnome-terminal",
          "program": "gnome-terminal"
        },
        {
          "title": "terminator",
          "program": "terminator"
        }
      ]
    }
  ]
}
`);
  return;
  }

  let cmdList = [];
  introMessage("xmenu");
  if (option.configFile) {
    cmdList = getCmdListFromFile(option.configFile);
  } else {
    cmdList = getCmdList();
  }

  displayMenu(cmdList);
}

activate(program);
