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
//  id: "997"
// rank: "1"
// 企业ID: "dinga0b804202a4c9d7835c2f4657eb6378f"
// 员工ID: "04682937001069351"
// 唯一标识: "24830404334"
// 定位方法: "ATM"
// 工作日: "2019/10/31 0:00:00"
// 打卡地址: "西安十月信息技术有限公司_03361"
// 打卡时间: "2019/10/31 18:18:50"
// 打卡结果: "正常"
// 排班ID: "78332561808"
// 排班打卡时间: "2019/10/31 18:15:00"
// 排班时间: "2019/10/31 18:15:00"
// 数据来源: "考勤机"
// 早退分钟: "0"
// 时间: "2019/11/4 0:00:25"
// 是否合法: "合法"
// 更新时间: "2019/11/4 16:35:15"
// 用户ID: ""
// 用户名: ""
// 考勤班次ID: "201650101"
// 考勤类型: "下班"
// 考勤组ID: "205135013"
// 考勤范围: "范围内"
// 迟到分钟: "0"
// 部门: ""
});
function getFormValue() {
	PostData_new("/xdData/xdDataManage.ashx?XAction=GetDataInterface&XKLX=SYRSGL&XDLMCID=1001&XDLMSID=DYBH20191104120919919185242&XDLMA="+ GetRequest().rowid, "",function(getData){
	 if(getData.success == true){
	   for (var i in getData.rows[0]) {
		 $('#'+i).html(getData.rows[0][i]);
	   }
	
	 }

	});
	
   }



