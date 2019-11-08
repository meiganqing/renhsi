/*
 * @陕西唐远
 * @文件名: OrganizerManage.js
 * @作者: 张黎博
 * @Git: zlb
 * @Date: 2019-10-24 12:04:01
 * @描述: 组织管理页js
 * @版本: 1.00
 * @修改历史纪录: （版本 修改时间 修改人 修改内容）
 * @记录:  
 */
var $, dataTable, oldPosition, admin, table, tree, form, where, layer, treeGrid;
layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'form', 'table', "tree", "layer", "treeGrid"], function() {

    admin = layui.admin,
        table = layui.table,
        treeGrid = layui.treeGrid,
        tree = layui.tree
    layer = layui.layer;
    form = layui.form;
    $ = layui.$;
    //列表接口
    where = {
            XDLMCID: "1001",
            XDLMSID: "DYBH20190823102601261218191"
        }
        //表格
    getTable("test-table-toolbar", where);
    //监听行工具事件
    treeGrid.on('tool(test-table-toolbar)', function(obj) {
        var data = obj.data;
        if (obj.event === 'del') {
            console.log('del')
            if (limitConfig("storeLimt_rsgl", 3)) {
                delDataYH(data.id, "DYBH20190823102601261204194")
            } else {
                layer.msg("您没有删除权限");
            }
        } else if (obj.event === 'edit') {
            console.log('edit')
            if (limitConfig("storeLimt_rsgl", 2)) {
                openWindow("2", "./OrganizerManage_add.html?rowId=" + data.id, "修改", 600, 260)
            } else {
                layer.msg("您没有修改权限");
            }
        } else if (obj.event === 'add') {
            if (limitConfig("storeLimt_rsgl", 2)) {
                openWindow("2", "./OrganizerManage_add.html?feileiId=" + data.分类id, "添加下级部门", 600, 260)
            } else {
                layer.msg("您没有修改权限");
            }
        }
    });
    form.render();
    //查询
    // $("#searchBtn").click(function() {
    //     searchTableGY(where, dataTable)
    // })
});

function addInfo() {
    openWindow("2", "./OrganizerManage_add.html", "添加", 600, 260)
}
// function removeAll() {
//     delDataVolumeYH("DYBH20190823102601261204194")
// }

function getTable(id, where) {
    var limit = 18;
    var cols = [
        [{
                field: 'ck',
                checkbox: true,
                width: '2%',
                align: 'center'
            },
            {
                field: 'DepartName',
                title: '部门名称',
                // treeNodes: true,
                // headerClass: 'value_col',
                // colClass: 'value_col',
                width: '60%',
                align: 'center',
                templet: '#DepartName'
            },
            {
                fixed: 'right',
                title: '操作',
                // headerClass: 'value_col',
                // colClass: 'value_col',
                toolbar: '#test-table-toolbar-barDemo',
                width: '30%',
                align: 'center'
            }
        ]
    ];
    layui.use('treeGrid', function() {
        var treeGrid = layui.treeGrid;
        dataTable = treeGrid.render({
            id: 'test-table-toolbar',
            elem: '#' + id,
            url: httpcom_YHGL,
            where: where,

            idField: 'id', //必須字段
            treeId: '分类id' //树形id字段名称
                ,
            treeUpId: '父类id' //树形父id字段名称
                ,
            treeShowName: 'DepartName' //以树形式显示的字段
                ,
            headers: {
                // getAuth()
                Authorization: getAuth()
            },
            height: $(window).height() - 170,
            cols: cols,
            limits: [limit, 20, 50, 100, 150, 300, 500],
            limit: limit, //每页默认显示的数量
            isPage: true,

            request: {
                pageName: 'page' //页码的参数名称，默认：page
                    ,
                limitName: 'rows' //每页数据量的参数名，默认：limit
            },
            response: {
                countName: 'total', //规定数据总数的字段名称，默认：count					
                dataName: 'rows' //规定数据列表的字段名称，默认：data
            },

        });
    });
}