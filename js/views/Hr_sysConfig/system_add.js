var $, form;
var oldtypeName;
layui.config({
	base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
	index: 'lib/index' //主入口模块
}).use(['index', 'table', "form", "upload"], function() {
	var admin = layui.admin,
		table = layui.table,
		upload = layui.upload;
	form = layui.form;
	$ = layui.$;

	//获取部门
	PostDataRS({
		XDLMCID: "1001",
		XDLMSID: "DYBH201908231027212721108201"
	}, "SYRSGL", function(returnData) {
		getSelect("configType", returnData.rows, "TypeName", "TypeName");
		form.render("select")
	})

	//$('#configType').html(GetTypeOption());
	$('#detailedTypeInfoId').val($('#configType').val());

	if(GetRequest().rowid != null) {

		getFormValue();
		$('#configType').attr("disabled", true);
	} else {
		// var onlynum = parseInt(getTimeAndRandom());
		// $('#DetailedValue').val(onlynum);
		// console.log($('#DetailedValue').val());
		// console.log(onlynum);
		var code = $('#configType').find("option:selected").attr("data-code");
		$('#DetailedTypeCode').val(code);

	}

	form.on('select(configType)', function(data) {
		var code = $(data.elem).find("option:selected").attr("data-code");
		$('#detailedTypeInfoId').val(data.value);
		$('#DetailedTypeCode').val(code);
	});

	//$('#SubmitBtn').click(function () {
	//  if (GetRequest().rowid != null) {
	//    $('#typeCode').attr("disabled",true);
	//    //修改
	//    form.on('submit(formSubmit)', function (data) {
	//      data.field.updateUser = loginId;
	//      editFormData("/Controllers/Sys_TypeInfoDetailed/Update", JSON.stringify(data.field));
	//      delcookNouserId();
	//    });
	//  } else {
	//    //添加
	//    form.on('submit(formSubmit)', function (data) {
	//      data.field.creationUser = loginId;
	//      data.field.DetailedValue = parseInt(getRandom());    
	//        data.field.XKLX='SYRSGL';         
	//        data.field.XDLMCID='5000';
	//        data.field.XDLMSID='DYBH201908231027212721152203';
	////        addDataTjiao(baSic,data.field);
	//      delcookNouserId();
	//
	//    });
	//  }
	//
	//});

	form.on('submit(formSubmit)', function(data) {
		if(GetRequest().rowid) {
	      data.field.XDLMupdateUser = loginId;
	      	data.field.XKLX = 'SYRSGL';
			data.field.XDLMCID = '6000';
			data.field.XDLMSID = 'DYBH20190823102721272127215';
	       editDataXg(baSic,data.field);
	      editFormData("/Controllers/Sys_TypeInfoDetailed/Update", JSON.stringify(data.field));
		} else {
			data.field.XDLMcreationUser = loginId;
			data.field.XDLMDetailedValue = parseInt(getRandom());
			data.field.XKLX = 'SYRSGL';
			data.field.XDLMCID = '5000';
			data.field.XDLMSID = 'DYBH201908231027212721182213';
			addDataTjiao(baSic, data.field);

		}
		delcookNouserId();

	});

	$('#addType').click(function() {
		openAddType();
	});

	$("#detailedTypeName").blur(function() {
		checkUserAndType('detailedTypeName', 'detailedTypeName', 'Sys_TypeInfoDetailed', "该名称已存在");
	});

	// $("#DetailedValue").blur(function () {
	//   checkUserAndType('DetailedValue', 'DetailedValue', 'Sys_TypeInfoDetailed', "该标识名称已存在");
	// });

	form.render();

});

function getFormValue() {
	var getData = PostData_new(httpcom_RSGL, {
		XDLMCID: "1001",
		XDLMSID: "DYBH201908231027212721242202",
		XDLMA: GetRequest().rowid
	});
	if(getData.code == "0") {

		oldtypeName = getData.data.detailedTypeName;
		$('#configType').val(getData.data.DetailedTypeName);
		$('#DetailedValue').val(getData.data.DetailedValue);
		$('#DetailedTypeCode').val(getData.data.DetailedTypeCode);
		for(var i in getData.data) {
			$('#' + i).val(getData.data[i]);
		}
	}
}

// 获取类型下拉
function GetTypeOption() {
	let data = {
		limit: 99999999,
		page: 1
	};
	var datas = PostData("/Controllers/Sys_TypeInfo/GetListByPage", JSON.stringify(data)).data;
	var optionHtml = "";
	for(let i = 0; i < datas.length; i++) {

		optionHtml += "<option value=" + datas[i].id + " data-code=" + datas[i].typeCode + ">" + datas[i].typeName + "</option>"
	}
	return optionHtml;
}

function openAddType() {
	var index888 = layer.open({
		type: 2,
		content: 'system_add_type.html',
		area: ["80%", "90%"],
		title: '添加类型',
		maxmin: true,
		success: function(layero, index) {

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

//判断重复
function checkUserAndType(inputid, parname, tablename, notice) {
	if($("#" + inputid).val() == "") {
		return;
	}
	// if(oldtypeName == $("#"+inputid).val()){
	//   return;
	// }
	var strwhere = "and " + parname + "= '" + $("#" + inputid).val() + "' and DetailedTypeInfoId=" + $('#configType').val();
	var data = {
		tabName: tablename,
		strWhere: strwhere
	};
	if(!duplicateChecking("/Controllers/BaseInfo/IsExists", JSON.stringify(data))) {
		layer.msg(notice);
		// $("#"+inputid).val(oldtypeName);
	}
}

function getRandom() {
	return RndNum(2);
}