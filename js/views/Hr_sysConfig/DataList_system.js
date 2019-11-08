/*
 * @陕西唐远
 * @文件名: 
 * @作者: 马娜
 * @Git: e
 * @Date: 2019-10-30 
 * @描述: 
 * @版本: 1.00
 * @修改历史纪录: （修改获取列表，获取下拉，删除）
 * @记录:  
 */
var $, dataTable;
var cols,where = {};
layui.config({
  base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
  index: 'lib/index' //主入口模块
}).use(['index', 'form', 'table'], function () {
  var admin = layui.admin, table = layui.table, form = layui.form;
  $ = layui.$;


  cols = [[
    {field: 'ck', checkbox: true, width: '2%', align: 'center'},
    {field: 'DetailedTypeName', title: '选项名称', align: 'center'},
    {fixed: 'right', title: '操作', toolbar: '#test-table-toolbar-barDemo', width: '15%', align: 'center', templet: '#test-table-toolbar-barDemo'
    }
  ]];

where={
	XDLMCID:"1001",
	XDLMSID:"DYBH20190823102721272138211"
}
  getTable(where);

//$('#changeType').html(GetTypeOption());



  table.on('toolbar(test-table-toolbar)', function (obj) {
    var checkStatus = table.checkStatus(obj.config.id);
    console.log(obj);
    switch (obj.event) {
      // case 'addInfo':
      //   // if (limitConfig("storeLimt_rsgl", 2)) {
      //     OpenAddPage(null);
      //   // } else {
      //   //   layer.msg("您没有添加权限");
      //   // }
      //   break;
      case 'deleteAll':
        // if (limitConfig("storeLimt_rsgl", 3)) {
         delDataVolume("DYBH20190823102721272175214")
        // } else {
        //   layer.msg("您没有删除权限");
        // }

        break;
    }
  });


  //监听行工具事件
  table.on('tool(test-table-toolbar)', function (obj) {
    var data = obj.data;
    if (obj.event === 'edit') {
      // if (limitConfig("storeLimt_rsgl", 2)) {
        OpenAddPage(data.Id);
      // }else{
      //   layer.msg("您没有编辑权限");
      // }

    }else if (obj.event === 'delete') {
      // if (limitConfig("storeLimt_rsgl", 3)) {
      	delData(data.Id, "DYBH20190823102721272175214")

        delcookNouserId();
      // }else{
      //   layer.msg("您没有删除权限");
      // }
    }
  });

  form.on('select(changeType)',function(data){
    if(data.value == '全部'){
      where = '';
      getTable(where);
    }else{
      where = {
        QueryText: "and DetailedTypeInfoId='"+data.value+"'"
      };
      getTable(where);
    }
  });

  $('#addNewType').click(function(){
    OpenAddPage();
  });



  form.render();

});

function getTable() {
  layui.use('table', function () {
    var table = layui.table;
		dataTable = table.render({
				method: 'post',
				elem: '#TableList',
				id: 'mDataTable',
				headers: {
					Authorization: getAuth()
				},
				url: httpcom_RSGL,
				where: where,
	
				toolbar: '#test-table-toolbar-toolbarDemo',
				limits: [10, 20, 50, 100, 150, 300, 500],
				cols: cols,
				page: true,
				response: {
					//statusName: 'success', //规定数据状态的字段名称，默认：code
					//statusCode: true, //规定成功的状态码，默认：0
					//msgName: 'success', //规定状态信息的字段名称，默认：msg					
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

// 获取类型下拉
function GetTypeOption() {
  let data = {
    limit: 99999999,
    page: 1
  };
  var datas = PostData("/Controllers/Sys_TypeInfo/GetListByPage", JSON.stringify(data)).data;
  var optionHtml = "<option value='全部' data-code='null'>全部</option>";
  for (let i = 0; i < datas.length; i++) {
    optionHtml += "<option value=" + datas[i].id + " data-code=" + datas[i].typeCode + ">" + datas[i].typeName + "</option>"
  }
  return optionHtml;
}

function OpenAddPage(id) {
  var content = 'system_Add.html';
  var mTitle = "新增选项内容";
  if (id != null) {
    content = content + "?rowid=" + id;
    mTitle = "修改选项内容";
  }
  // var w = $(window).width() - 100 + 'px';
  // var h = $(window).height() - 50 + 'px';
  var index888 = layer.open({
    type: 2,
    content: content,
    area: ["50%", "60%"],
    title: mTitle,
    maxmin: true,
    success: function (layero, index) {

    }
  });
}


// function OpenConfig(id){
//   var index888 = layer.open({
//     type: 2,
//     content: 'DataList_system_value.html?typeid='+id,
//     area: ["100%", "100%"],
//     title: '配置',
//     maxmin: true,
//     success: function (layero, index) {
//
//     }
//   });
// }


var index123;
function showDel(id) {
  $('#mpanel2').empty();
  index123 = layer.open({
    type: 1,
    content: $('#yzm'),
    area: ['300px', "220px"],
    title: '删除',
    maxmin: true,
    success: function () {
      $('#mpanel2').codeVerify({
        type: 1,
        width: '200px',
        height: '50px',
        fontSize: '30px',
        codeLength: 4,
        btnId: 'check-btn',
        ready: function () {
        },
        success: function () {
          DelById(id);
        },
        error: function () {
          layer.msg("验证码错误！");
        }
      });
    },
    end: function () {
      // layer.close(index123);
      // $('#mpanel2').empty();
      // $('#yzm').css('display', 'none');
    }
  });
}

function DelById(rowid) {
  let data = {
    DelString: rowid,
    UserId: loginId
  };
  var delData = PostData("/Controllers/Sys_TypeInfoDetailed/Delete/", JSON.stringify(data));
  console.log(delData);
  if (delData.data) {
    layer.msg('删除完成！', {
      title: '提示框',
      icon: 1,
      time: 800
    }, function (alertindex) {
      // window.location.reload();
      dataTable.reload('mDataTable', {
        page: {
          curr: 1 //重新从第 1 页开始
        }
      });
      layer.close(index123);
    });
  }
}



$(function(){
    setTimeout(function(){
        limitsChange();
    },300)
})


function limitsChange(){
    // 没有
    if(!limitConfig("storeLimt_rsgl", 2)){
        $(".changethisData").addClass("layui-hide");
    }

    if(!limitConfig("storeLimt_rsgl", 3)){
        $(".delthisData").addClass("layui-hide");
    }


    if(!limitConfig("storeLimt_rsgl", 2) && !limitConfig("storeLimt_rsgl", 3)){
        $(".noData").removeClass("layui-hide");
    }
}


