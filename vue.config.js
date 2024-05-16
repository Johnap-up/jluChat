// const { defineConfig } = require('@vue/cli-service')
// const path = require("path")
// function resolve(dir) {
//   return path.join(__dirname, dir)
// }
// module.exports = {
// //路径根据自己的情况定，默认就填"./",静态资源的路径在static文件夹下就写’./static’
//   publicPath: './static',
// }
//
// module.exports = defineConfig({
//   transpileDependencies: true
// })
const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
  // publicPath: './static',
  productionSourceMap: false,
  transpileDependencies: true,
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'ChatGPT链接提取器';
      return args;
    });
  },
  pluginOptions: {
    electronBuilder: {
      webSecurity: false,
      // nodeIntegrationInWorker: true,
      // enableRemoteModule: true,
      // nodeIntegration: true,
      // contextIsolation: false,  //跟窗口的打开有关
      // nodeIntegrationInSubFrames: true,
      // webviewTag: true, // 这是允许 webview 标签的关键
      contentSecurityPolicy: "default-src 'self'; script-src 'self' 'unsafe-inline';",
      customFileProtocol: "./",
      // 所有用到的依赖
      builderOptions: {
        asar: true,
        "productName": "ChatGPT_By_Tukumi",	//项目名 这也是生成的exe文件的前缀名
        "appId": "com.ChatGPT_tools.Software",	//包名，独立区分用，否则卸载时有问题如将同名文件一同卸载，所以最好独立
        "copyright": "Tukumi",	//版权信息，随意
        "directories": {
          // 输出文件夹
          "output": "ChatGPT",//文件夹的名称
        },
        win: {
          icon: "./src/assets/icon/tukumi2.ico",//exe文件的图标，如果失败那大概是ico格式不纯
        },
        nsis: {
          perMachine: true,//获取管理员权限
          allowToChangeInstallationDirectory: true, // 允许修改安装目录，与下面的互斥
          oneClick: false,// 是否一键安装
          installerIcon: "./src/assets/icon/yao2.ico",//安装的图标
          installerHeaderIcon: "./src/assets/icon/yao2.ico",//安装头的图标
          uninstallerIcon: "./src/assets/icon/wys2.ico",//卸载的图标
          shortcutName: "ChatGPT_Faker",//安装时的标题
        },
      },
    }
  },
})
