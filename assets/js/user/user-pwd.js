$(function () {
  let form = layui.form;
  let layer = layui.layer;
  form.verify({
    oldPass: (item) => {
      console.log(item);
      let oldPwd = $("#pass").val();
      if (item === oldPwd) {
        return "新密码与旧密码不能相同";
      }
    },
    newPass: (item) => {
      let repass = $("#repass").val();
      if (item !== repass) {
        return "两次的密码输入不一致";
      }
    },
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
  });
  $(".layui-form").submit(function (e) {
    e.preventDefault();
    let data = $("form").serialize();
    // console.log(data);
    $.ajax({
      type: "POST",
      url: "/my/updatepwd",
      data,
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg("密码修改成功");
        $(".layui-form")[0].reset();
      },
    });
  });
});
