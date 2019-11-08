/*
 * @陕西唐远
 * @文件名: DataList_User.js
 * @作者: 李浩源
 * @Git: e
 * @Date: 2019-10-24 12:04:01
 * @描述: 培训记录
 * @版本: 1.00
 * @修改历史纪录: （版本 修改时间 修改人 修改内容）
 * @记录: 1 2019.10.24  zlb  换新接口
 */
/*
 * @作者: 张黎博
 * @Git: zlb
 * @描述: 
 * @版本: 1.00
 * @修改历史纪录: （版本 修改时间 修改人 修改内容）
 * @记录:  1 20191030 zlb 增加个人接口 
 */
var $, dailyTable, dataTable, form, userid, pageName, limitName;
var cols;
layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'form', 'table', 'treeSelect'], function() {

    $ = layui.$;
    admin = layui.admin;
    table = layui.table;
    form = layui.form

    userid = window.location.href.getQuery('userid');


    if (userid) {
        where = {
            XDLMCID: "1001",
            XDLMSID: "DYBH2019103116505305750415",
        }
        pageName = 'XDLMpage' //页码的参数名称，默认：page
        limitName = 'XDLMrows' //每页数据量的参数名，默认：limit
        $("#cxDiv").addClass("layui-hide")
        PostDataRS({
            XDLMCID: "1001",
            XDLMSID: "DYBH2019082310260126196202",
            XDLMB: userid
        }, "SYYHGL", function(data) {
            if (data.success) {

                where.XDLMusername = "%" + data.rows[0].mUserName + "%"
                getTable();
            }

        })

    } else {
        pageName = 'page' //页码的参数名称，默认：page
        limitName = 'rows' //每页数据量的参数名，默认：limit
        where = {
            XDLMCID: "1001",
            XDLMSID: "DYBH20190823102721272175131",
        }
        getTable();
    }
    //获取下拉选项
    getTableSelect_RSGL({
        XDLMCID: "1001",
        XDLMSID: "DYBH2019102413405403549923"
    }, {
        id: "searchType",
        key: "查询显示名",
        attr: "查询属性"
    })
    form.render("select")

    // 查询

    $("#searchBtn").on("click", function() {
        console.log("查询")
        searchTableAll(where, dataTable)
    })

    form.on('select(searchChange)', function(data) {
        $("#antistop").val("")
    })

    //获取列表

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
                // 全部删除
            case 'removeAll':
                if (limitConfig("storeLimt_rsgl", 3)) {
                    var checkStatus = table.checkStatus('mDataTable');
                    let data = checkStatus.data;
                    if (data.length == 0) {
                        layer.msg("请选择您要删除的内容");
                        return;
                    }
                    let idStr = ""
                    for (let i = 0; i < data.length; i++) {
                        idStr += data[i].Id + ","
                    }
                    idStr = idStr.substr(0, idStr.length - 1)

                    delData(idStr, 'DYBH201908231027212721240134')
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
                // showDel(data.id);
                delData(data.Id, "DYBH201908231027212721240134")
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



function OpenAddPage(choseId) {
    if (choseId == null) {
        var urlPath = "TrainManage_add.html";
        var urlTitle = "添加培训记录";
    } else {
        var urlTitle = "修改培训记录";
        var urlPath = "TrainManage_add.html?choseId=" + choseId;
    }


    layer.open({
        type: 2,
        // skin: 'layui-layer-rim', //加上边框
        area: ['80%', '85%'], //宽高
        content: urlPath,
        title: urlTitle,
    })

}

function getTable() {
    cols = [
        [
            { field: 'ck', checkbox: true, align: 'center' },
            {
                field: 'TrainName',
                title: '培训课程名称',
                align: 'center',
                templet: "#TrainName"
            },

            {
                field: 'TrainChannel',
                title: '培训渠道',
                align: 'center',
                templet: "#TrainChannel"
            },
            {
                field: 'TrainSfape',
                title: '培训方式',
                align: 'center',
                templet: "#TrainSfape"
                    // templet: function (d) {

                //     return d.TrainSfape;
                // }
            },
            {
                field: 'HostDep',
                title: '主办部门',
                align: 'center',
                templet: "#HostDep"
            },

            {
                field: 'TrainTeacher',
                title: '培训讲师',
                align: 'center',
                templet: "#TrainTeacher"

            },

            {
                field: 'PlanPeopleCount',
                title: '计划参与培训人数',
                align: 'center',
                templet: "#PlanPeopleCount"
            },

            {
                field: 'TrainPlace',
                title: '培训地点',
                align: 'center',
                templet: "#TrainPlace"
            },

            {
                field: 'CourseTime',
                title: '总课时',
                align: 'center',
                templet: "#CourseTime"
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
        url: newipurl + '/xdData/xdDataManage.ashx?XAction=GetDataInterface&XKLX=SYRSGL',
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
            pageName: pageName //页码的参数名称，默认：page  'page'
                ,
            limitName: limitName //每页数据量的参数名，默认：limit 'rows'
        },
        even: true
    });
    // layui.use('table', function () {
    //   var table = layui.table;
    //   dataTable = table.render({
    //     method: 'post',
    //     elem: '#TableList',
    //     id:'mDataTable',
    //     headers: {
    //       Authorization: getAuth()
    //   },
    //     url:newipurl+'/xdData/xdDataManage.ashx?XAction=GetDataInterface&XKLX=SYRSGL&XDLMCID=1001&XDLMSID=DYBH20190823102721272175131',
    //     parseData: function(res){ //res 即为原始返回的数据
    //       var data = res.rows
    //       return {
    //         "code": res.code, //解析接口状态
    //         "msg": res.msg, //解析提示文本
    //         "count": res.count, //解析数据长度
    //         "data": data //解析数据列表
    //       };
    //     },
    //     contentType: "application/json",
    //     toolbar: '#test-table-toolbar-toolbarDemo',
    //     cols: cols,
    //     limits:[10,20,50,100,150,300,500],
    //     page:true,
    //     response: {
    //       statusCode:0,
    //       MsgNane: 'msg',
    //       dataName: 'data',
    //       statusName: 'code',
    //       countName:'count'
    //     },
    //     even: true
    //   });
    // });
}






function OpenTomobilize(choseTrainId) {
    layer.open({
        type: 2,
        // skin: 'layui-layer-molv', //加上边框
        area: ['80%', '90%'], //宽高
        content: "TrainManageView.html?choseTrainId=" + choseTrainId,
        title: '查看记录',
    })
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