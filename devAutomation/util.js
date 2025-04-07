

// 首字母大写加驼峰转换
export const toPascalCase = (str = '') => {
  return str
    .replace(/[-_]+(.)/g, (_, char) => char.toUpperCase()) // 处理 "-" 或 "_" 后的字符
    .replace(/^[a-z]/, (char) => char.toUpperCase()); // 确保首字母大写
}

export function toKebabCase(str = '') {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2') // 在小写字母和大写字母之间插入连字符
    .toLowerCase(); // 将所有字母转换为小写
}


export const jsxTemplate = (folderName, suffix) => {

  if (suffix == 'acomponent') {
    return `
    /**
     * ${toKebabCase(folderName)}-${suffix}
     */

    import {} from "ant-mobile";
    import "./index.less";
    import useMyfHook from "./useHook.js";

  export default ()=>{
  useMyfHook();
  return (
  <div className="${toKebabCase(folderName)}-${suffix}" >
   ${folderName}
  </div>
    )
  }
   `
  }
  return `
  /**
   * ${toKebabCase(folderName)}-${suffix}
   */
import { useState } from 'react'
import "./index.less";
import useMyfHook from "./useHook.js";

export default ()=>{
useMyfHook();
return (
    <>
      <div className="${toKebabCase(folderName)}-${suffix}" >
        ${folderName}
      </div>
    </>
)
}
 `
}


export const lessTemplate = (folderName, suffix) => {
  return `
/* ----------  ${toKebabCase(folderName)}-${suffix}  ---------- */

.${toKebabCase(folderName)}-${suffix}{
}
 `
}


export const hookTemplate = (folderName, suffix) => {
  return `
 /**
   * ${toKebabCase(folderName)}-${suffix}-hook
   */

export default ()=>{
}
`
}
