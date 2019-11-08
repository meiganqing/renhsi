/*
 * @陕西唐远
 * @文件名: Transfer_Add.js
 * @作者: 张黎博
 * @Git: zlb
 * @Date: 2019-10-24 12:04:01
 * @描述: 调动记录添加页js
 * @版本: 1.00
 * @修改历史纪录: （版本 修改时间 修改人 修改内容）
 * @记录:  
 */

var $, laydate, form, rowid, depVal, admin, table, treeSelect, where, wheree;

layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'form', 'table', 'laydate', 'treeSelect'], function() {
    admin = layui.admin,
        table = layui.table,
        treeSelect = layui.treeSelect;
    form = layui.form;
    laydate = layui.laydate;
    $ = layui.$;
    rowid = window.location.href.getQuery("rowId"); //列表页单行数据id
    where = {}
    wheree = {}
        // 入职时间
    laydate.render({
        elem: '#TransferTime',
        value: new Date()
    });

    //调动类型下拉选项
    PostDataRS({
            XDLMCID: "1001",
            XDLMSID: "DYBH20191015151140114015841",
            XDLMA: "9"
        }, "SYYHGL", function(data) {
            if (data.success && data.rows.length > 0) {
                getSelectNoDefine("TransferType", data.rows, "分类名")
                form.render("select")
            }
        })
        //调动后部门下拉选项
    PostDataRS({
            XDLMCID: "1001",
            XDLMSID: "DYBH20190823102601261218191",
        }, "SYYHGL", function(data) {
            if (data.success && data.rows.length > 0) {
                getSelectNoDefine("TransferADepId", data.rows, "DepartName")
                form.render("select")
            }
        })
        //调动后职位下拉选项
        //职位下拉选项
    PostDataRS({
        XDLMCID: "1001",
        XDLMSID: "DYBH2019082310272127216251",

    }, "SYRSGL", function(data) {
        if (data.success && data.rows.length > 0) {
            getSelectNoDefine("TransferAPostId", data.rows, "PositionName")
            form.render("select")
        }

    })

    // 回显基础数据
    if (rowid) {
        PostDataRS({
            XDLMCID: "1001",
            XDLMSID: "DYBH2019082310260126196202",
            XDLMA: rowid
        }, "SYYHGL", function(data) {
            if (data.success && data.rows.length > 0) {
                $('#UserName').val(data.rows[0].mUserName); //名字
                $('#TransferFDepId').val(data.rows[0].mDepart); //调动前部门
                $('#TransferFPostId').val(data.rows[0].Position); //调动前职位
                $('#UserId').val(data.rows[0].userid)
                    // xghx("imgContent", data.rows[0].Files)
            }
        })
    }

    form.on("submit(submit)", function(data) {
        mAddNewData(data.field)
        return false
    })

    form.render();

    // 调用时的上传插件
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

});

function mAddNewData(where) {
    //判断添加还是修改
    var tip = "确定要调用吗？";
    where.XDLMCID = "6000";
    where.XDLMSID = "DYBH2019082310260126187205";
    where.XDLMID = rowid
    submitDataTip(tip, function() {
        PostDataRS(where, "SYYHGL", function(data) {
            if (data.success) {
                gbyhsx(wheree)
            }
        })
    })
}

function submitDataTip(tip, callback, data) { //没有验证码的弹框	
    layer.confirm(tip, {
            btn: ['确定', '再想想'] //按钮
        },
        function() //确定
        {
            var index000002 = layer.msg('正在提交，请稍等...', {
                icon: 1,
                time: 500,
                success: function(data) {
                    layer.close(index000002)
                    callback(data)
                }
            });
        }

    );

}
//修改用户信息
function gbyhsx(wheree) {
    let fileData = submitPicture("imgContent");
    // let uploadName = fileData.imgName.substring(0, fileData.imgName.lastIndexOf(','))
    let uploadPath = fileData.imgPath.substring(0, fileData.imgPath.lastIndexOf(','))

    console.log(uploadPath)
    wheree.XDLMCID = "5000"
    wheree.XDLMSID = "DYBH201908231027212721210143"
    wheree.XDLMUserName = $("#UserName").val()
    wheree.XDLMUserId = $("#UserId").val()
    wheree.XDLMTransferTime = $("#TransferTime").val()
    wheree.XDLMTransferType = $("#TransferType").val()
    wheree.XDLMTransferFDepId = $("#TransferFDepId").val()
    wheree.XDLMTransferADepId = $("#TransferADepId").val()
    wheree.XDLMTransferFPostId = $("#TransferFPostId").val()
    wheree.XDLMTransferAPostId = $("#TransferAPostId").val()
    wheree.XDLMTransferReason = $("#TransferReason").val()
        // wheree.XDLMFiles = $("#showfileFJ").attr("allSrc")
    wheree.XDLMFiles = uploadPath
    PostDataRS(wheree, "SYRSGL", function(data) {
        if (data.success) {
            layer.msg("操作成功", {
                icon: 1,
                time: 500
            }, function() {
                QXALL()
            });


        }
    })
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