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
var $, dailyTable, dataTable, userid;
var cols,admin;


layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'form', 'table'], function() {
        admin = layui.admin,
        table = layui.table,
        form = layui.form;
    $ = layui.$;
    userid = window.location.href.getQuery('userid');

	// http://192.168.28.251:8111/xdData/xdDataManage.ashx?XAction=GetDataInterface&XKLX=SYRSGL&XDLMCID=1001&XDLMSID=DYBH201911071313251325246291
    // 查询
       //获取下拉选项
    //    getTableSelect_RSGL({
    //     XDLMCID: "1001",
    //     XDLMSID: "DYBH2019102414124407723801"
    // }, {
    //     id: "searchType",
    //     key: "查询显示名",
    //     attr: "查询属性"
    // })
    // form.render("select")



    // cols = [[
    //   { field: 'ck', checkbox: true, width: '2%', align: 'center' },
    //   { field: 'userId', title: '用户姓名', width: '11%', align: 'center',templet:function(d){
    //       return getUsefName(d.userId);
    //   } },
    //   { field: 'baoxianjishu', title: '保险基数', width: '12%', align: 'center' ,templet:"#baoxianjishu"},
    //   { field: 'gerenyanglao', title: '个人养老', width: '12%', align: 'center' ,templet:"#gerenyanglao"},
    //   { field: 'gerenyiliao', title: '个人医疗', width: '12%', align: 'center' ,templet:"#gerenyiliao"},
    //   { field: 'gerenshiye', title: '个人失业', width: '12%', align: 'center' ,templet:"#gerenshiye"},
    //   { field: 'gongjijin', title: '住房公积金', width: '12%', align: 'center' ,templet:"#gongjijin"},
    //   { field: 'jibengongzi', title: '基本工资', width: '12%', align: 'center' ,templet:"#jibengongzi"},
    //   // { field: '', title: '实发工资', width: '10%', align: 'center' ,templet:function(d){

    //   //   return d.jibengongzi-d.gerenyanglao-d.gerenyiliao-d.gerenshiye+d.jixiaogongzi-d.gongjijin;
    //   // }},
    //   { fixed: 'right', title: '操作', toolbar: '#test-table-toolbar-barDemo', align: 'center'}
    // ]];
    cols = getProjectList();
    if (userid) {
        $("#cxDiv").addClass("layui-hide")
        where.QueryType = "userId"
        where.QueryKey = userid
    }
    getTable();



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
                        idStr += data[i].id + ","
                    }
                    idStr = idStr.substr(0, idStr.length - 1)

                    showDel(idStr);
                } else {
                    layer.msg("您没有删除权限");
                }

        }
    });



    //监听行工具事件
    table.on('tool(test-table-toolbar)', function(obj) {
        var data = obj.data;
        if (obj.event === 'del') {
            if (limitConfig("storeLimt_rsgl", 3)) {
                showDel(data.id);
            } else {
                layer.msg("您没有删除权限");
            }
        } else if (obj.event === 'edit') {
            if (limitConfig("storeLimt_rsgl", 2)) {
                OpenAddPage(data.id);
            } else {
                layer.msg("您没有修改权限");
            }
        } else if (obj.event === 'Tomobilize') {
            OpenTomobilize(data.id);
        }
    });

    $("#userId").html(GetUserInfo());

    form.render();

    // 监听 select 改变
    form.on('select(userID)', function(data) {
        $("#searchBtn").click();
    });


    // 提交按钮被单击
    form.on('submit(SakaryProjectBtn)', function(data) {
        console.log(PostData('/Controllers/Hr_SalaryTemplate/Add', data.field));
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。

    });


    form.on('submit(search)', function(data) {
        data = data.field;
        var searchStr = "";
        for (let i in data) {
            if (data[i] != "") {
                searchStr += "and " + i + " =" + data[i] + " "
            }
        }

        if ($("#searchType").val() != "") {
            searchStr += "and " + $("#searchType").val() + " like '%" + $("#antistop").val() + "%'"
        } else {
            var select = document.getElementById("searchType");

            searchStr += "and ("
            for (let i = 1; i < select.length; i++) {
                searchStr += select[i].value + " like '%" + $("#antistop").val() + "%' ";

                if (i != select.length - 1) {
                    searchStr += " or ";
                }
            }
            searchStr += ") and salaryType=1";
        }

        searchModel(searchStr);
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

});

function OpenAddPage(changeId) {
    if (changeId == null) {
        // 添加
        var title = "添加薪资统计";
        var urlHref = "SalaryStatistics_add.html";
    } else {
        // 修改 
        var title = "修改薪资统计";
        var urlHref = "SalaryStatistics_add.html?changeId=" + changeId;
    }
    layer.open({
        type: 2,
        // skin: 'layui-layer-rim', //加上边框
        area: ['730px', '517px'], //宽高
        content: urlHref,
        title: title,
    })

}

function getTable() {
    layui.use('table', function() {

        var table = layui.table;
        dataTable = table.render({
            method: 'post',
            elem: '#TableList',
            id: 'mDataTable',
            url: baseUrl + '/Controllers/Hr_SalaryTemplate/GetListByPage',
            where: { QueryText: "and salaryType=1" },
            contentType: "application/json",
            toolbar: '#test-table-toolbar-toolbarDemo',
            cols: cols,
            totalRow: true,
            limits: [10, 20, 50, 100, 150, 300, 500],
            parseData: function(res) { //res 即为原始返回的数据
                var data = changeHolderVal(res.data, "userId", allUserList);
                console.log(data);
                return {
                    "code": res.code, //解析接口状态
                    "msg": res.msg, //解析提示文本
                    "count": res.count, //解析数据长度
                    "data": data //解析数据列表
                };
            },
            page: true,
            response: {
                statusCode: 0,
                MsgNane: 'msg',
                dataName: 'data',
                statusName: 'code',
                countName: 'count'
            },
            even: true,
            done: function() {
                // $('.layui-table-fixed-r').removeClass('layui-hide');
            }
        });
    });
}


var OpenTomobilize = (examineId) => {
    layer.open({
        type: 2,
        // skin: 'layui-layer-rim', //加上边框
        area: ['45%', '40%'], //宽高
        content: "SalaryStatisticsView.html?choseId=" + examineId,
        title: "查看薪资",
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


function getProjectList() {

    let data = {
        page: 1,
        limit: 999
    }

    var ChangeData = PostData('/Controllers/Hr_SalaryTemplate/GetListByPage', JSON.stringify(data)).data;


    var colss = [
        [
            { field: 'ck', checkbox: true, fixed: 'left', width: '2%', align: 'center' },
            {
                field: 'userId',
                title: '用户姓名',
                fixed: 'left',
                width: '8%',
                align: 'center',
                totalRowText: '合计：',
                templet: function(d) {
                    // return getUsefName(d.userId);
                    return d.userId;
                }
            },

        ]
    ];

    var noChangeData = [
        { 'salaryProjectName': '保险基数', 'projectType': 2, 'projectCode': 'baoxianjishu' },
        { 'salaryProjectName': '个人养老', 'projectType': 2, 'projectCode': 'gerenyanglao' },
        { 'salaryProjectName': '个人医疗', 'projectType': 2, 'projectCode': 'gerenyiliao' },
        { 'salaryProjectName': '个人失业', 'projectType': 2, 'projectCode': 'gerenshiye' },
        { 'salaryProjectName': '住房公积金', 'projectType': 2, 'projectCode': 'gongjijin' },
        { 'salaryProjectName': '基本工资', 'projectType': 2, 'projectCode': 'jibengongzi' },
    ];

    for (let i = 0; i < noChangeData.length; i++) {
        colss[0].push({ field: noChangeData[i].projectCode, title: noChangeData[i].salaryProjectName, minWidth: '80', align: 'center', totalRow: true })
    }

    for (let i = 0; i < ChangeData.length; i++) {
        colss[0].push(
          
        )
    }


    var html = '';





    colss[0].push({ fixed: 'right', title: '操作', toolbar: '#test-table-toolbar-barDemo', width: '10%', align: 'center' });

    return colss;
}