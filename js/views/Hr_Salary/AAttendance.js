/*
 * @陕西唐远
 * @文件名: 考勤列表页面
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
    XDLMCID: "1001",
    XDLMSID: "DYBH2019110412091991932241"
  }
  getTable();

  //获取下拉选项
  getTableSelect_RSGL({
    XDLMCID: "1001",
    XDLMSID: "DYBH2019110412100705502537"
  }, {
    id: "searchType",
    key: "查询显示名",
    attr: "查询属性"
  })
  form.render("select")




  //头工具栏事件
  table.on('toolbar(test-table-toolbar)', function (obj) {
    var checkStatus = table.checkStatus(obj.config.id);
    switch (obj.event) {
      // 批量删除
      case 'removeAll':
        if (limitConfig("storeLimt_rsgl", 3)) {
          delDataVolumeRS("DYBH20191104120919919100244")
        } else {
          layer.msg("您没有删除权限");
        }
        break;
        // 批量导出
        case 'Alldaochu':
          if (limitConfig("storeLimt_rsgl", 3)) {
            AlldaoChu("DYBH2019110417164908048053")
          } else {
            layer.msg("您没有权限");
          }
          break;
        // 选择导出
        case 'Xzdaochu':
          if (limitConfig("storeLimt_rsgl", 3)) {
            daoChu("DYBH2019110417164908048053")
          } else {
            layer.msg("您没有权限");
          }
          break;
    }

  });

  //监听行工具事件
  table.on('tool(test-table-toolbar)', function (obj) {
    var data = obj.data;
    if (obj.event === 'del') {
      // 单独删除
      if (limitConfig("storeLimt_rsgl", 3)) {
        delData(data.id, "DYBH20191104120919919100244")
      } else {
        layer.msg("您没有删除权限");
      }
    } 
    else if (obj.event === 'Tomobilize') {
      // 详情
      OpenTomobilize(data.id);
    }
  });
});

// 详情
function OpenTomobilize(examineId){
  openWindow("2","Attendance_view.html?rowid=" + examineId, '考勤信息', $(window).width()-100, $(window).height()-50)
}


function getTable() {
  layui.use('table', function () {
    // 包括姓名，部门，上班打卡时间，下班打卡时间，早退分钟数，迟到分钟数
    cols = [[
      {
        field: 'ck',
        checkbox: true,
        align: 'center'
      },

      {
        field: '用户名',
        title: '姓名',
        align: 'center',
        templet: "#name"
      },

      {
        field: '部门',
        title: '部门',
        align: 'center',
        templet: "#bumen"
      },
      {
        field: '工作日',
        title: '工作日',
        align: 'center',
        templet: "#daywork"
      },
      {
        field: '考勤类型',
        title: '考勤类型',
        align: 'center',
        templet: "#workType"
      },
      {
        field: '排班打卡时间',
        title: '排班打卡时间',
        align: 'center',
        templet: "#workTime"
      
      },
      {
        field: '是否合法',
        title: '是否合法',
        align: 'center',
        templet: "#worOk"
      
      },
      {
        field: '打卡时间',
        title: '上班打卡时间',
        align: 'center',
        templet: "#tjr"
      },

      {
        field: '打卡结果',
        title: '打卡结果',
        align: 'center',
      },    {
        field: '早退分钟',
        title: '早退分钟数',
        align: 'center',

      
      },

      {
        field: '迟到分钟',
        title: '迟到分钟数',
        align: 'center',
   
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



$(function () {
  setTimeout(function () {
    limitsChange();
  }, 300)
})
