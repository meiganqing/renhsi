/*
 * @陕西唐远
 * @文件名: 保险系数列表页面
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
    XDLMSID: "DYBH201911021535413541147211"
  }
  getTable();

  //获取下拉选项
  getTableSelect_RSGL({
    XDLMCID: "1001",
    XDLMSID: "DYBH2019110215482505650995"
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
      case 'addInfo':
        if (limitConfig("storeLimt_rsgl", 2)) {
          OpenAddPage("");
        } else {
          layer.msg("您没有添加权限")
        }
        break;
        
      case 'removeAll':
        if (limitConfig("storeLimt_rsgl", 3)) {
          delDataVolume("DYBH201911021535413541107214")
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
      // 单独删除
      if (limitConfig("storeLimt_rsgl", 3)) {
        delData(data.id, "DYBH201911021535413541107214")
      } else {
        layer.msg("您没有删除权限");
      }
    } else if (obj.event === 'edit') {
      console.log(data)
      // 修改
      if (limitConfig("storeLimt_rsgl", 2)) {
        OpenAddPage(data.id);
      } else {
        layer.msg("您没有修改权限");
      }
    } else if (obj.event === 'Tomobilize') {
      // 详情
      OpenTomobilize(data.id);
    }
  });




  






});

// 详情
function OpenTomobilize(examineId){
  openWindow("2","SalaryFactor_view.html?rowid=" + examineId, '保险系数信息', $(window).width()-100, $(window).height()-50)
}


function OpenAddPage(choseProject) {
  if (choseProject) {
    var urlPath = "safetyFactor_add.html?rowid=" + choseProject;
    var titleName = '修改保险系数';
  } else {
  	 var urlPath = "safetyFactor_add.html";
    var titleName = "添加保险系数";
   
  }
  openWindow("2",urlPath, titleName, $(window).width(), $(window).height())
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
        field: '年度',
        title: '年度',
        align: 'center',
        templet: "#year"
      },

      {
        field: '社保基数名称',
        title: '基数名称',
        align: 'center',
        templet: "#sbjsmc"
      },
      {
        field: '添加人',
        title: '添加人',
        align: 'center',
        templet: "#tjr"
      },

      {
        field: '养老保险系数_个人',
        title: '养老(个人)',
        align: 'center',
      },    {
        field: '养老保险系数_单位',
        title: '养老(单位)',
        align: 'center',

      
      },

      {
        field: '医疗保险系数_单位',
        title: '医疗(单位)',
        align: 'center',
   
      },
      {
        field: '医疗保险系数_个人',
        title: '医疗(个人)',
        align: 'center',
        
      },
      // {
      //   field: '失业保险系数_个人',
      //   title: '失业(个人)',
      //   align: 'center',
  
        
     
      // },
      // {
      //   field: '失业保险系数_单位',
      //   title: '失业(单位）',
      //   align: 'center',
  
        
     
      // },
      {
        field: '住房公积金系数_个人',
        title: '住房（个人）',
        align: 'center',
    
     
      },
      {
        field: '住房公积金系数_单位',
        title: '住房（单位）',
        align: 'center',
 
     
      },
      {
        field: '工伤保险系数_单位',
        title: '工伤（单位）',
        align: 'center',
  
     
      },
      // {
      //   field: '生育保险系数_单位',
      //   title: '生育（单位）',
      //   align: 'center',

     
      // },

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






function changeChild(choseInfo, uploadCode) {
  var body = layer.getChildFrame('body', addProject);
  // body.find("#CalculationFormula").val(choseInfo);
  body.find("#计算公式").val(choseInfo);
}


$(function () {
  setTimeout(function () {
    limitsChange();
  }, 300)
})
