/**
通过 node tree.js 命令运行本文件，生成父级目录下的4级目录结构
*/
require('tree-cli')({
  base: '../', // or any path you want to inspect.
  ignore: 'node_modules/,.git/,.history/,dist/,.umi/,mock/,.vscode/',
  noreport: true,
  o: 'tree.md',
  a: true,
  l: 4,
}).then(res => {
  console.log(res.data, res.report);
});
