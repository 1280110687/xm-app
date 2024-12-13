

import { readdir, stat, mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';

import { toPascalCase, jsxTemplate, hookTemplate, lessTemplate } from './util.js'


// 解析命令
async function analy() {
  const args = process.argv.slice(2); // 第一个是 node，第二个是脚本路径，从第三个开始是用户传递的参数
  const [foldersPath, ...folderNames] = args;
  console.log(folderNames)
  return [foldersPath, folderNames.map(folderName => toPascalCase(folderName))]
}
// 获取目录下 所有文件夹名称
async function getComponentFolders(directoryPath) {
  try {
    // 读取目录内容
    const items = await readdir(directoryPath);

    // 筛选出文件夹
    const folders = [];
    for (const item of items) {
      const itemPath = path.join(directoryPath, item);
      const itemStat = await stat(itemPath);


      if (itemStat.isDirectory()) {
        folders.push(item);
      }
    }

    return folders;
  } catch (error) {
    console.error('Error reading directory:', error);
    return [];
  }
}



// 生成新的文件夹
async function create_folder(folderName, foldersPath) {

  const suffix = foldersPath.split('src/')[1].replace(/s$/, '');

  const path = `${foldersPath}/${folderName}`

  await mkdir(path, { recursive: true });

  // less
  const lessPath = `${path}/index.less`
  await writeFile(lessPath, lessTemplate(folderName, suffix));
  exec(`npx stylelint --write ${lessPath}`);
  // hook
  const hookPath = `${path}/useHook.js`
  await writeFile(hookPath, hookTemplate(folderName, suffix));
  exec(`npx prettier --write ${hookPath}`);
  // jsx
  const jsxPath = `${path}/index.jsx`
  await writeFile(jsxPath, jsxTemplate(folderName, suffix));
  exec(`npx prettier --write ${jsxPath}`);



}


(async function main() {
  const [foldersPath, folderNames] = await analy()


  folderNames.forEach(async folderName => {
    if (!folderName.length) {
      console.error('没有定义文件夹名称');
      return
    }
    const folders = await getComponentFolders(foldersPath)
    if (folders.includes(folderName)) {
      console.error(`文件夹${foldersPath}\/${folderName}已经存在`);
      return
    }
    await create_folder(folderName, foldersPath)
  })



})()





