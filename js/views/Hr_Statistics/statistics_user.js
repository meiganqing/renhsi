var $, dataTable;
var  treeSelect, where;
/*
  * @陕西唐远
 * @文件名: 
 * @作者: 马娜
 * @Git: 马娜
 * @Date: 2019.10.25
 * @描述: 
 * @版本: 1.00
 * @修改历史纪录: （更改请求接口）

 */
layui.config({
	base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
	index: 'lib/index' //主入口模块
}).use(['index', 'form', 'table', 'treeSelect', 'laydate'], function() {
	var admin = layui.admin,
		table = layui.table,
		form = layui.form;
	$ = layui.$;
	var laydate = layui.laydate;
	laydate.render({
		elem: '#birthTime',
		range: true //鎸囧畾鍏冪礌
	});

	treeSelect = layui.treeSelect;
	where = {
		XDLMCID: "1001",
		XDLMSID: "DYBH201908231027212721203151",
		//	XDLMA=&QueryType=&QueryKey=
	}

	getTable();
//	GetDepInfo();

	//头工具栏事件
	table.on('tool(test-table-toolbar)', function(obj) {
		switch(obj.event) {
			case 'select':
				layer.open({
					type: 2,
					// skin: 'layui-layer-rim', //加上边框
					area: ['1130px', '690px'], //宽高
					content: "../Hr_User/UserAllInfo.html?userid=" + obj.data.id,
					title: "员工信息",
				})
				break;

		}
	});

	form.on('select(cxlb)', function(data) {
		if(data.value == '职员状态') {
			$('#stateDiv').show();
			$('#key').hide();
			$('#cxBtn').hide();
			$('#depDiv').hide();
		} else if(data.value == '部门') {
			$('#stateDiv').hide();
			$('#key').hide();
			$('#cxBtn').hide();
			$('#depDiv').show();
		} else {
			$('#stateDiv').hide();
			$('#key').show();
			$('#cxBtn').show();
			$('#depDiv').hide();
		}
	});

//	$("#workState").html(getMariageState(workState, "全部"));
//	$("#postId").html(GetPositionInfo());
//	$("#nation").html(getMariageState(nation, "全部"));
//	$("#politicalOutlook").html(getMariageState(politicalOutlook, "全部"));
//	$("#education").html(getMariageState(education, "全部"));
	form.render();

//	if(GetRequest().checkName) {
//		setTimeout(function() {
//			$('#searchType').siblings("div.layui-form-select").find('dl dd[lay-value=' + GetRequest().checkName + ']').click()
//
//		}, 300)
//
//		setTimeout(function() {
//			$("#" + GetRequest().checkName).siblings("div.layui-form-select").find('dl dd[lay-value=' + GetRequest().checkType + ']').click()
//		}, 400)
//	}

	form.on('select(searchChange)', function(data) {
		if(data.value == "" || data.value == "userName" || data.value == "nativePlace" || data.value == "phoneNumber" || data.value == "paperNumber" || data.value == "researchFfield" || data.value == "achievements") {
			$(".btnsearch").removeClass("hide");
			$(".allsearch").removeClass("hide").siblings().addClass("hide");
		} else if(data.value == "birthTime") {
			$("." + data.value + "search").removeClass("hide").siblings().addClass("hide");
			$(".btnsearch").removeClass("hide");
		} else {
			$("." + data.value + "search").removeClass("hide").siblings().addClass("hide");
			$(".btnsearch").addClass("hide");
		}
	});

	form.on('submit(search)', function(data) {
		if($("#searchType").val() == "") {
			searchStart("", "antistop");
		} else if($("#searchType").val() == "birthTime") {
			searchStart($("#searchType").val(), "birthTime", true);
		} else {
			searchStart($("#searchType").val(), "antistop");
		}
		return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
	});

	form.on('select(userAttribute)', function(data) {
		searchStart("userAttribute", "userAttribute");
	})

	form.on('select(workState)', function(data) {
		searchStart("workState", "workState");
	})

	form.on('select(sex)', function(data) {
		searchStart("sex", "sex");
	})

	form.on('select(postId)', function(data) {
		searchStart("postId", "postId");
	})

	form.on('select(nation)', function(data) {
		searchStart("nation", "nation");
	})

	form.on('select(politicalOutlook)', function(data) {
		searchStart("politicalOutlook", "politicalOutlook");
	})

	form.on('select(education)', function(data) {
		searchStart("education", "education");
	})

});

function getTable() {
	var cols = [
		[{
				field: 'UserName',
				title: '姓名',
				width: '8%',
				align: 'center',
//				templet: '#color_mc'
			},
			{
				field: 'Sex',
				title: '性别',
				width: '5%',
				align: 'center',
//				templet: function(d) {
//					if(d.sex == "1") {
//						return "男";
//					} else {
//						return "女";
//					}
//				}
			},
			{
				field: 'NativePlace',
				title: '籍贯',
				width: '10%',
				align: 'center',
//				templet: '#nativePlace'
			},
			{
				field: 'DepId',
				title: '部门',
				width: '8%',
				align: 'center'
			},
			{
				field: 'positionName',
				title: '职位',
				width: '8%',
				align: 'center'
			},
			{
				field: 'phoneNumber',
				title: '联系电话',
				width: '8%',
				align: 'center',
//				templet: '#phoneNumber'
			},

			{
				field: 'education',
				title: '学历',
				width: '8%',
				align: 'center',
//				templet: function(d) {
//					return returnVal(education, d.education)
//				}
			},
			{
				field: 'paperNumber',
				title: '证件号码',
				width: '11%',
				align: 'center',
//				templet: "#paperNumber"
			},
			{
				field: 'politicalOutlook',
				title: '政治面貌',
				width: '5%',
				align: 'center',
//				templet: function(d) {
//					return returnVal(politicalOutlook, d.politicalOutlook)
//				}
			},
			{
				field: 'nation',
				title: '民族',
				width: '6%',
				align: 'center',
//				templet: function(d) {
//					return returnVal(nation, d.nation)
//				}
			},
			{
				field: 'birthTime',
				title: '出生日期',
				width: '7%',
				align: 'center',
			},
			{
				field: 'researchFfield',
				title: '研究领域',
				width: '8%',
				align: 'center',
//				templet: "#researchFfield"
			},
			{
				field: 'achievements',
				title: '成果介绍',
				width: '8%',
				align: 'center',
//				templet: "#achievements"
			},
		]
	];
	layui.use('table', function() {
		var table = layui.table;
		dataTable = table.render({
			method: 'post',
			elem: '#TableList',
			id: 'mDataTable',
			url: httpcom_RSGL,
			where: where,
			headers: {
				Authorization: getAuth()
			},
			toolbar: '#test-table-toolbar-toolbarDemo',
			cols: cols,
			limits: [10, 20, 50, 100, 150, 300, 500],
			page: true,
			autoSort: true, //禁用前端自动排序
			response: {
				//				statusName: 'success', //规定数据状态的字段名称，默认：code					
				//				statusCode: true, //规定成功的状态码，默认：0					
				//				msgName: 'success', //规定状态信息的字段名称，默认：msg					
				countName: 'total', //规定数据总数的字段名称，默认：count					
				dataName: 'rows' //规定数据列表的字段名称，默认：data
			},
			request: {
				pageName: 'page' //页码的参数名称，默认：page
					,
				limitName: 'rows' //每页数据量的参数名，默认：limit
			},
			even: true
		});
	});
}

// 获取部门的信息
//function GetDepInfo() {
//	treeSelect.render({
//		// 选择器
//		elem: '#depId',
//		// 数据
//		data: baseUrl + "/Controllers/Hr_Dep/GetListByPage",
//		// 异步加载方式：get/post，默认get
//		type: 'post',
//		// 占位符
//		placeholder: '请选择部门',
//		// 是否开启搜索功能：true/false，默认false
//		search: true,
//		// 点击回调
//		click: function(d) {
//			$("#depId").val(d.current.id);
//			searchStart("depId", "depId");
//		},
//		success: function(d) {
//			console.log(d);
//			// treeSelect.checkNode('tree', depvalue);
//			// var treeObj = treeSelect.zTree('tree');
//			// console.log(treeObj);
//
//			//刷新树结构
//			treeSelect.refresh('tree');
//
//		}
//	});
//}

//function selectUser(openid) {
//	layer.open({
//		type: 2,
//		title: '职员信息',
//		area: ['70%', '90%'],
//		shadeClose: true,
//		// shade: false,
//		maxmin: true, //开启最大化最小化按钮
//		content: '../Hr_User/UserAllInfo.html?userid=' + openid //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
//	});
//}