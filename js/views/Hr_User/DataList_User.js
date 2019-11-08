/*
 * @陕西唐远
 * @文件名: DataList_User.js
 * @作者: 张黎博
 * @Git: zlb
 * @Date: 2019-10-24 12:04:01
 * @描述: 员工花名册js
 * @版本: 1.00
 * @修改历史纪录: （版本 修改时间 修改人 修改内容）
 * @记录: 1 2019.10.24  zlb  换新接口
 */

var $, admin, table, form, dataTable, where, treeSelect, downloadUrl, ygtj;
layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'form', 'table', 'treeSelect'], function() {
    admin = layui.admin,
        table = layui.table,
        form = layui.form;
    $ = layui.$;
    treeSelect = layui.treeSelect;
    downloadUrl = "";
    ygtj = window.location.href.getQuery('ygtj');

    //列表接口
    where = {
            XDLMCID: "1001",
            XDLMSID: "DYBH20190823102601261253201"
        }
        //查询下拉选项
    PostDataRS({
        XDLMCID: "1001",
        XDLMSID: "DYBH201908300930580454097"
    }, "SYYHGL", function(data) {
        if (data.success && data.rows.length > 0) {
            // console.log(data.rows)
            getSelectval("searchType", data.rows, "查询显示名", "查询属性")
            form.render("select")
        }
    })

    //表格
    getTable("TableList", where);

    console.log(limitConfig("storeLimt_rsgl", 2))

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
            case 'deleteAll':
                if (limitConfig("storeLimt_rsgl", 3)) {
                    delDataVolumeYH("DYBH20190823102601261202204")
                } else {
                    layer.msg("您没有删除权限");
                }
                break;
            case 'derive':
                let datas = checkStatus.data;
                if (datas.length == 0) {
                    layer.msg('请先选中需要导出的的人');
                } else {
                    let idStr = "";
                    for (let i = 0; i < datas.length; i++) {
                        idStr += datas[i].id + ","
                    }
                    idStr = idStr.substr(0, idStr.length - 1);
                    let i2 = layer.load();
                    PostDataRSdcOffice({
                        ids: idStr
                    }, function(data) {
                        if (data.success) {
                            // console.log(data)
                            let worduRL = data.FilePath;
                            layer.close(i2);
                            window.open(httpcom + worduRL);
                        }

                    })
                }

                break;
            case 'deriveword':
                let data = checkStatus.data;
                if (data.length == 0) {
                    layer.msg('请先选中需要导出的的人');
                } else {
                    let idStr = "";
                    for (let i = 0; i < data.length; i++) {
                        idStr += data[i].id + ","
                    }
                    idStr = idStr.substr(0, idStr.length - 1);
                    let i1 = layer.load();
                    PostDataRSdcWord({
                        ids: idStr
                    }, function(data) {
                        // console.log(data)
                        if (data.success) {
                            let worduRL = data.FilePath;
                            layer.close(i1);
                            window.open(httpcom + worduRL);
                        }
                    })
                }
                break;
        }
    });

    //监听行工具事件
    table.on('tool(test-table-toolbar)', function(obj) {
        var data = obj.data;
        if (obj.event === 'Dimission') {
            if (limitConfig("storeLimt_rsgl", 2)) {
                layer.confirm('确认该员工离职么', function(index) {
                    dimission(data, 1);
                });
            } else {
                layer.msg("您没有此权限");
            }
        } else if (obj.event === 'Rehab') {
            if (limitConfig("storeLimt_rsgl", 2)) {
                layer.confirm('确认该员工复职么', function(index) {
                    dimission(data, 2)

                });
            } else {
                layer.msg("您没有此权限");
            }

        } else if (obj.event === 'edit') {
            if (limitConfig("storeLimt_rsgl", 2)) {
                OpenAddPage(data.id);
            } else {
                layer.msg("您没有编辑权限");
            }

        } else if (obj.event === 'Tomobilize') {
            if (limitConfig("storeLimt_rsgl", 2)) {
                OpenTomobilize(data.id); //调动
            } else {
                layer.msg("您没有此权限");
            }
        } else if (obj.event === 'delete') {
            if (limitConfig("storeLimt_rsgl", 3)) {
                delDataYH(data.id, "DYBH20190823102601261202204")
            } else {
                layer.msg("您没有删除权限");
            }
        } else if (obj.event === 'showInfo') {
            // var ii = layer.load();
            // //此处用setTimeout演示ajax的回调
            // if (window.open(PostData("/Controllers/Hr_User/ExportWordUser?id=" + data.id, "").data)) {
            //     layer.close(ii);
            // }
            let i3 = layer.load();
            PostDataRSdcWord({
                ids: data.id
            }, function(data) {
                // console.log(data)
                if (data.success) {
                    let worduRL = data.FilePath;
                    layer.close(i3);
                    window.open(httpcom + worduRL);
                }

            })
        }
    });

    //查询
    $("#searchBtn").click(function() {
        searchTableGY(where, dataTable)
    })

});


function getTable(id, where) {
    var limit = 15;
    if (!ygtj) {
        var cols = [
            [{
                    field: 'ck',
                    checkbox: true,
                    width: '2%',
                    align: 'center'
                }, {
                    field: 'mUserName',
                    title: '姓名',
                    width: '7%',
                    align: 'center',
                    templet: '#color_mc'
                }, {
                    field: 'sex',
                    title: '性别',
                    width: '4%',
                    align: 'center',
                    templet: function(d) {
                        // if (d.sex == "1") {
                        //   return "男";
                        // } else {
                        //   return "女";
                        // }
                        return d.sex;
                    }
                },
                {
                    field: 'NativePlace',
                    title: '籍贯',
                    width: '10%',
                    align: 'center',
                    templet: '#nativePlace'
                }, {
                    field: 'mDepart',
                    title: '部门',
                    width: '9%',
                    templet: '#mDepart',
                    align: 'center'
                }, {
                    field: 'Position',
                    title: '职位',
                    width: '12%',
                    align: 'center'
                }, {
                    field: 'mPhone',
                    title: '联系电话',
                    width: '10%',
                    align: 'center',
                    templet: '#mPhone'
                }, {
                    field: 'EntryTime',
                    title: '入职时间',
                    width: '11%',
                    align: 'center'
                }, {
                    field: 'WorkState',
                    title: '职员状态',
                    width: '8%',
                    align: 'center',
                    templet: function(d) {
                        // if (d.WorkState == "1") {
                        //   return "在职";
                        // } else {
                        //   return "离职";
                        // }
                        return d.WorkState;
                    }
                }, {
                    field: 'UserAttribute',
                    title: '职员属性',
                    width: '8%',
                    align: 'center',

                    templet: function(d) {
                        // if (d.UserAttribute == "1") {
                        //   return "编制内";
                        // } else {
                        //   return "编制外";
                        // }
                        return d.UserAttribute;
                    }
                },
                {
                    fixed: 'right',
                    title: '操作',
                    toolbar: '#test-table-toolbar-barDemo',
                    width: '18%',
                    align: 'center',
                    templet: '#test-table-toolbar-barDemo'
                }
            ]
        ];
    } else {
        var cols = [
            [{
                    field: 'mUserName',
                    title: '姓名',
                    width: '8%',
                    align: 'center',
                    templet: '#color_mc'
                },
                {
                    field: 'sex',
                    title: '性别',
                    width: '5%',
                    align: 'center',

                },
                {
                    field: 'NativePlace',
                    title: '籍贯',
                    width: '10%',
                    align: 'center',
                    templet: '#nativePlace'
                },
                {
                    field: 'mDepart',
                    title: '部门',
                    width: '8%',
                    templet: '#mDepart',
                    align: 'center'
                },
                {
                    field: 'Position',
                    title: '职位',
                    width: '8%',
                    align: 'center'
                },
                {
                    field: 'mPhone',
                    title: '联系电话',
                    width: '8%',
                    align: 'center',
                    templet: '#mPhone'
                },

                {
                    field: 'Education',
                    title: '学历',
                    width: '8%',
                    align: 'center',
                    //				templet: function(d) {
                    //					return returnVal(education, d.education)
                    //				}
                },
                {
                    field: 'sfzh',
                    title: '证件号码',
                    width: '11%',
                    align: 'center',
                    //				templet: "#paperNumber"
                },
                {
                    field: 'PoliticalOutlook',
                    title: '政治面貌',
                    width: '5%',
                    align: 'center',
                    //				templet: function(d) {
                    //					return returnVal(politicalOutlook, d.politicalOutlook)
                    //				}
                },
                {
                    field: 'nation',
                    title: '民族',
                    width: '6%',
                    align: 'center',
                    //				templet: function(d) {
                    //					return returnVal(nation, d.nation)
                    //				}
                },
                {
                    field: 'born',
                    title: '出生日期',
                    width: '7%',
                    align: 'center',
                },
                {
                    field: 'yjly',
                    title: '研究领域',
                    width: '8%',
                    align: 'center',
                    //				templet: "#researchFfield"
                },
                {
                    field: 'Achievements',
                    title: '成果介绍',
                    width: '8%',
                    align: 'center',
                    //				templet: "#achievements"
                },
            ]
        ];
    }

    layui.use('table', function() {
        var table = layui.table;
        dataTable = table.render({
            method: 'post',
            elem: '#' + id,
            id: 'mDataTable',
            url: httpcom_YHGL,
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

        });
    });
}

// // 获取部门的信息
// function GetDepInfo() {
//     treeSelect.render({
//         // 选择器
//         elem: '#depId',
//         // 数据
//         data: baseUrl + "/Controllers/Hr_Dep/GetListByPage",
//         // 异步加载方式：get/post，默认get
//         type: 'post',
//         // 占位符
//         placeholder: '请选择部门',
//         // 是否开启搜索功能：true/false，默认false
//         search: true,
//         // 点击回调
//         click: function(d) {
//             $("#depId").val(d.current.id);
//             searchStart("depId", "depId");
//         },
//         success: function(d) {
//             console.log(d);
//             // treeSelect.checkNode('tree', depvalue);
//             // var treeObj = treeSelect.zTree('tree');
//             // console.log(treeObj);

//             //刷新树结构
//             treeSelect.refresh('tree');

//         }
//     });
// }

function OpenAddPage(id) {
    var content = 'User_Add.html';
    var mTitle = "新增员工";
    if (id != null) {
        content = content + "?rowId=" + id;
        mTitle = "修改员工信息";
    }
    // var w = $(window).width() - 100 + 'px';
    // var h = $(window).height() - 50 + 'px';
    var index888 = layer.open({
        type: 2,
        content: content,
        area: ["80%", "90%"],
        title: mTitle,
        maxmin: true,
        success: function(layero, index) {

        }
    });
}

//职员调动
function OpenTomobilize(id) {
    layer.open({
        type: 2,
        title: '职员调动',
        area: ['60%', '90%'],
        shadeClose: true,
        // shade: false,
        maxmin: true, //开启最大化最小化按钮
        content: './Transfer_Add.html?rowId=' + id //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
    });
}



function dimission(data, type) {
    if (type == 1) {
        var typename = "离职"
    } else {
        var typename = "在职"
    }
    $('#mpanel2').empty();
    var index1234 = layer.open({
        type: 1,
        content: $('#yzm'),
        area: ['300px', "220px"],
        title: '确认复职离职',
        maxmin: true,
        success: function() {
            $('#mpanel2').codeVerify({
                type: 1,
                width: '200px',
                height: '50px',
                fontSize: '30px',
                codeLength: 4,
                btnId: 'check-btn',
                ready: function() {},
                success: function() {
                    // DelById(id);
                    if (type == 1) {

                        PostDataRS({
                                XDLMCID: "6000",
                                XDLMSID: "DYBH2019082310260126187205",
                                XDLMID: data.id,
                                XDLMWorkState: typename
                            }, "SYYHGL", function(data) {
                                if (data.success) {
                                    layer.msg('成功！', {
                                        title: '提示框',
                                        icon: 1,
                                        time: 800
                                    }, function(alertindex) {
                                        dataTable.reload('mDataTable', {
                                            page: {
                                                curr: 1 //重新从第 1 页开始
                                            }
                                        });
                                        // layer.close(index);
                                    });
                                }
                            })
                            // if (updateState.code == "0") {

                        // }
                    } else {

                        PostDataRS({
                                XDLMCID: "6000",
                                XDLMSID: "DYBH2019082310260126187205",
                                XDLMID: data.id,
                                XDLMWorkState: typename
                            }, "SYYHGL", function(data) {
                                if (data.success) {
                                    layer.msg('成功！', {
                                        title: '提示框',
                                        icon: 1,
                                        time: 800
                                    }, function(alertindex) {
                                        dataTable.reload('mDataTable', {
                                            page: {
                                                curr: 1 //重新从第 1 页开始
                                            }
                                        });
                                        // layer.close(index);
                                    });
                                }
                            })
                            // if (updateState.code == "0") {
                            //     layer.msg('成功！', {
                            //         title: '提示框',
                            //         icon: 1,
                            //         time: 800
                            //     }, function(alertindex) {
                            //         dataTable.reload('mDataTable', {
                            //             page: {
                            //                 curr: 1 //重新从第 1 页开始
                            //             }
                            //         });
                            //         // layer.close(index);
                            //     });
                            // }

                    }

                    layer.close(index1234);
                },
                error: function() {
                    layer.msg("验证码错误！");
                }
            });
        },
        end: function() {
            // layer.close(index123);
            // $('#mpanel2').empty();
            // $('#yzm').css('display', 'none');
        }
    });
}


function downloadExc(searchInfo) {
    let data = {
        page: 1,
        limit: 999999999,
        queryText: searchInfo
    }

    downloadUrl = PostData("/Controllers/Hr_User/ExportExcelUser", JSON.stringify(data)).data;
}

function selectUser(userid, userName) {
    layer.open({
        type: 2,
        title: '职员信息',
        area: ['90%', '90%'],
        shadeClose: true,
        // shade: false,
        maxmin: true, //开启最大化最小化按钮
        content: 'UserAllInfo.html?userid=' + userid + '&userName=' + userName //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
    });
}