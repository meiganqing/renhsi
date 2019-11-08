/*
 * @陕西唐远
 * @文件名: 
 * @作者: 李浩源
 * @Git: e
 * @Date: 2019-10-24 14:11:59
 * @描述: 
 * @版本: 1.00
 * @修改历史纪录: （版本 修改时间 修改人 修改内容）
 * @记录:  
 */
var laydate,$;
layui.config({
  base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
  index: 'lib/index' //主入口模块
}).use(['index', 'table', "form", 'laydate', "upload"], function () {
  var admin = layui.admin, table = layui.table, form = layui.form, upload = layui.upload;
    laydate = layui.laydate;
    $ = layui.$;

DateInit();//时间插件
// 第一大分类

//姓名下拉
  PostData_new(yonghu ,{
    XDLMCID: "1001",
    XDLMSID: "DYBH20190823102601261253201",
 }, function(data) {
  if (data.success && data.rows.length > 0) {
      getSelect("UserName", data.rows, "mUserName", "userid","mUserName")
      form.render("select")
  }
})

// 工作年限
PostData_new(yonghu ,{
  XDLMCID: "1001",
  XDLMSID: "DYBH20191015151140114015841",
  XDLMA:'1013',
}, function(data) {

if (data.success && data.rows.length > 0) {
    getSelect("WorkYears", data.rows, "分类名", "分类id","分类名")
    form.render("select")
}
})
// 职位
PostData_new(yonghu ,{
  XDLMCID: "1001",
  XDLMSID: "DYBH20191015151140114015841",
  XDLMA:'8',
}, function(data) {
if (data.success && data.rows.length > 0) {
    getSelect("Position", data.rows, "分类名", "分类id","分类名")
    form.render("select")
}
})


// 编辑修改回显
  if(GetRequest().rowid != null){
    $('#SubmitBtn').html('修改');
    getFormValue();//获取但行数据回显
  }


  // 点击
  $('#SubmitBtn').click(function () {
    if(GetRequest().rowid != null){
      //监听修改
      form.on('submit(formSubmit)', function (data) {
        let editdata = {
          'XKLX':'SYRSGL',
          'XDLMCID':'6000',
          'XDLMSID':'DYBH20190823102721272138175',
          'XDLMID':GetRequest().rowid
        }
        for (var i in data.field) {
          editdata[i] = data.field[i];
      }
      editdata['XDLMUserId']=$("#UserName").find("option:selected").attr("attrData")
      editDataXg(baSic,editdata);
      });
    }else{
      //监听提交
      form.on('submit(formSubmit)', function (data) {
        let addata = {
          'XKLX':'SYRSGL',
          'XDLMCID':'5000',
          'XDLMSID':'DYBH201908231027212721235173',
        }
        for (var i in data.field) {
          addata[i] = data.field[i];
      }
      addata['XDLMUserId']=$("#UserName").find("option:selected").attr("attrData")
        addDataTjiao(baSic,addata);
      });
    }
  });


  form.verify({
    noEmpty: function (value) {
      if (value.length == 0) {
        return '请填写该项内容';
      }
    }
  });


  form.render();


});

// 数据回显
function getFormValue() {
 PostData_new("/xdData/xdDataManage.ashx?XAction=GetDataInterface&XKLX=SYRSGL&XDLMCID=1001&XDLMSID=DYBH201908231027212721119172&XDLMA="+ GetRequest().rowid, "",function(getData){
  if(getData.success == true){
    for (var i in getData.rows[0]) {
      $('#'+i).val(getData.rows[0][i]);
    }
  }

 });
 
}

function DateInit(){
// 时间插件初始化
  laydate.render({
    elem: '#EntryTime'
  });

  laydate.render({
    elem: '#QuitTime'
  });
}

function callBack(){
  var index543 = parent.layer.getFrameIndex(window.name); //获取窗口索引
  parent.dataTable.reload('mDataTable', {
    page: {
      curr: 1 //重新从第 1 页开始
    }
  });
  parent.layer.close(index543);
}

