$(function () {
  var $image = $("#image");
  let layer = layui.layer;
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);

  $("#putBtn").click(function () {
    $("[type=file]").click();
  });
  $("#file").change(function () {
    let file = this.files[0];
    let url = URL.createObjectURL(file);
    $image.cropper("destroy").attr("src", url).cropper(options);
  });
  $("#sureBtn").click(function () {
    let i = $image.cropper("getCroppedCanvas", {
      // 创建一个 Canvas 画布
      width: 100,
      height: 100,
    });
    // 把图片转成base64格式
    let str = i.toDataURL(); // 把canvas图片转成base64格式
    // console.log(str);
    $.ajax({
      type: "POST",
      url: "/my/update/avatar",
      data: {
        avatar: str,
      },
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          return layer.msg("更新头像失败");
        }
        layer.msg(res.message);
        window.parent.getuser();
      },
    });
  });
});
