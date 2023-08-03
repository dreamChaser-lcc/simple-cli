#!/usr/bin/env node
const commander = require('commander');

console.log('我通过命令行,执行脚本啦2002c');
commander
  .command("create <project-name>") // 增加创建指令
  .description("create a new project") // 添加描述信息
  .action((projectName, cmd) => {
    console.log('我执行创建脚本啦~',projectName, cmd);
    // 处理用户输入create 指令附加的参数
    require("../lib/creact")(projectName, cmd);
  });

commander
  .command("config [value]")
  .description("inspect and modify the config")
  .option("-g, --get <key>", "get value by key")
  .option("-s, --set <key> <value>", "set option[key] is value")
  .option("-d, --delete <key>", "delete option by key")
  .action((value, keys) => {
    console.log(value, keys);
  });
// 解析
commander.parse(process.argv);
// console.log("🚀 ~ file: index.js:16 ~ process:", process)
