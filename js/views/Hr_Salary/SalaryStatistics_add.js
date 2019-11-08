var $, dailyTable;
var cols;


layui.config({
  base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
  index: 'lib/index' //主入口模块
}).use(['index', 'form', 'table'], function () {
  var admin = layui.admin, table = layui.table, form = layui.form;
  $ = layui.$;

    $("#userId").html(GetUserInfo());

    form.render('select');
    getProjectList();
    
    if(GetRequest().changeId){
        // 修改
        
        geRewardInfoById(GetRequest().changeId);
        $("#userId").addClass("layui-disabled");
        $("#userId").attr("disabled",true);
        form.render('select');
        form.on('submit(SakaryStatisticsBtn)', function(data){
            var HrSalaryViceModel = [];
            for(let i = 0;i<Object.keys(data.field).length-9;i++){
                HrSalaryViceModel.push({
                  'salaryProjectName':$("#calculate"+i).attr("salaryProjectName"),
                  'projectType':$("#calculate"+i).attr("projectType"),
                  'salaryValue':$("#calculate"+i).val(),
                  'calculationFormula':$("#calculate"+i).attr("calculationFormula"),
                  'userId':data.field.userId
                })
            }

            data.field.HrSalaryViceModel = HrSalaryViceModel;
            var options=$("#userId option:selected");
            data.field.userName = options.text();
            data.field.id = GetRequest().changeId;
            data.field.updateUser = loginId;
            editFormData('/Controllers/Hr_SalaryManage/Update',JSON.stringify(data.field));
            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        });
       
    }else{
        //添加
        form.on('submit(SakaryStatisticsBtn)', function(data){
            var options=$("#userId option:selected");

            var HrSalaryViceModel = [];
            for(let i = 0;i<Object.keys(data.field).length-9;i++){
                HrSalaryViceModel.push({
                  'salaryProjectName':$("#calculate"+i).attr("salaryProjectName"),
                  'projectType':$("#calculate"+i).attr("projectType"),
                  'salaryValue':$("#calculate"+i).val(),
                  'calculationFormula':$("#calculate"+i).attr("calculationFormula"),
                  'userId':data.field.userId
                })
            }

            data.field.HrSalaryViceModel = HrSalaryViceModel;

            data.field.userName = options.text();
            data.field.creationUser = loginId;
            addFormData('/Controllers/Hr_SalaryManage/Add',JSON.stringify(data.field));
            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。

        });
    }



    $("#jibengongzi").change(function(){
      // alert(2);
      var myPay = $(this).val();
      var baoxianjishu = $("#baoxianjishu").val();
      var gerenyanglao = baoxianjishu*0.08;
      var gerenyiliao = baoxianjishu*0.02;
      var gerenshiye = baoxianjishu*0.003
      var gongjijin = baoxianjishu*0.05;
      var jixiaogongzi = $("#jixiaogongzi").val();
      $("#gerenyanglao").val(gerenyanglao);
      $("#gerenyiliao").val(gerenyiliao);
      $("#gerenshiye").val(gerenshiye);
      $("#gongjijin").val(gongjijin);

      $("#shifa").val(Number(myPay)-Number(gerenyanglao)-Number(gerenyiliao)-Number(gerenshiye)-Number(gongjijin)+Number(jixiaogongzi));

    })


      $("#jixiaogongzi").change(function(){
      $("#jibengongzi").change();
    })


    form.on('select(checkUserId)', function(data){
        if($("#userId").val() == ""){
            return;
        }
       
        var strwhere = "and userId = "+$("#userId").val()+" and salaryType=1"
        var data = {
            tabName:'Hr_SalaryManage',
            strWhere:strwhere
        }
        if(!duplicateChecking("/Controllers/BaseInfo/IsExists",JSON.stringify(data))){
            layer.msg("已存在该员工的工资信息");
            $("#userId").val("");
            var form = layui.form;
            form.render('select');

        }
    });

});




function callBack() {
  var index543 = parent.layer.getFrameIndex(window.name); //获取窗口索引
  parent.dataTable.reload('mDataTable', {
    page: {
      curr: 1 //重新从第 1 页开始
    }
  });
  parent.layer.close(index543);
}



function geRewardInfoById(salaryProjectId){
    var data = PostData("/Controllers/Hr_SalaryManage/GetModelById/"+salaryProjectId,"").data;
    var form = layui.form;
    console.log(data);
    form.val("formData", data);
    var myPay = $("#jibengongzi").val();
    var baoxianjishu = $("#baoxianjishu").val();
    var gerenyanglao = baoxianjishu*0.08;
    var gerenyiliao = baoxianjishu*0.02;
    var gerenshiye = baoxianjishu*0.003
    var gongjijin = baoxianjishu*0.05;
    var jixiaogongzi = $("#jixiaogongzi").val();
    $('#shifa').val(Number(myPay)-Number(gerenyanglao)-Number(gerenyiliao)-Number(gerenshiye)-Number(gongjijin)+Number(jixiaogongzi))
}



function getProjectList(){
  let data = {
      page:1,
      limit:999
  }
  var ChangeData = PostData('/Controllers/Hr_SalaryProject/GetListByPage',JSON.stringify(data)).data;

  var noChangeData = [
      // {'salaryProjectName':'保险基数','projectType':2,'projectCode':'baoxianjishu'},
      // {'salaryProjectName':'个人养老','projectType':2,'projectCode':'gerenyanglao'},
      // {'salaryProjectName':'个人医疗','projectType':2,'projectCode':'gerenyiliao'},
      // {'salaryProjectName':'个人失业','projectType':2,'projectCode':'gerenshiye'},
      // {'salaryProjectName':'基本工资','projectType':2,'projectCode':'jibengongzi'},
      // {'salaryProjectName':'绩效工资','projectType':2,'projectCode':'jixiaogongzi'},
  ];
  var insertData = ChangeData.concat(noChangeData);
  var html = '';
  for(let i = 0; i<insertData.length;i++){

      if(insertData[i].projectType == 0){
          html+='<input type="hidden" name="'+insertData[i].salaryProjectName+'" projectType = '+insertData[i].projectType+' salaryProjectName = '+insertData[i].salaryProjectName+'  id="calculate'+i+'" value="" calculationFormula="'+insertData[i].calculationFormula+'" class="layui-input '+insertData[i].salaryProjectName+'"> ';
      }else{
          html+='<div class="layui-form-item" style="">'
          html+='<div  class="layui-block">'
          html+='<label class="layui-form-label">'+insertData[i].salaryProjectName+'</label>'
          html+='<div class="layui-input-block">'
          html+='<input type="" lay-verify="required|number" name="'+insertData[i].salaryProjectName+'" projectType = '+insertData[i].projectType+' salaryProjectName = '+insertData[i].salaryProjectName+' id="calculate'+i+'" calculationFormula="" class="layui-input '+insertData[i].salaryProjectName+'"> '
          html+='</div></div></div>'
      }
     
  }

  $("#rowList").append(html);
}