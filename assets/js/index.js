getuser();
let layer = layui.layer;
function getuser() {
  $.ajax({
    url: "/my/userinfo",
    success: function (res) {
      // 当nickname存在时优先展示，不存在时展示username
      let name = res.data.nickname || res.data.username;
      $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
      if (res.data.user_pic) {
        //  layui-nav-img 为图片头像   textpic为文字头像
        //当res.data.user_pic存在时优先展示图片文件
        $(".textAvatar").hide();
        $(".layui-nav-img").attr("src", res.data.user_pic).show();
      } else {
        let ming = name[0].toUpperCase(); //获取name的首字母设置大写
        $(".layui-nav-img").hide();
        $(".textAvatar").text(ming).show();
      }
    },
    complete: function (res) {
      //status: 0, message: "获取用户基本信息成功！"
      let str = res.responseJSON;
      if (str.status !== 0 && str.message !== "获取用户基本信息成功") {
        layer.msg("请前往登录");
        location.href = "/home/login.html";
      }
    },
  });
}
$(function () {
  $(".quit").click(function () {
    layer.confirm("确认退出吗", { icon: 3, title: "提示" }, function (index) {
      localStorage.removeItem("data");
      location.href = "/home/login.html";
      layer.close(index);
    });
  });
});
