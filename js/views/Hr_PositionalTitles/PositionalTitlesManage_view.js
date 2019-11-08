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
}).use(['index', 'table', "form", 'laydate', "upload"], function() {
    var admin = layui.admin
    form = layui.form,
        laydate = layui.laydate,
        upload = layui.upload;
    $ = layui.$;
    getFormValue()
        // geTrainInfoById(GetRequest().choseId);
});

function getFormValue() {
    console.log("请求")
    PostData_new("/xdData/xdDataManage.ashx?XAction=GetDataInterface&XKLX=SYRSGL&XDLMCID=1001&XDLMSID=DYBH201908231027212721181122&XDLMA=" + GetRequest().choseId, "", function(getData) {
        if (getData.success == true) {
            for (var i in getData.rows[0]) {
                $('#' + i).html(getData.rows[0][i]);
            }
            ckxghx("imgContent", getData.rows[0].Files)
        }

    });

}

// function geTrainInfoById(RewardId){
//     var data = PostData("/Controllers/Hr_Title/GetModelById/"+RewardId,"").data;
//     console.log(data);
//     for (var item in data) {
//     	$("#"+item).html(data[item]);
// 	}

// 	let thisValuserId = $("#approvalUserId").html();
//     $("#approvalUserId ").html(getUsefName(thisValuserId));

// 	$("#getMode").html(returnVal(getMode,data["getMode"]));

// 	$("#titleName").html(returnVal(titleName,data["titleName"]));
// 	$("#nextTitle").html(returnVal(titleName,data["nextTitle"]));
// }