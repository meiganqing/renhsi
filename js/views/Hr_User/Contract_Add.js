/*
 * @陕西唐远
 * @文件名: Contract_Add.js
 * @作者: 张黎博
 * @Git: zlb
 * @Date: 2019-10-24 12:04:01
 * @描述: 合同管理添加页js
 * @版本: 1.00
 * @修改历史纪录: （版本 修改时间 修改人 修改内容）
 * @记录:  
 */
var laydate, $, element, admin, table, form, upload, rowid, formSubmit;
layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'table', "form", 'laydate', "upload", "element", "formSubmit"], function() {
    admin = layui.admin, table = layui.table, form = layui.form, upload = layui.upload;
    laydate = layui.laydate;
    element = layui.element;
    $ = layui.$;
    formSubmit = layui.formSubmit; //使用封装好的表单提交的js
    rowid = window.location.href.getQuery('rowId');

    $("#ContractCode").val(getTimeAndRandom()) //合同编号
        // 签订日期
    laydate.render({
        elem: '#ContractSignTime',
        value: new Date()
    });
    // 生效日期
    laydate.render({
        elem: '#ContractBegTime',
        value: new Date()
    });
    // 到期日期
    laydate.render({
        elem: '#ContractEndTime',
        value: new Date()
    });
    // 试用到期日期
    laydate.render({
        elem: '#OnTrialEndTime',
        value: new Date()
    });
    // 姓名下拉
    PostDataRS({
        XDLMCID: "1001",
        XDLMSID: "DYBH20190823102601261253201"
    }, "SYYHGL", function(data) {
        if (data.success && data.rows.length > 0) {
            getSelectattrData("UserName", data.rows, "mUserName", "userid")
            form.render("select")
        }
        // 合同类型下拉
        PostDataRS({
            XDLMCID: "1001",
            XDLMSID: "DYBH20191015151140114015841",
            XDLMA: "2019102914311805648913"
        }, "SYYHGL", function(data) {
            if (data.success && data.rows.length > 0) {
                getSelectattrData("ContractType", data.rows, "分类名")
                form.render("select")
                formSubmit.init({
                    dataUrl: { url: httpcom_RSGL },
                    addData: { //添加的接口
                        XDLMCID: "5000",
                        XDLMSID: "DYBH2019082310272127218303"
                    },
                    editData: { //修改的接口
                        XDLMCID: "6000",
                        XDLMSID: "DYBH20190823102721272125505",
                        XDLMID: rowid //修改的时候必须要有id
                    },
                    echoData: { //获取单行数据的接口
                        XDLMSID: "DYBH2019082310272127213002",
                        XDLMCID: "1001",
                        XDLMA: rowid
                    },
                    beforeSubmitCallback: function(data) { //提交前要要重新修改表单内的值的回调函数
                        // data.XDLMFiles = $("#showfileFJ").attr("allSrc")
                        let fileData = submitPicture("imgContent");
                        // let uploadName = fileData.imgName.substring(0, fileData.imgName.lastIndexOf(','))
                        let uploadPath = fileData.imgPath.substring(0, fileData.imgPath.lastIndexOf(','))
                        data.XDLMFiles = uploadPath
                    },

                    beforeEchoDataCallback: function(data) { //回显之前的操作，data参数值为回显的数据
                        // 文件回显
                        // $("#showfileFJ").attr("allSrc", data.rows[0].Files)
                        // SpellItIntoTable('');
                        xghx("imgContent", data.rows[0].Files)

                        form.render("select");
                        form.render();

                    }
                })
            }
        })
    })



    //姓名下拉点击事件
    form.on('select(UserName)', function(data) {
        $("#UserId").val($("#UserName option:checked").attr("attrData"))
            // console.log($("#UserName option:checked").attr("attrData"))
    });



    form.verify({
        noEmpty: function(value) {
            if (value.length == 0) {
                return '请填写该项内容';
            }
        }
    });


    //上传文件
    uploadFileRS("uploadImg", "imgContent"); //上传文件
});


function callBack() {
    var index543 = parent.layer.getFrameIndex(window.name); //获取窗口索引
    parent.dataTable.reload('mDataTable', {
        page: {
            curr: 1 //重新从第 1 页开始
        }
    });
    parent.layer.close(index543);
}