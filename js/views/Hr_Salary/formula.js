/*
  * @陕西唐远
 * @文件名: 
 * @作者: 马娜
 * @Git: 马娜
 * @Date: 2019.10.30
 * @描述: 
 * @版本: 1.00
 * @修改历史纪录: （更改接口）
 * @记录: 1. 10/14 马娜 
 */
var $;
var layer;
layui.config({
	base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
	index: 'lib/index' //主入口模块
}).use(['index', 'table',"form",'laydate',"upload"], function(){
	$ = layui.$;
	layer = layui.layer;

	getprojectList();

	$(".layui-card-header").html(decodeURI(GetUrlParam('htmlName')));
	
});


var clickType = 0;
var showformula = $("#showformula").val();

var uploadCode = '';
//左侧的薪资项目列表的点击
$("body").on("click","#formulaName li",function(){
	switch(clickType){
		case 0:
			showformula+=$(this).html();
			uploadCode+=$(this).attr("thisCode");
			clickType = 1; 
		break;
		case 1:
		// 上次点击是 自己这类型的；
			layer.msg("公式指令有误");
		break
		case 2:
		// 上次点击不是此类型
			showformula+=$(this).html();
			uploadCode+=$(this).attr("thisCode");
			clickType = 1; 
		break;
		case 3:
		// 上次点击不是此类型
			
			if(showformula.substr(showformula.length-1,showformula.length) == '('){
				showformula+=$(this).html();
				uploadCode+=$(this).attr("thisCode");
				clickType = 1; 
			}else{
				layer.msg("公式指令有误");
			};

		break;
	}


	$("#showformula").val(showformula);
})

var type2 = ['+','-','*','/','<','>'];
$("body").on("click","#formulaVal li",function(){


	if(type2.indexOf($(this).html()) > -1){
		// 点击的是符号
		switch(clickType){
			case 0:
				layer.msg("公式指令有误");
			break;
			case 1:
				showformula+=$(this).html();
				uploadCode+=$(this).html();
				clickType = 2; 
			break;
			case 2:
				layer.msg("公式指令有误");
			break;
			case 3:
				showformula+=$(this).html();
				uploadCode+=$(this).html();
				clickType = 2; 
			break;
		}

	}else{
		
		switch(clickType){
			case 0:
				showformula+=$(this).html();
				uploadCode+=$(this).html();
				clickType = 3; 
			break;
			case 1:
				if($(this).html() == '(' || $(this).html() == ')'){
					showformula+=$(this).html();
					uploadCode+=$(this).html();
					clickType = 3; 
				}else{
					layer.msg("公式指令有误");
				}
			break;
			case 2:
				showformula+=$(this).html();
				uploadCode+=$(this).html();
				clickType = 3; 
			break;
			case 3:
				showformula+=$(this).html();
				uploadCode+=$(this).html();
				clickType = 3; 	
			break;
		}
	

	}

	$("#showformula").val(showformula)
})

$("body").on("click","#TrainManageAddBtn",function(){
	if($("#showformula").val() == ""){
		layer.msg("请输入公式");
		return;
	}
	console.log(uploadCode)
	console.log(window.parent.changeChild)
	window.parent.changeChild($("#showformula").val(),uploadCode);
	closeWindow();
})

function getprojectList(){
	let data = {
		page:1,
		limit:999
	}
	//获取计算类别

	var ChangeData = PostData('',{
		XDLMCID:"1001",
		XDLMSID:"DYBH2019082310272127219981"
	}).rows;
	var noChangeData = [
		{'SalaryProjectName':'个人养老','ProjectCode':'gerenyanglao'},
		{'SalaryProjectName':'个人医疗','ProjectCode':'gerenyiliao'},
		{'SalaryProjectName':'个人失业','ProjectCode':'gerenshiye'},
		{'SalaryProjectName':'住房公积金','ProjectCode':'gongjijin'},
		{'SalaryProjectName':'基本工资','ProjectCode':'jibengongzi'},
	];
	var insertData = ChangeData.concat(noChangeData);

	console.log(insertData);
	var html = '';
	for(let i = 0; i<insertData.length;i++){
		if(insertData[i]['SalaryProjectName'] == decodeURI(GetUrlParam('htmlName'))){
			html+='';
		}else{
			html+='<li thisCode = '+insertData[i]['ProjectCode']+'>'+insertData[i]['SalaryProjectName']+'</li>'
		}
	}

	$("#formulaName").html(html);
}


function GetUrlParam(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = encodeURI(window.location.search).substr(1).match(reg);
	if(r!=null)return unescape(r[2]); return null;
}


function clearVal(){
	clickType = 0;
	showformula = "";
	$("#showformula").val("");
}