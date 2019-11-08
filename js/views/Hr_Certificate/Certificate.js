/*
 * @陕西唐远
 * @文件名: 
 * @作者: 马娜，
 * @Git: 马娜
 * @Date: 2019.10.25
 * @描述: 修改页面的请求接口
 * @版本: 1.00
 * @修改历史纪录: （
 * 1.表单的获取
 * 2.下拉列表的获取
 * 3.表单的查询，删除，批量删除）
 */
/*
 * @陕西唐远
 * @文件名: 
 * @作者: 李浩源，
 * @Git: e
 * @Date: 2019.10.28
 * @描述: 页面列表接口修改
 * @版本: 2.00
 * @修改历史纪录: （
 * 1.表单的获取
 * 2.下拉列表的获取
 * 3.表单的查询，删除，批量删除）
 * 4添加删除
 */
/*
 * @作者: 张黎博
 * @Git: zlb
 * @描述: 
 * @版本: 1.00
 * @修改历史纪录: （版本 修改时间 修改人 修改内容）
 * @记录:  1 20191030 zlb 增加个人接口 
 */

var $, dailyTable, dataTable, userid;
var cols, admin, table, form;

layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'form', 'table', "treeSelect"], function() {

    $ = layui.$;
    admin = layui.admin;
    table = layui.table;
    form = layui.form
    userid = window.location.href.getQuery('userid');
    where = {
        XDLMCID: "1001",
        XDLMSID: "DYBH20190823102721272122241"
    }
    if (userid) {
        $("#cxDiv").addClass("layui-hide")
        where.QueryType = "userId"
        where.QueryKey = userid
    }
      // 员工下拉
      PostData_new(yonghu, {
        XDLMCID: "1001",
        XDLMSID: "DYBH20190823102601261253201",
    }, function(data) {
        console.log(data)
        if (data.success && data.rows.length > 0) {
            getSelectRy("userIdsearch", data.rows, "mUserName", "userid", "mUserName")
            form.render("select")
        }
    })
        // 部门下拉
        PostDataRS({
            XDLMCID: "1001",
            XDLMSID: "DYBH20190823102601261218191"
        }, "SYYHGL", function(returnData) {
            getSelectRy("depIdsearch", returnData.rows, "DepartName", "DepartId");
            form.render("select")
        })
        //
    getTable();
    
    //获取下拉选项
    getTableSelect_RSGL({
        XDLMCID: "1001",
        XDLMSID: "DYBH2019102414124407723801"
    }, {
        id: "searchType",
        key: "查询显示名",
        attr: "查询属性"
    })
    form.render("select")

  



// 判断是员工还是部门
  // 监听 select 改变
  form.on('select(searchChange)', function(data) {
    //   如果是评定对象通过下拉usid查询
    if (data.value == "员工") {
     $("#antistop").val("")
     $("#depIdsearch").val("")
        $(".userIdsearch").removeClass("hide"); //员工
        $(".allsearch").addClass("hide"); //关键字
        $(".btnsearch").addClass("hide"); //查询按钮
        $(".depIdsearch").addClass("hide"); //所属部门

    } else if (data.value == "所在部门") {
        $("#antistop").val("")
        $("#userIdsearch").val("")
        $(".depIdsearch").removeClass("hide"); //员工
        $(".allsearch").addClass("hide"); //关键字
        $(".btnsearch").addClass("hide"); //查询按钮
        $(".userIdsearch").addClass("hide"); //所属部门


    } else {
        $("#depIdsearch").val("")
        $("#userIdsearch").val("")
        $("#antistop").val("")
        form.render();

        $(".allsearch").removeClass("hide"); ////关键字
        $(".userIdsearch").addClass("hide"); //员工
        $(".btnsearch").removeClass("hide"); //查询按钮
        $(".depIdsearch").addClass("hide"); //所属部门


    }
// 查询点击
 // 点击获取员工id
 form.on('select(userIdsearch)', function(data) {
    // 直接查询
    searchTableGxz(where, dataTable)
})

// 获取所属部门
form.on('select(depIdsearch)', function(data) {
    // 直接查询
    searchTableBm(where, dataTable, 'searchType', "depIdsearch")
})




});


    //头工具栏事件
    table.on('toolbar(test-table-toolbar)', function(obj) {
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
                // 批量删除
            case 'removeAll':
                if (limitConfig("storeLimt_rsgl", 3)) {
                    delDataVolume("DYBH20190823102721272114244")
                } else {
                    layer.msg("您没有删除权限");
                }
                break;

        }
    });

    //监听行工具事件
    table.on('tool(test-table-toolbar)', function(obj) {
        var data = obj.data;
        if (obj.event === 'del') {
            // 删除
            if (limitConfig("storeLimt_rsgl", 3)) {

                delData(data.Id, "DYBH20190823102721272114244")
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
            OpenTomobilize(data.Id);
        }

    });


});
// 详情
var OpenTomobilize = (examineId) => {
    layer.open({
        type: 2,

        area: ['80%', '90%'], //宽高
        content: "Certificate_view.html?choseId=" + examineId,
        title: "查看证照",
    })
}

// 添加
function OpenAddPage(changeId) {
    if (changeId == null) {
        // 添加
        var title = "添加证照";
        var urlHref = "Certificate_add.html";
    } else {
        // 修改 
        var title = "修改证照";
        var urlHref = "Certificate_add.html?choseId=" + changeId;
    }
    layer.open({
        type: 2,
        // skin: 'layui-layer-rim', //加上边框
        area: ['85%', '93%'], //宽高
        content: urlHref,
        title: title,
    })

}

function getTable() {
    layui.use('table', function() {

        cols = [
            [{
                    field: 'ck',
                    checkbox: true,

                    align: 'center'
                },
                {
                    field: 'UserName',
                    title: '员工姓名',
                    align: 'center',
                    templet: '#UserName',
                },
                {
                    field: 'DepName',
                    title: '所在部门',
                 
                    align: 'center',
                    templet: '#DepName',
                },
                {
                    field: 'LicenceType',
                    title: '证件类型',
                    templet: '#LicenceType',
                    align: 'center',

                },
                {
                    field: 'LicenceCode',
                    title: '证件编号',
                    templet: '#LicenceCode',
                    align: 'center',
                },
                {
                    field: 'LicenceName',
                    title: '证件名称',
                    templet: '#LicenceName',
                    align: 'center',
                },
                {
                    field: 'GetTime',
                    title: '生效日期',
                    templet: '#State',
                    align: 'center'
                },
                {
                    field: 'TakeTime',
                    title: '到期日期',
                    align: 'center',
                    templet: '#State',
                },
                {
                    field: 'State',
                    title: '状态',
                    align: 'center',
                    templet: '#State',

                },
                {
                    fixed: 'right',
                    title: '操作',
                    toolbar: '#test-table-toolbar-barDemo',

                    align: 'center'
                }
            ]
        ];
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

$(function() {
    setTimeout(function() {
        limitsChange();
    }, 300)
})