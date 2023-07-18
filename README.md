# simple-cli

项目脚手架

## 项目初始化 init

```shell
pnpm init -y
```

## 脚本文件初始化

脚本执行原理,通过 package.json 中的 bin 字段配置脚本入口文件,当上传到 npm 服务器后,再从 npm 下载之后,npm install -g 之后脚本 bin 会添加到系统环境变量中,然后就可以在命令行使用,定义的脚本命令了(本地调试可以通过以下3进行调试,等等好像不需要install也能行得通)

### 1.package.json

脚本程序入口文件声明,`spc`是命令行输入的执行命令,值是脚本入口文件

```json
{
  "bin": {
    "spc": "./bin/index.js"
  }
}
```

### 2.脚本初始化

在./bin/index.js 中添加一个 js 脚本
声明是一个 node 环境执行的脚本文件

```js
#!/usr/bin/env node
console.log("我通过命令行,执行脚本啦~");
```

### 3.模拟安装脚本文件到 node_modules

安装之后,node_modules 中就会出现,脚手架的包 simple-cli

```shell
pnpm install .
# or
pnpm link
```

### 4.测试运行

命令行输入

```shell
spc
```

可以在命令看到 `我通过命令行, 执行脚本啦~` 脚本进行就初始化成功了
