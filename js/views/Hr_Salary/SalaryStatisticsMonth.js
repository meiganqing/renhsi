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

	where = {
		XDLMCID: "1001",
		XDLMSID: "DYBH201911071313251325192271"
	}
	PostData_new(baSic, {
		XKLX:'SYRSGL',
		XDLMCID: "1001",
		XDLMSID:'DYBH201911071313251325192271'
	  }, function (data) {
	
		if (data.success && data.rows.length > 0) {
			let colss= [
				[{
					
					
						checkbox: true,
						fixed: 'left',
						width: '2%',
						align: 'center'
					},
					{
						field: '用户名',
						title: '用户名',
						width: '6%',
						sort: true, fixed: 'left', totalRowText: '合计：'
					
					},

					
				],
				
			];
		  let datas = data.rows;
		  for(let i=0 ;i<datas.length;i++){
			colss[0].push=(
				{
				field:[i],//值
				title: [i],//名称
				align: 'center',
				minWidth: '100',
				templet:"#"+[i]})	    
				 
		  }
		
		  colss[0].push({ fixed: 'right', title: '操作', toolbar: '#test-table-toolbar-barDemo', width: '10%', align: 'center' });
		  console.log("列表")
		  console.log(colss)
		  return colss;
		  

		}
	  })

	// getTable();
	//获取下拉选项
	getTableSelect_RSGL({
		XDLMCID: "1001",
		XDLMSID: "DYBH2019110713211907976173"
	}, {
		id: "searchType",
		key: "查询显示名",
		attr: "查询属性"
	})

	laydate.render({
		elem: "#xinzi",
		type: 'month',
		done: function(value, date, endDate){
         dataRq=value+"-01"
		}
	})





	//头工具栏事件
	table.on('toolbar(test-table-toolbar)', function(obj) {
		var checkStatus = table.checkStatus(obj.config.id);
		switch(obj.event) {
			case 'addInfo':
				if(limitConfig("storeLimt_rsgl", 2)) {
					OpenAddPage(null)

				} else {
					layer.msg("您没有添加权限");
				}
				break;
			case 'removeAll':
				if(limitConfig("storeLimt_rsgl", 3)) {
					var checkStatus = table.checkStatus('mDataTable');

					let data = checkStatus.data;
					if(data.length == 0) {
						layer.msg("请选择您要删除的内容");
						return;
					}
					let idStr = ""
					for(let i = 0; i < data.length; i++) {
						idStr += data[i].id + ","
					}
					idStr = idStr.substr(0, idStr.length - 1)

				
					delData(idStr, 'DYBH20191107131325132567274')
				} else {
					layer.msg("您没有删除权限");
				}

		}
	});

	//监听行工具事件
	table.on('tool(test-table-toolbar)', function(obj) {
		var data = obj.data;
		if(obj.event === 'del') {
			if(limitConfig("storeLimt_rsgl", 3)) {
			
				delData(data.id, "DYBH20191107131325132567274")
			} else {
				layer.msg("您没有删除权限");
			}
		} else if(obj.event === 'edit') {
			if(limitConfig("storeLimt_rsgl", 2)) {
				OpenAddPage(data.id);
			} else {
				layer.msg("您没有修改权限");
			}
		} else if(obj.event === 'Tomobilize') {
			OpenTomobilize(data.id);
		}
	});

	// $("#userId").html(GetUserInfo());

	form.render();



	
	});



// 跳转添加编辑页面
function OpenAddPage(changeId) {
	if(changeId == null) {
		// 添加
		var title = "添加薪资统计";
		var urlHref = "SalaryStatisticsMonth_add.html";
		layer.open({
			type: 2,
			area: ['730px', '417px'], //宽高
			content: urlHref,
			title: title,
		})
	} else {
	
		openWindow("2", "SalaryStatistics_addMonth.html?changeId=" + changeId, "修改薪资统计")
	}


}

function getTable() {
	console.log("列表")
	 getProjectList();
	// console.log(getProjectList())
	console.log(cols)
	// layui.use('table', function() {

	// 	var table = layui.table;
	// 	dataTable = table.render({
	// 		method: 'post',
	// 		elem: '#TableList',
	// 		id: 'mDataTable',
	// 		headers: {
	// 			Authorization: getAuth()
	// 		},
	// 		url: httpcom_RSGL,
	// 		where: where,
	// 		//			contentType: "application/json",
	// 		totalRow: true,

	// 		toolbar: '#test-table-toolbar-toolbarDemo',
	// 		cols: cols,
	// 		limits: [10, 20, 50, 100, 150, 300, 500],
	// 		page: true,
	// 		response: {
					
	// 			countName: 'total', //规定数据总数的字段名称，默认：count					
	// 			dataName: 'rows' //规定数据列表的字段名称，默认：data
	// 		},
	// 		request: {
	// 			pageName: 'page' //页码的参数名称，默认：page
	// 				,
	// 			limitName: 'rows' //每页数据量的参数名，默认：limit
	// 		},
	// 		even: true,
	// 		done: function() {
	// 			if($(".layui-table-view").width() * 0.78 > (cols[0].length - 3) * 120) {
	// 				return;

	// 			} else {
	// 				$('.layui-table-fixed-r').removeClass('layui-hide');
	// 			}
	// 		}
	// 	});
	// });
}

var OpenTomobilize = (examineId) => {
	layer.open({
		type: 2,
		// skin: 'layui-layer-rim', //加上边框
		area: ['75%', '80%'], //宽高
		content: "SalaryStatisticsViewMonth.html?choseId=" + examineId,
		title: "查看薪资",
	})
}


var searchModel = (searchStr) => {
	dataTable.reload({
		where: { //设定异步数据接口的额外参数，任意设
			QueryText: searchStr
		},
		page: {
			curr: 1 //重新从第 1 页开始
		}
	});
}

function getProjectList() {
	let data = {
		page: 1,
		limit: 999
	}
	
	// var colss = [
	// 	[{
			
			
	// 			checkbox: true,
	// 			fixed: 'left',
	// 			width: '2%',
	// 			align: 'center'
	// 		},
	// 		{
	// 			field: '用户名',
	// 			title: '用户名',
	// 			width: '6%',
	// 			sort: true, fixed: 'left', totalRowText: '合计：'
			
	// 		},
	// 		// {
	// 		// 	field: '单位',
	// 		// 	title: '单位',
	// 		// 	align: 'center',
	// 		// 	minWidth: '100',
	// 		// 	templet:"#danwei"
	// 		// },
			
	// 		// {
	// 		// 	field: '部门',
	// 		// 	title: '部门',
	// 		// 	align: 'center',
	// 		// 	minWidth: '100',
	// 		// 	templet:"#bumen"
	// 		// },
	// 		// {
	// 		// 	field: '基本薪资',
	// 		// 	title: '基本薪资',
	// 		// 	align: 'center',
	// 		// 	minWidth: '100',
	// 		// 	templet:"#money"
	// 		// },
			
	// 		// {
	// 		// 	field: '薪资日期',
	// 		// 	title: '薪资日期',
	// 		// 	align: 'center',
	// 		// 	minWidth: '100',
	// 		// 	templet:"#SalaryMonthColor"
	// 		// },
	// 		// {
	// 		// 	field: '添加人',
	// 		// 	title: '添加人',
	// 		// 	align: 'center',
	// 		// 	minWidth: '100',
	// 		// 	templet:"#tianjia"
	// 		// },
	// 		// {
	// 		// 	field: '提交人',
	// 		// 	title: '提交人',
	// 		// 	align: 'center',
	// 		// 	minWidth: '100',
	// 		// 	templet:"#tijiao"
	// 		// },
	// 		// {
	// 		// 	field: '审核人',
	// 		// 	title: '审核人',
	// 		// 	align: 'center',
	// 		// 	minWidth: '100',
	// 		// 	templet:"#shenghe"
	// 		// },
	// 		// {
	// 		// 	field: '审核状态',
	// 		// 	title: '审核状态',
	// 		// 	align: 'center',
	// 		// 	minWidth: '100',
	// 		// 	templet:"#shenghetype"
	// 		// },
	// 		// {
	// 		// 	field: '审核时间',
	// 		// 	title: '审核时间',
	// 		// 	minWidth: '100',
	// 		// 	align: 'center'
	// 		// },
			
			
		
			
	// 	],
		
	// ];

	

}

$(function() {
	setTimeout(function() {
		limitsChange();
	}, 300)
})

// 查看薪资
function selectUser(userid) {
	layer.open({
		type: 2,
		// skin: 'layui-layer-rim', //加上边框
		area: ['75', '80'], //宽高
		content: "SalaryStatisticsMonth.html?lookuserid=" + userid,
		title: "查看薪资",
	})
}





