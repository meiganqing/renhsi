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
var $, dailyTable;
var cols;


layui.config({
  base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
  index: 'lib/index' //主入口模块
}).use(['index', 'form', 'table','laydate'], function () {
  var admin = layui.admin, table = layui.table, form = layui.form;
  $ = layui.$;
  var laydate = layui.laydate;


 // 关联编号_社保基数 
  PostData_new(baSic, {
    XKLX:'SYRSGL',
    XDLMCID: "1001",
    XDLMSID: "DYBH201911021535413541147211",
}, function(data) {
    console.log(data)
    if (data.success && data.rows.length > 0) {
      getSelectRy("关联编号_社保基数", data.rows, "社保基数名称", "库内编号", "库内编号")
      form.render("select")
  }
})
  // 关联编号_薪资项目 
  PostData_new(baSic, {
    XKLX:'SYRSGL',
    XDLMCID: "1001",
    XDLMSID: "DYBH201911051042174217164261",
}, function(data) {
    console.log(data)
    if (data.success && data.rows.length > 0) {
      getSelectRy("关联编号_薪资项目", data.rows, "名称", "库内编号", "库内编号")
      form.render("select")
  }

})

// 监听社保基数和薪资项目的编号


    // 获取单行数据

// 回显数据
getFormValue()
//
console.log(getCookie('mUserName'))
console.log(getNowFormatDate())
form.on('submit(SakaryStatisticsBtn)', function(data){

  let addata = {
    'XKLX':'SYRSGL',
    'XDLMCID':'6000',
    'XDLMSID':'DYBH201911071313251325206275',
    "XDLMID":GetRequest().changeId
    }
    for (var i in data.field) {
    addata[i] = data.field[i];
  }
  addata['XDLM添加人']=getCookie('mUserName'),
  addata['XDLM添加时间']=getNowFormatDate()


  addDataTjiao(baSic,addata);

    return false; 

})


});

function getFormValue() {
  PostData_new("/xdData/xdDataManage.ashx?XAction=GetDataInterface&XKLX=SYRSGL&XDLMCID=1001&XDLMSID=DYBH201911071313251325204272&XDLMA=" + GetRequest().changeId, "", 
  function (getData) {
 
    if (getData.success == true) {
      for (var i in getData.rows[0]) {
        $('#' + i).val(getData.rows[0][i]);
      }
   
    
 
    }})}


function callBack() {
  var index543 = parent.layer.getFrameIndex(window.name); //获取窗口索引
  parent.dataTable.reload('mDataTable', {
    page: {
      curr: 1 //重新从第 1 页开始
    }
  });
  parent.layer.close(index543);
}



