/*
 * @陕西唐远
 * @文件名: 
 * @作者: 马娜
 * @Git: 马娜
 * @Date: 2019.10.25
 * @描述: 修改页面的请求接口
 * @版本: 1.00
 * @修改历史纪录: （
 * 1.表单的获取
 * 2.下拉列表的获取
 * 3.表单的查询，删除，批量删除）
 */
var $, dailyTable, dataTable,dataRq;
var cols, admin, table, form, laydate, where;
layui.config({
	base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
	index: 'lib/index' //主入口模块
}).use(['index', 'form', 'table', 'laydate'], function() {
	admin = layui.admin;
	table = layui.table;
	form = layui.form;
	laydate = layui.laydate;
	$ = layui.$;
	laydate.render({
		elem: "#xinzi",
		type: 'month',
		done: function(value, date, endDate){
         dataRq=value+"-01"
		}
	})

// 添加框加入员工添加
	// 获取员工姓名
	PostData_new(yonghu, {
		XDLMCID: "1001",
		XDLMSID: "DYBH20190823102601261253201",
	}, function (data) {
		if (data.success && data.rows.length > 0) {
			var formSelects = layui.formSelects;
			getSelect("用户名", data.rows, "mUserName", "mUserID", "mUserID")
			formSelects.render("select")
		}else{
			var formSelects = layui.formSelects;
			$("#用户名").empty()
			formSelects.render("select")
		}
	})
	// 添加人员和薪资日期
	$("#TrainManageAddBtn").click(function() {
		addList();
	})
});

// 添加接口
function addList() {
console.log(dataRq)//日期
console.log(layui.formSelects.value('用户名', 'valStr'))//添加人usid
// 添加接口
// /xdData/xdDataManage.ashx?XAction=ExtFC&XDLMCID=InitSalary&XKLX=SYRSGL&month=2019-11-01
let addata = {
	'XKLX':'SYRSGL',
	'XDLMCID':"InitSalary",
	'month':dataRq,
	'uid':layui.formSelects.value('用户名', 'valStr')
}
addDataTjiao(monthdata,addata)	
}

//关闭窗口寻找索引
function callBack() {
	var index543 = parent.layer.getFrameIndex(window.name); //获取窗口索引
	parent.dataTable.reload('mDataTable', {
		page: {
			curr: 1 //重新从第 1 页开始
		}
	});
	parent.layer.close(index543);
}

