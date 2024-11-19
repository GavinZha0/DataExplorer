<div align="center"> <a href="https://github.com/GavinZha0/DataPie"> <img alt="DataPie Logo" width="200" height="200" src="/public/resource/img/ninestar.png"> </a> <br> <br>

<h1>DataPie</h1>
</div>

**中文** | [English](./README.md)

## 简介
DataPie是一个低代码数据平台，为快速构建AI和BI应用而生。
- DataExplorer: DataPie前端 (Js, Ts, Vue, Antd, G2plot, Leaflet, Cy...)
- DataMagic: Java后端服务器 (Springboot, Jwt, Jpa, Druid, Knife4j, Tablesaw, DJL, DL4J...)
- DataSeer: Python后端服务器 (FastApi, Sk-learn, Pytorch, MlFlow, Ray... )

## 特性
- **数据可视化**：很容易的连结数据库，生成视图并构建报表！(原型已就绪)
- **机器学习**: 快速地开发算法，构建模型并训练模型！(2024年完成)
- **人工智能**：快捷地管理预训练模型及生成AI应用！(2024年完成)

## 预览
- [DataPie](http://18.234.188.222:3721/) - 原型预览
预览账号: guest/Guest@Pie3

<p align="center">
    <img alt="DataPie Logo" width="30%" src="/public/resource/img/doc/login.png">
    <img alt="DataPie Logo" width="30%" src="/public/resource/img/doc/home.png">
    <img alt="DataPie Logo" width="30%" src="/public/resource/img/doc/dashboard.png">
    <img alt="DataPie Logo" width="30%" src="/public/resource/img/doc/source-datasource.png">
    <img alt="DataPie Logo" width="30%" src="/public/resource/img/doc/source-import.png">
    <img alt="DataPie Logo" width="30%" src="/public/resource/img/doc/vis-dataset.png">
    <img alt="DataPie Logo" width="30%" src="/public/resource/img/doc/vis-dataview1.png">
    <img alt="DataPie Logo" width="30%" src="/public/resource/img/doc/vis-dataview2.png">
    <img alt="DataPie Logo" width="30%" src="/public/resource/img/doc/vis-dataview3.png">
    <img alt="DataPie Logo" width="30%" src="/public/resource/img/doc/vis-dataview4.png">
    <img alt="DataPie Logo" width="30%" src="/public/resource/img/doc/vis-report1.png">
    <img alt="DataPie Logo" width="30%" src="/public/resource/img/doc/vis-report2.png">
    <img alt="DataPie Logo" width="30%" src="/public/resource/img/doc/admin-user.png">
    <img alt="DataPie Logo" width="30%" src="/public/resource/img/doc/admin-role.png">
    <img alt="DataPie Logo" width="30%" src="/public/resource/img/doc/admin-menu.png">
    <img alt="DataPie Logo" width="30%" src="/public/resource/img/doc/admin-param.png">
    <img alt="DataPie Logo" width="30%" src="/public/resource/img/doc/admin-org.png">
    <img alt="DataPie Logo" width="30%" src="/public/resource/img/doc/admin-center.png">
    <img alt="DataPie Logo" width="30%" src="/public/resource/img/doc/monitor-druid.png">
    <img alt="DataPie Logo" width="30%" src="/public/resource/img/doc/monitor-knife4j.png">
</p>


## 文档
[文档地址](https://github.com/GavinZha0/DataPie/)

## 如何构建
DataExplorer: npm run build
DataMagic: mvn3 -DskipTests=true package (生成分离的 lib, config and jar)

## 如何执行
DataExplorer: yarn dev

## 如何贡献
非常欢迎你的加入！[提一个 Issue](https://github.com/GavinZha0/DataPie/issues/new/choose) 或者提交一个 Pull Request。

**Pull Request:**
1. Fork 代码!
2. 创建自己的分支: `git checkout -b feat/xxxx`
3. 提交你的修改: `git commit -am 'feat(function): add xxxxx'`
4. 推送您的分支: `git push origin feat/xxxx`
5. 提交`pull request`

## Git 贡献提交规范
  - `add:` 增加新功能
  - `update:` 更改功能
  - `fix:` 修复问题/BUG
  - `style:` 代码风格相关无影响运行结果的
  - `perf:` 优化/性能提升
  - `revert:` 撤销修改
  - `test:` 测试相关
  - `docs:` 文档/注释

## 维护者
[@GavinZha0](https://github.com/GavinZha0)

## 捐赠
如果你觉得这个项目对你有帮助，你可以帮作者买一杯咖啡表示支持!

## 交流
- [github discussions](https://github.com/GavinZha0/DataPie/discussions)