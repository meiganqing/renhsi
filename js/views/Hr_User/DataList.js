var $, dataTable;
var cols, treeSelect;
layui.config({
  base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
  index: 'lib/index' //主入口模块
}).use(['index', 'form', 'table', 'treeSelect'], function () {
  var admin = layui.admin, table = layui.table, form = layui.form;
  $ = layui.$;
  treeSelect = layui.treeSelect;

  cols = [[
    {field: 'userName', title: '姓名', width: '8%', align: 'center', templet: '#color_mc'},
    {
      field: 'sex', title: '性别', width: '5%', align: 'center', templet: function (d) {
      if (d.sex == "1") {
        return "男";
      } else {
        return "女";
      }
    }
    },
    {field: 'nativePlace', title: '籍贯', width: '10%', align: 'center', templet: '#nativePlace'},
    {field: 'depName', title: '部门', width: '8%', align: 'center'},
    {field: 'positionName', title: '职位', width: '8%', align: 'center'},
    {field: 'phoneNumber', title: '联系电话', width: '8%', align: 'center', templet: '#phoneNumber'},
    
    {field: 'education', title: '学历', width: '8%', align: 'center',templet:function(d){
        return returnVal(education,d.education)
    }},
    {field: 'paperNumber', title: '证件号码', width: '12%', align: 'center' , templet:"#paperNumber"},
    {field: 'politicalOutlook', title: '政治面貌', width: '5%', align: 'center',templet:function(d){
        return returnVal(politicalOutlook,d.politicalOutlook)
    }},
    {field: 'nation', title: '民族', width: '6%', align: 'center',templet:function(d){
        return returnVal(nation,d.nation)
    }},
   
    {field: 'researchFfield', title: '研究领域', width: '8%', align: 'center', templet:"#researchFfield"},
    {field: 'achievements', title: '成果介绍', width: '8%', align: 'center', templet:"#achievements"},
    {fixed: 'right', title: '操作', toolbar: '#test-table-toolbar-barDemo', align: 'center'}
  ]];

  getTable();
  GetDepInfo();


   //头工具栏事件
  table.on('tool(test-table-toolbar)', function(obj){
    switch(obj.event){
      case 'select':
        layer.open({
            type: 2,
            // skin: 'layui-layer-rim', //加上边框
            area: ['1130px', '690px'], //宽高
            content: "UserAllInfo.html?userid="+obj.data.id,
            title: "员工信息",
        })
        break;
     
    }
  });

  form.on('select(cxlb)', function (data) {
    if (data.value == '职员状态') {
      $('#stateDiv').show();
      $('#key').hide();
      $('#cxBtn').hide();
      $('#depDiv').hide();
    } else if (data.value == '部门') {
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


  $("#workState").html(getMariageState(workState, "全部"));
  $("#postId").html(GetPositionInfo());
  $("#nation").html(getMariageState(nation, "全部"));
  $("#politicalOutlook").html(getMariageState(politicalOutlook, "全部"));
  $("#education").html(getMariageState(education, "全部"));
  form.render();


  form.on('select(searchChange)', function (data) {
    if (data.value == "" || data.value == "userName" || data.value == "nativePlace" || data.value == "phoneNumber" || data.value == "paperNumber" || data.value == "researchFfield" || data.value == "achievements") {
      $(".btnsearch").removeClass("hide");
      $(".allsearch").removeClass("hide").siblings().addClass("hide");
    } else {
      $("." + data.value + "search").removeClass("hide").siblings().addClass("hide");
      $(".btnsearch").addClass("hide");
    }
  });

  form.on('submit(search)', function (data) {
    if ($("#searchType").val() == "") {
      searchStart("", "antistop");
    } else {
      searchStart($("#searchType").val(), "antistop");
    }
    return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
  });


  form.on('select(workState)', function (data) {
    searchStart("workState", "workState");
  })

  form.on('select(sex)', function (data) {
    searchStart("sex", "sex");
  })

  form.on('select(postId)', function (data) {
    searchStart("postId", "postId");
  })

  form.on('select(nation)', function (data) {
    searchStart("nation", "nation");
  })

  form.on('select(politicalOutlook)', function (data) {
    searchStart("politicalOutlook", "politicalOutlook");
  })

  form.on('select(education)', function (data) {
    searchStart("education", "education");
  })


});

function getTable() {
  layui.use('table', function () {
    var table = layui.table;
    dataTable = table.render({
      method: 'post',
      elem: '#TableList',
      id: 'mDataTable',
      url: baseUrl + '/Controllers/Hr_User/GetListByPage',
      contentType: "application/json",
      toolbar: '#test-table-toolbar-toolbarDemo',
      cols: cols,
      limits:[10,20,50,100,150,300,500],
      page: true,
      autoSort: true,  //禁用前端自动排序
      response: {
        statusCode: 0,
        MsgNane: 'msg',
        dataName: 'data',
        statusName: 'code',
        countName: 'count'
      },
      even: true
    });
  });
}

// 获取部门的信息
function GetDepInfo() {
  treeSelect.render({
    // 选择器
    elem: '#depId',
    // 数据
    data: baseUrl + "/Controllers/Hr_Dep/GetListByPage",
    // 异步加载方式：get/post，默认get
    type: 'post',
    // 占位符
    placeholder: '请选择部门',
    // 是否开启搜索功能：true/false，默认false
    search: true,
    // 点击回调
    click: function (d) {
      $("#depId").val(d.current.id);
      searchStart("depId", "depId");
    },
    success: function (d) {
      console.log(d);
      // treeSelect.checkNode('tree', depvalue);
      // var treeObj = treeSelect.zTree('tree');
      // console.log(treeObj);

      //刷新树结构
      treeSelect.refresh('tree');

    }
  });
}


