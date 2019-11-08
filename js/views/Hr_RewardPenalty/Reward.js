/*
 * @陕西唐远
 * @文件名: Reward.js
 * @作者: 张黎博
 * @Git: zlb
 * @Date: 2019-10-24 12:04:01
 * @描述: 奖罚页js
 * @版本: 1.00
 * @修改历史纪录: （版本 修改时间 修改人 修改内容）
 * @记录:  
 */
var $, dailyTable, dataTable, admin, table, form, laydate, where, RewardPenalty, RewardType, RewardTypeNum, uesrType, uesrnamenum, userid;
layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'form', 'table', 'laydate'], function() {
    admin = layui.admin, table = layui.table, form = layui.form;
    $ = layui.$;
    laydate = layui.laydate;
    // 奖惩参数
    RewardPenalty = window.location.href.getQuery('RewardPenalty');
    userid = window.location.href.getQuery('userid');

    // 员工姓名下拉
    PostDataRS({
        XDLMCID: "1001",
        XDLMSID: "DYBH20190823102601261253201"
    }, "SYYHGL", function(data) {
        if (data.success && data.rows.length > 0) {
            getSelectAllval("ygname", data.rows, "mUserName", "userid")
            form.render("select")
        }
    })

    if (RewardPenalty == "Reward") {
        RewardType = "奖励";
        RewardTypeNum = "2";
        if (userid) {
            $("#cxDiv").addClass("layui-hide")
            where = {
                XDLMCID: "1001",
                XDLMSID: "DYBH2019082310272127219061",
                QueryType: "RewardType",
                QueryKey: "2",
                XDLMA: userid
            }
        } else {
            where = {
                XDLMCID: "1001",
                XDLMSID: "DYBH2019082310272127219061",
                QueryType: "RewardType",
                QueryKey: "2"
            }
        }

        PostDataRS({
            XDLMCID: "1001",
            XDLMSID: "DYBH20191015151140114015841",
            XDLMA: "10"
        }, "SYYHGL", function(data) {
            if (data.success && data.rows.length > 0) {
                getSelectAllval("jfyy", data.rows, "分类名")
                form.render("select")
            }

        })
    } else if (RewardPenalty == "Penalty") {
        RewardType = "惩罚";
        RewardTypeNum = "1";
        if (userid) {
            $("#cxDiv").addClass("layui-hide")
            where = {
                XDLMCID: "1001",
                XDLMSID: "DYBH2019082310272127219061",
                QueryType: "RewardType",
                QueryKey: "1",
                XDLMA: userid
            }
        } else {
            where = {
                XDLMCID: "1001",
                XDLMSID: "DYBH2019082310272127219061",
                QueryType: "RewardType",

                QueryKey: "1"
            }
        }

        //处罚原因下拉选项
        PostDataRS({
            XDLMCID: "1001",
            XDLMSID: "DYBH20191015151140114015841",
            XDLMA: "11"
        }, "SYYHGL", function(data) {
            if (data.success && data.rows.length > 0) {
                getSelectAllval("jfyy", data.rows, "分类名")
                form.render("select")
            }

        })
    }

    laydate.render({ //奖励日期
        elem: '#rewardTime',
        range: true //指定元素
    });

    if (GetRequest().RewardPenalty == "Reward") {
        $('#DataListName').html("奖励列表");
    } else {
        $('#DataListName').html("惩罚列表");
    }

    getTable("TableList", where);

    //员工姓名下拉查询
    form.on('select(ygname)', function(data) {
            console.log($("#ygname option:checked").text())
            if (data.value) {
                // console.log("Value")
                uesrnamenum = data.value
                if (uesrType) {
                    where.XDLMA = data.value
                    where.QueryType = "RewardProject"
                    where.QueryKey = uesrType
                } else {
                    where.XDLMA = data.value
                }

            } else {
                uesrnamenum = ""
                    // console.log("无Value")
                if (uesrType) {
                    delete where.XDLMA;
                    where.QueryType = "RewardProject"
                    where.QueryKey = uesrType
                } else {
                    if (RewardPenalty == "Penalty") {
                        where.QueryType = "RewardType"
                        where.QueryKey = "1"
                    } else if (RewardPenalty == "Reward") {
                        where.QueryType = "RewardType"
                        where.QueryKey = "2"
                    }
                    delete where.XDLMA;
                }
            }
            getTable("TableList", where);
        })
        // 奖惩原因下拉查询
    form.on('select(jfyy)', function(data) {
            if (data.value) {
                // console.log("Value")
                uesrType = data.value
                if (uesrnamenum) {
                    where.XDLMA = uesrnamenum
                    where.QueryType = "RewardProject"
                    where.QueryKey = data.value

                } else {
                    where.QueryType = "RewardProject"
                    where.QueryKey = data.value
                }
            } else {
                uesrType = ""
                    // console.log("无Value")
                if (uesrnamenum) {
                    if (RewardPenalty == "Penalty") {
                        where.QueryType = "RewardType"
                        where.QueryKey = "1"
                    } else if (RewardPenalty == "Reward") {
                        where.QueryType = "RewardType"
                        where.QueryKey = "2"
                    }
                    where.XDLMA = uesrnamenum
                } else {
                    if (RewardPenalty == "Penalty") {
                        where.QueryType = "RewardType"
                        where.QueryKey = "1"
                    } else if (RewardPenalty == "Reward") {
                        where.QueryType = "RewardType"
                        where.QueryKey = "2"
                    }
                    delete where.XDLMA;
                }
            }
            getTable("TableList", where);
        })
        //头工具栏事件
    table.on('toolbar(test-table-toolbar)', function(obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        console.log(obj);
        switch (obj.event) {
            case 'addInfo':
                if (limitConfig("storeLimt_rsgl", 2)) {
                    OpenAddPage(null);
                } else {
                    layer.msg("您没有添加权限");
                }

                break;
            case 'removeAll':
                if (limitConfig("storeLimt_rsgl", 3)) {
                    var checkStatus = table.checkStatus('mDataTable');
                    delDataVolume("DYBH20190823102721272117564")
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
                delData(data.Id, "DYBH20190823102721272117564")
            } else {
                layer.msg("您没有删除权限");
            }
        } else if (obj.event === 'edit') {
            if (limitConfig("storeLimt_rsgl", 2)) {
                // console.log(data)
                // console.log(data.Id)
                OpenAddPage(data.Id);
            } else {
                layer.msg("您没有修改权限");
            }
        } else if (obj.event === 'Tomobilize') {
            // OpenTomobilize();
        }
    });

    // $("#userName").html(GetUserInfo());
    // if (GetRequest().RewardPenalty == "Reward") {
    //     $("#rewardProject").html(getMariageState(rewardProject, "全部"));
    // } else {
    //     $("#rewardProject").html(getMariageState(Project, "全部"));
    // }
    form.render('select');
    form.render();
});


function OpenAddPage(typeId) {
    // console.log(typeId)
    if (typeId == null) {
        // 这个 是 没有 传 id 是 新增 不是添加
        var pathUrl = 'RewardPenalty_add.html?RewardType=' + RewardTypeNum;
        var titleName = "添加";
    } else {
        // 修改
        var pathUrl = 'RewardPenalty_add.html?rowId=' + typeId + "&RewardType=" + RewardTypeNum;
        var titleName = "修改";
    }
    layer.open({
        type: 2,
        // skin: 'layui-layer-rim', //加上边框
        area: ['711px', '560px'], //宽高
        content: pathUrl,
        title: titleName + RewardType,
    })
}

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
                title: '员工姓名',
                width: '11%',
                align: 'center',
                templet: '#userNames'
            },
            {
                field: 'RewardProject',
                title: RewardType + '原因',
                width: '25%',
                align: 'center',
                templet: '#RewardProject'
            },
            {
                field: 'RewardTime',
                title: RewardType + '日期',
                width: '12%',
                align: 'center'
            },
            {
                field: 'RewardMoney',
                title: RewardType + '金额',
                width: '15%',
                align: 'center',
                templet: '#rewardMoney'
            },
            {
                field: 'RewardExplain',
                title: RewardType + '说明',
                width: '20%',
                align: 'center',
                templet: '#rewardExplain'
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


// var searchModel = (searchStr) => {
//     dataTable.reload({
//         where: { //设定异步数据接口的额外参数，任意设
//             QueryText: searchStr
//         },
//         page: {
//             curr: 1 //重新从第 1 页开始
//         }
//     });
// }


// $(function() {
//     setTimeout(function() {
//         limitsChange();
//     }, 300)
// })