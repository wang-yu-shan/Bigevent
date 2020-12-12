$(function () {
  let layer = layui.layer;
  $("#loginbtn").click(function () {
    $(".regist").show();
    $(".login").hide();
  });
  $("#registbtn").click(function () {
    $(".regist").hide();
    $(".login").show();
  });
  let form = layui.form;
  form.verify({
    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repass: function (value) {
      //   console.log(value);
      //   console.log($(".repass").val());
      if ($(".repass").val() !== value) {
        return "两次密码输入不一致";
      }
    },
  });
  //   注册发送ajax
  $(".registform").submit(function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "http://ajax.frontend.itheima.net/api/reguser",
      data: data,
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        $(".registform")[0].reset();
        $("#registbtn").click();
      },
    });
  });
  //  发送登录ajax
  $(".loginform").submit(function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "http://ajax.frontend.itheima.net/api/login",
      data: data,
      success: function (res) {
        if (res.status === 200) {
          return layer.msg(res.message);
        }
        layer.msg(
          "登陆成功即将跳转页面",
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
