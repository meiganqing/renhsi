/*
 * @陕西唐远
 * @文件名: DataList_Transfer.js
 * @作者: 张黎博
 * @Git: zlb
 * @Date: 2019-10-24 12:04:01
 * @描述: 调动记录js
 * @版本: 1.00
 * @修改历史纪录: （版本 修改时间 修改人 修改内容）
 * @记录: 1 2019.10.24  zlb  换新接口 
 */

var $, dataTable, admin, table, form, were, uesrRen, uesrDiao, userid;
layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'form', 'table'], function() {
    admin = layui.admin, table = layui.table, form = layui.form;
    $ = layui.$;
    //列表接口
    userid = window.location.href.getQuery('userid');
    where = {
        XDLMCID: "1001",
        XDLMSID: "DYBH201908231027212721123141"
    }


    // 调动类型下拉
    PostDataRS({
            XDLMCID: "1001",
            XDLMSID: "DYBH20191015151140114015841",
            XDLMA: "9"
        }, "SYYHGL", function(data) {
            if (data.success && data.rows.length > 0) {
                getSelectAllval("transferType", data.rows, "分类名", '分类名')
                form.render("select")
            }
        })
        // 被调动人下拉
    PostDataRS({
        XDLMCID: "1001",
        XDLMSID: "DYBH20190823102601261253201"
    }, "SYYHGL", function(data) {
        if (data.success && data.rows.length > 0) {
            getSelectAllval("userId", data.rows, "mUserName", "userid")
            form.render("select")
        }
    })

    


    if (userid) {
        $("#cxDiv").addClass("layui-hide")
        where.XDLMA = userid
    }
    getTable("TableList", where);
    //头工具栏事件
    table.on('toolbar(test-table-toolbar)', function(obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        // console.log(obj);
        switch (obj.event) {
            case 'addInfo':
                if (limitConfig("storeLimt_rsgl", 2)) {
                    OpenAddPage(null);
                } else {
                    layer.msg("您没有添加权限");
                }
                break;
            case 'deleteAll':
                if (limitConfig("storeLimt_rsgl", 3)) {
                    delDataVolume("DYBH201908231027212721146144")
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
                OpenAddPage(data.id);
            } else {
                layer.msg("您没有编辑权限");
            }
        } else if (obj.event === 'check') {
            OpenDetail(data.Id);
        } else if (obj.event === 'delete') {
            if (limitConfig("storeLimt_rsgl", 3)) {
                delData(data.Id, "DYBH201908231027212721146144")
            } else {
                layer.msg("您没有删除权限");
            }
        }
    });

    form.render();
    form.on('select(userId)', function(data) {
        // console.log($("#userId").find("option:selected").attr("attrData"))
        if (data.value) {
            uesrDiao = data.value
            if (uesrRen) {
                where.XDLMA = data.value
                where.XDLMB = uesrRen
            } else {
                where.XDLMA = data.value
                delete where.XDLMB
            }
        } else {
            uesrDiao = ""
            if (uesrRen) {
                delete where.XDLMA
                where.XDLMB = uesrRen

            } else {
                delete where.XDLMA
                delete where.XDLMB
            }
        }
        getTable("TableList", where);
    })

    form.on('select(transferType)', function(data) {
        if (data.value) {
            uesrRen = data.value
            if (uesrDiao) {
                where.XDLMA = uesrDiao
                where.XDLMB = data.value
            } else {
                where.XDLMB = data.value
                delete where.XDLMA
            }
        } else {
            uesrRen = ""
            if (uesrDiao) {
                where.XDLMA = uesrDiao
                delete where.XDLMB
            } else {
                delete where.XDLMA
                delete where.XDLMB
            }
        }

        getTable("TableList", where);
    })

});

// var exportData;

function getTable(id, where) {
    var limit = 15;
    var cols = [
        [{
            field: 'ck',
            checkbox: true,
            width: '2%',
            align: 'center'
        }, {
            field: 'UserName',
            title: '被调动人',
            width: '10%',
            align: 'center',
            templet: "#UserName"
        }, {
            field: 'TransferType',
            title: '调动类型',
            width: '11%',
            align: 'center',
            templet: "#TransferType"
                // templet: function(d) {
                //     // return returnVal(transferType,d["transferType"]);
                //     return d.TransferType;
                // }
        }, {
            field: 'TransferTime',
            title: '调动日期',
            width: '11%',
            align: 'center'
        }, {
            field: 'TransferFDepId',
            title: '调动前部门',
            width: '14%',
            align: 'center'
        }, {
            field: 'TransferADepId',
            title: '调动后部门',
            width: '14%',
            align: 'center'
        }, {
            field: 'TransferFPostId',
            title: '调动前职位',
            width: '14%',
            align: 'center'
        }, {
            field: 'TransferAPostId',
            title: '调动后职位',
            width: '14%',
            align: 'center'
        }, {
            fixed: 'right',
            title: '操作',
            toolbar: '#test-table-toolbar-barDemo',
            width: '10%',
            align: 'center'
        }]
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
            headers: {

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

// $("#export").click(function() {
//     console.log(exportData);
//     var table = layui.table;
//     table.exportFile(dataTable.config.id, exportData, 'xls');
// })

function OpenAddPage(id) {
    var content = 'Transfer_Add.html';
    var mTitle = "新增调动记录";
    if (id != null) {
        content = content + "?rowid=" + id;
        mTitle = "修改调动记录";
    }
    // var w = $(window).width() - 100 + 'px';
    // var h = $(window).height() - 50 + 'px';

    var w = "710px";
    var h = "665px";
    var index888 = layer.open({
        type: 2,
        content: content,
        area: [w, h],
        title: mTitle,
        maxmin: true,
        success: function(layero, index) {

        }
    });
}

function OpenDetail(id) {
    layer.open({
        type: 2,
        title: '查看调动记录详情',
        area: ['75%', '80%'],
        shadeClose: true,
        // shade: false,
        maxmin: true, //开启最大化最小化按钮
        content: 'Transfer_check.html?rowId=' + id //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
    });
}