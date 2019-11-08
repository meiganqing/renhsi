/*
 * @陕西唐远
 * @文件名:DataList_Contract.js 
 * @作者: 张黎博
 * @Git: zlb
 * @Date: 2019-10-24 12:04:01
 * @描述: 合同管理页js
 * @版本: 1.00
 * @修改历史纪录: （版本 修改时间 修改人 修改内容）
 * @记录:  
 */
var $, dataTable, admin, table, form, laydate, userid;
layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'form', 'table', 'laydate'], function() {
    admin = layui.admin,
        table = layui.table,
        form = layui.form,
        laydate = layui.laydate;
    $ = layui.$;
    userid = window.location.href.getQuery('userid');
    // 查询类别下拉
    PostDataRS({
            XDLMCID: "1001",
            XDLMSID: "DYBH201910241013250265221"
        }, "SYRSGL", function(data) {
            if (data.success && data.rows.length > 0) {
                getSelectval("searchType", data.rows, "查询显示名", "查询属性")
                form.render("select")
            }
        })
        // 姓名下拉
    PostDataRS({
        XDLMCID: "1001",
        XDLMSID: "DYBH20190823102601261253201"
    }, "SYYHGL", function(data) {
        if (data.success && data.rows.length > 0) {
            getSelectAllval("userId", data.rows, "mUserName", "userid")
            form.render("select")
        }
    })

    //列表接口
    where = {
            XDLMCID: "1001",
            XDLMSID: "DYBH2019082310272127215201"
        }
        //表格
    if (userid) {
        $("#cxDiv").addClass("layui-hide")
        $("#addDiv").addClass("layui-hide")
        $("#scDiv").addClass("layui-hide")
        where.QueryType = "userId"
        where.QueryKey = userid
    }
    getTable("TableList", where);

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
            case 'deleteAll':
                if (limitConfig("storeLimt_rsgl", 2)) {
                    delDataVolume("DYBH20190823102721272120204")
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
        } else if (obj.event === 'check') {
            if (limitConfig("storeLimt_rsgl", 1)) {
                OpenCheck(data.Id);
            } else {
                layer.msg("您没有访问权限");
            }
        } else if (obj.event === 'delete') {
            if (limitConfig("storeLimt_rsgl", 3)) {
                delData(data.Id, "DYBH20190823102721272120204")
            } else {
                layer.msg("您没有删除权限");
            }
        }
    });

    form.on('select(searchChange)', function(data) {
        if (data.value == "userId") {
            $("#antistop").val("")
            $("#chaxunbut").addClass("layui-hide")
            $("#gjzdiv").addClass("layui-hide")
            $("#xmname").removeClass("layui-hide")
        } else {
            $("#userId").val("")
            $("#chaxunbut").removeClass("layui-hide")
            $("#gjzdiv").removeClass("layui-hide")
            $("#xmname").addClass("layui-hide")
        }
    })

    form.on('select(userId)', function(data) {
            where.QueryType = "userId"
            where.QueryKey = data.value
            getTable("TableList", where);
        })
        // form.on('select(searchChange)', function(data) {
        //     if (data.value == "" || data.value == "contractCode") {
        //         $(".btnsearch").removeClass("hide");
        //         $(".allsearch").removeClass("hide").siblings().addClass("hide");
        //     } else if (data.value == "contractSignTime" || data.value == "contractBegTime" || data.value == "contractEndTime") {
        //         $("." + data.value + "search").removeClass("hide").siblings().addClass("hide");
        //         $(".btnsearch").removeClass("hide");
        //     } else {

    //         $("." + data.value + "search").removeClass("hide").siblings().addClass("hide");
    //         $(".btnsearch").addClass("hide");
    //     }
    // });

    // form.on('submit(search)', function(data) {
    //     if ($("#searchType").val() == "") {
    //         searchStart("", "antistop");
    //     } else if ($("#searchType").val() == "contractSignTime") {
    //         searchStart($("#searchType").val(), "contractSignTime", true);
    //     } else if ($("#searchType").val() == "contractBegTime") {
    //         searchStart($("#searchType").val(), "contractBegTime", true);
    //     } else if ($("#searchType").val() == "contractEndTime") {
    //         searchStart($("#searchType").val(), "contractEndTime", true);
    //     } else {
    //         searchStart($("#searchType").val(), "antistop");
    //     }
    //     return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    // });

    // form.on('select(userId)', function(data) {
    //     searchStart("userId", "userId");
    // })
    // form.on('select(contractType)', function(data) {
    //     searchStart("contractType", "contractType");
    // })


    // form.render();
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
                field: 'UserName',
                title: '姓名',
                width: '11%',
                align: 'center',
                templet: '#UserName'
            },
            {
                field: 'ContractType',
                title: '合同类型',
                width: '12%',
                align: 'center',
                templet: '#ContractType'
            },
            {
                field: 'ContractCode',
                title: '合同编号',
                width: '20%',
                align: 'center',
                templet: "#contractCode"
            },
            {
                field: 'ContractSignTime',
                title: '合同签订日期',
                width: '12%',
                align: 'center',
                templet: '#contractSignTime1'
            },
            {
                field: 'ContractBegTime',
                title: '合同生效日期',
                width: '12%',
                align: 'center',
                templet: '#contractBegTime1'
            },
            {
                field: 'ContractEndTime',
                title: '合同终止日期',
                width: '12%',
                align: 'center',
                templet: '#contractEndTime1'
            },
            // { field: 'creationUser', title: '创建人', width: '11%', align: 'center' },
            {
                fixed: 'right',
                title: '操作',
                toolbar: '#test-table-toolbar-barDemo',
                width: '17%',
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

function OpenAddPage(id) {
    var content = 'Contract_Add.html';
    var mTitle = "新增合同";
    if (id != null) {
        content = content + "?rowId=" + id;
        mTitle = "修改合同";
    }
    var index888 = layer.open({
        type: 2,
        content: content,
        area: ['70%', '80%'],
        title: mTitle,
        maxmin: true,
        success: function(layero, index) {

        }
    });
}

function OpenCheck(id) {
    layer.open({
        type: 2,
        title: '查看合同详情',
        area: ['75%', '80%'],
        shadeClose: true,
        maxmin: true, //开启最大化最小化按钮
        content: 'Contract_check.html?rowId=' + id //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
    });
}


function DelById(rowid) {
    let data = {
        DelString: rowid,
        UserId: loginId
    };
    var delData = PostData("/Controllers/Hr_ContractManage/Delete/", JSON.stringify(data));
    console.log(delData);
    if (delData.data) {
        layer.msg('删除完成！', {
            title: '提示框',
            icon: 1,
            time: 800
        }, function(alertindex) {
            // window.location.reload();
            dataTable.reload('mDataTable', {
                page: {
                    curr: 1 //重新从第 1 页开始
                }
            });
            layer.close(index123);
        });
    }
}

$(function() {
    setTimeout(function() {
        limitsChange();
    }, 300)
})