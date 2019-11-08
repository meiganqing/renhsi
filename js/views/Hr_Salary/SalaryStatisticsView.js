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
	  }).use(['index', 'table',"form",'laydate',"upload"], function(){
	    var admin = layui.admin
		form = layui.form,
		laydate = layui.laydate,
		upload = layui.upload;
		$ = layui.$;
	  

		geInfoById(GetRequest().rowid);

});



function geInfoById(RewardId){
    var data = PostData("/Controllers/Hr_SalaryManage/GetModelById/"+RewardId,"").data;

    for (var item in data) {
    	$("#"+item).html(data[item]);
	}

	let thisValuserId = $("#userId").html();
    $("#userId ").html(getUsefName(thisValuserId));
}
