/*
 * @陕西唐远
 * @文件名: sjpzAdd.js
 * @作者: 张黎博
 * @Git: zlb
 * @Date: 2019-10-15 18:50:13
 * @描述: 数据配置添加页js
 * @版本: 1.00
 * @修改历史纪录: （版本 修改时间 修改人 修改内容）
 * @记录:  
 */
var $, form, lx, where, seeBigImg, flid;
layui.config({
    base: '../../layuiadmin/lib/' //静态资源所在路径
}).use(['jquery', 'form'], function() {
    $ = layui.jquery, form = layui.form;
    lx = window.location.href.getQuery("lx");
    flid = window.location.href.getQuery("flid");
    GetAPITreeData(flid);
    form.render(null, 'form-group1');
    switch (lx) {
        case "1": //添加
            $('#saveHZ').html("添加分类");
            $("#分类id").val(getFenLei());
            // console.log(getFenLei())
            console.log($("#分类id").val())
            $('#yfenlei').hide();
            break;
        case "2": //修改
            $('#saveHZ').html("修改分类名");
            $('#yfenlei').hide();
            $('#isP').hide();
            break;
        case "3": //移动
            $('#saveHZ').html("移动分类");
            $('#fenleiname').hide();
            $('#isP').hide();
            break;
        case "4": //删除
            $('#saveHZ').html("删除分类");
            $('#fenleiname').hide();
            $('#yfenlei').hide();
            $('#isP').hide();
            break;
    }

    form.on('select(原分类)', function(data) {
        if (lx == "3") {
            $("#分类id").val(data.value);
        }

    });
    form.on('select(父类选择)', function(data) {
        // console.log(data);
        // $("#父类id").val(data.value);
        if (lx == "1") {
            $("#父类id").val(data.value);
        }
        if (lx == "2") {
            $("#分类id").val(data.value);
        }
        if (lx == "3") {
            $("#父类id").val(data.value);
        }
        if (lx == "4") {
            $("#分类id").val(data.value);
        }

    });

    form.on('radio(isParent)', function(data) {
        // console.log(data);
        if (data.value == "是") {
            $('#xfenlei').hide();
            $("#父类id").val("-1");
        } else {
            $('#xfenlei').show();
        }
    });


    $('#saveHZ').click(function(e) {
        mAddNewData();
    });

})


function GetAPITreeData(flid) {
    try {
        PostDatashu({
            XDLMCID: "2000",
            XDLMSID: "DYBH2019101515115305625631",
            XDLMTID: "2001"
        }, function(data) {
            // console.log(data);
            var dd = eval('(' + data + ')');
            console.log(dd);
            for (var i in dd) {
                $("#父类选择").append('<option value="' + dd[i].id + '" tag="' + dd[i].ParentId + '" >' + dd[i].name + '</option>');
                $("#原分类").append('<option value="' + dd[i].id + '" tag="' + dd[i].ParentId + '" >' + dd[i].name + '</option>');
                addOption2(dd[i], '&nbsp;┊┈', "#父类选择");
                addOption2(dd[i], '&nbsp;┊┈', "#原分类");
            }
            if (lx == "2") {
                $("#父类选择").val(flid);
                // form.render("select")
            }
            if (lx == "3") {
                $("#原分类").val(flid);
                // form.render("select")
            }
            if (lx == "4") {
                $("#父类选择").val(flid);
                // form.render("select")
            }
            form.render();
        });

    } catch (e) {
        layer.alert(e.message);
    }

}

function addOption2(child, jibie, id) {
    if (child.children != 'undefined') {
        for (var j in child.children) {
            child.children[j].name = child.children[j].name.replace(/\.n/g, '.');

            $(id).append('<option value="' + child.children[j].id + '"  tag="' + child.children[j].ParentId + '">' + jibie + '' + child.children[j].name + '</option>');

            addOption2(child.children[j], '&nbsp;&nbsp;' + jibie, id);
        }
    } else {
        for (var x in id) {
            $(id[x]).append('<option value="' + child.id + '" tag="' + child.ParentId + '" >' + "┊" + jibie + '' + child.name + '</option>');
        }
    }
}


function mAddNewData(where) {
    //判断添加还是修改
    where = {};
    var tip;
    switch (lx) {
        case "1": //添加
            if ($("#分类名").val().replaceAll(" ", "").length !== 0) {
                where.XDLMCID = "5000";
                where.XDLMSID = "DYBH20191015151140114010743";
                where.XDLM父类id = $("#父类id").val();
                where.XDLM分类名 = $("#分类名").val();
                where.XDLM分类id = $("#分类id").val(); //分类id
                // if (flid) {
                //     where.XDLM分类id = flid; //分类id
                // } else {
                //     where.XDLM分类id = $("#分类id").val(); //分类id
                // }
                console.log(where)
                tip = "确定要添加分类吗？"
                submitDataTip(tip, function() {
                    PostData(where, function(data) {
                        if (data.success) {
                            tipMsg(data)
                                // QXALL()
                        }
                    })
                })
            } else {
                layer.msg('请输入分类名');
            }

            break;
        case "2": //修改
            where.XDLMCID = "6000";
            where.XDLMSID = "DYBH2019101515114011409645";
            where.XDLM分类名 = $("#分类名").val(); //分类名
            if (flid) {
                where.XDLMID = flid; //分类id
            } else {
                where.XDLMID = $("#分类id").val(); //分类id
            }
            tip = "确定要修改分类名吗？"
            submitDataTip(tip, function() {
                PostData(where, function(data) {
                    if (data.success) {
                        tipMsg(data)
                            // QXALL()
                    }
                })
            })

            break;
        case "3": //移动
            where.XDLMCID = "6000";
            where.XDLMSID = "DYBH2019101515114011409645";
            where.XDLM父类id = $("#父类id").val(); //父类id
            if (flid) {
                where.XDLMID = flid; //分类id
            } else {
                where.XDLMID = $("#分类id").val(); //分类id
            }
            tip = "确定要移动分类吗？"
            submitDataTip(tip, function() {
                PostData(where, function(data) {
                    if (data.success) {
                        tipMsg(data)
                            // QXALL()
                    }
                })
            })
            break;
        case "4": //删除
            if ($("#父类选择 option:selected").attr("tag") != "-1") {
                PostData({
                    XDLMCID: "1001",
                    XDLMSID: "DYBH20191015151140114015841",
                }, function(data) {
                    // console.log(data)
                    for (var i = 0; i < data.rows.length; i++) {
                        if ($("#分类id").val() == data.rows[i].分类id || flid == data.rows[i].分类id) {
                            where.XDLMCID = "4000";
                            where.XDLMSID = "DYBH20191015151140114019044";
                            where.XDLMROWID = data.rows[i].id;
                            tip = "确定要删除分类吗？"
                            submitDataTip(tip, function() {
                                PostData(where, function(data) {
                                    if (data.success) {
                                        tipMsg(data)
                                            // QXALL()

                                    }
                                })
                            })
                        }
                    }
                })


            } else {
                layer.msg("不能删除父类！", { anim: 0, time: 1000 });
            }

            break;

    }

}
String.prototype.replaceAll = function(s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}