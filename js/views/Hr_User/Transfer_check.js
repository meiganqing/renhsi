/*
 * @陕西唐远
 * @文件名: Transfer_check.js
 * @作者: 张黎博
 * @Git: zlb
 * @Date: 2019-10-24 12:04:01
 * @描述: 调动记录详情页js
 * @版本: 1.00
 * @修改历史纪录: （版本 修改时间 修改人 修改内容）
 * @记录:  
 */

var $;
var laydate;
var form;
var rowid;
var element;
layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'form', 'element'], function() {
    var admin = layui.admin;
    element = layui.element;
    form = layui.form;
    $ = layui.$;
    rowid = window.location.href.getQuery('rowId');
    PostDataRS({
        XDLMCID: "1001",
        XDLMSID: "DYBH20190823102721272186142",
        XDLMA: rowid
    }, "SYRSGL", function(data) {
        if (data.success && data.rows.length > 0) {
            for (let i in data.rows[0]) {
                $("#" + i).html(data.rows[0][i])
            }
            // $("#showfileFJ").attr("allSrc", data.rows[0].Files)
            // SpellItIntoTable('1');
            ckxghx("imgContent", data.rows[0].Files)
        }

    })


});