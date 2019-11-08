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
var cols,admin,table,form;
var oldProjectName = "";

layui.config({
  base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
  index: 'lib/index' //主入口模块
}).use(['index', 'form', 'table'], function () {
admin = layui.admin;
table = layui.table;
form = layui.form;
  $ = layui.$;
    // 给所在部门添加下拉
  //   PostDataRS({
  //     XDLMCID: "1001",
  //     XDLMSID: "DYBH20190823102601261218191"
  // }, "SYYHGL", function(returnData) {
  //     getSelectRy("Department", returnData.rows, "DepartName", "DepartId");
  //     form.render("select")
  // })


// 编辑修改回显
if(GetRequest().choseProject != null){
  $('#SakaryProjectBtn').html('修改');
  getFormValue();//获取但行数据回显
}
    if(GetRequest().choseProject){
        // 修改
        form.on('submit(SakaryProjectBtn)', function(data){
        	data.field.XDLM计算公式=$("#计算公式").val();
            let editdata = {
              'XKLX':'SYRSGL',
              'XDLMCID':'6000',
              'XDLMSID':'DYBH2019110510421742175265',
              'XDLMID':GetRequest().choseProject
            }
            for (var i in data.field) {
              editdata[i] = data.field[i];
          }
          editDataXg(baSic,editdata);
          return false
           
        });
    }else{
        //添加
        form.on('submit(SakaryProjectBtn)', function(data){
        	 data.field.XDLM计算公式=$("#计算公式").val();
          let addata = {
            'XKLX':'SYRSGL',
            'XDLMCID':'5000',
            'XDLMSID':'DYBH201911051042174217182263',
            'XDLM库内编号':curDateTime() 
          }
          for (var i in data.field) {
            addata[i] = data.field[i];
        }
         
          addDataTjiao(baSic,addata);
          return false
          
        });
    }


// 薪资项目属性
    form.on('select(aihao)', function(data){
        if(data.value == "计算项"){
            $("#calculate").removeClass("layui-hide");
            // 计算公式显示
        }else{
            $("#calculate").addClass("layui-hide");
             // 计算公式隐藏
        }
    });    


// 数据渲染
// 渲染列表
PostData_new(moneyLie, {
  XDLMCID: "GetSalaryProjectColumn",
  XKLX:'SYRSGL',
}, function (data) {
  if (data.success && data.data.length > 0) {
    let html = ``;
    let datas = data.data;
    for(let i=0 ;i<datas.length;i++){
      html+=` <div class="layui-form-item" style="margin-top:20px;" >
      <label class="layui-form-label">${datas[i].ColumnName}</label>
      <div class="layui-input-block"  >
      
          <input type="text" 
          name="XDLM${datas[i].ColumnName}" 
          lay-verify="required" 
          id="${datas[i].ColumnName}" 
          style="width:90%;" 
          autocomplete="off" 
          placeholder="" 
          class="layui-input">
      </div>
  </div>`
    }
    $("#appendDiv").append(html);

  }
})




});


// 数据回显获取但行数据
function getFormValue() {
  PostData_new("/xdData/xdDataManage.ashx?XAction=GetDataInterface&XKLX=SYRSGL&XDLMCID=1001&XDLMSID=DYBH20191105104217421722262&XDLMA="+ GetRequest().choseProject, "",function(getData){
   if(getData.success == true){
     for (var i in getData.rows[0]) {
       $('#'+i).val(getData.rows[0][i]);
     }
     form.render("select")
   }
// 回显时判断

  if(getData.rows[0].类型=="计算项"){
    $("#calculate").removeClass("layui-hide");
    // 计算公式显示
}else{
    $("#calculate").addClass("layui-hide");
     // 计算公式隐藏
}


  });
 }



function callBack() {
  var index543 = parent.layer.getFrameIndex(window.name); //获取窗口索引
  parent.dataTable.reload('mDataTable', {
    page: {
      curr: 1 //重新从第 1 页开始
    }
  });
  parent.layer.close(index543);
  // location.reload()
}





// function geRewardInfoById(salaryProjectId){
//     var data = PostData("/Controllers/Hr_SalaryProject/GetModelById/"+salaryProjectId,"").data;
//     var form = layui.form;
//     console.log(data);
//     form.val("formData", data);
//     oldProjectName = data.salaryProjectName

//     if(data.projectType == 0){
//         $("#calculate").removeClass("layui-hide");
//     }

//     $("#CalculationFormula").val(data.calculationFormula);
// }

// function createRandomId() {
//     return (Math.random()*10000000).toString(16).substr(0,4)+''+(new Date()).getTime()+''+Math.random().toString().substr(2,5);
// }

// $("#SalaryProjectName").blur(function(){
//     if($("#SalaryProjectName").val() == ""){
//         return;
//     }
//     if(oldProjectName == $("#SalaryProjectName").val()){
//       return;
//     } 
//     var strwhere = "and salaryProjectName = '"+$("#SalaryProjectName").val()+"'";
//     var data = {
//         tabName:'Hr_SalaryProject',
//         strWhere:strwhere
//     }
//     if(!duplicateChecking("/Controllers/BaseInfo/IsExists",JSON.stringify(data))){
//         layer.msg($("#SalaryProjectName").val()+"已存在");
//         $("#SalaryProjectName").val(oldProjectName);
//     }
// })



// 公式编辑
$("#editCalculation").click(function(){
    parent.layer.open({
      type: 2,
      // skin: 'layui-layer-rim', //加上边框
      area: ['1000px', '550px'], //宽高
      content: "./formula.html?htmlName="+$("#名称").val(),
      title: "编辑公式",
      cancel: function(index, layero){ 
          var body = layer.getChildFrame('body',parent.addProject);
          console.log(body);
          body.hide();
      }    
    })
})