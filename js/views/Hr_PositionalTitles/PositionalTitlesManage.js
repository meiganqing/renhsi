/*
  * @陕西唐远
 * @文件名: 
 * @作者: 马娜
 * @Git: 马娜
 * @Date: 2019.10.25
 * @描述: 
 * @版本: 1.00
 * @修改历史纪录: （修改接口）

 */
//  * @陕西唐远
//  * @文件名: 
//  * @作者: 李浩源，
//  * @Git: e
//  * @Date: 2019.10.28
//  * @描述: 页面列表接口修改,添加,修改,详情
//  * @版本: 2.00
//  * @修改历史纪录: （
//  * 1.表单的获取
//  * 2.下拉列表的获取
//  * 3.表单的查询，删除，批量删除）
//  * 4添加删除
//  */
var $, dailyTable, dataTable, userid;
var cols, where, admin, table, form;
layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'form', 'table', 'treeSelect'], function() {
    var treeSelect = layui.treeSelect;
    admin = layui.admin;
    table = layui.table;
    form = layui.form;
    $ = layui.$;
    userid = window.location.href.getQuery('userid');
    where = {
        XDLMCID: "1001",
        XDLMSID: "DYBH20190823102721272116121"
    }
    if (userid) {
        $("#cxDiv").addClass("layui-hide")
        where.QueryType = "userId"
        where.QueryKey = userid
    }
    PostData_new(yonghu, {
        XDLMCID: "1001",
        XDLMSID: "DYBH20190823102601261253201",
    }, function(data) {
        console.log(data)
        if (data.success && data.rows.length > 0) {
            getSelectRy("userIdsearch", data.rows, "mUserName", "userid", "mUserName")
            form.render("select")
        }
    })
    
    //获取部门
    PostDataRS({
        XDLMCID: "1001",
        XDLMSID: "DYBH20190823102601261218191"
    }, "SYYHGL", function(returnData) {
        getSelectRy("depIdsearch", returnData.rows, "DepartName", "DepartId");
        form.render("select")
    })
    getTable();
    // 给员工下拉查询赋值

        //获取下拉选项
    getTableSelect_RSGL({
        XDLMCID: "1001",
        XDLMSID: "DYBH2019082917275901937666"
    }, {
        id: "searchType",
        key: "查询显示名",
        attr: "查询属性"
    })
    form.render("select")



    // 监听 select 改变
    form.on('select(searchChange)', function(data) {
        //   如果是评定对象通过下拉usid查询
        if (data.value == "评定对象") {
            form.render('select', "userIdsearch");
            $("#userIdsearch").find("option[value='']").attr("selected", true);

            $("#antistop").val("")
            $("#depIdsearch").val("")
            $(".userIdsearch").removeClass("hide"); //员工

            $(".allsearch").addClass("hide"); //关键字
            $(".btnsearch").addClass("hide"); //查询按钮
            $(".depIdsearch").addClass("hide"); //所属部门

        } else if (data.value == "所属部门") {
            $("#antistop").val("")
            $("#userIdsearch").val("")

            // $("#depIdsearch").find("option[value='']").attr("selected", true);

            $(".depIdsearch").removeClass("hide"); //员工
            $(".allsearch").addClass("hide"); //关键字
            $(".btnsearch").addClass("hide"); //查询按钮
            $(".userIdsearch").addClass("hide"); //所属部门


        } else {
            $("#depIdsearch").val("")
            $("#userIdsearch").val("")
            $("#antistop").val("")
            form.render();
        
            $(".allsearch").removeClass("hide"); ////关键字
            $(".userIdsearch").addClass("hide"); //员工
            $(".btnsearch").removeClass("hide"); //查询按钮
            $(".depIdsearch").addClass("hide"); //所属部门


        }
    });

    // 点击获取员工id
    form.on('select(userIdsearch)', function(data) {
        // 直接查询
        searchTableGxz(where, dataTable)
    })

    // 获取所属部门
    form.on('select(depIdsearch)', function(data) {
        // 直接查询
        searchTableBm(where, dataTable, 'searchType', "depIdsearch")
    })


    // 查询全部
    // $('#searchBtn').on("click", function() {
    //     searchTableAll(where, dataTable)
    // })



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
            case 'removeAll':
                // 批量删除
                if (limitConfig("storeLimt_rsgl", 3)) {
                    delDataVolume("DYBH201908231027212721208124")

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
                // 删除
                delData(data.Id, "DYBH201908231027212721208124")
            } else {
                layer.msg("您没有删除权限");
            }
        } else if (obj.event === 'edit') {
            // 修改
            if (limitConfig("storeLimt_rsgl", 3)) {
                OpenAddPage(data.Id);
            } else {
                layer.msg("您没有修改权限");
            }
        } else if (obj.event === 'Tomobilize') {
            // 详情
            OpenTomobilize(data.Id);
        }
    });

    function getTable() {
        layui.use('table', function() {

            cols = [
                [{
                        field: 'ck',
                        checkbox: true,
                      
                        align: 'center'
                    },
                    {
                        field: 'UserName',
                        title: '评定对象',
                        templet:"#UserName",
                        align: 'center'
                    },
                    {
                        field: 'DepName',
                        title: '所属部门',
                        templet:"#DepName",
                        align: 'center'
                    },
                    {
                        field: 'ApprovalUserId',
                        title: '批准人',
                        templet:"#ApprovalUserId",
                        align: 'center',
                        // templet: function(d) {
                        
                        //     return d.ApprovalUserId;
                        // }
                    },
                    {
                        field: 'TitleName',
                        title: '职称名称',
                        templet:"#TitleName",
                        align: 'center'
                    },
                    {
                        field: 'GetTime',
                        title: '获取时间',
                        templet:"#GetTime",
                        align: 'center'
                    },
                    {
                        field: 'NextTitle',
                        title: '下次申报职称',
                        templet:"#NextTitle",
                        align: 'center'
                    },
                    {
                        field: 'NextTime',
                        title: '下次申报时间',
                        templet:"#NextTime",
                        align: 'center'
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
                url: httpcom_RSGL,
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
                    pageName: 'page' //页码的参数名称，默认：page
                        ,
                    limitName: 'rows' //每页数据量的参数名，默认：limit
                },
                even: true
            });
        });
    }
    // 详情
    var OpenTomobilize = (examineId) => {
        layer.open({
            type: 2,
            // skin: 'layui-layer-rim', //加上边框
            area: ['80%', '90%'], //宽高
            content: "PositionalTitlesManage_view.html?choseId=" + examineId,
            title: "查看职业评定",
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

    function OpenAddPage(changeId) {
        if (changeId == null) {
            // 添加
            var title = "添加职称评定";
            var urlHref = "PositionalTitlesManage_add.html";
        } else {
            // 修改 
            var title = "修改职称评定";
            var urlHref = "PositionalTitlesManage_add.html?choseId=" + changeId;
        }
        layer.open({
            type: 2,
            // skin: 'layui-layer-rim', //加上边框
            area: ['85%', '95%'], //宽高
            content: urlHref,
            title: title,
        })

    }

    //暂时不知道干嘛的？？？？
    //	treeSelect.render({
    //		// 选择器
    //		elem: '#depIdsearch',
    //		// 数据
    //		data: baseUrl + "/Controllers/Hr_Dep/GetListByPage",
    //		// 异步加载方式：get/post，默认get
    //		type: 'post',
    //		// 占位符
    //		placeholder: '请选择部门',
    //		// 是否开启搜索功能：true/false，默认false
    //		search: true,
    //		// 点击回调
    //		click: function(d) {
    //			$("#depIdsearch").val(d.current.id);
    //			$("#depIdsearch").attr("depName", d.current.name);
    //			searchStart("depId", "depIdsearch");
    //		},
    //		success: function(d) {
    //
    //		}
    //	});


    // form.on('select(nextTitle)', function(data) {
    // 	searchStart("nextTitle", "nextTitle");
    // });

    // form.on('select(titleName)', function(data) {
    // 	searchStart("titleName", "titleName");
    // });

    // 提交按钮被单击
    // form.on('submit(SakaryProjectBtn)', function(data) {
    // 	console.log(PostData('/Controllers/Hr_SalaryProject/Add', data.field));
    // 	return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。

    // });

    //	form.on('submit(search)', function(data) {
    //		if($("#searchType").val() == "") {
    //			searchStart("", "antistop");
    //		} else {
    //			searchStart($("#searchType").val(), "antistop");
    //		}
    //		return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    //	});

    // if(GetRequest().checkName) {
    // 	setTimeout(function() {
    // 		$('#searchType').siblings("div.layui-form-select").find('dl dd[lay-value=' + GetRequest().checkName + ']').click()

    // 	}, 300)

    // 	setTimeout(function() {
    // 		$("#" + GetRequest().checkName).siblings("div.layui-form-select").find('dl dd[lay-value=' + GetRequest().checkType + ']').click()
    // 	}, 400)
    // }

});