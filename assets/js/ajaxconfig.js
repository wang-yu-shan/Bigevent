$.ajaxPrefilter(function (options) {
  options.url = "http://ajax.frontend.itheima.net" + options.url;
  options.headers = {
    // 设置headers请求头信息
    Authorization: localStorage.getItem("data"),
  };
});
