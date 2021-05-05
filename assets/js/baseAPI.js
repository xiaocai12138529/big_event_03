// 1.开发环境服务器地址
let baseURL = "http://api-breakingnews-web.itheima.net";
// 2.测试环境中的服务器地址
// let baseURL = "http://ajax.frontend.itheima.net";
// 3.生产环境中的服务器地址
// let baseURL = "http://ajax.frontend.itheima.net";

// 拦截所有的ajax请求
// 处理参数
$.ajaxPrefilter(function (params) {
    params.url = baseURL + params.url
});