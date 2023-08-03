const path = require("path");
const Generator = require("./generator");
const fs = require("fs-extra");

module.exports = async function (projectName, options) {
  if (!/^[a-z\d-]+$/.test(projectName)) {
    console.log("项目名称只能由小写字母，数字，横杆组成");
    return;
  }
  // 获取当前工作目录
  const cwd = process.cwd();
  // 拼接得到项目目录
  const targetDirectory = path.join(cwd, projectName);
  // 判断目录是否存在
  if (fs.existsSync(targetDirectory)) {
    console.log(`${projectName} 目录已经存在`);
    return;
  }
  // 创建项目
  const generator = new Generator(projectName, targetDirectory);

  generator.create();
};