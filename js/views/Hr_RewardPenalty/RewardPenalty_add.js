/*
 * @陕西唐远
 * @文件名: RewardPenalty_add.js
 * @作者: 张黎博
 * @Git: zlb
 * @Date: 2019-10-24 12:04:01
 * @描述: 奖罚添加页js
 * @版本: 1.00
 * @修改历史纪录: （版本 修改时间 修改人 修改内容）
 * @记录:  
 */
var $, laydate, admin, form, rowid, upload, admin, table, formSubmit, RewardType;
layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'table', "form", 'laydate', "upload", "formSubmit"], function() {
    admin = layui.admin
    form = layui.form,
        laydate = layui.laydate,
        upload = layui.upload;
    formSubmit = layui.formSubmit; //使用封装好的表单提交的js
    rowid = window.location.href.getQuery('rowId');
    RewardType = window.location.href.getQuery('RewardType');
    laydate.render({
        elem: '#RewardTime',
        value: new Date()
    });

    //员工姓名下拉选项
    PostDataRS({
        XDLMCID: "1001",
        XDLMSID: "DYBH20190823102601261253201",
        // XDLMA: "2"
    }, "SYYHGL", function(data) {
        if (data.success && data.rows.length > 0) {
            getSelectattrData("UserName", data.rows, "mUserName", "userid")
            form.render("select")
        }
        if (RewardType == "1") {
            $("#RewardType").val("1")
                //处罚原因下拉选项
            PostDataRS({
                XDLMCID: "1001",
                XDLMSID: "DYBH20191015151140114015841",
                XDLMA: "11"
            }, "SYYHGL", function(data) {
                if (data.success && data.rows.length > 0) {
                    getSelectNoDefine("RewardProject", data.rows, "分类名")
                    form.render("select")
                }

            })
        } else if (RewardType == "2") {
            $("#RewardType").val("2")
                //奖励原因下拉选项
            PostDataRS({
                XDLMCID: "1001",
                XDLMSID: "DYBH20191015151140114015841",
                XDLMA: "10"
            }, "SYYHGL", function(data) {
                if (data.success && data.rows.length > 0) {
                    getSelectNoDefine("RewardProject", data.rows, "分类名")
                    form.render("select")
                }

            })
        }

        formSubmit.init({
            dataUrl: { url: httpcom_RSGL },
            addData: { //添加的接口
                XDLMCID: "5000",
                XDLMSID: "DYBH20190823102721272124763"
            },
            editData: { //修改的接口
                XDLMCID: "6000",
                XDLMSID: "DYBH2019082310272127215365",
                XDLMID: rowid //修改的时候必须要有id
            },
            echoData: { //获取单行数据的接口
                XDLMSID: "DYBH2019082310272127215262",
                XDLMCID: "1001",
                XDLMA: rowid
            },
            // beforeSubmitCallback: function(data) { //提交前要要重新修改表单内的值的回调函数

            // },

            // beforeEchoDataCallback: function(data) { //回显之前的操作，data参数值为回显的数据


            // }
        })

    })

    //姓名下拉点击事件
    form.on('select(UserName)', function(data) {
        $("#UserId").val($("#UserName option:checked").attr("attrData"))
            // console.log($("#UserName option:checked").attr("attrData"))
    });
    form.render("select")
    form.render();

    // // 调用时的上传插件
    // var uploadInst = upload.render({
    //     elem: '#uploadFile' //绑定元素
    //         ,
    //     url: '/upload/' //上传接口
    //         ,
    //     done: function(res) {
    //         //上传完毕回调
    //     },
    //     error: function() {
    //         //请求异常回调
    //     }
    // });
});



// function geRewardInfoById(RewardId) {
//     var data = PostData("/Controllers/Hr_RewardManage/GetModelById/" + RewardId, "").data;
//     var form = layui.form;
//     console.log(data);
//     form.val("formData", data);
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