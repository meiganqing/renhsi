/*
 * @陕西唐远
 * @文件名: OrganizerPosition.js
 * @作者: 张黎博
 * @Git: zlb
 * @Date: 2019-10-24 12:04:01
 * @描述: 职位管理页js
 * @版本: 1.00
 * @修改历史纪录: （版本 修改时间 修改人 修改内容）
 * @记录:  
 */
var $, dataTable, oldPosition, admin, table, form, where;
layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'form', 'table'], function() {

    admin = layui.admin,
        table = layui.table,
        form = layui.form;
    $ = layui.$;

    // 查询类别下拉
    PostDataRS({
            XDLMCID: "1001",
            XDLMSID: "DYBH2019102818295401328779"
        }, "SYRSGL", function(data) {
            if (data.success && data.rows.length > 0) {
                getSelectval("searchType", data.rows, "查询显示名", "查询属性")
                form.render("select")
            }
        })
        //列表接口
    where = {
            XDLMCID: "1001",
            XDLMSID: "DYBH2019082310272127216251"
        }
        //表格
    getTable("TableList", where);


    //头工具栏事件
    table.on('toolbar(test-table-toolbar)', function(obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        switch (obj.event) {
            case 'addInfo':
                if (limitConfig("storeLimt_rsgl", 2)) {
                    openWindow("2", "./OrganizerPosition_add.html", "添加", 600, 400)
                } else {
                    layer.msg("您没有添加权限");
                }

                break;
            case 'removeAll':
                if (limitConfig("storeLimt_rsgl", 3)) {
                    delDataVolume("DYBH20190823102721272112354")
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
            if (limitConfig("storeLimt_rsgl", 3)) {
                delData(data.Id, "DYBH20190823102721272112354")
            } else {
                layer.msg("您没有删除权限");
            }
        } else if (obj.event === 'edit') {
            if (limitConfig("storeLimt_rsgl", 2)) {
                openWindow("2", "./OrganizerPosition_add.html?rowId=" + data.Id, "修改", 600, 400)
            } else {
                layer.msg("您没有修改权限");
            }

            // OpenAddPage(data.id);
        }
    });


    form.render();

    //查询
    $("#searchBtn").click(function() {
        searchTableGY(where, dataTable)
    })
});


function getTable(id, where) {
    var limit = 15;
    var cols = [
        [{
                field: 'ck',
                checkbox: true,
                width: '2%',
                align: 'center'
            },
            {
                field: 'id',
                title: 'id',
                width: '8%',
                align: 'center',
                hide: true
            },
            {
                field: 'PositionName',
                title: '职位名称',
                width: '8%',
                align: 'center',
                templet: '#positionName'
            },
            {
                field: 'PositionDescribe',
                title: '职位描述',
                align: 'center',
                templet: '#positionDescribe'
            },

            {
                fixed: 'right',
                title: '操作',
                toolbar: '#test-table-toolbar-barDemo',
                width: '15%',
                align: 'center'
            }
        ]
    ];
    layui.use('table', function() {
        var table = layui.table;
        dataTable = table.render({
            method: 'post',
            elem: '#' + id,
            id: 'mDataTable',
            url: httpcom_RSGL,
            where: where,
            skin: 'row', //表格风格
            even: true,
            size: 'sm',
            // parseData: function(res) { //res 即为原始返回的数据
            //     var data = changeHolderVal(res.data, "workState", workState);
            //     data = changeHolderVal(data, "sex", sex);
            //     data = changeHolderVal(data, "userAttribute", userAttribute);
            //     return {
            //         "code": res.code, //解析接口状态
            //         "msg": res.msg, //解析提示文本
            //         "count": res.count, //解析数据长度
            //         "data": data //解析数据列表
            //     };
            // },
            // contentType: "application/json",
            toolbar: '#test-table-toolbar-toolbarDemo',
            height: $(window).height() - 170,
            headers: {
                // getAuth()
                Authorization: getAuth()
            },
            cols: cols,
            limits: [limit, 20, 50, 100, 150, 300, 500],
            limit: limit, //每页默认显示的数量
            page: true,
            autoSort: true, //禁用前端自动排序
            request: {
                // statusCode: 0,
                // MsgNane: 'msg',
                // dataName: 'data',
                // statusName: 'code',
                // countName: 'count'
                pageName: 'page' //页码的参数名称，默认：page
                    ,
                limitName: 'rows' //每页数据量的参数名，默认：limit
            },
            response: {
                //				statusName: 'success', //规定数据状态的字段名称，默认：code					
                //				statusCode: true, //规定成功的状态码，默认：0					
                //				msgName: 'success', //规定状态信息的字段名称，默认：msg					
                countName: 'total', //规定数据总数的字段名称，默认：count					
                dataName: 'rows' //规定数据列表的字段名称，默认：data
            },
            defaultToolbar: ['filter', 'print'],
            even: true
        });
    });
}




// $("#PositionName").blur(function() {
//     if ($("#PositionName").val() == "") {
//         return;
//     }
//     if (oldPosition == $("#PositionName").val()) {
//         return;
//     }
//     var strwhere = "and positionName = '" + $("#PositionName").val() + "'";
//     var data = {
//         tabName: 'Hr_PositionManage',
//         strWhere: strwhere
//     }
//     if (!duplicateChecking("/Controllers/BaseInfo/IsExists", JSON.stringify(data))) {
//         layer.msg("已存在名称为" + $("#PositionName").val() + "的职位");
//         $("#PositionName").val(oldPosition);
//     }
// })



// $(function() {
//     setTimeout(function() {
//         limitsChange();
//     }, 300)
// })s