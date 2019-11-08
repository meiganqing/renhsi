/*
 * @陕西唐远
 * @文件名: Contract_check.js
 * @作者: 张黎博
 * @Git: zlb
 * @Date: 2019-10-24 12:04:01
 * @描述: 合同管理详情页js
 * @版本: 1.00
 * @修改历史纪录: （版本 修改时间 修改人 修改内容）
 * @记录:  
 */
var $, laydate, form, rowid, element, admin;
layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'form', 'element'], function() {
    admin = layui.admin;
    form = layui.form;
    element = layui.element;
    $ = layui.$;
    rowid = window.location.href.getQuery('rowId');
    PostDataRS({
        XDLMCID: "1001",
        XDLMSID: "DYBH2019082310272127213002",
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

// function getDatas(){
//   var getdatas = PostData("/Controllers/Hr_ContractManage/GetModelById/?id=" + GetRequest().rowid, "");
//   if(getdatas.code == "0"){
//     for(var i in getdatas.data){
//       if(i == 'contractType'){
//         if(getdatas.data[i] == 1){
//           $('#contractType').html('录用合同');
//         }else if(getdatas.data[i] == 2){
//           $('#contractType').html('使用合同');
//         }
//       }else {
//         $('#'+i).html(getdatas.data[i]);
//       }
//     }

//     let thisValuserId = $("#userId").html();
//     $("#userId").html(getUsefName(thisValuserId));


//     $("#showfileFJ").attr("allSrc",getdatas.data.remarks);
//     SpellItIntoTable(1);
//     // $("#showfileFJ").attr("allSrc",getdatas.data.files);
//     // SpellItIntoTable(1);
//   }else{
//     console.log(getdatas);
//   }
// }