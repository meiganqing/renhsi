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
var $, element;
layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'table', "form", 'laydate', "upload", "element"], function() {
    var admin = layui.admin
    form = layui.form,
        laydate = layui.laydate,
        upload = layui.upload;
    $ = layui.$;
    element = layui.element;

    geTrainInfoById(GetRequest().choseTrainId);
});



function geTrainInfoById(RewardId) {
    PostData_new("/xdData/xdDataManage.ashx?XAction=GetDataInterface&XKLX=SYRSGL&XDLMCID=1001&XDLMSID=DYBH20190823102721272182132&XDLMA=" + RewardId, "", function(getdatas) {
        console.log("你说你说")
        console.log(getdatas.rows[0])
        if (getdatas.success == true) {
            for (var i in getdatas.rows[0]) {
                $('#' + i).html(getdatas.rows[0][i]);
            }
            // 上传文件回显getData.rows[0].Files
            ckxghx("imgContent", getdatas.rows[0].Files)
                // $("#showfileFJ").attr("allSrc",getdatas.rows[0].Files)
                // SpellItIntoTable('1');

        } else {
            console.log(getdatas);
        }
    });

}