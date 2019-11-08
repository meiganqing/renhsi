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
/*
 * @作者: 张黎博
 * @Git: zlb
 * @描述: 
 * @版本: 1.00
 * @修改历史纪录: （版本 修改时间 修改人 修改内容）
 * @记录:  1 20191030 zlb 增加个人接口 
 */
var $, dataTable, where, userid, form;
var cols;
layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'form', 'table', 'laydate'], function () {
    $ = layui.$;
    admin = layui.admin;
    table = layui.table;
    form = layui.form
    userid = window.location.href.getQuery('userid');
    where = {
        XDLMCID: '1001',
        XDLMSID: 'DYBH20190823102721272111021'
    }
    if (userid) {
        $("#cxDiv").addClass("layui-hide")
        where.QueryType = "userId"
        where.QueryKey = userid
    }
   // 姓名下拉框
   PostData_new(yonghu, {
    XDLMCID: "1001",
    XDLMSID: "DYBH20190823102601261253201",
}, function (data) {
    if (data.success && data.rows.length > 0) {
        getSelectRy("userIdsearch", data.rows, "mUserName", "userid", "mUserName")
        form.render("select")
    }
})
PostData_new(yonghu ,{
    XDLMCID: "1001",
    XDLMSID: "DYBH20191015151140114015841",
    XDLMA:'2',
  }, function(data) {
  if (data.success && data.rows.length > 0) {
    getSelectRy("userEducation", data.rows, "分类名", "分类名")
      form.render("select")
  }
  })
// 学历插询

    getTable(); //表格数据
     // 查询下拉
 getTableSelect_RSGL({
        XDLMCID: "1001",
        XDLMSID: "DYBH2019083011504409452411"
    }, {
        id:"searchType",
        key: "查询显示名",
        attr: "查询属性"
    })
    form.render("select")
   


    // 人名查询
    form.on('select(userIdsearch)', function(data) {
        // 直接查询
        searchTableGxz(where, dataTable)
    })
    // 学历查询
    form.on('select(Education)', function(data) {
        // 直接查询
        searchTableXue(where, dataTable)
    })
    








    // 点击名字时单独出现
    form.on('select(searchChange)', function (data) {
        if (data.value == "姓名") {
            $("#antistop").val("")
            $("#Education").val("")
            $(".userIdsearch").removeClass("hide"); //员工
            $(".Education").addClass("hide"); //学历
            $(".allsearch").addClass("hide"); //关键字
            $(".btnsearch").addClass("hide"); //查询按钮

        }else if(data.value == "学历"){
            $("#antistop").val("")
            $("#antistop").val("")
            $(".userIdsearch").addClass("hide"); //员工
            $(".allsearch").addClass("hide"); //关键字
            $(".btnsearch").addClass("hide"); //查询按钮
            $(".Education").removeClass("hide"); //学历

        }
        else {
            $("#userIdsearch").val("");
            $("#Education").val("")
            $("#antistop").val("")
            form.render();
            $(".userIdsearch").addClass("hide"); //员工
            $(".Education").addClass("hide"); //学历
            $(".allsearch").removeClass("hide"); //关键字
            $(".btnsearch").removeClass("hide"); //查询按钮

        }
    })
    
    //     // 点击查询
    // $("#searchBtn").click(function() {
    //     searchTableGY(where, dataTable)
    // })




    //头工具栏事件
    table.on('toolbar(test-table-toolbar)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        switch (obj.event) {
            // 添加
            case 'addInfo':
                if (limitConfig("storeLimt_rsgl", 2)) {
                    OpenAddPage(null);
                } else {
                    layer.msg("您没有添加权限");
                }
                break;
            // 全部删除
            case 'deleteAll':
                if (limitConfig("storeLimt_rsgl", 3)) {

                    delDataVolume("DYBH20190823102721272121024")
                } else {
                    layer.msg("您没有删除权限");
                }
                break;
        }
    });

    //监听行工具事件
    table.on('tool(test-table-toolbar)', function (obj) {
        var data = obj.data;
        if (obj.event === 'edit') {
            if (limitConfig("storeLimt_rsgl", 2)) {
                OpenAddPage(data.Id);
            } else {
                layer.msg("您没有编辑权限");
            }
        } else if (obj.event === 'check') {
            if (limitConfig("storeLimt_rsgl", 1)) {
                OpenCheck(data.Id);
            } else {
                layer.msg("您没有访问权限");
            }
        } else if (obj.event === 'delete') {
            if (limitConfig("storeLimt_rsgl", 3)) {
                // 单独删除

                delData(data.Id, "DYBH20190823102721272121024")

            } else {
                layer.msg("您没有删除权限");
            }
        }
    });

    // laydate.render({
    //     elem: '#begTime',
    //     range: true
    // });
    // laydate.render({
    //     elem: '#endTime',
    //     range: true
    // });





});

function getTable() {
    cols = [
        [
            { field: 'ck', checkbox: true, align: 'center' },
            {
                field: 'UserName',
                title: '姓名',
                align: 'center',
                templet: "#UserName"
            },
            {
                field: 'Education',
                title: '学历',
                align: 'center',
                templet: "#Education"
            },
            {
                field: 'School',
                title: '毕业院校',
                align: 'center',
                templet: "#School"
            },
            {
                field: 'Major',
                title: '专业',
                align: 'center',
                templet: '#Major'
            },

            {
                field: 'BegTime',
                title: '入学时间',
                align: 'center',
                templet: '#BegTime'
                
            },

            {
                field: 'EndTime',
                title: '毕业时间',
                align: 'center',
                templet: '#EndTime'
                
            },

            {
                fixed: 'right',
                title: '操作',
                toolbar: '#test-table-toolbar-barDemo',
                align: 'center'
            }
        ]
    ];
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

function OpenAddPage(id) {
    var content = 'Education_Add.html';
    var mTitle = "新增教育经历";
    if (id != null) {
        content = content + "?rowid=" + id;
        mTitle = "修改教育经历";
    }
    var index888 = layer.open({
        type: 2,
        content: content,
        area: ['60%', '90%'],
        title: mTitle,
        maxmin: true,
        success: function (layero, index) {

        }
    });
}

// 详情
function OpenCheck(id) {
    layer.open({
        type: 2,
        title: '查看教育经历详情',
        area: ['75%', '80%'],
        shadeClose: true,
        maxmin: true, //开启最大化最小化按钮
        content: 'Education_Check.html?rowid=' + id //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
    });
}

$(function () {
    setTimeout(function () {
        limitsChange();
    }, 300)
})