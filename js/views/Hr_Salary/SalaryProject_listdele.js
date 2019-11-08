/*
 * @陕西唐远
 * @文件名: OrganizerPosition_add.js
 * @作者: 张黎博
 * @Git: zlb
 * @Date: 2019-10-28 15:25:23
 * @描述: 职位管理添加页js
 * @版本: 1.00
 * @修改历史纪录: （版本 修改时间 修改人 修改内容）
 * @记录:  
 */
var $, formSubmit, admin, table, form, rowid,delcol;
layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'form', 'table', "formSubmit"], function () {
    formSubmit = layui.formSubmit;
    admin = layui.admin,
    table = layui.table,
    form = layui.form;
    $ = layui.$;
// 获取下拉
	
PostData_new(moneyLie, {
    XDLMCID: "GetSalaryProjectColumn",
    XKLX:'SYRSGL',
}, function (data) {
 
    if (data.success && data.data.length > 0) {
        getSelect("ColumnName", data.data, "ColumnName", "ColumnName", "ColumnName")
        form.render("select") 
    }
    delcol=data.data[0].ColumnName//默认第一个下拉
    console.log(delcol)
})

form.on('select(ColumnName)', function (data) {
console.log(data)
console.log(data.value)

delcol=data.value

})



    // 删除
    form.on('submit(submit)', function (data) {
        let addata = {
            'XKLX': 'SYRSGL',
            'XDLMCID': 'DeleteSalaryProjectColumn',
            "column_name":delcol
        }
     
        deleLie(moneyLie, addata);
	  return false;

    })



});

function callBack() {
	var index543 = parent.layer.getFrameIndex(window.name); //获取窗口索引
	// parent.dataTable.reload('mDataTable', {
	// 	page: {
	// 		curr: 1 //重新从第 1 页开始
	// 	}
	// });
    parent.layer.close(index543);
    parent.location.reload()
}