const path = require("path");
const chalk = require("chalk");
const ora = require("ora");
const util = require("util");
const inquirer = require("inquirer");
const downloadGitRepo = require("download-git-repo"); // 不支持 Promise
const childProc = require("child_process"); // 调用命令行
const fetch = require("node-fetch");

/**
 * 添加终端加载动画
 * @param {*} fn 异步执行函数
 * @param {*} message 等待信息
 * @param  {...any} args 参数
 * @returns
 */
async function wrapLoading(fn, message, ...args) {
  // 使用 ora 初始化，传入提示信息 message
  const spinner = ora(message);
  // 开始加载动画
  spinner.start();

  try {
    // 执行传入方法 fn
    const result = await fn(...args);
    // 状态为修改为成功
    spinner.succeed();
    return result;
  } catch (error) {
    // 状态为修改为失败
    spinner.fail("Request failed, refetch ...");
  }
}

/**
 * 模板生成
 */
class Generator {
  constructor(projectName, targetDir) {
    this.projectName = projectName;
    this.targetDir = targetDir; // 改造 download-git-repo 支持 promise
  }

  downloadGitRepo = util.promisify(downloadGitRepo);

  async getRepo() {
    // 获取预设模板信息
    const res = await fetch(
      "https://api.github.com/repos/dreamChaser-lcc/h5-template-vite"
    ).then((res) => {
      return res.json();
    });

    const repoOpts = Array.isArray(res) ? res : [res];

    // 终端输入选择模板仓库
    const { repo } = await inquirer.prompt({
      name: "repo",
      type: "list",
      choices: repoOpts,
      message: "Please choose a template to create project",
    });
    return repo;
  }

  async download(repo) {
    const requestUrl = `dreamChaser-lcc/${repo}`;

    await wrapLoading(
      this.downloadGitRepo, // 下载git仓库
      "waiting download template",
      requestUrl,
      path.resolve(process.cwd(), this.targetDir) // process.cwd() 返回一个字符串,该字符串指定node.js进程的当前工作目录
    );
  }

  async create() {
    const repo = await this.getRepo();
    // 下载模板到本地
    await this.download(repo);

    console.log(`Successfully created project ${chalk.cyan(this.projectName)}\r\n`);
    console.log(`  cd ${chalk.cyan(this.projectName)}\r\n`);
    console.log("  npm install\r\n");
    console.log("  npm run dev\r\n");
  }
}

module.exports = Generator;
