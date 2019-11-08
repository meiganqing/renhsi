/*
 * @陕西唐远
 * @文件名: addUser.js
 * @作者: 张黎博
 * @Git: zlb
 * @Date: 2019-11-06 11:36:04
 * @描述: 用户添加页js
 * @版本: 1.00
 * @修改历史纪录: （版本 修改时间 修改人 修改内容）
 * @记录:  
 */
var id, $, rowid, form, laydate, layer;
layui.use(["jquery", "form", "laydate", "layer"], function() {
    form = layui.form, $ = layui.jquery, laydate = layui.laydate, layer = layui.layer; //使用封装好的表单提交的js
    $(function() {
        id = window.location.href.getQuery("id");
        // 身份下拉
        PostData({
            XDLMCID: "1001",
            XDLMSID: "DYBH20191015151140114015841",
            XDLMA: "2019102210175908787314"
        }, function(datas) {
            getSelect("mIdentity", datas.rows, "分类名")
            form.render("select")
        })


        var returnDataBM = postDataSYYH('wwGetDataList', {
            TblNum: 7002
        });
        if (returnDataBM.msg || returnDataBM.success) {
            for (var i in returnDataBM.data) {
                $('#mDepart').append('<option value="' + returnDataBM.data[i].DepartName + '">' + returnDataBM.data[i].DepartName + '</option>')
            }
        }
        if (id != null) {
            $('#XDLMID').val(id);
            $('#addUser').html('修改');
            $('#mLoginName').attr('disabled', 'true');
            var returnData = postDataSYYH('wwGetDataList', {
                TblNum: 7000,
                X1: id
            });

            for (var item in returnData.data[0]) {
                $('#' + item).val(returnData.data[0][item]);
            }
            $('#mUserPassword').val('');
            if (returnData.data[0].mIdentity != '' && returnData.data[0].mIdentity.indexOf('主任') != -1) {
                $('#isbmzr').val(1);
                //				$('#isRecMsg').val(1);
            } else {
                $('#isbmzr').val(0);
                //				$('#isRecMsg').val(0);
            }
            if (returnData.data[0].isDisabled == "1" || returnData.data[0].isDisabled == "True") {
                $("#isDisabled").prop("checked", true)
            } else {
                $("#isDisabled").prop("checked", false)
            }
            if (returnData.data[0].isRecMsg == "1" || returnData.data[0].isRecMsg == "True") {
                $("#isRecMsg").prop("checked", true)
            } else {
                $("#isRecMsg").prop("checked", false)
            }

        } else {

            //		$('#onlynum').val(returnDataTimes.OnlyNum);
            // postData("GetOnlyNum", "", function(data) {
            //     $('#onlynum').val(data.OnlyNum);

            // }, "/DataInterface/DataCenterHandler.ashx", "", "sykf=syyh&XKLX=SYYHGL")
            $("#onlynum").val(getonlynum())
            $("#userid").val(getTimeAndRandom("user"))
        }
        layui.use(['form', 'element'], function() {
            var form = layui.form,
                element = layui.element;

            form.on('select(mIdentity)', function(data) {
                if (data.value != '' && data.value.indexOf('主任') != -1) {
                    $('#isbmzr').val(1);
                    //				$('#isRecMsg').val(1);
                } else {
                    $('#isbmzr').val(0);
                    //				$('#isRecMsg').val(0);
                }
            });
            //		$("#mIdentity").html(GetPositionInfo());
            form.render('select');
            form.on('submit(XMForm)', function(data) {

                data.field.XDLMisDisabled = ($("#isDisabled").prop('checked') ? "1" : "0")
                data.field.XDLMisRecMsg = ($("#isRecMsg").prop('checked') ? "1" : "0")
                if (id != null) {
                    layer.confirm('确定要修改吗？', function(index) {
                        if ($('#mUserPassword').val() == '') {} else {
                            data.field.XDLMmUserPassword = $('#mUserPassword').val()
                        }
                        var returnData112 = postDataSYYH('wwModifyDataById', data.field);
                        console.log(returnData112);
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


                } else {
                    PostData({
                        XDLMCID: "1001",
                        XDLMSID: "DYBH20190823102601261253201",
                        XDLMC: $('#mLoginName').val()
                    }, function(datas) {
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
                            } else {
                                layer.confirm('确定要添加吗？', function(index) {
                                    data.field.XDLMmUserPassword = $('#mUserPassword').val()
                                    var add_data = postDataSYYH('wwAddNewRow', data.field);
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
                                })
                            }
                        }
                    })
                }
                return false;

            })
        });
    })
})