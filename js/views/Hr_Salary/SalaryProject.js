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
var $, dailyTable, dataTable, admin, table, form, where;
var cols;


layui.config({
  base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
  index: 'lib/index' //主入口模块
}).use(['index', 'form', 'table'], function () {
  admin = layui.admin;
  table = layui.table;
  form = layui.form;
  $ = layui.$;
  where = {

  }
  getTable();

  //获取下拉选项
  getTableSelect_RSGL({
    XDLMCID: "1001",
    XDLMSID: "DYBH2019110514474703944758"
  }, {
    id: "searchType",
    key: "查询显示名",
    attr: "查询属性"
  })
  form.render("select")

  form.on('select(searchChange)', function (data) {
    $("#antistop").val("")
  })


  //头工具栏事件
  table.on('toolbar(test-table-toolbar)', function (obj) {
    var checkStatus = table.checkStatus(obj.config.id);
    switch (obj.event) {
      case 'addInfo':
        if (limitConfig("storeLimt_rsgl", 2)) {
          OpenAddPage("");
        } else {
          layer.msg("您没有添加权限")
        }
        break;

      case 'removeAll':
        if (limitConfig("storeLimt_rsgl", 3)) {
          delDataVolume("DYBH20190823102721272122584")
        } else {
          layer.msg("您没有删除权限");
        }
        break;
      // 添加列
      case 'addLie':
        openWindow("2", "./SalaryProject_listadd.html", "添加列", 600, 325)
        break;
      // 删除列
      case 'removeLie':
        openWindow("2", "./SalaryProject_listdele.html", "删除列", 600, 380)
        break;
    }

  });

  //监听行工具事件
  table.on('tool(test-table-toolbar)', function (obj) {
    var data = obj.data;
    if (obj.event === 'del') {
      // 单独删除
      if (limitConfig("storeLimt_rsgl", 3)) {
        delData(data.Id, "DYBH20190823102721272122584")
      } else {
        layer.msg("您没有删除权限");
      }
    } else if (obj.event === 'edit') {
      // 修改
      if (limitConfig("storeLimt_rsgl", 2)) {
        OpenAddPage(data.Id);
      } else {
        layer.msg("您没有修改权限");
      }
    } else if (obj.event === 'Tomobilize') {
      // 详情
      // OpenTomobilize();
    }
  });


  // 渲染列表
  PostData_new(moneyLie, {
    XDLMCID: "GetSalaryProjectColumn",
    XKLX: 'SYRSGL',
  }, function (data) {
    let cols1 = [[
      {
        field: 'ck',
        checkbox: true,
        align: 'center'
      },
      {
        field: '名称',
        title: '薪资项目名称',
        align: 'center',
        templet: "#SalaryProjectName"
      },

      {
        field: '类型',
        title: '薪资类型',
        align: 'center',
        templet: "#ProjectType"

      },

      // {
      //   field: '计算公式',
      //   title: '计算公式',
      //   align: 'center',
      //   templet: "#CalculationFormula"
      // },
      {
        field: '单位',
        title: '单位',
        align: 'center',
        templet: "#Company"


      },
      {

        field: '部门',
        title: '部门',
        align: 'center',
        templet: "#Department"

      },

    ]];

    if (data.success && data.data.length > 0) {

      for (var i = 0; i < data.data.length; i++) {
        cols1[0].push(
          {
            field: data.data[i].ColumnName,
            title: data.data[i].ColumnName,
            align: 'center'

          })
      }
      cols1[0].push({
        fixed: 'right',
        title: '操作',
        toolbar: '#test-table-toolbar-barDemo',
        align: 'center'
      })

      dataTable.reload({
        cols: cols1
        , page: {
          curr: 1 //重新从第 1 页开始
        }
      });
    }

  })






});

var addProject;
function OpenAddPage(choseProject) {
  if (choseProject) {
    openWindow("2", "SalaryProject_add.html?choseProject=" + choseProject, "修改薪资项目")
  } else {
    openWindow("2", "SalaryProject_add.html", "添加薪资项目")
  }

}




function getTable() {
  layui.use('table', function () {

    cols = [[
      {
        field: 'ck',
        checkbox: true,
        align: 'center'
      },


      {
        field: '名称',
        title: '薪资项目名称',
        align: 'center',
        templet: "#SalaryProjectName"
      },

      {
        field: '类型',
        title: '薪资类型',
        align: 'center',
        templet: "#ProjectType"

      },

      {
        field: '计算公式',
        title: '计算公式',
        align: 'center',
        templet: "#CalculationFormula"
      },
      {
        field: '单位',
        title: '单位',
        align: 'center',
        templet: "#Company"


      },
      {
        field: '部门',
        title: '部门',
        align: 'center',
        templet: "#Department"

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
      url: newipurl + baSic + "&XKLX=SYRSGL&XDLMCID=1001&XDLMSID=DYBH201911051042174217164261",
      where: where,
      toolbar: '#test-table-toolbar-toolbarDemo',
      limits: [10, 20, 50, 100, 150, 300, 500],
      cols: cols,
      page: true,
      response: {
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
    where: {
      QueryText: searchStr
    }
    , page: {
      curr: 1 //重新从第 1 页开始
    }
  });
}

function changeChild(choseInfo, uploadCode) {
  var body = layer.getChildFrame('body', addProject);
  body.find("#计算公式").val(choseInfo);
  body.find("#计算公式").val(choseInfo);
}


$(function () {
  setTimeout(function () {
    limitsChange();
  }, 300)
})
