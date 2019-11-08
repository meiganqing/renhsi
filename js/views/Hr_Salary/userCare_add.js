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
var $, bumen, form, admin;
layui.config({
	base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
	index: 'lib/index' //主入口模块
}).use(['index', 'table', "form", 'laydate'], function () {
	admin = layui.admin,
		form = layui.form
	laydate = layui.laydate,
		upload = layui.upload;

	$ = layui.$;
	// 时间插件初始化
	laydate.render({
		elem: '#CareTime'
	});




	form.on("select(department)", function (data) {
		// 被关怀的员工
		PostData_new(yonghu, {
			XDLMCID: "1001",
			XDLMSID: "DYBH20190823102601261253201",
			QueryType: "mDepart",
			QueryKey: data.value
		}, function (data) {
			if (data.success && data.rows.length > 0) {
				getSelect("CareUserName", data.rows, "mUserName", "id", "mUserName")
				form.render("select")
			} else {
				getSelect("CareUserName", data.rows, "mUserName", "id", "mUserName")
				form.render("select")
			}
		})

		// 参与人员(多选)
		PostData_new(yonghu, {
			XDLMCID: "1001",
			XDLMSID: "DYBH20190823102601261253201",
			QueryType: "mDepart",
			QueryKey: data.value
		}, function (data) {
			if (data.success && data.rows.length > 0) {
				var formSelects = layui.formSelects;
				getSelect("JoinUser", data.rows, "mUserName", "id", "mUserName")
				formSelects.render("select")
			} else {
				var formSelects = layui.formSelects;
				getSelect("JoinUser", data.rows, "mUserName", "id", "mUserName")
				formSelects.render("select")
			}
		})

	})



	// 关怀类型
	PostData_new(yonghu, {
		XDLMCID: "1001",
		XDLMSID: "DYBH20191015151140114015841",
		XDLMA: '1017',
	}, function (data) {
		if (data.success && data.rows.length > 0) {
			getSelect("CareType", data.rows, "分类名", "分类id", "分类名")
			form.render("select")
		}
	})




	// 修改回显数据
	if (GetRequest().choseId) {
		$('#TrainManageAddBtn').html('修改');
		// 部门
		PostDataRS({
			XDLMCID: "1001",
			XDLMSID: "DYBH20190823102601261218191"
		}, "SYYHGL", function (returnData) {
			getSelect("DepName", returnData.rows, "DepartName", "DepartId");
			form.render("select")
			console.log("111")
			if (returnData.success == true) {
				// 关怀人员
				PostData_new(yonghu, {
					XDLMCID: "1001",
					XDLMSID: "DYBH20190823102601261253201",
				}, function (data) {
				
						getSelect("CareUserName", data.rows, "mUserName", "id", "mUserName")
						form.render("select")
					
					console.log("022")
					if (data.success && data.rows.length > 0){
						getFormValue()
					}

				})
			}
			// 默认
		})

		//获取但行数据回显
	}


	// 判断 添加或者修改
	if (GetRequest().choseId) {
		// 修改操作
		form.on('submit(TrainBtn)', function (data) {
			let editdata = {
				'XKLX': 'SYRSGL',
				'XDLMCID': '6000',
				'XDLMSID': 'DYBH201908231027212721208165',
				'XDLMID': GetRequest().choseId
			}
			for (var i in data.field) {
				editdata[i] = data.field[i];
			}
			editdata['XDLMDepId'] = $("#DepName").find("option:selected").attr("attrData"),
				editDataXg(baSic, editdata);
			return false;
		});

	} else {

		//添加
		//获取部门
		PostDataRS({
			XDLMCID: "1001",
			XDLMSID: "DYBH20190823102601261218191"
		}, "SYYHGL", function (returnData) {
			getSelect("DepName", returnData.rows, "DepartName", "DepartId");
			form.render("select")
			// 默认
			var bumen = returnData.rows[0].分类名

			PostData_new(yonghu, {
				XDLMCID: "1001",
				XDLMSID: "DYBH20190823102601261253201",
				QueryType: "mDepart",
				QueryKey: bumen
			}, function (data) {
				if (data.success && data.rows.length > 0) {
					getSelect("CareUserName", data.rows, "mUserName", "id", "mUserName")
					form.render("select")

					var formSelects = layui.formSelects;
					getSelect("JoinUser", data.rows, "mUserName", "id", "mUserName")
					formSelects.render("select")
				} else {
					var formSelects = layui.formSelects;
					$("#CareUserName").empty()
					form.render("select")

					var formSelects = layui.formSelects;
					getSelect("JoinUser", data.rows, "mUserName", "id", "mUserName")
					formSelects.render("select")

				}
			})


		})

		// 添加操作
		form.on('submit(TrainBtn)', function (data) {
			// data.field.creationUser = loginId;
			let addata = {
				'XKLX': 'SYRSGL',
				'XDLMCID': '5000',
				'XDLMSID': 'DYBH20190823102721272187163',
			}
			for (var i in data.field) {
				addata[i] = data.field[i];
			}
			addata['XDLMDepId'] = $("#DepName").find("option:selected").attr("attrData"),
				addDataTjiao(baSic, addata);
			return false;
		});
	}


});

// 数据回显
function getFormValue() {
	PostData_new("/xdData/xdDataManage.ashx?XAction=GetDataInterface&XKLX=SYRSGL&XDLMCID=1001&XDLMSID=DYBH201908231027212721114162&XDLMA=" + GetRequest().choseId, "", function (getData) {
		console.log(getData)
		if (getData.success == true) {
			for (var i in getData.rows[0]) {
				$('#' + i).val(getData.rows[0][i]);
			}
			console.log("333")
			form.render("")
			// 回显关怀人员

			// // 部门	
			// PostDataRS({
			// 	XDLMCID: "1001",
			// 	XDLMSID: "DYBH20190823102601261218191"
			// }, "SYYHGL", function (returnData) {
			// 	// 默认
			// 	if (returnData.success && returnData.rows.length > 0) {
			// 		getSelect("DepName", returnData.rows, "DepartName", "DepartId");
			// 		form.render("select")
			// 	$("#DepName").val(getData.rows[0][DepName]);
			// 	} form.render("")
			// })

			//  获取多选参与人员数据
			PostData_new(yonghu, {
				XDLMCID: "1001",
				XDLMSID: "DYBH20190823102601261253201",
			}, function (data) {
				if (data.success && data.rows.length > 0) {
					var formSelects = layui.formSelects;
					getSelect("JoinUser", data.rows, "mUserName", "id", "mUserName")
					formSelects.render("select")

					var formSelects = layui.formSelects;
					formSelects.value('JoinUser', getData.rows[0].JoinUser.split(","), true);
				}
				form.render("")
			})
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
}