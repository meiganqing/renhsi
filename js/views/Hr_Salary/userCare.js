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
var $, dailyTable, dataTable, admin, table, form, laydate, where;
var cols;
layui.config({
  base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
  index: 'lib/index' //主入口模块
}).use(['index', 'form', 'table', 'treeSelect', 'laydate', 'formSelects'], function () {
  var treeSelect = layui.treeSelect, 
  formSelects = layui.formSelects;
  admin = layui.admin;
  table = layui.table;
  form = layui.form;
  laydate = layui.laydate;
  $ = layui.$;

  where = {
    XDLMCID: "1001",
    XDLMSID: "DYBH201908231027212721111161"
  }
      // 给所在部门添加下拉
      PostDataRS({
        XDLMCID: "1001",
        XDLMSID: "DYBH20190823102601261218191"
    }, "SYYHGL", function(returnData) {
        getSelectRy("depIdsearch", returnData.rows, "DepartName", "DepartId");
        form.render("select")
    })
  getTable();
  //获取查询下拉选项
  getTableSelect_RSGL({
    XDLMCID: "1001",
    XDLMSID: "DYBH2019102413553509628094"
  }, {
    id: "searchType",
    key: "查询显示名",
    attr: "查询属性"
  })
  form.render("select")

  form.on('select(searchChange)', function(data){
    if(data.value == "所在部门"){
        $(".depIdsearch").removeClass("hide");//所在部门
        $(".allsearch").addClass("hide");//关键字
        $(".btnsearch").addClass("hide");//查询
        $("#antistop").val("")//使input值为空
    }else{
      // 使下拉框值为空
      $("#depIdsearch").val("");//清楚部门下拉框
      $("#antistop").val("")//使input值为空
      form.render();

      $(".depIdsearch").addClass("hide");//所在部门
      $(".allsearch").removeClass("hide");//关键字
      $(".btnsearch").removeClass("hide");//查询
    }
    })



  // 部门查询
    form.on('select(depIdsearch)', function(data){
 
      searchTableBm(where, dataTable, 'searchType', "depIdsearch")

      })
  






  //头工具栏事件
  table.on('toolbar(test-table-toolbar)', function (obj) {
    var checkStatus = table.checkStatus(obj.config.id);
    switch (obj.event) {
      case 'addInfo':
        if (limitConfig("storeLimt_rsgl", 2)) {
          OpenAddPage(null);
        } else {
          layer.msg("您没有添加权限");
        }
        break;
      case 'removeAll':
        if (limitConfig("storeLimt_rsgl", 3)) {
          delDataVolume("DYBH201908231027212721141164")
        } else {
          layer.msg("您没有删除权限");
        }

        break;
    }

  });

  //监听行工具事件
  table.on('tool(test-table-toolbar)', function (obj) {
    var data = obj.data;
    if (obj.event === 'del') {
      if (limitConfig("storeLimt_rsgl", 3)) {
        delData(data.Id, "DYBH201908231027212721141164")
      } else {
        layer.msg("您没有删除权限");
      }
    } else if (obj.event === 'edit') {
      if (limitConfig("storeLimt_rsgl", 2)) {
        OpenAddPage(data.Id);
      } else {
        layer.msg("您没有修改权限");
      }
    } else if (obj.event === 'Tomobilize') {
      // OpenTomobilize();
    }
  });




 });



function OpenAddPage(choseProject) {
  if (choseProject == null) {
    var urlPath = "userCare_add.html";
    var titleName = "添加人员关怀记录";
  } else {
    var urlPath = "userCare_add.html?choseId=" + choseProject;
    var titleName = '修改人员关怀记录';
  }
  layer.open({
    type: 2,
    // skin: 'layui-layer-rim', //加上边框
    area: ['730px', '600px'], //宽高
    content: urlPath,
    title: titleName,
  })

}


function getTable() {
  layui.use('table', function () {

    cols = [[
      {
        field: 'ck',
        checkbox: true,
        align: 'center',
       
      },

      {
        field: 'CareType',
        title: '关怀类型',
        align: 'center',
        templet:'#CareType',
       
      },
      {
        field: 'CareUserName',
        title: '被关怀员工',
        align: 'center',
        templet:'#CareUserName',
      },

      {
        field: 'DepName',
        title: '所在部门',
        align: 'center',
        templet:'#DepName',
      },

      {
        field: 'CareTime',
        title: '关怀时间',
        align: 'center',
        templet:'#CareTime',
      },

      {
        field: 'Cost',
        title: '关怀开支',
        align: 'center',
        templet: '#Cost',
      
      },
      {
        field: 'JoinUser',
        title: '参与者',
        align: 'center',
        templet:'#JoinUser',
      },
      {
        fixed: 'right',
        title: '操作',
        toolbar: '#test-table-toolbar-barDemo',
        align: 'center'
      }
    ]];
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


var searchModel = (searchStr) => {
  dataTable.reload({
    where: { //设定异步数据接口的额外参数，任意设
      QueryText: searchStr
    }
    , page: {
      curr: 1 //重新从第 1 页开始
    }
  });
}



$(function () {
  setTimeout(function () {
    limitsChange();
  }, 300)
})
