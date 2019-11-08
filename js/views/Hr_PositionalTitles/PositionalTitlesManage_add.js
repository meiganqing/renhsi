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
var $;
layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'table', "form", "upload", 'laydate', "treeSelect", "formSelects"], function() {
    var admin = layui.admin
    form = layui.form,
        laydate = layui.laydate,
        upload = layui.upload;
    var treeSelect = layui.treeSelect;
    var formSelects = layui.formSelects;
    $ = layui.$;
    // 时间插件初始化
    laydate.render({
        elem: '#DeclareTime'
    });
    laydate.render({
        elem: '#GetTime'
    });
    laydate.render({
        elem: '#NextTime'
    });


    //获取部门
    PostDataRS({
        XDLMCID: "1001",
        XDLMSID: "DYBH20190823102601261218191"
    }, "SYYHGL", function(returnData) {
        getSelect("DepName", returnData.rows, "DepartName", "DepartId");
        form.render("select")
    })

    form.on("select(department)", function(data) { //获取部门底下的人员信息
        PostDataRS({
            XDLMCID: "1001",
            XDLMSID: "DYBH20190823102601261253201",
            QueryType: "mDepart",
            QueryKey: data.value
        }, "SYYHGL", function(returnData) {
            getSelect("UserName", returnData.rows, "mUserName", "userid");
            form.render("select")
        })
    })

    // 批准人	
    PostData_new(yonghu, {
            XDLMCID: "1001",
            XDLMSID: "DYBH20190823102601261253201",
        }, function(data) {
            if (data.success && data.rows.length > 0) {
                getSelect("ApprovalUserId", data.rows, "mUserName", "id", "mUserName")
                form.render("select")
            }
        })
        // 职称名称
    PostData_new(yonghu, {
            XDLMCID: "1001",
            XDLMSID: "DYBH20191015151140114015841",
            XDLMA: '1014',
        }, function(data) {

            if (data.success && data.rows.length > 0) {
                getSelect("TitleName", data.rows, "分类名", "分类id", "分类名")
                form.render("select")
            }
        })
        //   下次申报职称
    PostData_new(yonghu, {
            XDLMCID: "1001",
            XDLMSID: "DYBH20191015151140114015841",
            XDLMA: '1014',
        }, function(data) {

            if (data.success && data.rows.length > 0) {
                getSelect("NextTitle", data.rows, "分类名", "分类id", "分类名")
                form.render("select")
            }
        })
        //   获取途径
    PostData_new(yonghu, {
        XDLMCID: "1001",
        XDLMSID: "DYBH20191015151140114015841",
        XDLMA: '15',
    }, function(data) {

        if (data.success && data.rows.length > 0) {
            getSelect("GetMode", data.rows, "分类名", "分类id", "分类名")
            form.render("select")
        }
    })


    // 修改回显数据
    if (GetRequest().choseId != null) {
        // 修改操作
        $("#TrainManageAddBtn").html("立即修改")
        $("#userId").addClass("layui-disabled");
        $("#userId").attr("disabled", true);

        // 数据回显部门 评定人





        getFormValue(); //获取但行数据回显
    }
    // 判断 添加或者修改
    if (GetRequest().choseId) {
        // 修改操作
        form.on('submit(TrainBtn)', function(data) {
            let fileData = submitPicture("imgContent");
            // let uploadName = fileData.imgName.substring(0, fileData.imgName.lastIndexOf(','))
            let uploadPath = fileData.imgPath.substring(0, fileData.imgPath.lastIndexOf(','))
            let editdata = {
                'XKLX': 'SYRSGL',
                'XDLMCID': '6000',
                'XDLMSID': 'DYBH20190823102721272170125',
                'XDLMID': GetRequest().choseId
            }
            for (var i in data.field) {
                editdata[i] = data.field[i];
            }
            editdata['XDLMFiles'] = uploadPath
            editdata['XDLMDepId'] = $("#DepName").find("option:selected").attr("attrData")
            editdata['XDLMUserId'] = $("#UserName").find("option:selected").attr("attrData")
            addDataTjiao(baSic, addata);
            editDataXg(baSic, editdata);
            return false;
        });
    } else {
        // 添加操作
        form.on('submit(TrainBtn)', function(data) {
            let fileData = submitPicture("imgContent");
            // let uploadName = fileData.imgName.substring(0, fileData.imgName.lastIndexOf(','))
            let uploadPath = fileData.imgPath.substring(0, fileData.imgPath.lastIndexOf(','))
            let addata = {
                'XKLX': 'SYRSGL',
                'XDLMCID': '5000',
                'XDLMSID': 'DYBH201908231027212721222123',
            }
            for (var i in data.field) {
                addata[i] = data.field[i];
            }
            addata['XDLMFiles'] = uploadPath
            addata['XDLMDepId'] = $("#DepName").find("option:selected").attr("attrData")
            addata['XDLMUserId'] = $("#UserName").find("option:selected").attr("attrData")
                // upfile(onlynum, uploadName, uploadPath, uploadId, uploadType, "专利")


            addDataTjiao(baSic, addata);

            return false;
        });
    }

    //上传文件
    uploadFileRS("uploadImg", "imgContent"); //上传文件

});

// 数据回显
function getFormValue() {
    PostData_new("/xdData/xdDataManage.ashx?XAction=GetDataInterface&XKLX=SYRSGL&XDLMCID=1001&XDLMSID=DYBH201908231027212721181122&XDLMA=" + GetRequest().choseId, "", function(getData) {
        if (getData.success == true) {
            for (var i in getData.rows[0]) {
                $('#' + i).val(getData.rows[0][i]);
            }

            xghx("imgContent", getData.rows[0].Files)
                //获取部门
            PostDataRS({
                XDLMCID: "1001",
                XDLMSID: "DYBH20190823102601261218191"
            }, "SYYHGL", function(returnData) {
                getSelect("DepName", returnData.rows, "DepartName", "DepartId");
                $("#DepName").val(getData.rows[0].DepName)
                form.render("select")
            })

            // 平定人
            PostDataRS({
                    XDLMCID: "1001",
                    XDLMSID: "DYBH20190823102601261253201",
                }, "SYYHGL", function(returnData) {
                    getSelect("UserName", returnData.rows, "mUserName", "userid");
                    $("#UserName").val(getData.rows[0].UserName)
                    form.render("select")
                })
                // $("#DepName").val(getData.rows[0].DepName)
                // $("#UserName").val(getData.rows[0].UserName)
                // form.render("select")
        }




    });

}

function callBack() {
    var index543 = parent.layer.getFrameIndex(window.name); //获取窗口索引
    parent.dataTable.reload('mDataTable', {
        page: {
            curr: 1 //重新从第 1 页开始
        }
    });
    parent.layer.close(index543);
}