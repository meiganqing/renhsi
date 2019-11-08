layui.config({
  base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
  index: 'lib/index' //主入口模块
}).use(['index', 'table', "form", 'laydate', "upload"], function () {
  var admin = layui.admin, table = layui.table, form = layui.form, laydate = layui.laydate, upload = layui.upload;
  // 时间插件初始化
  laydate.render({
    elem: '#date'
  });

  laydate.render({
    elem: '#BirthTime'
  });
  laydate.render({
    elem: '#EntryTime'
  });
  laydate.render({
    elem: '#AsPartyTime'
  });

  laydate.render({
    elem: '#ContractSignTime'
  });

  laydate.render({
    elem: '#ContractBegTime'
  });

  laydate.render({
    elem: '#ContractEndTime'
  });

  laydate.render({
    elem: '#OnTrialEndTime'
  });
  laydate.render({
    elem: '#BegTime'
  });
  laydate.render({
    elem: '#EntryTime'
  });
  laydate.render({
    elem: '#QuitTime'
  });


  form.verify({
    noEmpty: function (value) {
      if (value.length == 0) {
        return '请填写该项内容';
      }
    }
  })

  // 调用时的上传插件
  var uploadInst = upload.render({
    elem: '.uploadFile', //绑定元素
     url: '/upload/',  //上传接口
    done: function (res) {
      //上传完毕回调
    },
    error: function () {
      //请求异常回调
    }
  });

  // 个人信息的上传插件
  var uploadInst = upload.render({
    elem: '#uploadUserImg'
    , url: '/upload/'
    , before: function (obj) {
      //预读本地文件示例，不支持ie8
      obj.preview(function (index, file, result) {
        $('#uploadUserImg').attr('src', result); //图片链接（base64）
      });
    }
    , done: function (res) {
      //如果上传失败
      if (res.code > 0) {
        return layer.msg('上传失败');
      }
      //上传成功
    }
    , error: function () {
      //演示失败状态，并实现重传
      var demoText = $('#demoText');
      demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
      demoText.find('.demo-reload').on('click', function () {
        uploadInst.upload();
      });
    }
  });
});
