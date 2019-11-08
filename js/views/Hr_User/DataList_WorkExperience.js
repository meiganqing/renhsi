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
var $, dataTable, where, form, userid;
var cols;
layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'form', 'table', 'laydate'], function() {

    table = layui.table,
        form = layui.form,
        laydate = layui.laydate;
    $ = layui.$;
    userid = window.location.href.getQuery('userid');
    laydate.render({
        elem: '#entryTime',
        range: true
    });
    laydate.render({
        elem: '#quitTime',
        range: true
    });
    where = {
        XDLMCID: '1001',
        XDLMSID: 'DYBH201908231027212721101171'
    }
    if (userid) {
        $("#cxDiv").addClass("layui-hide")
        where.QueryType = "userId"
        where.QueryKey = userid
    }
    
    // 姓名选项
    PostData_new(yonghu, {
        XDLMCID: "1001",
        XDLMSID: "DYBH20190823102601261253201",
    }, function(data) {
       
        if (data.success && data.rows.length > 0) {
            getSelectRy("userIdsearch", data.rows, "mUserName", "userid", "mUserName")
            form.render("select")
        }
    })
    getTable();
    // 查询下拉获取
    getTableSelect_RSGL({
        XDLMCID: "1001",
        XDLMSID: "DYBH2019102410232602770134"
    }, {
        id: "searchType",
        key: "查询显示名",
        attr: "查询属性"
    })
    form.render("select")



    form.on('select(searchChange)', function(data) {
        if (data.value == "姓名") {
            $("#antistop").val("")
        $(".userIdsearch").removeClass("hide"); //员工
            $(".allsearch").addClass("hide"); //关键字
            $(".btnsearch").addClass("hide"); //查询按钮
        } else {
            $("#userIdsearch").val("");
            $("#antistop").val("")
            form.render();

            $(".userIdsearch").addClass("hide"); //员工
            $(".allsearch").removeClass("hide"); //关键字
            $(".btnsearch").removeClass("hide"); //查询按钮

        }
    })

     // 人名查询
     form.on('select(userIdsearch)', function(data) {
        // 直接查询
        searchTableGxz(where, dataTable)
    })





    //头工具栏事件
    table.on('toolbar(test-table-toolbar)', function(obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        switch (obj.event) {
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
                    delDataVolume("DYBH201908231027212721222174")


                } else {
                    layer.msg("您没有删除权限");
                }
                break;
        }
    });

    //监听行工具事件
    table.on('tool(test-table-toolbar)', function(obj) {
        var data = obj.data;
        if (obj.event === 'edit') {
            if (limitConfig("storeLimt_rsgl", 2)) {
                OpenAddPage(data.Id);
            } else {
                layer.msg("您没有编辑权限");
            }
        } else if (obj.event == 'check') {
            if (limitConfig("storeLimt_rsgl", 1)) {
                OpenCheck(data.Id);
            } else {
                layer.msg("您没有访问权限");
            }
        } else if (obj.event === 'delete') {
            if (limitConfig("storeLimt_rsgl", 3)) {
                // showDel(data.Id);
                delData(data.Id, "DYBH201908231027212721222174")
            } else {
                layer.msg("您没有删除权限");
            }
        }
    });

});


function getTable() {

    cols = [
        [{
                field: 'ck',
                checkbox: true,
                align: 'center'
            },

            {
                templet: '#UserName',
                field: 'UserName',
                title: '姓名',
                align: 'center'
            },

            {
                field: 'Company',
                title: '公司',
                align: 'center',
                templet: '#Company'
            },

            {
                field: 'Position',
                title: '职位',
                align: 'center',
                templet: '#Position'
            },

            {
                field: 'EntryTime',
                title: '入职时间',
                align: 'center',
                templet: '#EntryTime'
            },

            {
                field: 'QuitTime',
                title: '离职时间',
                align: 'center',
                templet: '#QuitTime'
            },

            {
                field: 'WorkYears',
                title: '工作年限',
                align: 'center',
                templet: '#WorkYears'
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
    var content = 'WorkExperience_Add.html';
    var mTitle = "新增工作经历";
    if (id != null) {
        content = content + "?rowid=" + id;
        mTitle = "修改工作经历";
    }
    var index888 = layer.open({
        type: 2,
        content: content,
        area: ["820px", "630px"],
        title: mTitle,
        maxmin: true,
        success: function(layero, index) {

        }
    });
}

function OpenCheck(id) {
    layer.open({
        type: 2,
        title: '查看工作经历详情',
        area: ['75%', '80%'],
        shadeClose: true,
        maxmin: true, //开启最大化最小化按钮
        content: 'WorkExperience_Check.html?rowid=' + id //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
    });
}

$(function() {
    setTimeout(function() {
        limitsChange();
    }, 300)
})