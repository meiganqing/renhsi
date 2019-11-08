var $;
var oldtypeName;
layui.config({
  base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
  index: 'lib/index' //主入口模块
}).use(['index', 'table', "form", "upload"], function () {
  var admin = layui.admin, table = layui.table, form = layui.form, upload = layui.upload;
  $ = layui.$;


  $('#SubmitBtn').click(function () {
    //添加
    form.on('submit(formSubmit)', function (data) {
      data.field.creationUser = loginId;
      addFormData("/Controllers/Sys_TypeInfo/Add", JSON.stringify(data.field));
    });
  });


  $("#typeName").blur(function(){
    checkUserAndType('typeName', 'typeName', 'Sys_TypeInfo', "该名称已存在");
  });

  $("#typeCode").blur(function () {
    checkUserAndType('typeCode', 'typeCode', 'Sys_TypeInfo', "该标识名称已存在");
  });


  form.render();

});

function addData(ActionData, formValue) {
  layer.confirm('确定要添加吗？', {
    btn: ['确定', '再想想'] //按钮
  }, function () {
    layer.msg('正在添加,请稍等...', {
      time: 0,
      shade: 0.3,
      //content: '测试回调',
      success: function (index, layero) {
        setTimeout(function () {
          var addData = PostData(ActionData, formValue);
          console.log(addData);
          if (addData.data == true) {
            layer.msg('添加完成！', {
              title: '提示框',
              icon: 1,
              time: 800
            }, function (alertindex) {
              callBack();
            });
          }
        }, 100)
      }
    })
  }, function (index) {
    layer.close(index);
  })
}



function callBack() {
  var index543 = parent.layer.getFrameIndex(window.name); //获取窗口索引
  // parent.$('#configType').html(parent.GetTypeOption());
  window.parent.location.reload();
  parent.layer.close(index543);
}

//判断重复
function checkUserAndType(inputid, parname, tablename, notice) {
  if ($("#" + inputid).val() == "") {
    return;
  }
  if (oldtypeName == $("#" + inputid).val()) {
    return;
  }
  var strwhere = "and " + parname + "= '" + $("#" + inputid).val() + "'";
  var data = {
    tabName: tablename,
    strWhere: strwhere
  };
  if (!duplicateChecking("/Controllers/BaseInfo/IsExists", JSON.stringify(data))) {
    layer.msg(notice);
    // $("#" + inputid).val(oldtypeName);
  }
}
