/*
 * @陕西唐远
 * @文件名: userList.js
 * @作者: 张黎博
 * @Git: zlb
 * @Date: 2019-09-11 15:22:09
 * @描述: 用户列表页js
 * @版本: 1.00
 * @修改历史纪录: （版本 修改时间 修改人 修改内容）
 * @记录:  
 */
var $, element, layer, laydate, form, table, where, tableins, selectValue;
layui.config({
    base: '../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(["jquery", "form", "element", "layer", "laydate", "table"], function() {
    $ = layui.jquery, element = layui.element, layer = layui.layer, table = layui.table, form = layui.form;
    selectValue = "";
    where = {
            TblNum: 7000,
        }
        //获取搜索下拉
    postDataSYYH("wwGetDataList", {
            "TblNum": "7012",
            "T85": "EQ7000",
            "orderby": "xh asc"
        }, function(data) {
            selectValue = data.data;
            getSelect("cxlb", data.data, "display", "chsx");
            form.render("select")
        })
        // 获取角色列表
    getTable("tableList", where);


    // 添加页
    table.on('toolbar(tableList)', function(obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        switch (obj.event) {
            case 'add': //添加
                // openWindow("2", "./userAdd.html", "添加用户");
                openWindow("2", "./addUser.html", "添加用户", 600, 500);

                break;
            case 'delPL': //删除（批量）
                delDataVolumeYH("DYBH20190823102601261202204")
                break;
        }
    });


    table.on('tool(tableList)', function(obj) {
        var data = obj.data;
        switch (obj.event) {
            // 修改
            case 'edit':
                // openWindow("2", "./userAdd.html?rowId=" + data.id, "修改用户")
                openWindow("2", "./addUser.html?id=" + data.id, "修改用户", 600, 500)
                break;
                // 删除
            case 'del':
                delDataSYYH(data.id, where.TblNum, function() {
                    layer.msg('删除成功！', {
                        title: '提示框',
                        icon: 1,
                        time: 800
                    }, function(alertindex) {
                        tableins.reload();
                    });
                })
                break;
                // 配置
            case "setBtn":
                openWindow("2", "./userRole.html?onlynum=" + data.onlynum, "配置角色", 600, 700)
                break;
        };
    });

    //查询
    $("#searchData").click(function() {
        for (var i = 0; i < selectValue.length; i++) {
            if ($("#cxlb").val() == selectValue[i].display) {
                where.QueryType = selectValue[i].chsx
            }
        }
        where.QueryKey = $("#keyWords").val();
        tableins.reload({
            where: where,
        });
    })
});

function getTable(id, where) {

    var limit = 15;
    var cols = [
        [ //表头
            {
                checkbox: true,
                LAY_CHECKED: false
            }, {
                type: 'numbers',
                title: "序号"
            }, {
                field: 'mLoginName',
                title: '登录名',
                width: "19%",
                align: "center",
                templet: '#yhname'
            }, {
                field: 'mUserName',
                title: '姓名',
                width: "19%",
                align: "center",
                templet: '#zsname'
            }, {
                field: 'Role',
                title: '用户角色',
                width: "20%",
                align: "center"
            }, {
                field: '',
                title: '用户状态',
                width: "14%",
                align: "center",
                templet: '#yhzt'
            }, {
                field: '',
                title: '操作',
                width: "20%",
                align: "center",
                templet: '#opeTpl'
            }
        ]
    ]


    layui.use(["table"], function(data) {
        console.log(data)
        var table = layui.table;
        tableins = table.render({
            elem: '#' + id,
            url: http_common + ip_url + "?sykf=SYYHGL&XKLX=SYYHGL&xmbh=rsgl&XAction=wwGetDataList",
            where: where,
            method: 'post',
            cols: cols,
            skin: 'row', //表格风格
            even: true,
            size: 'sm',
            toolbar: '#toolbarDemo',
            headers: {
                Authorization: getAuth()
            },
            // data: testData,
            //			toolbar: true, //开启工具栏，此处显示默认图标，可以自定义模板，详见文档
            //			width: $(window).width() - 40,
            defaultToolbar: [],
            height: $(window).height() - 170,
            // request: {
            //     pageName: 'page' //页码的参数名称，默认：page
            //         ,
            //     limitName: 'limit' //每页数据量的参数名，默认：limit
            // },
            // response: {
            //     // statusName: 'code', //规定数据状态的字段名称，默认：code					
            //     // statusCode: 0, //规定成功的状态码，默认：0					
            //     // msgName: 'success', //规定状态信息的字段名称，默认：msg					
            //     //     countName: 'count', //规定数据总数的字段名称，默认：count					
            //     //     dataName: 'data' //规定数据列表的字段名称，默认：data
            // },
            loading: true,
            cellMinWidth: 30,
            //				height: 'full-70',
            page: true, //是否显示分页
            limits: [limit, 50, 100, 200, 500, 1000],
            limit: limit, //每页默认显示的数量
            id: "tableLayui",
            done: function(res, curr, count) {
                // if (res.message == "NOTLOGIN") {
                //     parent.location.href = baseUrl + "/login.html"

                // }
            },
            error: function() {

            }
        });
    })
}