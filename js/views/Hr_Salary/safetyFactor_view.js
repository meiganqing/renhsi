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
var $,element;
layui.config({
	    base: '../../../layuiadmin/' //静态资源所在路径
	  }).extend({
	    index: 'lib/index' //主入口模块
	  }).use(['index', 'table',"form",'laydate',"upload",'element'], function(){
	    var admin = layui.admin
		form = layui.form,
		laydate = layui.laydate,
		upload = layui.upload;
		element = layui.element;
		$ = layui.$;
	
		
 getFormValue()
});

function getFormValue() {
	PostData_new("/xdData/xdDataManage.ashx?XAction=GetDataInterface&XKLX=SYRSGL&XDLMCID=1001&XDLMSID=DYBH20191102153541354151212&XDLMA="+ GetRequest().rowid, "",function(getData){
	 if(getData.success == true){
	   for (var i in getData.rows[0]) {
		 $('#'+i).html(getData.rows[0][i]);
	   }
	
	 }

	});
	
   }



