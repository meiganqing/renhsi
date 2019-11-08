/*
 * @陕西唐远
 * @文件名: roleAdd.js
 * @作者: 张黎博
 * @Git: zlb
 * @Date: 2019-09-11 15:22:09
 * @描述: 角色表添加页js
 * @版本: 1.00
 * @修改历史纪录: （版本 修改时间 修改人 修改内容）
 * @记录:  
 */
var $, rowid, form; //必须声明的变量
layui.config({
    base: "../../layuiadmin/lib/"
}).use(["form", "jquery"], function() {
    form = layui.form, $ = layui.jquery; //使用封装好的表单提交的js
    rowid = window.location.href.getQuery("rowId"); //列表页单行数据id
    // 判断是修改还是添加页
    if (rowid) {
        $("#addData").html("修改")
        postDataSYYH("wwGetDataList", {
            TblNum: "7013",
            T88: "EQ" + rowid,
        }, function(data) {
            console.log(data.data)
            for (var k in data.data[0]) {
                if (data.data[0][k] == "NULL") {
                    $("#" + k).val("")
                } else {
                    $("#" + k).val(data.data[0][k])

                }

            }
            // showPicture(data.data[0]['图片地址'], "picBody") //获取图片
            //     //文物入库表
            // postData("wwGetDataList", {
            //     TblNum: "178",
            //     T17813: "EQ" + data.data[0]['记录表流水号']
            // }, function(data2) {
            //     for (var k in data2.data[0]) {

            //         if (data2.data[0][k] == "NULL") {
            //             $("#ck" + k).html("")
            //         } else {
            //             $("#ck" + k).html(data2.data[0][k])
            //         }

            //     }

            // })

        })

    } else {
        // var returnDataTimes = postData("GetOnlyNum", "", function(data) {
        //     $('#roleNum').val(data.OnlyNum);
        // }, "/DataInterface/DataCenterHandler.ashx", "", "XKLX=SYYHGL");

        $('#roleNum').val(getonlynum());
        console.log($('#roleNum').val())
    }
    // 监听添加按钮
    form.on("submit(addData)", function(data) {
        if (rowid) {
            //				submitDataOverall("确定要修改吗？", data.field, "wwModifyDataById");
            submitDataTip("确定要修改吗？", function() {
                postDataSYYH("wwModifyDataById", data.field, function(retrundata) {
                    if (retrundata.msg || retrundata.success) {
                        if (retrundata.msg || retrundata.success) {
                            tipMsg(retrundata, QXALL)

                        }
                    }
                })
            })
        } else {
            //				submitDataOverall("确定要添加吗？", data.field, "wwAddNewRow");
            submitDataTip("确定要添加吗？", function() {
                postDataSYYH("wwAddNewRow", data.field, function(retrundata) {
                    if (retrundata.msg || retrundata.success) {
                        tipMsg(retrundata, QXALL)
                    }
                })
            })
        }
        return false;
    })

});