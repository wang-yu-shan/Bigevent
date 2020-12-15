$(function () {
  let form = layui.form;
  let layer = layui.layer;
  getuserinfo();
  function getuserinfo() {
    $.ajax({
      url: "/my/userinfo",
      success: function (res) {
        //   console.log(res);
        let data = res.data;
        form.val("userinfo", {
          username: data.username,
          nickname: data.nickname,
          email: data.email,
          id: data.id,
          //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
        });
      },
    });
  }
  $("form").submit(function (e) {
    e.preventDefault();
    let data = $("form").serialize();
    // console.log(data);
    $.ajax({
      type: "POST",
      url: "/my/userinfo",
      data,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("修改信息失败");
        } else {
          layer.msg(res.message);
        }
        window.parent.getuser();
      },
    });
  });
  $("#resetBtn").click(function (e) {
    e.preventDefault();
    getuserinfo();
  });
});
