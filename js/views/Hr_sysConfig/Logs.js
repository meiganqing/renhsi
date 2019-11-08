/*
 * @陕西唐远
 * @文件名: 
 * @作者: 马娜
 * @Git: e
 * @Date: 2019-10-30 
 * @描述: 
 * @版本: 1.00
 * @修改历史纪录: （修改获取列表，获取下拉）
 * @记录:  1 zlb 20191105 更换方法 
 */

var $, dataTable, where, admin, table;

layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'form', 'table'], function() {
    admin = layui.admin;
    table = layui.table;
    form = layui.form;
    $ = layui.$;
    //查询下拉选项
    PostDataRS({
        XDLMCID: "1001",
        XDLMSID: "DYBH2019102414274306662398"
    }, "SYRSGL", function(data) {
        if (data.success && data.rows.length > 0) {
            // console.log(data.rows)
            getSelectval("searchType", data.rows, "查询显示名", "查询属性")
            form.render("select")
        }
    })
    where = {
            XDLMCID: "1001",
            XDLMSID: "DYBH20191024095830583054231"
        }
        //表格
    getTable("TableList", where);

    //查询
    $("#searchBtn").click(function() {
        searchTableGY(where, dataTable)
        return false
    })
});

function getTable(id, where) {
    var limit = 15;
    var cols = [
        [{
                field: 'mUserName',
                title: '操作人姓名',
                width: '10%',
                align: 'center',
                templet: "#userName"
            },
            {
                field: 'mUserBehavior',
                title: '行为',
                width: '10%',
                align: 'center',
                templet: '#behavior'
            },
            {
                field: 'mUserContent',
                title: '操作内容',
                align: 'center',
                templet: '#recordContent'
            },
            {
                field: 'mDataTime',
                title: '操作时间',
                width: '13%',
                align: 'center'
            },
            {
                field: 'mUserIP',
                title: 'ip',
                width: '10%',
                align: 'center',
                templet: '#ipAddress'
            },
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
            headers: {
                Authorization: getAuth()
            },
            //    contentType: "application/json",
            toolbar: '#test-table-toolbar-toolbarDemo',
            cols: cols,
            skin: 'row', //表格风格
            even: true,
            size: 'sm',
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
        });
    });
}