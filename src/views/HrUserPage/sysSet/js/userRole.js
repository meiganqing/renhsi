/*
 * @陕西唐远
 * @文件名: userRole.js
 * @作者: 张黎博
 * @Git: zlb
 * @Date: 2019-09-11 15:22:09
 * @描述: 用户设置角色js
 * @版本: 1.00
 * @修改历史纪录: （版本 修改时间 修改人 修改内容）
 * @记录:  
 */
var $, element, layer, form, table, where, tableins, onlynum;
layui.config({
    base: '../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(["jquery", "form", "element", "layer", "table"], function() {
    $ = layui.jquery, element = layui.element, layer = layui.layer, table = layui.table, form = layui.form;
    onlynum = window.location.href.getQuery('onlynum');
    // console.log(onlynum)
    $("#saveRole").click(function() {
        saveRoleBind(table)
    })
    where = {
        TblNum: 7013,
        //		T93:"EQsykf",
        X91: "-1",
        T93: "EQrsgl"
    };
    getTable("demo", where)

});


function getTable(id, where) {

    var limit = 15;
    cols = [
        [{
                field: 'rolename',
                title: '角色名称',
                width: '50%',
                align: 'center',
                templet: "#itemlm"
            },
            {
                field: 'rolenum',
                title: '绑定权限',
                width: '50%',
                align: 'center',
                templet: "#shqx"
            }
        ]
    ];

    layui.use(["table"], function(data) {
        // console.log(data)
        var table = layui.table;
        tableins = table.render({
            elem: '#' + id,
            url: http_common + ip_url + '?XAction=wwGetDataList&sykf=SYYHGL&XKLX=SYYHGL',
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
                SetUserRoleChecked();
            },
            error: function() {

            }
        });
    })
}

function SetUserRoleChecked() {
    //获取当前用户都有哪些角色的权限
    var reData = postDataSYYH('wwGetDataList', {
        TblNum: 7014,
        X94: onlynum
    });
    $("input[name='checkedValue']").each(function(i, elem) {
        for (var i in reData.data) {
            if (reData.data[i].roleNum == elem.value) {
                if (elem.checked) {} else {
                    elem.checked = true;
                }
            }
        }

    });
    layui.use(['form'], function() {
        let form = layui.form;
        form.render();
    });
}

function saveRoleBind(table) {
    //	var DelData = PostDatasyyh("wwDelDataByWhere", {
    //		TblNum: 7014,
    //		T94: 'EQ' + onlynum //roleNum
    //	});

    $("input[name='checkedValue']").each(function(i, elem) {
        console.log(i)
        console.log(elem)
        console.log(elem.value)
        var DelData = postDataSYYH("wwDelDataByWhere", {
            TblNum: 7014,
            T104: 'EQ' + elem.value, //roleNum
            T94: "EQ" + onlynum
        });
        if (elem.checked == true) {
            var rvrole = postDataSYYH('wwGetDataList', {
                TblNum: 7013,
                X103: elem.value,
                T90: 'NE99999'
            });

            if (rvrole.msg || rvrole.success) {
                console.log(rvrole.data[0].rolename)
                var returnData = postDataSYYH("wwAddNewRow", {
                    TblNum: 7014,
                    XDLMroleNum: elem.value,
                    XDLMuserid: onlynum,
                    XDLMrolename: rvrole.data[0].rolename,
                    XDLMxmbh: rvrole.data[0].xmbh
                });

            }

            //      var returnData = PostDatasyyh("AddNewRow", { XDLMTableName: userRole, XDLMrolename:elem.value ,XDLMuserid: userId,XDLMxmbh: getCookieName('xmbh') });
        }
    });
    layer.msg('设置完成！', {
        title: '提示框',
        icon: 1,
        time: 800
    }, function(alertindex) {
        QXALL();
    });

}