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
var laydate, $;
layui.config({
  base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
  index: 'lib/index' //主入口模块
}).use(['index', 'table', "form", 'laydate'],
 function () {
  var admin = layui.admin, 
  table = layui.table, 
  laydate = layui.laydate;
  form = layui.form;
  $ = layui.$;
  //年度
  laydate.render({
    elem: '#年度',
    type: 'year', //默认，可不填

  });
  // 添加时间
  laydate.render({

    elem: '#添加时间',
    value: new Date()
  });

// 添加人员
PostData_new(yonghu ,{
  XDLMCID: "1001",
  XDLMSID: "DYBH20190823102601261253201",
}, function(data) {
if (data.success && data.rows.length > 0) {
    getSelect("添加人", data.rows, "mUserName", "userid","mUserName")
    form.render("select")
}
})



GetRequest()//地址栏目中的参数
if (GetRequest().rowid != null) {
  $('#SubmitBtn').html('修改');
  getFormValue();//获取单行数据 回显
}
form.render();



//
$('#SubmitBtn').click(function () {
  if (GetRequest().rowid != null) {
    //监听修改
    form.on('submit(formSubmit)', function (data) {
      let editdata = {
        'XKLX':'SYRSGL',
        'XDLMCID':'6000',
        'XDLMSID':'DYBH201911021535413541111215',
        'XDLMID':GetRequest().rowid
      }
      for (var i in data.field) {
        editdata[i] = data.field[i];
    }
    
    // editdata['XDLM添加时间'] =getTimeAndRandom()
      editDataXg("/xdData/xdDataManage.ashx?XAction=GetDataInterface",editdata);
    });
  } else {
    //监听提交
    form.on('submit(formSubmit)', function (data) { 
       let addata = {
        'XKLX':'SYRSGL',
        'XDLMCID':'5000',
        'XDLMSID':'DYBH20191102153541354131213',
      }
      for (var i in data.field) {
        addata[i] = data.field[i];
    }
    // addata['XDLM添加时间'] =getTimeAndRandom()
    addDataTjiao("/xdData/xdDataManage.ashx?XAction=GetDataInterface", addata);
    });
  }
})


    
//
});

// 获取单挑数据
function getFormValue() {
  PostData_new("/xdData/xdDataManage.ashx?XAction=GetDataInterface&XKLX=SYRSGL&XDLMCID=1001&XDLMSID=DYBH20191102153541354151212&XDLMA=" + GetRequest().rowid, "",function(getData){
    console.log(getData)
      if (getData.success == true) {
        for (var i in getData.rows[0]) {
          $('#' + i).val(getData.rows[0][i]);
        }
      }
    })
  }

function callBack() {
  var index543 = parent.layer.getFrameIndex(window.name); //获取窗口索引
  parent.dataTable.reload('mDataTable', {
    page: {
      curr: 1 //重新从第 1 页开始
    }
  });
  parent.layer.close(index543);
}