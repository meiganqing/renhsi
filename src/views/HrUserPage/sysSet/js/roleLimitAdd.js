/*
 * @陕西唐远
 * @文件名:roleLimitAdd.js 
 * @作者: 张黎博
 * @Git: zlb
 * @Date: 2019-09-11 15:22:09
 * @描述: 角色配置列表添加页js
 * @版本: 1.00
 * @修改历史纪录: （版本 修改时间 修改人 修改内容）
 * @记录:  
 */
var $, element, layer, form, table, where, rowid, xmbhs, tableins;
layui.config({
    base: '../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(["jquery", "form", "element", "layer", "table"], function() {
    $ = layui.jquery, element = layui.element, layer = layui.layer, table = layui.table, form = layui.form;
    rowid = window.location.href.getQuery("rowid") //单行数据id
    if (rowid) { //是否修改页面
        console.log(rowid)
        var returnData = postData('wwGetDataList', {
            TblNum: 7015,
            X98: rowid
        }, "", "", false, "sykf=SYYHGL&XKLX=SYYHGL");
        if (returnData.msg || returnData.success) {
            for (var item in returnData.data[0]) {
                $('#' + item).val(returnData.data[0][item]);
            }
            $('#XDLMID').val(returnData.data[0].id);
            form.render();
            $('#saveHZ').html('修改');
        }
    } else {
        // $('#itemlm').val('');
        // $('#itemname').val('');
        // $('#saveHZ').html('添加');
        $('#itemNum').val(getonlynum());
        console.log($('#itemNum').val())
        xmbhs = $('#xmbh').val();

    }

    //提交添加新栏目
    form.on('submit(XMForm)', function(data) {
        if (rowid) {
            layer.confirm('确定要修改吗？', function(index) {
                var returnMsg = postData('wwModifyDataById', data.field, "", "", false, "sykf=SYYHGL&XKLX=SYYHGL");

                if (returnMsg.msg || returnMsg.success) {
                    layer.msg('修改完成', {
                        icon: 1,
                        time: 1000
                    }, function() {
                        // layer.close(index);
                        // table.render()
                        // tableins.reload();
                        // layer.closeAll();
                        QXALL()
                    })
                }
            })
            return false;
        } else {
            layer.confirm('确定要添加吗？', function(index) {
                var add_data = postData('wwAddNewRow', data.field, function(data) {
                    if (data.msg || data.success) {
                        layer.msg('添加完成', {
                            icon: 1,
                            time: 800
                        }, function() {
                            // tableins.reload();
                            // layer.closeAll();
                            QXALL()
                        });
                        layer.close(index);
                    }
                }, "", "", "sykf=SYYHGL&XKLX=SYYHGL");

            })
            return false;
        }
    });
});