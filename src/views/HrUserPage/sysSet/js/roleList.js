/*
 * @陕西唐远
 * @文件名: roleList.js
 * @作者: 张黎博
 * @Git: zlb
 * @Date: 2019-09-11 15:22:09
 * @描述: 角色列表js
 * @版本: 1.00
 * @修改历史纪录: （版本 修改时间 修改人 修改内容）
 * @记录:  
 */
var $, element, layer, form, table, where, selectValue;
layui.config({
    base: '../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(["jquery", "form", "element", "layer", "table"], function() {
    $ = layui.jquery, element = layui.element, layer = layui.layer, table = layui.table, form = layui.form;
    selectValue = ""

    where = {
            TblNum: 7013,
            X91: "-1",
            T93: "EQrsgl"
        }
        // 查询下拉框
    postDataSYYH("wwGetDataList", {
        TblNum: 7012,
        T85: "EQ7013",
        orderby: "xh asc"
    }, function(data) {
        selectValue = data.data;
        getSelect("cxlb", data.data, "display", "chsx")
        form.render("select")
    })

    // 获取角色表
    getTable("tableList", where);


    table.on('toolbar(tableList)', function(obj) {
        var checkStatus = table.checkStatus('tableLayui')
        switch (obj.event) {
            case 'add': //添加
                openWindow("2", "./roleAdd.html", "添加", 500, 300);
                break;
            case 'delPL': //删除（批量）
                PLSC(checkStatus)
                break;
        }
    });

    table.on('tool(tableList)', function(obj) {
        var data = obj.data;
        console.log(data)
        switch (obj.event) {
            case 'edit': //修改
                openWindow("2", "./roleAdd.html?rowId=" + data.id, "修改", 500, 300)
                break;
            case 'del': //删除
                delDataSYYH(data.id, "7013", function() {
                    tableins.reload();
                })
                break;
            case 'setqx': //配置
                openWindow("2", "./roleLimitList.html?rowid=" + data.id + "&rolename=" + escape(data.rolename) + "&onlynum=" + data.roleNum + "&miaoshu=" + escape(data.miaoshu), "配置")
                break;
        };
    });

    //查询
    $("#searchData").click(function() {
        // where.QueryJllx = $("#store").val();

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

// 角色列表
function getTable(id, where) {

    var limit = 15;
    cols = [
        [ //表头
            {
                checkbox: true,
                LAY_CHECKED: false
            }, {
                type: 'numbers',
                title: "序号"
            }, {
                field: 'rolename',
                title: '角色名称',
                width: "35%",
                align: "center",
                templet: '#jsname'
            }, {
                field: 'miaoshu',
                title: '角色描述',
                width: "35%",
                align: "center"
            }, {
                field: '',
                title: '操作',
                width: "23%",
                align: "center",
                templet: '#opeTpl'
            }
        ]
    ]

    layui.use(["table"], function(data) {
        var table = layui.table;
        tableins = table.render({
            elem: '#' + id,
            url: http_common + ip_url + "?sykf=SYYHGL&XKLX=SYYHGL&xmbh=wwbh&XAction=wwGetDataList",
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
            request: {
                pageName: 'page' //页码的参数名称，默认：page
                    ,
                limitName: 'rows' //每页数据量的参数名，默认：limit
            },
            // response: {
            //     //				statusName: 'success', //规定数据状态的字段名称，默认：code					
            //     //				statusCode: true, //规定成功的状态码，默认：0					
            //     //				msgName: 'success', //规定状态信息的字段名称，默认：msg					
            //     countName: 'total', //规定数据总数的字段名称，默认：count					
            //     dataName: 'rows' //规定数据列表的字段名称，默认：data
            // },
            loading: true,
            cellMinWidth: 30,
            // request: {
            //     pageName: 'page' //页码的参数名称，默认：page
            //         ,
            //     limitName: 'rows' //每页数据量的参数名，默认：limit
            // },
            // //				height: 'full-70',
            page: true, //是否显示分页
            limits: [limit, 50, 100, 200, 500, 1000],
            limit: limit, //每页默认显示的数量
            id: "tableLayui",
            done: function(res, curr, count) {
                if (res.message == "NOTLOGIN") {
                    parent.location.href = baseUrl + "/login.html"

                }
            },
            error: function() {

            }
        });
    })
}
// 批量删除
function PLSC(ids) {
    if (ids.data.length == 0) {
        var index111 = layer.msg('请先选中行！', {
            title: '提示框',
            icon: 2,
            time: 800
        }, function(alertindex) {
            layer.close(index111);
        });
    } else {

        indexPrompt = layer.prompt({
                title: '警告！系统关键操作，必须输入确认密码',
                formType: 1
            }, //prompt风格，支持0-2},
            function(pass) {

                if (pass == '3.1415') {

                    layer.msg('正在删除,请稍等...', {
                        time: 0,
                        shade: 0.3,
                        //content: '测试回调',
                        success: function(index, layero) {

                            for (var i = 0; i < ids.data.length; i++) {
                                var rvs = postDataSYYH("wwDelDataById", {
                                    TblNum: "7013",
                                    XDLMID: ids.data[i].id
                                });


                            };
                            layer.msg('删除完成！', {
                                title: '提示框',
                                icon: 1,
                                time: 500
                            }, function() {
                                tableins.reload();
                                layer.close(indexPrompt);

                            });

                        }
                    });
                } else {
                    layer.msg('密码错误,请重新输入', {
                        icon: 0,
                        time: 800
                    });
                }
            });
    }
}