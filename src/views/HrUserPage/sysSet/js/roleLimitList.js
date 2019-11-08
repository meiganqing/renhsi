/*
 * @陕西唐远
 * @文件名: roleLimitList.js
 * @作者: 张黎博
 * @Git: zlb
 * @Date: 2019-09-11 15:22:09
 * @描述: 角色配置列表js
 * @版本: 1.00
 * @修改历史纪录: （版本 修改时间 修改人 修改内容）
 * @记录:  
 */

var $, element, layer, form, table, where, onlynum, rolenames, miaoshus, rowid, qxList, xmbhs;
layui.config({
    base: '../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(["jquery", "form", "element", "layer", "table"], function() {
    $ = layui.jquery, element = layui.element,
        layer = layui.layer, table = layui.table,
        form = layui.form;
    onlynum = window.location.href.getQuery('onlynum');
    rolenames = unescape(window.location.href.getQuery('rolename'));
    miaoshus = unescape(window.location.href.getQuery('miaoshu'));
    rowid = window.location.href.getQuery('rowid')
        // console.log(unescape(window.location.href.getQuery("rolename")))
        // console.log(window.location.href.getQuery("rolename"))
        // console.log(onlynum)

    xmbhs = $("#xmbhList").val()
    console.log(xmbhs)
    where = {
            wRoleNum: onlynum,
            wXMBH: 'rsgl'
        }
        // 角色配置列表
    getTable();

    // 根据下拉框获取对应角色配置列表
    form.on('select(xmbhList)', function(data) {
        xmbhs = data.value;
        where.wXMBH = data.value;
        tableins.reload({
            where: where
        });
        if (data.value != '') {
            $('#isbmzr').val(1);
            $('#isRecMsg').val(1);
        } else {

        }
    });
    console.log(xmbhs)
        // 监听列表行
    table.on('tool(xmTable)', function(obj) {
        var data = obj.data;
        var layEvent = obj.event;
        if (layEvent == 'edit') {
            openWindow(2, "./roleLimitAdd.html?rowid=" + data.id, '修改栏目', 600, 280);

        } else if (layEvent == 'del') {
            DelDatasyyh2(7015, data.id, data.itemNum);
        }
    });

    // 批量删除
    $('#PLSC').click(function() {
        var checkStatus = table.checkStatus('tableLayui');
        PLSC(checkStatus);
    });

    //一行内除可访问，任何一个选中，可访问选中
    //添加
    $('#add_RolePower').click(function() {

        openWindow(2, "./roleLimitAdd.html", '添加栏目', 600, 280);
        //       addTeamMList();
    });


    form.on("checkbox(checkbox_fw)", function(data) {
        if (data.elem.checked) {} else { //没有选中
            console.log("未选中")
            $(this).parents("tr").find("td:eq(4)").find("input").prop("checked", false)
            $(this).parents("tr").find("td:eq(5)").find("input").prop("checked", false)
            $(this).parents("tr").find("td:eq(6)").find("input").prop("checked", false)
            $(this).parents("tr").find("td:eq(7)").find("input").prop("checked", false)
        }
        form.render();
    })
    form.on("checkbox(checkbox_bj)", function(data) {
        if (data.elem.checked) {
            if ($(this).parents("tr").find("td:eq(3)").find("input").prop("checked")) {

            } else {
                $(this).parents("tr").find("td:eq(3)").find("input").prop("checked", true)

            }
        }
        form.render();
    })
    form.on("checkbox(checkbox_sc)", function(data) {
        if (data.elem.checked) {
            if ($(this).parents("tr").find("td:eq(3)").find("input").prop("checked")) {

            } else {
                $(this).parents("tr").find("td:eq(3)").find("input").prop("checked", true)

            }
        }
        form.render();
    })
    form.on("checkbox(checkbox_dc)", function(data) {
        if (data.elem.checked) {
            if ($(this).parents("tr").find("td:eq(3)").find("input").prop("checked")) {

            } else {
                $(this).parents("tr").find("td:eq(3)").find("input").prop("checked", true)

            }
        }
        form.render();
    })
    form.on("checkbox(checkbox_sh)", function(data) {
            console.log(data.elem.checked)
            if (data.elem.checked) {
                if ($(this).parents("tr").find("td:eq(3)").find("input").prop("checked")) {} else {
                    $(this).parents("tr").find("td:eq(3)").find("input").prop("checked", true)

                }
            }

            form.render();
        })
        //点击checkbox编辑删除啥的，选中对应的每一行表格权限
    qxList = ['all_fw', 'all_bj', 'all_sc', 'all_dc', 'all_sh'];
    for (var i = 0; i < qxList.length; i++) {
        //		console.log(qxList[i]);
        form.on('checkbox(' + qxList[i] + ')', function(data) {

            if (data.elem.checked) {
                if (data.value != "checkbox_fw") { //是不是可访问，不是可访问选中					
                    if ($("#all_fw").prop("checked")) {

                    } else {
                        $("#all_fw").prop("checked", true)
                        $('[name="checkbox_fw"]').each(function(i, e) {

                            if (e.checked) {} else {
                                e.checked = true;
                            }
                        });
                    }
                }

                $('[name="' + data.value + '"]').each(function(i, e) {

                    if (e.checked) {} else {
                        e.checked = true;
                    }
                });
                form.render();
            } else {
                if (data.value == "checkbox_fw") { //可访问未选中						
                    for (var j = 0; j < qxList.length; j++) { //移除上边的
                        if ($("#" + qxList[j]).prop("checked")) {
                            $("#" + qxList[j]).prop("checked", false)
                        }
                        $('[name="' + $("#" + qxList[j]).val() + '"]').prop("checked", false)
                    }
                    form.render();
                }
                $('[name="' + data.value + '"]').each(function(i, e) {
                    if (e.checked) {
                        e.checked = false;
                    } else {

                    }
                });
                form.render();
            }
        });
    }
    $('#saveRole').click(function(e) {
        e.preventDefault();
        console.log(e)
        var rowNetbarid = table.cache.tableLayui;
        console.log(table.cache)
        console.log(rowNetbarid)
        if (rowNetbarid.length > 0) {
            for (var i in rowNetbarid) {
                var qx = 900000;
                if ($("[value=checkbox_fw" + rowNetbarid[i].id + "]")[0].checked) {
                    qx = qx + 10000;
                }
                if ($("[value=checkbox_bj" + rowNetbarid[i].id + "]")[0].checked) {
                    qx = qx + 1000;
                }
                if ($("[value=checkbox_sc" + rowNetbarid[i].id + "]")[0].checked) {
                    qx = qx + 100;
                }
                if ($("[value=checkbox_dc" + rowNetbarid[i].id + "]")[0].checked) {
                    qx = qx + 10;
                }
                if ($("[value=checkbox_sh" + rowNetbarid[i].id + "]")[0].checked) {
                    qx = qx + 1;
                }
                console.log(qx)
                console.log(xmbhs)
                console.log(rowNetbarid[i].itemNum)
                postData("wwDelRoleLm", {
                    roleNum: onlynum,
                    wXMBH: xmbhs,
                    wLmOnlynum: rowNetbarid[i].itemNum,
                }, "", "", false, "sykf=SYYHGL&XKLX=SYYHGL");
                postData("wwAddRoleLm", {
                    roleNum: onlynum,
                    wXMBH: xmbhs,
                    wLmOnlynum: rowNetbarid[i].itemNum,
                    wDescript: miaoshus,
                    wQX: qx,
                    wRoleName: rolenames,
                }, "", "", false, "sykf=SYYHGL&XKLX=SYYHGL");
            }
            //再次获取数据存值
            var storeData = postData("FindRoleItem", {
                XKLX: "SYYHGL",
                wRoleNum: onlynum,
                wXMBH: xmbhs,
                page: "1",
                limit: "100"
            }, "", "", false, "sykf=SYYHGL&XKLX=SYYHGL")
            console.log(storeData)

        }

        //获取管理中心的数据，更新setingLimt的值
        var applyLimt = {}

        setLimt("rsgl", "", function(data) { //存数据
            if (data.msg && data.userlimit.length > 0) {
                for (var i = 0; i < data.userlimit.length; i++) {

                    applyLimt[data.userlimit[i].itemNum] = String(data.userlimit[i].qx)
                }
            }

        })
        store.set("applyLimt", applyLimt)
        layer.msg('权限设置成功！', {
            title: '提示框',
            icon: 1,
            time: 500
        }, function() {
            //		   window.location.reload();    

            tableins.reload({
                where: where
            });
            $('[name="all_fw"]').attr('checked', false)
            $('[name="all_bj"]').attr('checked', false)
            $('[name="all_sc"]').attr('checked', false)
            $('[name="all_dc"]').attr('checked', false)
            $('[name="all_sh"]').attr('checked', false)
            form.render();

        });

    });



    form.render();
});



//初始化end
function funToText(funid) {

    var funName = '';
    if (funid != '') {
        if (funid.indexOf(',') != -1) { //说明不止一个功能
            var funArr = funid.split(',');

            for (var i = 0; i < funArr.length; i++) {
                var data = postData('wwGetDataList', {
                    TblNum: 8017,
                    T231: 'EQ' + funArr[i]
                }, "", "", false, "sykf=SYYHGL&XKLX=SYYHGL");
                funName += data.data[0].func + ',';
                //				console.log(funName);
            }
            funName = funName.slice(0, -1);
        } else { //说明只有一个功能
            var data = postData('wwGetDataList', {
                TblNum: 8017,
                T231: 'EQ' + funid
            }, "", false, "sykf=SYYHGL&XKLX=SYYHGL");
            funName += data.data[0].func;
        }
    }
    return funName;
}


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
        indexPrompt = layer.open({
                title: '警告！系统关键操作，必须输入确认密码',
                //				formType: 2
                content: ' <div class="layui-form-item">' +
                    '<label style="text-algin:center;width:80px!important;" class="layui-form-label">用户名</label>' +
                    '<div class="layui-input-block" style="margin-left:110px!important">' +
                    '<input type="text"  class="layui-input" id="user">' +
                    '</div>' +
                    '</div>' +
                    '<div class="layui-form-item">' +
                    '<label style="text-algin:center;width:80px!important;"  class="layui-form-label">密码</label>' +
                    '<div class="layui-input-block" style="margin-left:110px!important">' +
                    '<input type="text"  class="layui-input" id="psd">' +
                    '</div>' +
                    '</div>',
                btn: ["确定", "取消"],
                yes: function() {
                    if ($("#user").val() == "") {
                        return false
                    }
                    if ($("#psd").val() == "") {
                        return false
                    }
                    //再次效验账户名密码
                    //					var returnValue = postData('UserLogin', {
                    //						XDLMUserName: $("#user").val(),
                    //						XDLMPassword: $("#psd").val()
                    //					},"","",false,"sykf=SYYHGL&XKLX=SYYHGL");

                    var returnValue = postData("UserLogin", {
                        XDLMUserName: $("#user").val(),
                        XDLMPassword: $("#psd").val(),
                        XDLMStorage: getCookieName("mCurrentStorage")
                    }, "", "/api/lib/user", "", "XKLX=SYYHGL")


                    if (returnValue.msg || returnValue.success) {

                        layer.msg('正在删除,请稍等...', {
                            time: 0,
                            shade: 0.3,
                            //content: '测试回调',
                            success: function(index, layero) {

                                for (var i = 0; i < ids.data.length; i++) {
                                    var rvs = postData("wwDelDataById", {
                                        TblNum: 7015,
                                        XDLMID: ids.data[i].id
                                    }, "", "", false, "sykf=SYYHGL&XKLX=SYYHGL");
                                    //删除xdrole里面对应lm的权限数据
                                    var DelData = postData("wwDelDataByWhere", {
                                        TblNum: 7013,
                                        T103: 'EQ' + onlynum, //roleNum
                                        //									T93:'EQ'+$('#xmbh').val(),//xmbh
                                        T91: 'EQ' + ids.data[i].itemNum //lmid
                                    }, "", "", false, "sykf=SYYHGL&XKLX=SYYHGL");
                                    //								console.log(rvs);
                                };
                                layer.msg('删除完成！', {
                                    title: '提示框',
                                    icon: 1,
                                    time: 500
                                }, function() {
                                    //								$('#lcshow').empty();
                                    //								$('#lcshow').append(LCProcess(onlynum));
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
                        return false
                    }

                }
            }, //prompt风格，支持0-2},
            function(pass) {});
    }
}
//删除单行
function DelDatasyyh2(taname, id, roleNumz) {
    layui.use(['layer'], function() {
        layer.confirm('确定要删除？删除后不可恢复！！', {
                btn: ['确定删除', '再想想'] //按钮
            },
            function() //确定
            {
                layer.msg('确定删除，请稍等...', {
                    icon: 1,
                    time: 500,
                });
                var rvs = postData("wwDelDataById", {
                    TblNum: taname,
                    XDLMID: id
                }, "", "", false, "sykf=SYYHGL&XKLX=SYYHGL");
                //		console.log(rvs);
                try {
                    //				return rvs;
                    if (rvs.msg || rvs.success) {
                        layer.msg('删除完成！', {
                            icon: 1,
                            time: 800
                        }, function() {
                            //删除xdrole里面对应lm的权限数据
                            var DelData = postData("wwDelDataByWhere", {
                                TblNum: 7013,
                                T103: 'EQ' + onlynum, //roleNum
                                //							T93:'EQ'+$('#xmbh').val(),//xmbh
                                T91: 'EQ' + roleNumz //lmid
                            }, "", "", false, "sykf=SYYHGL&XKLX=SYYHGL");
                            tableins.reload();
                            //						console.log(where.TblNum==9983);

                            //						return rvs;
                        });
                    } else {
                        layer.alert(rvs, {
                            title: '系统提示',
                            icon: 2,
                        });
                        //					return rvs;
                    }
                } catch (e) {
                    layer.alert(e.message, {
                        title: '系统提示',
                        icon: 2,
                    });
                    //				return rvs;
                }

            },
            function() //取消
            {

            });
    });
}

function getTable() {
    var clos = [
        [{
                checkbox: true,
                LAY_CHECKED: true,
                width: '5%',
            },
            {
                field: 'itemlm',
                title: '栏目名称',
                width: '15%',
                align: 'center',
                templet: "#itemlm"
            },
            {
                field: 'itemname',
                title: '子栏目名称',
                width: '15%',
                align: 'center'
            }, {
                field: 'id',
                title: '访问权限',
                width: '10%',
                align: 'center',
                //				type:'checkbox'
                templet: "#fwqx"
            }, {
                field: 'id',
                title: '编辑权限',
                width: '10%',
                align: 'center',
                templet: "#bjqx"
            }, {
                field: 'id',
                title: '删除权限',
                width: '10%',
                align: 'center',
                templet: "#scqx"
            }, {
                field: 'id',
                title: '导出',
                width: '10%',
                align: 'center',
                templet: "#dcqx"
            }, {
                field: 'id',
                title: '审核',
                width: '10%',
                align: 'center',
                templet: "#shqx"
            }, {
                title: '操作',
                width: '15%',
                align: 'center',
                toolbar: '#opeTpllcjd'
            }
        ]
    ];
    tableins = table.render({
        elem: '#demo',
        url: '/api/lib/data?XAction=FindRoleItem&sykf=SYYHGL&XKLX=SYYHGL',
        where: where,
        method: 'post',
        cols: clos,
        skin: 'row', //表格风格
        even: true,
        size: 'sm',
        headers: {
            // getAuth()
            Authorization: getAuth()
        },
        height: $(document).height() - 160,
        page: true, //是否显示分页
        limits: [10, 20, 30, 40, 50],
        limit: 10, //每页默认显示的数量
        id: "tableLayui",
        done: function(res, curr, count) {

        }
    });
}