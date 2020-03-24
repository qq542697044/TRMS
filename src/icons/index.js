import Vue from "vue";

//自定义全局图标组件
import Svgicon from "./svg-icon";
Vue.component("svg-icon", Svgicon);

/**
 * require.context:读取指定目录的所有文件
 * 参数：
 * 1.目录
 * 2.是否遍历子级目录
 * 3.定义遍历文件规则
 */

const req = require.context("./svg", false, /\.svg$/);
const requireAll = requireContext => {
  return requireContext.keys().map(requireContext);
};
requireAll(req);
