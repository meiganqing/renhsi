/*
 * @陕西唐远
 * @文件名: OrganizerManage_add.js
 * @作者: 张黎博
 * @Git: zlb
 * @Date: 2019-10-24 12:04:01
 * @描述:  组织管理添加页js
 * @版本: 1.00
 * @修改历史纪录: （版本 修改时间 修改人 修改内容）
 * @记录:  
 */
var $, formSubmit, admin, table, form, rowid;
layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'form', 'table', "formSubmit"], function() {

    admin = layui.admin,
        table = layui.table,
        form = layui.form;
    formSubmit = layui.formSubmit;
    $ = layui.$;
    rowid = window.location.href.getQuery("rowId"); //列表页单行数据id
    feileiId = window.location.href.getQuery("feileiId"); //列表页单行数据分类id

    if (!rowid && !feileiId) {
        console.log("!rowid && !feileiId")
        $("#分类id").val(getTimeAndRandom())
        $("#父类id").val("-1")
    }

    if (feileiId) {
        console.log("父类id")
        $("#分类id").val(getTimeAndRandom())
        $("#父类id").val(feileiId)
        form.on("submit(submit)", function(data) {
            mAddNewData(data.field)
        })
        return false
    }
    formSubmit.init({
        dataUrl: { url: httpcom_YHGL },
        addData: { //添加的接口
            XDLMCID: "5000",
            XDLMSID: "DYBH20190823102601261208193"
        },
        editData: { //修改的接口
            XDLMCID: "6000",
            XDLMSID: "DYBH20190823102601261218195",
            XDLMID: rowid //修改的时候必须要有id
        },
        echoData: { //获取单行数据的接口
            XDLMSID: "DYBH20190823102601261201192",
            XDLMCID: "1001",
            XDLMA: rowid
        },
        beforeSubmitCallback: function(data) { //提交前要要重新修改表单内的值的回调函数
            data.XDLM分类名 = $("#DepartName").val()
        },

        // beforeEchoDataCallback: function(data) { //回显之前的操作，data参数值为回显的数据
        //    
        // }
    })

    form.render();
});

function mAddNewData(where) {
    //判断添加还是修改
    var tip = "确定要添加下级部门吗？"
    where.XDLM分类名 = $("#DepartName").val()
    where.XDLMCID = "5000";
    where.XDLMSID = "DYBH20190823102601261208193";
    submitDataTip(tip, function() {
        PostDataRS(where, "SYYHGL", function(data) {
            if (data.success) {
                tipMsg(data, function() {
                    QXALL()
                })

            }
        })
    })
}