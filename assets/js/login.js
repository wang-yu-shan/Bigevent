$(function () {
  let layer = layui.layer;
  let form = layui.form;
  $("#registbtn").click(function () {
    $(".regist").hide();
    $(".login").show();
  });
  $("#loginbtn").click(function () {
    $(".login").hide();
    $(".regist").show();
  });
  form.verify({
    repass: function (value) {
      console.log(value);
      if ($(".repass").val() !== value) {
        return "两次输入的密码不一致";
      }
    },
    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
  });
  // 配置url地址
  $.ajaxPrefilter(function (options) {
    options.url = "http://ajax.frontend.itheima.net" + options.url;
  });
  // 注册表单
  $(".registform").submit(function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "/api/reguser",
      data: data,
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(
          "注册成功,即将跳往登录页面",
          {
            time: 2000, //2秒关闭（如果不配置，默认是3秒）
          },
          function () {
            //do something
            $("#registbtn").click();
          }
        );
      },
    });
  });
  $(".loginform").submit(function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "/api/login",
      data,
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(
          "登录成功即将跳转页面",
          {
            time: 2000, //2秒关闭（如果不配置，默认是3秒）
          },
          function () {
            location.href = "/home/index.html";
          }
        );
      },
    });
  });
});
