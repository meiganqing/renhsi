/*
 * @陕西唐远
 * @文件名: sjpzList.js
 * @作者: 张黎博
 * @Git: zlb
 * @Date: 2019-10-15 16:25:11
 * @描述: 数据配置列表页js
 * @版本: 1.00
 * @修改历史纪录: （版本 修改时间 修改人 修改内容）
 * @记录:  
 */
var $, element, layer, laydate, form, table, where, flid;
layui.config({
    base: '../../layuiadmin/lib/' //静态资源所在路径
}).use(["jquery", "form", "element", "layer", "laydate", "table"], function() {
    $ = layui.jquery, element = layui.element, layer = layui.layer, table = layui.table, form = layui.form;
    where = {
        XDLMCID: "1001",
        XDLMSID: "DYBH20191015151140114015841",
    }
    getTable("tableList", where);

    table.on('toolbar(tableList)', function(obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        switch (obj.event) {
            // case 'add': //添加
            //     if (typeof(flid) == "undefined") {
            //         openWindow("2", "./sjpzAdd.html", "添加");
            //     } else {
            //         openWindow("2", "./sjpzAdd.html?flid=" + flid, "添加");
            //     }
            //     break;
            // case 'delPL': //删除（批量）
            //     delDataVolume("DYBH201905271253095393544", function(data) {
            //         tableins.reload()
            //     })
            //     break;
            case 'addType':
                if (typeof(flid) == "undefined") {
                    var indexs = openWindow("2", "./sjpzAdd.html?lx=1", "添加分类", 800, 400)
                } else {
                    var indexs = openWindow("2", "./sjpzAdd.html?lx=1&flid=" + flid, "添加分类", 800, 400)

                }
                break;
            case 'xgType':
                if (typeof(flid) == "undefined") {

                    var indexs = openWindow("2", "./sjpzAdd.html?lx=2", "修改分类名", 800, 400)
                } else {
                    var indexs = openWindow("2", "./sjpzAdd.html?lx=2&flid=" + flid, "修改分类名", 800, 400)

                }
                break;
            case 'ydType':
                if (typeof(flid) == "undefined") {

                    var indexs = openWindow("2", "./sjpzAdd.html?lx=3", "移动分类", 800, 400)
                } else {
                    var indexs = openWindow("2", "./sjpzAdd.html?lx=3&flid=" + flid, "移动分类", 800, 400)

                }

                break;
            case 'scType':
                if (typeof(flid) == "undefined") {

                    var indexs = openWindow("2", "./sjpzAdd.html?lx=4", "删除分类", 800, 400)
                } else {
                    var indexs = openWindow("2", "./sjpzAdd.html?lx=4&flid=" + flid, "删除分类", 800, 400)

                }
                break;
        }
    });
    table.on('tool(tableList)', function(obj) {
        var data = obj.data;
        switch (obj.event) {
            // case 'edit':
            //     openWindow("2", "./MT_FILE_add.html?rowId=" + data.id, "修改")
            //     break;
            case 'del':
                delDatashu(data.id, "DYBH20191015151140114019044", function(data) {
                    tableins.reload()
                })
                break;
                // case "detail":
                //     openWindow("2", "./tzgl_listxq.html?rowId=" + data.id, "详情")
                //     break;

        };
    });
    SetZtree();
    //查询
    $("#searchData").click(function() {
        searchTableData(where, tableins)
    })
});

function SetZtree() {
    // if (ItemValue != "") {
    $(document).ajaxSend(function(event, jqxhr, settings) {
        jqxhr.setRequestHeader("Authorization", getAuth());
    });
    setting = {
        edit: {
            enable: true,
            showRemoveBtn: false,
            showRenameBtn: false
        },
        data: {
            simpleData: {
                enable: true
            }

        },
        view: {
            selectedMulti: false
        },
        callback: {
            onClick: zTreeOnClick,
            onAsyncSuccess: zTreeOnAsyncSuccess,
            onAsyncError: zTreeOnAsyncError
        },
        async: {
            enable: true,
            contentType: "application/json",
            dataType: "text",
            headers: {
                Authorization: getAuth() //此处放置请求到的用户token
            },
            url: ipUrl + "&XDLMCID=2000&XDLMSID=DYBH2019101515115305625631&XDLMTID=2001",
            //autoParam: ["id", "name","ParentId","children"],
            //otherParam: {
            //  "otherParam": "zTreeAsyncTest"
            //}
        }
    };
    zTreeObj = $.fn.zTree.init($("#tree"), setting);
    // }
}

function zTreeOnAsyncSuccess(event, treeId, treeNode, msg) {
    // console.log(msg);
}

function zTreeOnAsyncError(event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown) {
    // console.log(XMLHttpRequest);
}

function zTreeOnClick(event, treeId, treeNode) {
    console.log(treeNode.id)
    flid = treeNode.id
    table.reload('tableLayui', {
        headers: {
            "Authorization": getAuth() //此处放置请求到的用户token
        },
        //  url: baseDataListURL + '&XDLMCID=1001&XDLMSID=DYBH2018110916330706107018&XDLMC=' + $('#mSysList').val() + '&XDLMSC=' + treeNode.id,
        url: ipUrl + '&XDLMCID=1001&XDLMSID=DYBH20191015151140114015841&XDLMA=' + treeNode.id,
        page: {
            curr: 1 //重新从第 1 页开始
        }
    });
}

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
            },
            {
                field: '分类id',
                title: '分类id',
                width: "25%",
                align: "center"
            }, {
                field: '分类名',
                title: '分类名',
                width: "25%",
                align: "center"
            }, {
                field: '父类id',
                title: '父类id',
                width: "25%",
                align: "center"
            }, {
                field: '',
                title: '操作',
                width: "15%",
                align: "center",
                templet: '#opeTpl'
            }
        ]
    ]

    layui.use(["table"], function(data) {
        var table = layui.table;
        tableins = table.render({
            elem: '#' + id,
            url: ipUrl,

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
            height: $(window).height() - 70,
            request: {
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
            loading: true,
            cellMinWidth: 30,
            request: {
                pageName: 'page' //页码的参数名称，默认：page
                    ,
                limitName: 'rows' //每页数据量的参数名，默认：limit
            },
            //				height: 'full-70',
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