var $;
var laydate;
var form;
var rowid;
layui.config({
  base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
  index: 'lib/index' //主入口模块
}).use(['index', 'form'], function () {
  var admin = layui.admin;
  form = layui.form;
  $ = layui.$;

  getDatas();

});

function getDatas(){
  PostData_new("/xdData/xdDataManage.ashx?XAction=GetDataInterface&XKLX=SYRSGL&XDLMCID=1001&XDLMSID=DYBH201908231027212721119172&XDLMA=" + GetRequest().rowid, "",function(getdatas){
    if(getdatas.success == true){
      for(var i in getdatas.rows[0]){
    
          $('#'+i).html(getdatas.rows[0][i]);
        
      }
  
    
    }else{
      console.log(getdatas);
    }

  });

}
