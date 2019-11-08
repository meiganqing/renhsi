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
}).use(['index', 'table', "form", "upload", 'laydate', "treeSelect", "formSelects", 'element'], function() {
    var admin = layui.admin
    form = layui.form,
        laydate = layui.laydate,
        upload = layui.upload,
        element = layui.element;
    var treeSelect = layui.treeSelect;
    var formSelects = layui.formSelects;
    $ = layui.$;
    // 时间插件初始化
    laydate.render({
        elem: '#GetTime'
    });
    laydate.render({
        elem: '#TakeTime'
    });
    // 获取部门
    //获取部门
    PostDataRS({
        XDLMCID: "1001",
        XDLMSID: "DYBH20190823102601261218191"
    }, "SYYHGL", function(returnData) {
        getSelect("DepName", returnData.rows, "DepartName", "DepartId");
        form.render("select")
    })
    form.on("select(department)", function(data) { //获取部门底下的人员信息

        // 获取员工姓名

        PostData_new(yonghu, {
            XDLMCID: "1001",
            XDLMSID: "DYBH20190823102601261253201",
            QueryType: "mDepart",
            QueryKey: data.value
        }, function(data) {
            if (data.success && data.rows.length > 0) {
                getSelect("UserName", data.rows, "mUserName", "userid", "mUserName")
                form.render("select")
            } else {
                $("#UserName").empty()
                form.render("select")
            }
        })


    })



    // 证件类型
    PostData_new(yonghu, {
        XDLMCID: "1001",
        XDLMSID: "DYBH20191015151140114015841",
        XDLMA: '6',
    }, function(data) {

        if (data.success && data.rows.length > 0) {
            getSelect("LicenceType", data.rows, "分类名", "分类id", "分类名")
            form.render("select")
        }
    })



    // 修改回显数据
    if (GetRequest().choseId != null) {
        // 修改操作
        $("#UserName").addClass("layui-disabled");
        // $("#UserName").attr("disabled",true);
        $("#TrainManageAddBtn").html("修改")
        getFormValue(); //获取但行数据回显
    }

    // 判断 添加或者修改
    if (GetRequest().choseId) {
        form.on('submit(TrainBtn)', function(data) {
            let fileData = submitPicture("imgContent");
            // let uploadName = fileData.imgName.substring(0, fileData.imgName.lastIndexOf(','))
            let uploadPath = fileData.imgPath.substring(0, fileData.imgPath.lastIndexOf(','))
                // 修改
            let editdata = {
                'XKLX': 'SYRSGL',
                'XDLMCID': '6000',
                'XDLMSID': 'DYBH20190823102721272120145',
                'XDLMID': GetRequest().choseId
            }
            for (var i in data.field) {
                editdata[i] = data.field[i];
            }
            // editdata['XDLMFiles'] = $("#showfileFJ").attr("allSrc");
            editdata['XDLMFiles'] = uploadPath
            editdata['XDLMDepId'] = $("#DepName").find("option:selected").attr("attrData"),
                editdata['XDLMUserId'] = $("#UserName").find("option:selected").attr("attrData")
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
                'XDLMSID': 'DYBH20190823102721272124243',
            }
            for (var i in data.field) {
                addata[i] = data.field[i];
            }
            // addata['XDLMFiles'] = $("#showfileFJ").attr("allSrc");
            addata['XDLMFiles'] = uploadPath
            addata['XDLMDepId'] = $("#DepName").find("option:selected").attr("attrData"),
                addata['XDLMUserId'] = $("#UserName").find("option:selected").attr("attrData")
            addDataTjiao(baSic, addata);
            return false;
        });
    }


    // //附件调用时的上传插件
    // var uploadImg = new UploadFile({
    //     oldName: "filename", //后台返回的图片原始路径的key值名称
    //     newName: "filepath", //后台返回的图片服务器路径的key值名称
    //     url: ipUploadUrl, //请求图片的地址
    //     chooseBtn: "changefileFJ", //选择上传按钮id
    //     tableId: $("#showfileFJ") //显示图片列表的table的容器
    // });
    // uploadImg.uploadFile() //上传调用

    //上传文件
    uploadFileRS("uploadImg", "imgContent"); //上传文件



    //

    form.verify({
        numStr: [
            /^[a-zA-Z0-9_]+$/ //正则表达式
            , '编号只能为数字或字母' //提示信息
        ]
    });



});

// var oldlicenceType;
// function checkUserAndType(){
//     if($("#licenceType").val() == ""){
//         return;
//     }
//     if($("#licenceType").val() == oldlicenceType){
//         return;
//     }
//     var strwhere = "and userId = "+$("#userId").val()+" and licenceType = "+$("#licenceType").val();
//     var data = {
//         tabName:'Hr_LicenceManage',
//         strWhere:strwhere
//     }
//     if(!duplicateChecking("/Controllers/BaseInfo/IsExists",JSON.stringify(data))){
//         layer.msg("该员工的此证件已录入系统,请重新选择");
//         var form = layui.form;
//         $("#licenceType").val("");
//         form.render('select');
//     }
// }



// 数据回显
function getFormValue() {
    PostData_new("/xdData/xdDataManage.ashx?XAction=GetDataInterface&XKLX=SYRSGL&XDLMCID=1001&XDLMSID=DYBH201908231027212721842&XDLMA=" + GetRequest().choseId, "", function(getData) {
        if (getData.success == true) {
            for (var i in getData.rows[0]) {
                $('#' + i).val(getData.rows[0][i]);
            }

            //   上传文件回显
            // 上传文件回显getData.rows[0].Files
            // $("#showfileFJ").attr("allSrc", getData.rows[0].Files)
            // SpellItIntoTable('');
            xghx("imgContent", getData.rows[0].Files)

            PostDataRS({
                XDLMCID: "1001",
                XDLMSID: "DYBH20190823102601261218191"
            }, "SYYHGL", function(returnData) {
                getSelect("DepName", returnData.rows, "DepartName", "DepartId");
                $("#DepName").val(getData.rows[0].DepName)
                form.render("select")
            })

            PostDataRS({
                XDLMCID: "1001",
                XDLMSID: "DYBH20190823102601261253201",
            }, "SYYHGL", function(returnData) {
                getSelect("UserName", returnData.rows, "mUserName", "userid");
                $("#UserName").val(getData.rows[0].UserName)
                form.render("select")
            })
        }
        //  获取多选数据

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