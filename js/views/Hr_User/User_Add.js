/*
 * @陕西唐远
 * @文件名:User_Add.js 
 * @作者: 张黎博
 * @Git: zlb
 * @Date: 2019-10-24 12:04:01
 * @描述: 用户添加页js
 * @版本: 1.00
 * @修改历史纪录: （版本 修改时间 修改人 修改内容）
 * @记录:  
 */
var $, laydate, treeSelect, form, rowid, upload, admin, table, formSubmit, userid;
layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'form', 'table', 'laydate', 'treeSelect', 'upload', "formSubmit"], function() {
    admin = layui.admin, table = layui.table;
    form = layui.form;
    laydate = layui.laydate;
    treeSelect = layui.treeSelect;
    $ = layui.$;
    upload = layui.upload,
        formSubmit = layui.formSubmit; //使用封装好的表单提交的js
    rowid = window.location.href.getQuery('rowId');
    userid = window.location.href.getQuery('userid');
    uploadImg(); // 上传照片
    // if (GetRequest().hideSome) {
    //     $(".layui-elem-quote").hide();
    //     $(".layui-layout-admin").hide();
    //     $("#hideDiv").css("background", "#fff");
    //     $("html").css("background", "#fff");
    //     $("#shade").addClass("shadeShow");
    // }
    // born
    laydate.render({
        elem: '#born',
        type: 'date', //默认，可不填
        format: 'yyyy-MM-dd',
        value: new Date()
    });
    // 入职时间
    laydate.render({
        elem: '#EntryTime',
        type: 'date', //默认，可不填
        format: 'yyyy-MM-dd',
        value: new Date()
    });
    // 入党时间
    laydate.render({
        elem: '#AsPartyTime',
        type: 'date', //默认，可不填
        format: 'yyyy-MM-dd',
        value: new Date()
    });

    //民族下拉选项
    PostDataRS({
            XDLMCID: "1001",
            XDLMSID: "DYBH20191015151140114015841",
            XDLMA: "1019"
        }, "SYYHGL", function(data) {
            if (data.success && data.rows.length > 0) {
                getSelectattrData("nation", data.rows, "分类名")
                form.render("select")
            }
        })
        //健康状况下拉选项
    PostDataRS({
            XDLMCID: "1001",
            XDLMSID: "DYBH20191015151140114015841",
            XDLMA: "2019102421001802818192"
        }, "SYYHGL", function(data) {
            if (data.success && data.rows.length > 0) {
                getSelectattrData("Health", data.rows, "分类名")
                form.render("select")
            }
        })
        //血型下拉选项
    PostDataRS({
            XDLMCID: "1001",
            XDLMSID: "DYBH20191015151140114015841",
            XDLMA: "1018"
        }, "SYYHGL", function(data) {
            if (data.success && data.rows.length > 0) {
                getSelectattrData("BloodType", data.rows, "分类名")
                form.render("select")
            }

        })
        //婚姻状况下拉选项
    PostDataRS({
            XDLMCID: "1001",
            XDLMSID: "DYBH20191015151140114015841",
            XDLMA: "2019102421015602954909"
        }, "SYYHGL", function(data) {
            if (data.success && data.rows.length > 0) {
                getSelectattrData("MarriageState", data.rows, "分类名")
                form.render("select")
            }

        })
        //学历下拉选项
    PostDataRS({
            XDLMCID: "1001",
            XDLMSID: "DYBH20191015151140114015841",
            XDLMA: "2"
        }, "SYYHGL", function(data) {
            if (data.success && data.rows.length > 0) {
                getSelectattrData("Education", data.rows, "分类名")
                form.render("select")
            }

        })
        //证件类型下拉选项
    PostDataRS({
            XDLMCID: "1001",
            XDLMSID: "DYBH20191015151140114015841",
            XDLMA: "6"
        }, "SYYHGL", function(data) {
            if (data.success && data.rows.length > 0) {
                getSelectattrData("IDType", data.rows, "分类名")
                form.render("select")
            }

        })
        //员工属性下拉选项
    PostDataRS({
            XDLMCID: "1001",
            XDLMSID: "DYBH20191015151140114015841",
            XDLMA: "2019102421053801717071"
        }, "SYYHGL", function(data) {
            if (data.success && data.rows.length > 0) {
                getSelectattrData("UserAttribute", data.rows, "分类名")
                form.render("select")
            }

        })
        //政治面貌下拉选项
    PostDataRS({
            XDLMCID: "1001",
            XDLMSID: "DYBH20191015151140114015841",
            XDLMA: "7"
        }, "SYYHGL", function(data) {
            if (data.success && data.rows.length > 0) {
                getSelectattrData("PoliticalOutlook", data.rows, "分类名")
                form.render("select")
            }


        })
        //职员状态下拉选项
    PostDataRS({
            XDLMCID: "1001",
            XDLMSID: "DYBH20191015151140114015841",
            XDLMA: "2019102421083201179519"
        }, "SYYHGL", function(data) {
            if (data.success && data.rows.length > 0) {
                getSelectattrData("WorkState", data.rows, "分类名")
                form.render("select")
            }

        })
        //职位下拉选项
    PostDataRS({
        XDLMCID: "1001",
        XDLMSID: "DYBH2019082310272127216251",

    }, "SYRSGL", function(data) {
        if (data.success && data.rows.length > 0) {
            getSelectattrData("Position", data.rows, "PositionName")
            form.render("select")
        }

    })

    //直属上级下拉选项
    PostDataRS({
            XDLMCID: "1001",
            XDLMSID: "DYBH20191015151140114015841",
            XDLMA: "2019102421111104521251"
        }, "SYYHGL", function(data) {
            if (data.success && data.rows.length > 0) {
                getSelectattrData("Superior", data.rows, "分类名")
                form.render("select")
            }

        })
        //部门下拉选项
    PostDataRS({
        XDLMCID: "1001",
        XDLMSID: "DYBH20190823102601261218191",
        // XDLMA: "2019102421111104521251"
    }, "SYYHGL", function(data) {
        if (data.success && data.rows.length > 0) {
            getSelectattrData("mDepart", data.rows, "DepartName")
            form.render("select")
        }
    })

    if (rowid) {} else {
        $("#printInfo").remove()
        $("#userid").val(getTimeAndRandomType("user"))
        $("#onlynum").val(getonlynum())
    }
    if (userid) {
        $("#butDiv").addClass("layui-hide")
        $("#scdyDiv").addClass("layui-hide")
        PostDataRS({
            XDLMCID: "1001",
            XDLMSID: "DYBH2019082310260126196202",
            XDLMB: userid
        }, "SYYHGL", function(data) {
            if (data.success && data.rows.length > 0) {
                for (let i in data.rows[0]) {
                    $("#" + i).val(data.rows[0][i])
                }
                $("#photoimh").attr("src", httpcom + data.rows[0].photo);
                $("#mLoginName").attr("disabled", true);
                form.render("select")
                form.render();
            }

        })
    }
    // if (rowid != null) {
    //     $('#SubmitBtn').html('保存修改');
    //     getFormValue();
    // } else {
    //     $("#printInfo").remove();
    // }
    // form.verify({ // value：表单的值、item：表单的DOM对象
    //     pmName: function(value, item) { //非空
    //         if (value == "") {
    //             return "作者中请添加自己";
    //         }
    //     }
    // })
    formSubmit.init({
        dataUrl: { url: httpcom_YHGL },
        addData: { //添加的接口
            XDLMCID: "5000",
            XDLMSID: "DYBH20190823102601261188203"
        },
        editData: { //修改的接口
            XDLMCID: "6000",
            XDLMSID: "DYBH2019082310260126187205",
            XDLMID: rowid //修改的时候必须要有id
        },
        echoData: { //获取单行数据的接口
            XDLMSID: "DYBH2019082310260126196202",
            XDLMCID: "1001",
            XDLMA: rowid
        },
        beforeSubmitCallback: function(data) { //提交前要要重新修改表单内的值的回调函数

            if (!rowid) {
                PostDataRS({
                    XDLMCID: "1001",
                    XDLMSID: "DYBH20190823102601261253201",
                    XDLMC: $('#mLoginName').val()
                }, "SYYHGL", function(data) {
                    if (data.rows.length > 0) {
                        layer.msg('此登录名已被使用,请重新输入登录名', {
                            icon: 0,
                            time: 1000
                        });
                        return false
                    } else {
                        if ($('#mUserPassword').val() == '') {
                            layer.msg('密码不能为空', {
                                icon: 0,
                                time: 1000
                            });
                            return false
                        } else {
                            data.XDLMmUserPassword = $("#mUserPassword").val()
                        }
                    }

                })
            } else {
                if ($("#mUserPassword").val()) {

                } else {
                    data.XDLMmUserPassword = $("#mUserPassword").val()
                }
            }
        },

        beforeEchoDataCallback: function(data) { //回显之前的操作，data参数值为回显的数据
            $("#photoimh").attr("src", httpcom + data.rows[0].photo);
            $("#mLoginName").attr("disabled", true);
        }
    })

    form.render();

    $("body").on("click", "#printInfo", function() {
        $(".userInfoTable").css('height', '1150px');
        $("#hideDiv").addClass("someHide");
        $("#researchFfield").addClass("hide");
        $(".layui-edge").css('border-style', 'none')
        $(".mustBespan").addClass("layui-hide");
        $("#yjly").css('resize', 'none')
        $("#Achievements").css('resize', 'none')
        $("html").printArea();

        //之后执行的
        $("#hideDiv").removeClass("someHide");
        $(".userInfoTable").css('height', '650px');
        $("#researchFfield").removeClass("hide");
        $(".mustBespan").removeClass("layui-hide");
        $(".layui-edge").css('border-style', 'dashed')
        $("#yjly").css('resize', 'vertical')
        $("#Achievements").css('resize', 'vertical')
    })
});


// // 获取部门的信息
// function GetDepInfo(id) {
//     $(document).ajaxSend(function(event, jqxhr, settings) {
//         // console.log(jqxhr)
//         jqxhr.setRequestHeader("Authorization", getAuth());
//     });
//     treeSelect.render({
//         // 选择器
//         elem: '#' + id,
//         // 数据 baseUrl + "/Controllers/Hr_Dep/GetListByPage",
//         data: httpcom_YHGL + "&XDLMCID=1001&XDLMSID=DYBH20191015151140114015841&XDLMB=部门",
//         // 异步加载方式：get/post，默认get
//         type: 'post',
//         // 占位符
//         placeholder: '请选择部门',
//         // 是否开启搜索功能：true/false，默认false
//         search: true,
//         // 点击回调
//         click: function(d) {
//             console.log(d);
//             clickdepName = d.current.name;
//             $("#" + id).val(d.current.id);
//         },
//         success: function(d) {
//             console.log(d);
//             treeSelect.checkNode('tree', depvalue);
//             $("#" + id).val(depvalue);
//         }
//     });
// }

// function callBack() {
//     var index543 = parent.layer.getFrameIndex(window.name); //获取窗口索引
//     parent.dataTable.reload('mDataTable', {
//         page: {
//             curr: 1 //重新从第 1 页开始
//         }
//     });
//     parent.layer.close(index543);
// }

function uploadImg() {
    var uploadInst = upload.render({
        elem: '#uploadPhoto' //绑定元素
            ,
        url: ipUploadUrl //上传接口
            ,
        done: function(res) {
            $("#photo").val(res.filepath);
            $("#photoimh").attr("src", httpcom + res.filepath);
            // $("#uploadPhoto").html("重新上传");
            //上传完毕回调
        },
        error: function() {
            //请求异常回调
        }
    });
}