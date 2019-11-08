/*
 * @陕西唐远
 * @文件名: userAdd.js
 * @作者: 张黎博
 * @Git: zlb
 * @Date: 2019-09-11 15:22:09
 * @描述: 用户添加页js
 * @版本: 1.00
 * @修改历史纪录: （版本 修改时间 修改人 修改内容）
 * @记录:  
 */
var $, rowid, form, laydate, layer, seeBigImg; //必须声明的变量
layui.config({
    base: "../../layuiadmin/lib/"
}).use(["jquery", "form", "laydate", "layer"], function() {
    form = layui.form, $ = layui.jquery, laydate = layui.laydate, layer = layui.layer; //使用封装好的表单提交的js
    // 回显单行数据id
    rowid = window.location.href.getQuery("rowId"); //列表页单行数据id
    User = window.location.href.getQuery("User"); //个人信息
    // 民族下拉
    PostData({
            XDLMCID: "1001",
            XDLMSID: "DYBH20191015151140114015841",
            XDLMA: "1019"
        }, function(datas) {
            getSelect("nation", datas.rows, "分类名")
            form.render("select")
        })
        // 系别下拉

    PostData({
            XDLMCID: "1001",
            XDLMSID: "DYBH20191015151140114015841",
            XDLMA: "2019102210150706300596"
        }, function(datas) {
            getSelect("xb", datas.rows, "分类名")
            form.render("select")
        })
        // 身份下拉
    PostData({
            XDLMCID: "1001",
            XDLMSID: "DYBH20191015151140114015841",
            XDLMA: "2019102210175908787314"
        }, function(datas) {
            getSelect("mIdentity", datas.rows, "分类名")
            form.render("select")
        })
        // 职称下拉
    PostData({
            XDLMCID: "1001",
            XDLMSID: "DYBH20191015151140114015841",
            XDLMA: "1014"
        }, function(datas) {
            getSelect("zc", datas.rows, "分类名")
            form.render("select")
        })
        // 导师类别
    PostData({
            XDLMCID: "1001",
            XDLMSID: "DYBH20191015151140114015841",
            XDLMA: "2019102210220009156286"
        }, function(datas) {
            getSelect("dslb", datas.rows, "分类名")
            form.render("select")
        })
        // 学历
    PostData({
        XDLMCID: "1001",
        XDLMSID: "DYBH20191015151140114015841",
        XDLMA: "2"
    }, function(datas) {
        getSelect("xw", datas.rows, "分类名")
            // form.render("select")
            // 修改时回显
        if (rowid) {
            $('#XDLMID').val(rowid);
            $('#XMForm').html('修改');
            $('#mLoginName').attr('disabled', 'true');
            // 回显单行数据
            postDataSYYH('wwGetDataList', {
                TblNum: 7000,
                X1: rowid
            }, function(returnData) {
                console.log(returnData)
                for (var item in returnData.data[0]) {
                    $('#' + item).val(returnData.data[0][item]);
                }
                form.render("select")

                seeBigImg = returnData.data[0]['photo']
                if (returnData.data[0]['photo']) {
                    $("#HomepageImg").attr("src", http_common + returnData.data[0]['photo'].replace("ss.", "."))
                }

                if (returnData.data[0].mIdentity != '' && returnData.data[0].mIdentity.indexOf('主任') != -1) {
                    $('#isbmzr').val(1);
                    //				$('#isRecMsg').val(1);
                } else {
                    $('#isbmzr').val(0);
                    //				$('#isRecMsg').val(0);
                }
                // 显示是否禁用
                if (returnData.data[0].isDisabled == "1" || returnData.data[0].isDisabled == "True") {
                    $("#isDisabled").prop("checked", true)
                } else {
                    $("#isDisabled").prop("checked", false)
                }
                //显示是否接收通知消息
                if (returnData.data[0].isRecMsg == "1" || returnData.data[0].isRecMsg == "True") {
                    $("#isRecMsg").prop("checked", true)
                } else {
                    $("#isRecMsg").prop("checked", false)
                }

            });
        } else if (User) {
            $('#XDLMID').val(getCookieName('mUserId'));
            $('#XMForm').html('修改');
            $('#mLoginName').attr('disabled', 'true');
            $("#jinyongId").empty();
            $("#jinyongId").addClass("layui-hide");
            $("#tongzhiId").empty();
            $("#tongzhiId").addClass("layui-hide");
            postDataSYYH('wwGetDataList', {
                TblNum: 7000,
                X1: getCookieName('mUserId')
            }, function(returnData) {
                console.log(returnData)
                for (var item in returnData.data[0]) {
                    $('#' + item).val(returnData.data[0][item]);
                }
                form.render("select")
                seeBigImg = returnData.data[0]['photo']
                if (returnData.data[0]['photo']) {
                    $("#HomepageImg").attr("src", http_common + returnData.data[0]['photo'].replace("ss.", "."))
                }

                if (returnData.data[0].mIdentity != '' && returnData.data[0].mIdentity.indexOf('主任') != -1) {
                    $('#isbmzr').val(1);
                    //				$('#isRecMsg').val(1);
                } else {
                    $('#isbmzr').val(0);
                    //				$('#isRecMsg').val(0);
                }
            });
            // form.render("select")
            // form.render()
        } else {

            $("#onlynum").val(getonlynum())
            $("#userid").val(getTimeAndRandom("user"))
                // console.log($("#userid").val())
        }
    })
    uploadImg("HomepageImg")
        //职称评定时间
    laydate.render({
        elem: '#zcpdTime',
        type: 'date', //默认，可不填
        format: 'yyyy-MM-dd',
        value: new Date()
    });
    //出生日期
    laydate.render({
        elem: '#born',
        type: 'date', //默认，可不填
        format: 'yyyy-MM-dd',
        value: new Date()
    });
    //毕业时间
    laydate.render({
        elem: '#bysj',
        type: 'date', //默认，可不填
        format: 'yyyy-MM-dd',
        value: new Date()
    });


    // 选择身份
    form.on('select(mIdentity)', function(data) {
        if (data.value != '' && data.value.indexOf('主任') != -1) {
            console.log(data.value)

            $('#isbmzr').val(1);
            //				$('#isRecMsg').val(1);
        } else {
            $('#isbmzr').val(0);
            //				$('#isRecMsg').val(0);
        }
    });


    form.on('submit(XMForm)', function(data) {
        // 修改
        if (rowid) {
            data.field.XDLMisDisabled = ($("#isDisabled").prop('checked') ? "1" : "0")
            data.field.XDLMisRecMsg = ($("#isRecMsg").prop('checked') ? "1" : "0")
            data.field.XDLMphoto = seeBigImg
            if ($('#mUserPassword').val() == '') {} else {
                data.field.XDLMmUserPassword = $('#mUserPassword').val()
            }
            layer.confirm('确定要修改吗？', function(index) {
                console.log(index)
                postDataSYYH('wwModifyDataById', data.field, function(returnData112) {
                    if (returnData112.msg || returnData112.success) {
                        layer.msg('修改完成', {
                            icon: 1,
                            time: 1000
                        }, function() {
                            layer.close(index);
                            QXALL();
                        })
                    }
                })
            })
            return false;
            // 添加
        } else if (User) {
            data.field.XDLMphoto = seeBigImg
            if ($('#mUserPassword').val() == '') {} else {
                data.field.XDLMmUserPassword = $('#mUserPassword').val()
            }
            layer.confirm('确定要修改吗？', function(index) {
                console.log(index)
                postDataSYYH('wwModifyDataById', data.field, function(returnData112) {
                    if (returnData112.msg || returnData112.success) {
                        layer.msg('修改完成', {
                            icon: 1,
                            time: 1000
                        }, function() {
                            layer.close(index);
                            // QXALL();
                        })
                    }
                })
            })
            return false;
        } else {

            PostData({
                XDLMCID: "1001",
                XDLMSID: "DYBH20190823102601261253201",
                XDLMC: $('#mLoginName').val()
            }, function(datas) {
                // console.log(datas)
                // console.log(datas.rows.length)
                if (datas.rows.length > 0) {
                    // console.log(datas.rows.length)
                    layer.msg('此登录名已被使用', {
                        icon: 0,
                        time: 1000
                    });

                } else {
                    if ($('#mUserPassword').val() == '') {
                        layer.msg('密码不能为空', {
                            icon: 0,
                            time: 1000
                        });
                        return false;
                    } else {
                        data.field.XDLMisDisabled = ($("#isDisabled").prop('checked') ? "1" : "0")
                        data.field.XDLMisRecMsg = ($("#isRecMsg").prop('checked') ? "1" : "0")
                        data.field.XDLMmUserPassword = $('#mUserPassword').val()
                        data.field.XDLMphoto = seeBigImg
                        layer.confirm('确定要添加吗？', function(index) {
                            postDataSYYH('wwAddNewRow', data.field, function(add_data) {
                                console.log(add_data);
                                if (add_data.msg || add_data.success) {
                                    layer.msg('添加完成', {
                                        icon: 1,
                                        time: 800
                                    }, function() {
                                        QXALL();
                                    });
                                }
                                layer.close(index);
                            });
                        })
                    }
                }
            })


        }

        return false;
    })
    form.render("select")
    form.render()

})


function uploadImg(id) {

    layui.use('upload', function() {
        var upload = layui.upload;
        //执行实例
        upload.render({
            elem: '#' + id, //绑定元素				
            url: ipUploadUrl, //上传接口		
            accept: 'images',
            before: function(obj) {

            },
            done: function(res) {

                if (res) {
                    seeBigImg = res.filepath;

                    $("#HomepageImg").attr("src", http_common + res.filepath.replace("ss.", "."))
                }
            },
            error: function() {
                //请求异常回调
            }
        });
    });
}

function lookPicxs(imgSrc) {
    ShowVideox(false, imgSrc, '90%', '90%', 1, "02");
}

function ShowVideox(mtitle, mpath, w, h, clobtn, system) {
    if (mpath == '') {
        layer.msg('未找到文件');
    } else {
        // console.log(mpath);
        var yl = false;
        let r = mpath.substring(mpath.lastIndexOf('.') + 1);

        switch (r.toLowerCase()) {
            case "doc":
            case "docx":
            case "txt":
            case "zip":
            case "rar":
            case "xls":
            case "xlsx":
                var mpaths = mpath.substring(0, mpath.lastIndexOf(".") + 1)
                console.log(mpaths);
                url = basePathImg + '/pdfViewer/pdfView.html?path=' + mpaths + 'pdf';
                yl = true;
                break;
            case "pdf":
                url = basePathImg + '/pdfViewer/pdfView.html?path=' + mpath;
                yl = true;
                console.log(url);
                break;
            case "png":
            case "jpg":
            case "bmp":
            case "gif":
            case "jpeg":
            case "tiff":
            case "psd":
            case "svg":
                url = basePathImg + '/imgTools/ShowImage.html?path=' + mpath.replace("ss.", ".");
                console.log(url)
                yl = true;
                break;
            case "3gp":
            case "asf":
            case "avi":
            case "flv":
            case "mkv":
            case "mov":
            case "mp4":
            case "mpeg":
            case "n avi":
            case "rmvb":
            case "wmv":
            case "swf":
            case "mp5":
                url = basePathImg + "/video/ShowVideo.html?path=" + mpath;
                yl = true;
                console.log(url);
                break;
            default:
                yl = false;

        }

    }

    if (yl) {
        if (clobtn) {
            clobtn = 1;
        } else {
            clobtn = clobtn;
        }
        var index = layer.open({
            type: 2,
            content: url,
            area: [w, h],
            title: "查看",
            closeBtn: clobtn,
            shadeClose: true
        });
    } else {
        layer.msg('当前格式暂不支持预览', {
            icon: 2,
            time: 2000,
            anim: 5
        });
    }

}