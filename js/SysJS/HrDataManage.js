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
var httpcom = "http://192.168.28.251:8111",
    httpcom_YHGL = httpcom + "/xdData/xdDataManage.ashx?XAction=GetDataInterface&XKLX=SYYHGL",
    httpcom_RSGL = httpcom + "/xdData/xdDataManage.ashx?XAction=GetDataInterface&XKLX=SYRSGL",
    // 用户管理
    httpcom_YHgl = httpcom + "/xdData/xdDataManage.ashx?XAction=GetDataInterface&XKLX=SYYHGL",

    ipUploadUrl = httpcom + "/xddata/xdFileAllSysUpload.ashx?XKLX=SYRSGL", //图片文件
    basePathImg = httpcom + "/SYRSGL/Widget";
this_host = window.location.host;
var baseUrl, baseUrl_yh;
var cookpath = "";
var loginId = 55;

// 新加
var yonghu = "/xdData/xdDataManage.ashx?XAction=GetDataInterface&XKLX=SYYHGL"
var baSic = "/xdData/xdDataManage.ashx?XAction=GetDataInterface"

// 月度薪资
monthdata = '/xdData/xdDataManage.ashx?XAction=ExtFC'
    // 项目薪资增加列
var moneyLie = "/xdData/xdDataManage.ashx?XAction=ExtFC"



if (this_host.indexOf("localhost:") != -1) {
    newipurl = "http://192.168.28.251:8111"
    baseUrl = "http://192.168.28.251:8111/SYRSGL";
    baseUrlImg = "http://192.168.28.251:8111/";
} else {
    var newipurl = "",
        baseUrl = "/SYRSGL",
        BaseUrl = "/RS";
    baseUrlImg = ""
}
baseUrl_yh = "http://192.168.28.251:";
var appId = "website|93BBB59D-F39A-4744-BD75-61B5223F5BED";
var token = "EC999C14C86A4E5CBB6E04C5DE89356A";
var secretKey = "20da4a805a76214ef24844d42bdb04152f07a86398b09617263c92066d9c0c5905e77b0f8699eff4b41f9c6351acace4d28136ac0273fbd9009a67cdf598e599";

String.prototype.getQuery = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = this.substr(this.indexOf("?") + 1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};

/*
 * @陕西唐远
 * @文件名: 
 * @作者: 马娜
 * @Git: 马娜
 * @Date: 2019.10.25
 * @描述: 
 * @版本: 1.00
 * @修改历史纪录: （
 * 1.添加表单删除，公共函数
 * 2.添加公共获取table表单页的下拉列表
 * 3.添加页面的公共ajax请求PostData_
 * ）
 * @记录: 1. 10/14 马娜 更换登录接口
 */


function PostData_YH(mActionData, callback) {
    var rv;
    var index33;
    try {
        $.ajax({

            async: true,
            type: "post",
            url: httpcom_YHgl,
            data: mActionData,
            dataType: 'json',
            headers: {
                Authorization: getAuth()
            },
            success: function(returnValue) {

                if (callback) {
                    callback(returnValue)
                }

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                rv = XMLHttpRequest.responseText;
                layer.msg(rv);
            }
        })
    } catch (e) {
        rv = e.msg;
        layer.msg(rv);
    }
    layer.close(index33);
    //注册查询点击事件
    $("#searchBtn").click(function() {

    })

    return rv;
}

function PostData_(mActionData, callback) {
    var rv;
    var index33;
    try {
        $.ajax({

            async: true,
            type: "post",
            url: httpcom_RSGL,
            data: mActionData,
            dataType: 'json',
            headers: {
                Authorization: getAuth()
            },
            success: function(returnValue) {

                if (callback) {
                    callback(returnValue)
                }

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                rv = XMLHttpRequest.responseText;
                layer.msg(rv);
            }
        })
    } catch (e) {
        rv = e.msg;
        layer.msg(rv);
    }
    layer.close(index33);
    //注册查询点击事件
    $("#searchBtn").click(function() {

    })

    return rv;
}

function PostData_YH(mActionData, callback) {
    var rv;
    var index33;
    try {
        $.ajax({

            async: true,
            type: "post",
            url: httpcom_YHGL,
            data: mActionData,
            dataType: 'json',
            headers: {
                Authorization: getAuth()
            },
            success: function(returnValue) {

                if (callback) {
                    callback(returnValue)
                }

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                rv = XMLHttpRequest.responseText;
                layer.msg(rv);
            }
        })
    } catch (e) {
        rv = e.msg;
        layer.msg(rv);
    }
    layer.close(index33);
    //注册查询点击事件
    $("#searchBtn").click(function() {

    })

    return rv;
}
//******获取下拉statr******
function getTableSelect_RSGL(mActionData, selectData) { //放到获取table的函数后边请求，不然会报错，因为table还没注册

    PostData_(mActionData, function(returnValue) {
            if (returnValue.success) {
                getSelectNoDefine(selectData.id, returnValue.rows, selectData.key, selectData.attr, selectData.attrValue)

            }
        })
        //注册查询点击事件,全局需要有统一的where，dataTable才可以使用
    $("#searchBtn").click(function() {
        where.QueryType = $("#" + selectData.id).find("option:selected").attr("attrdata");
        where.QueryKey = $("#antistop").val();
        dataTable.reload({
            where: where,
            cur: {
                page: 1
            }
        })
        return false;
    })

}
//*******获取下拉ens*****
//*******删除start*******
// 导出
function AlldaoChu(XDLMSID, callback) {

    layui.use(['layer'], function() {
        var layerSubmit = layer.confirm('确定要导出全部', {
                btn: ['确定导出', '再想想'] //按钮
            },
            function() //确定
            {
                layer.close(layerSubmit)
                submitDataVertifyModule("请验证", function() {
                    PostData_({
                        XDLMCID: 5002,
                        XDLMSID: XDLMSID,
                    }, function(data) {
                        if (data.success == true) {
                            window.location = httpcom + data.FilePath

                        }

                    })
                })

            }
        );
    });




}

function daoChu(XDLMSID, callback) {
    var ids = [];
    layui.use('table', function() {
        var table = layui.table;
        var checkStatus = table.checkStatus('mDataTable'),
            data = checkStatus.data;
        for (var i = 0; i < data.length; i++) {
            ids.push(data[i].id);
        }
        if (ids.length < 1) {
            layer.msg("请选中行")
        } else {
            submitDataVertifyModule("确定要批量导出吗", function() {
                PostData_({
                    XDLMCID: 5002,
                    XDLMA: ids.join(","),
                    XDLMSID: XDLMSID
                }, function(data) {
                    if (data.success == true) {
                        window.location = httpcom + data.FilePath

                    }
                })
            })
        }
    });
}
//批量删除
function delDataVolume(XDLMSID, callback) {
    var ids = [];
    layui.use('table', function() {
        var table = layui.table;
        var checkStatus = table.checkStatus('mDataTable'),
            data = checkStatus.data;
        for (var i = 0; i < data.length; i++) {
            ids.push(data[i].Id);
        }
        if (ids.length < 1) {
            layer.msg("请选中行")
        } else {
            submitDataVertifyModule("确定要批量删除吗", function() {
                PostData_({
                    XDLMCID: 4000,
                    XDLMROWID: ids.join(","),
                    XDLMSID: XDLMSID
                }, function(data) {
                    if (data.msg || data.success) {
                        tipMsg(data, callback);
                        dataTable.reload()
                    }
                })
            })
        }
    });
}

function delDataVolumeRS(XDLMSID, callback) {
    var ids = [];
    layui.use('table', function() {
        var table = layui.table;
        var checkStatus = table.checkStatus('mDataTable'),
            data = checkStatus.data;
        for (var i = 0; i < data.length; i++) {
            ids.push(data[i].id);
        }
        if (ids.length < 1) {
            layer.msg("请选中行")
        } else {
            submitDataVertifyModule("确定要批量删除吗", function() {
                PostData_({
                    XDLMCID: 4000,
                    XDLMROWID: ids.join(","),
                    XDLMSID: XDLMSID
                }, function(data) {
                    if (data.msg || data.success) {
                        tipMsg(data, callback);
                        dataTable.reload()
                    }
                })
            })
        }
    });
}

//用户批量删除
function delDataVolumeYH(XDLMSID, callback) {
    var ids = [];
    layui.use('table', function() {
        var table = layui.table;
        var checkStatus = table.checkStatus('mDataTable'),

            data = checkStatus.data;
        console.log(checkStatus)
        console.log(data)
        for (var i = 0; i < data.length; i++) {
            ids.push(data[i].id);
        }
        if (ids.length < 1) {
            layer.msg("请选中行")
        } else {
            submitDataVertifyModule("确定要批量删除吗", function() {
                PostData_YH({
                    XDLMCID: 4000,
                    XDLMROWID: ids.join(","),
                    XDLMSID: XDLMSID
                }, function(data) {
                    if (data.msg || data.success) {
                        tipMsg(data, callback);
                        dataTable.reload()
                    }
                })
            })
        }
    });
}

function submitDataVertifyModule(tip, callback) { //有验证码的弹框
    layer.open({
        title: tip,
        type: 1,
        content: `<div id='vertifyCode' style="padding:15px;"></div>
		<div class="layui-layer-btn layui-layer-btn-" style="position:absolute;bottom:0px;left:55px;"><a class="layui-layer-btn0" id="confirmBtn">确定</a><a class="layui-layer-btn1">再想想</a></div>
				`, //这里content是一个普通的String
        area: ['280px', '260px'],
        success: function() {
            $('#vertifyCode').codeVerify({
                type: 1,
                width: '200px',
                height: '50px',
                fontSize: '30px',
                codeLength: 4,
                btnId: 'confirmBtn',
                ready: function() {},
                success: function() {
                    callback()
                },
                error: function() {
                    layer.msg('验证码不匹配！');
                    return false;
                }
            });

        }
    });

}

function delData(rowid, XDLMSID, callback) { //删除数据
    layui.use(['layer'], function() {
        var layerSubmit = layer.confirm('确定要删除？删除后不可恢复！！', {
                btn: ['确定删除', '再想想'] //按钮
            },
            function() //确定
            {
                layer.close(layerSubmit)
                submitDataVertifyModule("请验证", function() {
                    console.log(rowid)
                    PostData_({

                        XDLMCID: 4000,
                        XDLMROWID: rowid,
                        XDLMSID: XDLMSID
                    }, function(data) {
                        if (data.msg || data.success) {
                            tipMsg(data, callback)
                            dataTable.reload()
                        }
                    })
                })

            }
        );
    });

}


function delDataYH(rowid, XDLMSID, callback) { //用户删除
    layui.use(['layer'], function() {
        var layerSubmit = layer.confirm('确定要删除？删除后不可恢复！！', {
                btn: ['确定删除', '再想想'] //按钮
            },
            function() //确定
            {
                layer.close(layerSubmit)
                submitDataVertifyModule("请验证", function() {
                    console.log(rowid)
                    PostData_YH({

                        XDLMCID: 4000,
                        XDLMROWID: rowid,
                        XDLMSID: XDLMSID
                    }, function(data) {
                        if (data.msg || data.success) {
                            tipMsg(data, callback)
                            dataTable.reload()
                        }
                    })
                })

            }
        );
    });

}

function tipMsg(data, callback) {

    var iconType = "";
    var tipMessage = data.message;

    if (data.msg || data.success) {
        iconType = 1;
        if (data.message) {

        } else {
            tipMessage = "操作成功"
        }
    } else {
        iconType = 5;
        if (data.message) {

        } else {
            tipMessage = "操作失败"
        }
    }

    layer.msg(tipMessage, {
        icon: iconType,
        time: 500
    }, function() {
        if (callback) {
            callback(data)
        } else {
            // QXALL() //他们的关闭

        }

    });
}

function QXALL() {

    // var indexlayer = parent.layer.getFrameIndex
    var indexlayer = parent.layer.getFrameIndex(window.name); //获取窗口索引
    if (parent.dataTable) {
        parent.dataTable.reload();
    }
    parent.layer.close(indexlayer);
}
//*******删除end*********

// 获取token

function getAuth() {
    if (localStorage.getItem("sytoken")) {

        return localStorage.getItem("sytoken")
    } else {
        //      window.location.href = "/login.html"
    }

}

// 新登录接口

function PostDataLogin(requestData, callback) {
    var rv = '';
    try {
        $.ajax({
            async: true,
            cache: false,
            type: "post",
            url: ' http://192.168.28.251:8111/xdData/xdDataManage.ashx?XAction=GetDataInterface',
            data: requestData,
            dataType: 'json',

            success: function(returnData) {
                if (callback) {
                    callback(returnData, this)
                }
                rv = returnData

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                rv = XMLHttpRequest.responseText;
                layer.msg(rv)

            }
        });
    } catch (e) {

        rv = e.message;
    }
}
//

function PostData_yh(hosts, ApiUrl, mActionType, baseDataBase, mActionData) {
    var rv;
    var index33;
    try {
        $.ajax({
            async: false,
            type: "post",
            // http://192.168.28.251:8333/api/center?XAction=GetUserLimitList&XKLX=syyh&userOnlynum={登录用户的唯一编码}&itemlm=&xmbh={系统标识}
            url: baseUrlImg + ApiUrl + "?XAction=" + mActionType + "&XKLX=" + baseDataBase,
            data: mActionData,
            dataType: 'json',
            headers: {
                Authorization: getAuth()
            },
            success: function(returnValue) {
                if (returnValue.success || returnValue.msg) {
                    rv = returnValue
                } else {
                    rv = returnValue.message;
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                rv = XMLHttpRequest.responseText;
                layer.msg(rv);
            }

        })
    } catch (e) {
        rv = e.message;
    }
    layer.close(index33);
    return rv;
}

// 拿出地址栏参数;
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串,如"?p=1"
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

// 获取 所有 用户信息 
function GetUserInfo(byDep) {
    if (byDep) {
        console.log(byDep);
        var byDepArr = String(byDep).split(",");
        var querytext = "";
        if (byDepArr.length == 1) {
            querytext += "and depId = '" + byDep + "'";
        } else {
            querytext += "and depId = '" + byDepArr[0] + "'";
            for (let i = 1; i < byDepArr.length; i++) {
                querytext += "or depId = '" + byDepArr[i] + "'";
            }
        }

        var data = {
            limit: 99999999,
            page: 1,
            queryText: querytext
        };

    } else {
        var data = {
            limit: 99999999,
            page: 1
        };
    }

    // var datas = PostData("/Controllers/Hr_User/GetListByPage", JSON.stringify(data)).data;
    // var optionHtml = "<option value=''>请选择</option>";
    // for (let i = 0; i < datas.length; i++) {
    //     optionHtml += "<option depid=" + datas[i].depId + " value=" + datas[i].id + ">" + datas[i].userName + "</option>"
    // }
    // return optionHtml;
}

// 获取职位的信息
function GetPositionInfo() {
    let data = {
        limit: 99999999,
        page: 1
    };
    var datas = PostData("/Controllers/Hr_PositionManage/GetListByPage", JSON.stringify(data)).data;
    var optionHtml = "<option value=''>请选择</option>";
    for (let i = 0; i < datas.length; i++) {

        optionHtml += "<option value=" + datas[i].id + ">" + datas[i].positionName + "</option>"
    }
    return optionHtml;
}
//李浩源
// 新请求接口
function PostData_new(ApiUrl, mActionData, callback) {
    var rv;
    var index33;
    try {
        $.ajax({

            async: false,
            type: "post",
            url: newipurl + ApiUrl,
            data: mActionData,
            dataType: 'json',

            headers: {
                Authorization: getAuth()
            },

            success: function(returnValue) {
                callback(returnValue)

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                rv = XMLHttpRequest.responseText;
                layer.msg(rv);
            }
        })
    } catch (e) {
        rv = e.msg;
    }
    layer.close(index33);
    return rv;
}

// 查询刷新
function updateData() {
    window.location.reload()
    return false
}

function updateDataTable() {
    dataTable.reload()
    return false
}

function searchTableGY(where, dataTable) {
    where.QueryType = $("#searchType").find("option:selected").attr("value");
    where.QueryKey = $("#antistop").val();
    dataTable.reload({
        where: where,
        page: {
            curr: 1
        }
    });
}

// 下拉
function getSelect(id, data, key, attr, attrValue) { //获取下拉框形式的模板
    var select = key
    if (attrValue) {
        select = attrValue
    }
    var xmmcTemplate = "";
    $('#' + id).empty()
    if (data.length > 0) {

        if (attr) {
            for (var i = 0; i < data.length; i++) {
                xmmcTemplate += '<option value="' + data[i][select] + '" id="' + data[i][select] + '" attrData="' + data[i][attr] + '">' + data[i][key] + '</option>'
            }
        } else {
            for (var i = 0; i < data.length; i++) {
                xmmcTemplate += '<option value="' + data[i][select] + '" id="' + data[i][select] + '">' + data[i][key] + '</option>'
            }
        }
    }

    $('#' + id).append(xmmcTemplate)

}
// 学历查询
function searchTableXue(where, dataTable) {
    where.QueryType = $("#searchType").find("option:selected").attr("attrData");
    where.QueryKey = $("#userEducation").find("option:selected").attr("attrData");
    // where.QueryKey = $("#xmcx").val();
    dataTable.reload({
        where: where,
        page: {
            curr: 1
        }
    });
}
// 人员id
function searchTableGxz(where, dataTable) {
    where.QueryType = $("#searchType").find("option:selected").attr("attrData");
    where.QueryKey = $("#userIdsearch").find("option:selected").attr("attrData");
    // where.QueryKey = $("#xmcx").val();
    dataTable.reload({
        where: where,
        page: {
            curr: 1
        }
    });
}
// 部门id
function searchTableBm(where, dataTable, typeid, id) {
    where.QueryType = $("#" + typeid).find("option:selected").attr("attrData");
    where.QueryKey = $("#" + id).find("option:selected").attr("attrData");
    // where.QueryKey = $("#xmcx").val();
    dataTable.reload({
        where: where,
        page: {
            curr: 1
        }
    });
}

function searchTableAll(where, dataTable) {
    where.QueryType = $("#searchType").find("option:selected").attr("attrData");
    // where.QueryKey = $("#userIdsearch").find("option:selected").attr("attrData");
    where.QueryKey = $("#guanjianzi").val();
    dataTable.reload({
        where: where,
        page: {
            curr: 1
        }
    });
}


function getSelectRy(id, data, key, attr, attrValue) { //获取下拉框形式的模板
    var select = key
    if (attrValue) {
        select = attrValue
    }
    var xmmcTemplate = "<option value='' >全部</option>";
    $('#' + id).empty()
    if (data.length > 0) {

        if (attr) {
            for (var i = 0; i < data.length; i++) {
                xmmcTemplate += '<option value="' + data[i][select] + '" id="' + data[i][select] + '" attrData="' + data[i][attr] + '">' + data[i][key] + '</option>'
            }
        } else {
            for (var i = 0; i < data.length; i++) {
                xmmcTemplate += '<option value="' + data[i][select] + '" id="' + data[i][select] + '">' + data[i][key] + '</option>'
            }
        }
    }

    $('#' + id).append(xmmcTemplate)

}


function searchTableGxz(where, dataTable) {
    where.QueryType = $("#searchType").find("option:selected").attr("attrData");
    where.QueryKey = $("#userIdsearch").find("option:selected").attr("attrData");
    // where.QueryKey = $("#xmcx").val();
    dataTable.reload({
        where: where,
        page: {
            curr: 1
        }
    });
}



function getSelectCx(id, data, key, attr, attrValue) { //获取下拉框形式的模板
    var select = key
    if (attrValue) {
        select = attrValue
    }
    var xmmcTemplate = "";
    $('#' + id).empty()
    if (data.length > 0) {
        // console.log("封装下拉请求")
        // console.log(arrt)
        if (attr) {
            for (var i = 0; i < data.length; i++) {
                xmmcTemplate += '<option value="' + data[i][select] + '" id="' + '" attrData="' + data[i][attr] + '">' + data[i][key] + '</option>'
            }
        } else {
            for (var i = 0; i < data.length; i++) {
                xmmcTemplate += '<option value="' + data[i][select] + '" id="' + data[i][select] + '">' + data[i][key] + '</option>'
            }
        }
    }

    $('#' + id).append(xmmcTemplate)

}

//
// 老请求接口
function PostData(ApiUrl, mActionData) {
    var rv;
    var index33;
    try {
        $.ajax({
            //          beforeSend: function(xhr) {
            //              xhr.setRequestHeader("Authorization", "basic" + appId + ";" + token);
            //          },
            async: false,
            type: "post",
            url: httpcom_RSGL, //  /rsgl/Controllers/Hr_WorkExperience/GetListByPage
            data: mActionData,
            dataType: 'json',
            //          contentType: "application/json",
            headers: {
                Authorization: getAuth()
            },
            success: function(returnValue) {
                if (returnValue.code == "0") {
                    rv = returnValue;
                } else {
                    rv = returnValue.msg;
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                rv = XMLHttpRequest.responseText;
                layer.msg(rv);
            }
        })
    } catch (e) {
        rv = e.msg;
    }
    layer.close(index33);
    return rv;
}


function PostDataRS(requestData, xklx, callback) { //异步的ajax请求

    try {
        $.ajax({
            async: true,
            cache: false,
            type: "post",
            url: httpcom + "/xdData/xdDataManage.ashx?XAction=GetDataInterface&XKLX=" + xklx,
            data: requestData, // $('#mkufang').val() 
            dataType: 'json',
            headers: {
                Authorization: getAuth()
            },
            success: function(returnData) {

                if (returnData.success || returnData.msg) {

                    if (callback) {
                        callback(returnData, this)
                    }
                    rv = returnData
                } else {
                    rv = returnData.message;
                    if (rv == "NOTLOGIN") {

                        //                      parent.location.href = BaseUrl + "/login.html"

                    } else {
                        layer.msg(rv)
                    }
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                rv = XMLHttpRequest.responseText;
                layer.msg(rv)

            }
        });
    } catch (e) {

        rv = e.message;
    }
}


function PostDataRSdcWord(requestData, callback) { //异步的ajax请求
    try {
        $.ajax({
            async: true,
            cache: false,
            type: "post",
            url: httpcom + "/xdData/xdDataManage.ashx?XAction=ExtFC&XDLMCID=ExportWordOffice&XKLX=SYRSGL",
            data: requestData, // $('#mkufang').val() 
            dataType: 'json',
            headers: {
                Authorization: getAuth()
            },
            success: function(returnData) {

                if (returnData.success || returnData.msg) {

                    if (callback) {
                        callback(returnData, this)
                    }
                    rv = returnData
                } else {
                    rv = returnData.message;
                    if (rv == "NOTLOGIN") {

                        //                      parent.location.href = BaseUrl + "/login.html"

                    } else {
                        layer.msg(rv)
                    }
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                rv = XMLHttpRequest.responseText;
                layer.msg(rv)

            }
        });
    } catch (e) {

        rv = e.message;
    }
}


function PostDataRSdcOffice(requestData, callback) { //异步的ajax请求

    try {
        $.ajax({
            async: true,
            cache: false,
            type: "post",
            url: httpcom + "/xdData/xdDataManage.ashx?XAction=ExtFC&XDLMCID=ExportExcelOffice&XKLX=SYYHGL",
            data: requestData, // $('#mkufang').val() 
            dataType: 'json',
            headers: {
                Authorization: getAuth()
            },
            success: function(returnData) {

                if (returnData.success || returnData.msg) {

                    if (callback) {
                        callback(returnData, this)
                    }
                    rv = returnData
                } else {
                    rv = returnData.message;
                    if (rv == "NOTLOGIN") {

                        //                      parent.location.href = BaseUrl + "/login.html"

                    } else {
                        layer.msg(rv)
                    }
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                rv = XMLHttpRequest.responseText;
                layer.msg(rv)

            }
        });
    } catch (e) {

        rv = e.message;
    }
}

function PostData_signout(hosts, ApiUrl, mActionType) {
    var rv;
    var index33;
    try {
        $.ajax({
            async: false,
            type: "post",
            // http://192.168.28.251:8333/api/center?XAction=GetUserLimitList&XKLX=syyh&userOnlynum={登录用户的唯一编码}&itemlm=&xmbh={系统标识}
            url: baseUrlImg + ApiUrl + "?XAction=" + mActionType,
            // url: baseUrl + "/xdData/xdDataManage.ashx?XAction=" + mActionType + "&XKLX=" + baseDataBase,
            // data: mActionData,
            dataType: 'json',
            // beforeSend: function () {
            //   index33 = layer.msg('请求中...', {
            //     time: 0,
            //     shade: 0.3
            //   });
            // },
            headers: {
                Authorization: getAuth()
            },
            success: function(returnValue) {
                if (returnValue.success || returnValue.msg) {
                    rv = returnValue
                } else {
                    rv = returnValue.message;
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                rv = XMLHttpRequest.responseText;
                layer.msg(rv);
                // rv = XMLHttpRequest.status + "," + XMLHttpRequest.readyState + "," + textStatus;
                //alert(XMLHttpRequest.status);
                //alert(XMLHttpRequest.readyState);
                //alert(textStatus);
            }

        })
    } catch (e) {
        rv = e.message;
    }
    layer.close(index33);
    return rv;
}


function postData_limit(mActionType, mActionData, callback, _url, async, type) {

    var ip_url = "/api/com/role";
    var ip_url_user = "/wwSYGR/wwData/wwDataManageGR.ashx"; //请求角色部分的地址
    var databaseType = "sykf"; //请求不同数据库

    var url_ = "",
        type_;
    if (_url) {
        url_ = _url;
    } else {
        url_ = ip_url;
    }
    if (type) {
        type_ = "&" + type
    } else {
        type_ = "&sykf=syyh&XKLX=syyh"
    }
    if (mActionType) {
        url_ = url_ + "?XAction=" + mActionType + type_
    }
    var async = false;
    if (async) {
        async = async;
    }
    var rv;
    var index33;
    try {
        $.ajax({
            async: async,
            cache: false,
            type: "post",
            url: baseUrlImg + url_,
            data: mActionData, // $('#mkufang').val()
            dataType: 'json',
            success: function(returnValue) {

                if (callback) {
                    callback(returnValue)
                }
                if (returnValue.msg || returnValue.success) {
                    rv = returnValue
                } else {
                    rv = returnValue.message;

                    // if(rv == "NOTLOGIN") {
                    //   var isQcode = window.location.href.getQuery("ewm"); //是否s手机打开的
                    //   if(isQcode) {
                    //
                    //     window.location.href = window.location.origin + "/kf/login-app.html?nextUrl=" + escape(window.location.href)
                    //   } else {
                    //     parent.location.href = "/kf/login.html"
                    //   }
                    // }
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                rv = XMLHttpRequest.responseText;
            }
        });
    } catch (e) {
        rv = e.message;
    }
    return rv;
}

// 李浩源修改后的提交
// 用户管理通知公告
function PostDatasygr(mActionType, mActionData, callback) {

    var rv;

    try {
        $.ajax({
            async: false,
            cache: false,
            type: "post",
            url: httpcom + "/wwSYGR/wwData/wwDataManageGR.ashx?XAction=" + mActionType + "&XKLX=SYBGGL",
            data: mActionData, // $('#mkufang').val() 
            dataType: 'json',
            headers: {
                Authorization: getToken() //登录后返回sytoken
            },
            success: function(returnValue) {
                callback(returnValue)

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                rv = XMLHttpRequest.responseText;

            }

        })
    } catch (e) {
        rv = e.message;
    }
    return rv;
}


function addDataTjiao(ActionData, formValue) {
    layer.confirm('确定要添加吗？', {
        btn: ['确定', '再想想'] //按钮
    }, function() {
        layer.msg('正在添加,请稍等...', {
            time: 0,
            shade: 0.3,
            success: function(index, layero) {
                setTimeout(function() {
                    PostData_new(ActionData, formValue, function(addData) {
                        if (addData.success == true) {
                            layer.msg('添加完成！', {
                                title: '提示框',
                                icon: 1,
                                time: 800
                            }, function(alertindex) {
                                callBack();

                            });
                        }
                    });

                }, 100)
            }
        })
    }, function(index) {
        layer.close(index);

    })
}

// 删除
function deleLie(ActionData, formValue) {
    layer.confirm('确定要删除吗？', {
        btn: ['确定', '再想想'] //按钮
    }, function() {
        layer.msg('正在添加,请稍等...', {
            time: 0,
            shade: 0.3,
            success: function(index, layero) {
                setTimeout(function() {
                    PostData_new(ActionData, formValue, function(addData) {
                        if (addData.success == true) {
                            layer.msg('删除完成！', {
                                title: '提示框',
                                icon: 1,
                                time: 800
                            }, function(alertindex) {
                                callBack();
                            });
                        }
                    });

                }, 100)
            }
        })
    }, function(index) {
        layer.close(index);
    })
}

//表单添加
function addFormData(ActionData, formValue) {
    layer.confirm('确定要添加吗？', {
        btn: ['确定', '再想想'] //按钮
    }, function() {
        layer.msg('正在添加,请稍等...', {
            time: 0,
            shade: 0.3,
            success: function(index, layero) {
                setTimeout(function() {
                    var addData = PostData(ActionData, formValue);
                    if (addData.success == true) {
                        layer.msg('添加完成！', {
                            title: '提示框',
                            icon: 1,
                            time: 800
                        }, function(alertindex) {
                            callBack();
                        });
                    }
                }, 100)
            }
        })
    }, function(index) {
        layer.close(index);
    })
}


// 李浩源修改后的修改
function editDataXg(ActionData, formValue) {
    layer.confirm('确定要修改吗？', {
        btn: ['确定', '再想想'] //按钮
    }, function() {
        layer.msg('正在修改,请稍等...', {
            time: 0,
            shade: 0.3,
            success: function(index, layero) {
                setTimeout(function() {
                    PostData_new(ActionData, formValue, function(editData) {
                        if (editData.success == true) {
                            layer.msg('修改成功！', {
                                title: '提示框',
                                icon: 1,
                                time: 800
                            }, function(alertindex) {
                                callBack();
                            });
                        }
                    });

                }, 100)
            }
        })
    }, function(index) {
        layer.close(index);
    })
}

// function getNowFormatDate() {
//     var date = new Date();
//     var seperator1 = "-";
//     var seperator2 = ":";
//     var month = date.getMonth() + 1;
//     var strDate = date.getDate();
//     if (month >= 1 && month <= 9) {
//         month = "0" + month;
//     }
//     if (strDate >= 0 && strDate <= 9) {
//         strDate = "0" + strDate;
//     }
//     var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate


//     return currentdate;
// }
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
        " " + date.getHours() + seperator2 + date.getMinutes() +
        seperator2 + date.getSeconds();
    return currentdate;
}

function editFormData(ActionData, formValue) {
    layer.confirm('确定要修改吗？', {
        btn: ['确定', '再想想'] //按钮
    }, function() {
        layer.msg('正在修改,请稍等...', {
            time: 0,
            shade: 0.3,
            success: function(index, layero) {
                setTimeout(function() {
                    var editData = PostData(ActionData, formValue);
                    if (editData.success == true) {
                        layer.msg('修改成功！', {
                            title: '提示框',
                            icon: 1,
                            time: 800
                        }, function(alertindex) {
                            callBack();
                        });
                    }
                }, 100)
            }
        })
    }, function(index) {
        layer.close(index);
    })
}


function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}

// function getCookieName(name) {
//
//   var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
//
//   if (arr = document.cookie.match(reg)) {
//     return decodeURIComponent(arr[2]);
//
//   } else {
//
//     // var isQcode = window.location.href.getQuery("ewm"); //是否手机打开的
//     // if (isQcode) {
//     //   window.location.href = window.location.origin + "/kf/login-app.html?nextUrl=" + escape(window.location.href)
//     // } else {
//     //   parent.location.href = "/kf/login.html"
//     // }
//
//   }
//
// }
function getCookieName(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return decodeURIComponent(arr[2]);

    } else {

    }

}

//写cookies
//这是有设定过期时间的使用示例：
//s20是代表20秒
//h是指小时，如12小时则是：h12
//d是天数，30天则：d30
//setCookie("name","hayden","s20");
function setCookie(name, value, time) {
    var strsec = getsec(time);
    var exp = new Date();
    exp.setTime(exp.getTime() + strsec * 1);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + "; path=/";
}

function getsec(str) {
    // alert(str);
    var str1 = str.substring(1, str.length) * 1;
    var str2 = str.substring(0, 1);
    if (str2 == "s") {
        return str1 * 1000;
    } else if (str2 == "h") {
        return str1 * 60 * 60 * 1000;
    } else if (str2 == "d") {
        return str1 * 24 * 60 * 60 * 1000;
    }
}

//删除cookies
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/" + cookpath
}

function closeWindow() {
    var index543 = parent.layer.getFrameIndex(window.name); //获取窗口索引
    parent.layer.close(index543);
}

//获取类别唯一编号
function curDateTime() {
    var d = new Date();
    var year = d.getFullYear() + "";
    var month = d.getMonth() + 1;
    var date = d.getDate();
    var day = d.getDay();
    var Hours = d.getHours(); //获取当前小时数(0-23)
    var Minutes = d.getMinutes(); //获取当前分钟数(0-59)
    var Seconds = d.getSeconds(); //获取当前秒数(0-59)
    var Milliseconds = d.getMilliseconds();
    var curDateTime = year;
    if (month > 9) {
        curDateTime = curDateTime + month;
    } else {
        curDateTime = curDateTime + "0" + month;
    }
    if (date > 9)
        curDateTime = curDateTime + date;
    else
        curDateTime = curDateTime + "0" + date;
    if (Hours > 9)
        curDateTime = curDateTime + Hours;
    else
        curDateTime = curDateTime + "0" + Hours;
    if (Minutes > 9)
        curDateTime = curDateTime + Minutes;
    else
        curDateTime = curDateTime + "0" + Minutes;
    if (Seconds > 9)
        curDateTime = curDateTime + Seconds;
    else
        curDateTime = curDateTime + "0" + Seconds;
    curDateTime = curDateTime + "0" + Milliseconds;
    //alert(curDateTime);
    //document.getElementByIdx_x("NumberNo").value=curDateTime;
    return curDateTime;
}

function RndNum(n) {
    var rnd = "";
    for (var i = 0; i < n; i++) {
        rnd += Math.floor(Math.random() * 10);
    }
    return rnd;
}

function getTimeAndRandom() {
    return curDateTime() + RndNum(2);
}

function getonlynum() {
    return "SY" + curDateTime() + RndNum(4);
}

function getTimeAndRandomType(type) {
    return type + "_" + curDateTime() + RndNum(2);
}

var QueryKeyColor = (keyValue, idName) => {

        var dd = $('#' + idName).val().split(" ");


        if (keyValue != null) {
            for (var i = 0; i < dd.length; i++) {
                keyValue = keyValue.replace(dd[i], "<span style='color:red;'>" + dd[i] + "</span>");
            }
        }

        return keyValue;
    }
    /**
     * @作者: 张黎博
     * @Git: zlb
     * @函数说明: 查询变红
     * @函数: QueryKeyColorsc
     * @参数: keyValue, idName, sctext
     * @参数值说明: 变红字符串，input框id，查询字符串
     * @返回值: 
     */
var QueryKeyColorsc = (keyValue, idName, sctext) => {
        // console.log(keyValue)
        // console.log(idName)
        let dt = []
        if (idName) {
            // console.log("idName")
            dt = ($('#' + idName).val() || "").split(" ");
        } else if (sctext) {
            // console.log("sctext")
            if ($('#' + sctext).val()) {
                dt = ($("#" + sctext + " option:checked").text() || "").split(" ");
            }
        }
        // console.log(dt)
        if (keyValue != null) {
            for (var i = 0; i < dt.length; i++) {
                keyValue = keyValue.replace(dt[i], "<span style='color:red;'>" + dt[i] + "</span>");
                // console.log(keyValue)
            }
        }
        return keyValue;
    }
    // function QueryKeyColor(field,idName) {
    //     var dd = $('#'+idName).val().split(" ");
    //     if (field != null) {
    //         for (var i = 0; i < dd.length; i++) {
    //             field = field.replace(dd[i], "<span style='color:red;'>" + dd[i] + "</span>");
    //         }
    //     }

//     return field;
// }

// 搜索
var searchStart = (data, searName, scopeSelect) => {
    var searchStr = "";
    if (data == "") {
        var select = document.getElementById("searchType");

        searchStr += "and ("
        for (let i = 1; i < select.length; i++) {
            searchStr += select[i].value + " like '%" + $("#" + searName).val() + "%' ";

            if (i != select.length - 1) {
                searchStr += " or ";
            }
        }
        searchStr += ")";
    } else {
        if (searName == "antistop") {
            searchStr += "and " + data + " like '%" + $("#" + searName).val() + "%' "
        } else {
            if ($("#" + searName).val() == '') {
                searchStr += ""
            } else {
                if (scopeSelect) {
                    var getTime = $("#" + searName).val();
                    searchStr += "and " + data + " >='" + getTime.substring(0, 10) + "'and " + data + " <='" + getTime.substring(13, 22) + "'";
                } else {
                    searchStr += "and " + data + " = '" + $("#" + searName).val() + "'"
                }
            }

        }
    }
    searchModel(searchStr);
}

// sql 语句 返回
var searchStartsql = (data, searName, scopeSelect) => {
    var searchStr = "";
    if (data == "") {
        var select = document.getElementById("searchType");

        searchStr += "and ("
        for (let i = 1; i < select.length; i++) {
            searchStr += select[i].value + " like '%" + $("#" + searName).val() + "%' ";

            if (i != select.length - 1) {
                searchStr += " or ";
            }
        }
        searchStr += ")";
    } else {
        if (searName == "antistop") {
            searchStr += "and " + data + " like '%" + $("#" + searName).val() + "%' "
        } else {
            if ($("#" + searName).val() == '') {
                searchStr += ""
            } else {
                if (scopeSelect) {
                    var getTime = $("#" + searName).val();
                    searchStr += "and " + data + " >='" + getTime.substring(0, 10) + "'and " + data + " <='" + getTime.substring(13, 22) + "'";
                } else {
                    searchStr += "and " + data + " = '" + $("#" + searName).val() + "'"
                }
            }

        }
    }
    return searchStr;
}

var searchModel = (searchStr) => {
    dataTable.reload({
        where: { //设定异步数据接口的额外参数，任意设
            QueryText: searchStr
        },
        page: {
            curr: 1 //重新从第 1 页开始
        }
    });
}

function duplicateChecking(urlpath, data) {
    var data;
    data = PostData(urlpath, data);

    if (data.data) {
        return false;
    } else {
        return true;
    }
    // 之后去掉

}

// 获取页面名称 
function pageName() {
    var strUrl = location.href;
    var arrUrl = strUrl.split("/");
    var strPage = arrUrl[arrUrl.length - 1];
    return strPage;
}

if (pageName() != "login.html") {
    if (!getCookie("rsgl_userid")) {
        //      top.location.href =  "/login.html";
    }
}

//添加需要的js文件,要加到最下边，否则上边的方法不会调用
// var needLimit = true;
// if(window.location.hostname == 'localhost'){
//   needLimit ? $(document).append('<script type="text/javascript" src="/js/SysJS/limit.js"></script>') : ""; //权限的js
// }else{
//   needLimit ? $(document).append('<script type="text/javascript" src="/rsgl/js/SysJS/limit.js"></script>') : ""; //权限的js
// }

var changeHolderVal = (data, changeName, arrchangeName) => {
    for (let i = 0; i < data.length; i++) {
        if (changeName == 'userId' || changeName == "approvalUserId") {
            data[i][changeName] = getUsefName(data[i][changeName])
        } else {
            data[i][changeName] = returnVal(arrchangeName, data[i][changeName]);
        }

    }
    return data;
}

var changeHolderValstr = (data, changeName, arrchangeName) => {
    for (let i = 0; i < data.length; i++) {
        if (changeName == 'userId' || changeName == "approvalUserId") {
            data[i][changeName] = getUsefName(data[i][changeName])
        } else {
            data[i][changeName] = returnVal(arrchangeName, Number(data[i][changeName]));
        }

    }
    return data;
}

var changestrusername = (data, changeName) => {
    for (let i = 0; i < data.length; i++) {
        var userstr = data[i][changeName];
        var arr = userstr.split(',');
        data[i][changeName] = "";
        for (let s = 0; s < arr.length; s++) {
            data[i][changeName] += getUsefName(arr[s]) + ",";
        }
        var namestr = data[i][changeName];
        data[i][changeName] = namestr.substr(0, namestr.length - 1);
    }
    return data;
}

function limitsChange() {
    // 没有
    if (!limitConfig("storeLimt_rsgl", 2)) {
        $(".changethisData").addClass("layui-hide");
    }

    if (!limitConfig("storeLimt_rsgl", 3)) {
        $(".delthisData").addClass("layui-hide");
    }

    if (!limitConfig("storeLimt_rsgl", 4)) {
        $(".layui-table-tool-self>div").eq(1).addClass("layui-hide");
    }

    if (!limitConfig("storeLimt_rsgl", 2) && !limitConfig("storeLimt_rsgl", 3)) {
        $(".noData").removeClass("layui-hide");
    }
}

function delcookNouserId() {
    delCookie("httpTrue");
    delCookie("paperType");
    delCookie("politicalOutlook");
    delCookie("transferType");
    delCookie("rewardProject");
    delCookie("Projects");
    delCookie("trainChannel");
    delCookie("trainSfape");
    delCookie("state");
    delCookie("getMode");
    delCookie("education");
    delCookie("titleName");
    delCookie("workYears");
    delCookie("careType");
    delCookie("licenceType");
    // delCookie("bloodType");
    delCookie("nation");
}

var posothertable = (ApiUrl, mActionData) => {
    console.log(mActionData);
    var rv;
    var index33;
    try {
        $.ajax({
            beforeSend: function(xhr, mActionData) {
                xhr.setRequestHeader("Authorization", "basic" + appId + ";" + token);
            },
            async: false,
            type: "post",
            url: baseUrlImg + ApiUrl, //  /rsgl/Controllers/Hr_WorkExperience/GetListByPage
            data: mActionData,
            dataType: 'json',
            headers: {
                Authorization: getAuth()
            },
            success: function(returnValue) {
                if (returnValue.code == "0") {
                    rv = returnValue;
                } else {
                    rv = returnValue.msg;
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                rv = XMLHttpRequest.responseText;
                layer.msg(rv);
            }
        })
    } catch (e) {
        rv = e.msg;
    }
    layer.close(index33);
    return rv;
}

function getSelectNoDefine(id, data, key, attr, attrValue) { //没有默认的数据
    var select = key
    if (attrValue) {
        select = attrValue
    }
    var xmmcTemplate = "";
    $('#' + id).empty()
    if (data.length > 0) {
        if (attr) {
            for (var i = 0; i < data.length; i++) {
                xmmcTemplate += '<option value="' + data[i][select] + '" id="' + data[i][select] + '" attrData="' + data[i][attr] + '">' + data[i][key] + '</option>'
            }
        } else {
            for (var i = 0; i < data.length; i++) {
                xmmcTemplate += '<option value="' + data[i][select] + '" id="' + data[i][select] + '">' + data[i][key] + '</option>'
            }
        }

    }

    $('#' + id).append(xmmcTemplate);
    if (form) {
        form.render("select")

    }
}

// 下拉
function getSelectval(id, data, key, attr, attrValue) { //获取下拉框形式的模板
    var select = key
    if (attrValue) {
        select = attrValue
    }
    var xmmcTemplate = "";
    $('#' + id).empty()
    if (data.length > 0) {
        // console.log("封装下拉请求")
        // console.log(arrt)
        if (attr) {
            for (var i = 0; i < data.length; i++) {
                xmmcTemplate += '<option value="' + data[i][attr] + '" id="' + data[i][select] + '" attrData="' + data[i][attr] + '">' + data[i][key] + '</option>'
            }
        } else {
            for (var i = 0; i < data.length; i++) {
                xmmcTemplate += '<option value="' + data[i][select] + '" id="' + data[i][select] + '">' + data[i][key] + '</option>'
            }
        }
    }

    $('#' + id).append(xmmcTemplate)

}

// 下拉（全部）
function getSelectAllval(id, data, key, attr, attrValue) {
    var select = key
    if (attrValue) {
        select = attrValue
    }
    var xmmcTemplate = "<option value=''>全部</option>";
    $('#' + id).empty()
    if (data.length > 0) {
        // console.log("封装下拉请求")
        // console.log(arrt)
        if (attr) {
            for (var i = 0; i < data.length; i++) {
                xmmcTemplate += '<option value="' + data[i][attr] + '" id="' + data[i][select] + '" attrData="' + data[i][attr] + '">' + data[i][key] + '</option>'
            }
        } else {
            for (var i = 0; i < data.length; i++) {
                xmmcTemplate += '<option value="' + data[i][select] + '" id="' + data[i][select] + '">' + data[i][key] + '</option>'
            }
        }
    }

    $('#' + id).append(xmmcTemplate)

}

function getSelectDefined(id, data, key, attr, attrValue) { //获取默认为（请选择）的下拉框形式的模板
    var select = key
    if (attrValue) {
        select = attrValue
    }
    var xmmcTemplate = "<option value=''>请选择</option>";

    $('#' + id).empty()
    if (data.length > 0) {
        //		data.reverse()
        if (attr) {
            for (var i = 0; i < data.length; i++) {

                xmmcTemplate += '<option value="' + data[i][attr] + '" id="' + data[i][select] + '" attrData="' + data[i][attr] + '">' + data[i][key] + '</option>'
            }
        } else {
            for (var i = 0; i < data.length; i++) {
                xmmcTemplate += '<option value="' + data[i][select] + '" id="' + data[i][select] + '">' + data[i][key] + '</option>'
            }
        }

    }

    $('#' + id).append(xmmcTemplate)
}
//增加attrData
function getSelectattrData(id, data, key, attr, attrValue) { //获取默认为（请选择）的下拉框形式的模板
    var select = key
    if (attrValue) {
        select = attrValue
    }
    var xmmcTemplate = "<option value=''>请选择</option>";

    $('#' + id).empty()
    if (data.length > 0) {
        //		data.reverse()
        if (attr) {
            for (var i = 0; i < data.length; i++) {

                xmmcTemplate += '<option value="' + data[i][select] + '" id="' + data[i][select] + '" attrData="' + data[i][attr] + '">' + data[i][key] + '</option>'
            }
        } else {
            for (var i = 0; i < data.length; i++) {
                xmmcTemplate += '<option value="' + data[i][select] + '" id="' + data[i][select] + '">' + data[i][key] + '</option>'
            }
        }

    }

    $('#' + id).append(xmmcTemplate)
}
//弹出窗口新页面
function openWindow(type, url, title, w, h, anim, callback) {
    let maxmin = true;
    if (title == null || title == '') {
        title = false;
        maxmin = false;
    };
    if (url == null || url == '') {
        url = "/404.html";
    };
    if (w == null || w == '') {
        w = ($(window).width() - 200);
    };
    if (h == null || h == '') {
        h = ($(window).height() - 100);
    };
    if (anim == null || anim == "") {
        anim = 5
    }
    var layerPage = layer.open({
        type: type * 1,
        area: [w + 'px', h + 'px'],
        fix: false, //不固定
        maxmin: maxmin,
        shade: 0.4,
        title: title,
        content: url,
        anim: anim,
        success: function(layero) {},
        end: function() {

        },
        cancel: callback

    });
    return layerPage
}

function submitDataTip(tip, callback, data) { //没有验证码的弹框	
    layer.confirm(tip, {
            btn: ['确定', '再想想'] //按钮
        },
        function() //确定
        {
            var index000002 = layer.msg('正在提交，请稍等...', {
                icon: 1,
                time: 500,
                success: function() {
                    layer.close(index000002)
                    callback(data)

                }
            });
        }

    );

}


//用户退出
function signOut() {
    clearAllCookie();
    store.clear();
    layer.msg('成功退出。', {
        icon: 1,
        time: 1500 //2秒关闭（如果不配置，默认是3秒）
    }, function() {
        //do something
        window.parent.location.href = baseUrl + "/login.html";
    });
}


//清除所有cookie函数  
function clearAllCookie() {
    var exp = new Date();
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;) {
            document.cookie = keys[i] + "=0;expires=" + exp.toGMTString() + ";path=/"

        }

        //          document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
}


/**
 * @作者: 张黎博
 * @Git: zlb
 * @函数说明: 上传附件
 * @函数:  uploadFile(id, showId)
 * @参数: id, showId
 * @参数值说明: 上传按钮id ， 显示图片DIVid
 * @返回值: 
 */
function uploadFileRS(id, showId, learnType) { //上传了直接回显的上传
    // console.log(learnType)
    var loading, files = []
    layui.use('upload', function() {
        var upload = layui.upload;
        //执行实例
        var uploadInst = upload.render({
            elem: '#' + id, //绑定元素				
            url: ipUploadUrl, //上传接口		
            accept: 'file',
            auto: true,
            multiple: true,
            number: 10,
            // choose: function(obj) {
            // console.log(obj)
            // },
            before: function(obj) {
                //files = obj.pushFile();
                loading = layer.msg("正在上传...", {
                        time: 3000
                    })
                    //预读本地文件，如果是多文件，则会遍历。(不支持ie8/9)
                obj.preview(function(index, file, result) {
                    // console.log(index);
                    files.push(index);
                    // console.log(files);
                });
            },
            done: function(res, index, upload) {
                // console.log(res)
                // console.log(index)
                // console.log(upload)
                //上传完毕回调
                if (res.filepath) {
                    // console.log(res)
                    //回显图片
                    // showImg(showId, res.filepath, res.filename, "new")
                    let fh = res.filepath.substring(res.filepath.lastIndexOf('.') + 1);
                    // console.log(h);
                    switch (fh.toLowerCase()) {
                        case "zip":
                        case "rar":
                        case "z7":
                            showImg(showId, '../../../../img/ysb.jpg', res.filename, res.filepath, "new")
                            break;
                        case "doc":
                        case "docx":
                        case "xls":
                        case "xlsx":
                            showImg(showId, '../../../../img/wordimg.jpg', res.filename, res.filepath, "new")
                            break;
                        case "pdf":
                            showImg(showId, '../../../../img/PDFimg.jpg', res.filename, res.filepath, "new")
                            break;
                        case "png":
                        case "jpg":
                        case "bmp":
                        case "gif":
                        case "jpeg":
                        case "tiff":
                        case "psd":
                        case "svg":
                            showImg(showId, httpcom + res.filepath, res.filename, res.filepath, "new")
                            break;
                        case "3gp":
                        case "asf":
                        case "avi":
                        case "flv":
                        case "mkv":
                        case "mov":
                        case "mp4":
                        case "mpeg":
                        case "n avi":
                        case "rmvb":
                        case "wmv":
                        case "swf":
                        case "mp5":
                            showImg(showId, '../../../../img/MP4img.jpg', res.filename, res.filepath, "new")
                            break;
                        default:
                    }
                } else {
                    layer.msg('当前格式暂不支持上传', {
                        icon: 2,
                        time: 2000,
                        anim: 5
                    });
                }
                layer.close(loading)

            },
            error: function() {
                //请求异常回调
            }
        });
    });

}

/**
 * @函数: showImg(id, src, name, url, type, imgId)
 * @参数: id, src, name, url, type, imgId
 * @参数值: 显示图片DIVid，显示路径，名字，上传后路径，类型（new或old），图片id；
 * @返回值: 

 */
function showImg(id, src, name, url, type, imgId) { //给服务器上传图片待到服务器返回地址之后回显这个图片

    let html = '<li class="picture-moudle1 layui-col-xs12 layui-col-sm12 layui-col-md6 layui-col-lg6" type="' + type + '">' +
        '<i class="delete" onclick="deleteFileImg(this)" type="' + type + '" imgid="' + imgId + '"></i>' +
        '<div>' +
        '<div class="picture-moudle-img">' +
        '<img  onclick=lookPicx("' + url + '") src=' + src.replace("ss.", ".") + ' data="' + url + '" alt="" />' +
        '</div>' +
        '<div class="picture-moudle1-text">' +
        // '<p class="imgName"  title="点击下载文件"  onclick=DownFileImg("' + url + '","' + name + '")>' + name + '</p>' +
        '<p class="imgName"  title="点击下载文件" ><a href="' + httpcom + url + '" download="' + name + '">' + name + '</a></p>' +
        '</div>' +
        '</div>' +
        '</li>'
    $("#" + id).append(html)
}
/**
 * @函数: lookPicx(imgSrc)
 * @参数:imgSrc 
 * @参数值: 图片路径
 * @返回值: 
 */
function lookPicx(imgSrc) {

    ShowVideo(false, imgSrc, '90%', '90%', 1);

}

/**
 * @函数: howVideo(mtitle, mpath, w, h, clobtn)
 * @参数: mtitle, mpath, w, h, clobtn
 * @参数值: 弹框名字，显示路径，弹框宽，弹框高，弹框显示按钮类型。
 * @返回值: 
 */
function ShowVideo(mtitle, mpath, w, h, clobtn) {
    // console.log(w)

    if (mpath == '') {
        layer.msg('未找到文件');
    } else {
        var yl = false;

        let r = mpath.substring(mpath.lastIndexOf('.') + 1);
        switch (r.toLowerCase()) {
            case "zip":
            case "rar":
            case "z7":
                yl = false;
                // layer.msg('当前格式暂不支持预览');
                break;
            case "doc":
            case "docx":
            case "txt":
            case "xls":
            case "xlsx":
                let mpaths = mpath.substring(0, mpath.lastIndexOf(".") + 1)
                url = basePathImg + '/pdfViewer/pdfView.html?path=' + mpaths + 'pdf';
                yl = true;
                break;
            case "pdf":
                //              url = '/widget/pdfD/ShowPDF.html?path=' + mpath;
                url = basePathImg + '/pdfViewer/pdfView.html?path=' + mpath;
                yl = true;
                break;
            case "png":
            case "jpg":
            case "bmp":
            case "gif":
            case "jpeg":
            case "tiff":
            case "psd":
            case "svg":
                url = basePathImg + '/imgTools/ShowImage.html?path=' + mpath.replace("ss.", ".");
                yl = true;
                break;
            case "3gp":
            case "asf":
            case "avi":
            case "flv":
            case "mkv":
            case "mov":
            case "mp4":
            case "mpeg":
            case "n avi":
            case "rmvb":
            case "wmv":
            case "swf":
            case "mp5":
                url = basePathImg + "/video/ShowVideo.html?path=" + mpath;
                yl = true;
                break;
            default:
                yl = false;

        }
        if (yl) {
            if (clobtn) {
                clobtn = 1;
            } else {
                clobtn = clobtn;
            }
            var index = layer.open({
                type: 2,
                //      maxmin: true,
                content: url,
                area: [w, h],
                // area: [w + "px", h + "px"],
                title: mtitle,
                closeBtn: clobtn,
                shadeClose: true
            });
        } else {
            layer.msg('当前格式暂不支持预览', {
                icon: 2,
                time: 2000,
                anim: 5
            });
        }

    }

}

/**
 * @函数: xghx(showId, hxurl,  imgId)
 * @参数: showId, hxurl, imgId
 * @参数值: 显示图片DIVid，回显图片名字，回显图片id；
 * @返回值: 
 */
function xghx(showId, hxurl, hxname, imgId) {
    if (hxurl) {
        let hxurls = hxurl.split(',')
            // let hxnames = hxname.split(',')
            // console.log(hxurls)
            // console.log(hxnames)
        for (var i = 0; i < hxurls.length; i++) {
            let fh = hxurls[i].substring(hxurls[i].lastIndexOf('.') + 1);
            // console.log(h);
            switch (fh.toLowerCase()) {
                case "zip":
                case "rar":
                case "z7":
                    showImg(showId, '../../../../img/ysb.jpg', hxurls[i].substring(hxurls[i].lastIndexOf("/") + 1), hxurls[i], "old", imgId)
                    break;
                case "doc":
                case "docx":
                case "txt":
                case "xls":
                case "xlsx":
                    showImg(showId, '../../../../img/wordimg.jpg', hxurls[i].substring(hxurls[i].lastIndexOf("/") + 1), hxurls[i], "old", imgId)
                    break;
                case "pdf":
                    showImg(showId, '../../../../img/PDFimg.jpg', hxurls[i].substring(hxurls[i].lastIndexOf("/") + 1), hxurls[i], "old", imgId)
                    break;
                case "png":
                case "jpg":
                case "bmp":
                case "gif":
                case "jpeg":
                case "tiff":
                case "psd":
                case "svg":
                    showImg(showId, httpcom + hxurls[i], hxurls[i].substring(hxurls[i].lastIndexOf("/") + 1), hxurls[i], "old", imgId)
                    break;
                case "3gp":
                case "asf":
                case "avi":
                case "flv":
                case "mkv":
                case "mov":
                case "mp4":
                case "mpeg":
                case "navi":
                case "rmvb":
                case "wmv":
                case "swf":
                case "mp5":
                    showImg(showId, '../../../../img/MP4img.jpg', hxurls[i].substring(hxurls[i].lastIndexOf("/") + 1), hxurls[i], "old", imgId)
                    break;
                default:

            }
        }
    }
}

/**
 * @函数: submitPicture(id)
 * @参数: id
 * @参数值: 放所有图片的DIVid
 * @返回值: 
 */
function submitPicture(id) {
    var imgData = {
            imgPath: "",
            imgName: "",
            imgId: "",
            imgType: ""
        }
        // [type='new']
    if ($(".picture-moudle1").length > 0) {
        $("#" + id).find(".picture-moudle1").each(function(key2, val2) {
            imgData.imgPath += $(val2).find(".picture-moudle-img img").attr("data") + ",";
            imgData.imgName += $(val2).find(".picture-moudle1-text p").text() + ",";
            imgData.imgId += $(val2).find(".delete").attr("imgid") + ",";
            imgData.imgType += $(val2).find(".delete").attr("type") + ",";
        })
    }
    console.log(imgData)
    return imgData

};

// 查看图片
function seeImg(id, src, name, url, type, imgId) { //给服务器上传图片待到服务器返回地址之后回显这个图片
    console.log(src)
    console.log(name)
    let html = '<li class="picture-moudle1 layui-col-xs12 layui-col-sm12 layui-col-md6 layui-col-lg6" type="' + type + '">' +
        '<div>' +
        '<div class="picture-moudle-img">' +
        '<img onclick=lookPicx("' + url + '") src=' + src.replace("ss.", ".") + ' data="' + src + '" alt="" />' +
        '</div>' +
        '<div class="picture-moudle1-text">' +
        '<p class="imgName">' + name + '</p>' +

        '</div>' +
        '</div>' +
        '</li>'

    $("#" + id).append(html)
}

/**
 * @函数: xghx(showId, hxurl, hxname, imgId)
 * @参数: showId, hxurl, hxname, imgId
 * @参数值: 显示图片DIVid，回显图片名字，回显图片id；
 * @返回值: 
 */
function ckxghx(showId, hxurl, hxname, imgId) {
    if (hxurl) {
        console.log(hxurl)
        let hxurls = hxurl.split(',')
            // let hxnames = hxname.split(',')
            // console.log(hxurls)
            // console.log(hxnames)
        for (var i = 0; i < hxurls.length; i++) {
            let fh = hxurls[i].substring(hxurls[i].lastIndexOf('.') + 1);
            // console.log(h);
            switch (fh.toLowerCase()) {
                case "zip":
                case "rar":
                case "z7":
                    seeImg(showId, '../../../../img/ysb.jpg', hxurls[i].substring(hxurls[i].lastIndexOf('/') + 1), hxurls[i], "old", imgId)
                    break;
                case "doc":
                case "docx":
                case "txt":
                case "xls":
                case "xlsx":
                    seeImg(showId, '../../../../img/wordimg.jpg', hxurls[i].substring(hxurls[i].lastIndexOf('/') + 1), hxurls[i], "old", imgId)
                    break;
                case "pdf":
                    seeImg(showId, '../../../../img/PDFimg.jpg', hxurls[i].substring(hxurls[i].lastIndexOf('/') + 1), hxurls[i], "old", imgId)
                    break;
                case "png":
                case "jpg":
                case "bmp":
                case "gif":
                case "jpeg":
                case "tiff":
                case "psd":
                case "svg":
                    seeImg(showId, httpcom + hxurls[i], hxurls[i].substring(hxurls[i].lastIndexOf('/') + 1), hxurls[i], "old", imgId)
                    break;
                case "3gp":
                case "asf":
                case "avi":
                case "flv":
                case "mkv":
                case "mov":
                case "mp4":
                case "mpeg":
                case "navi":
                case "rmvb":
                case "wmv":
                case "swf":
                case "mp5":
                    seeImg(showId, '../../../../img/MP4img.jpg', hxurls[i].substring(hxurls[i].lastIndexOf('/') + 1), hxurls[i], "old", imgId)
                    break;
                default:

            }
        }
    }
}


//删除图片
function deleteFileImg(that) {
    console.log(that)
    submitDataTip("确定要删除吗?", function() {
        //从当前表单删除图片
        // if ($(that).attr("type") == "old") { //之前添加的图片,需要从表里删除
        //     PostData({
        //         XDLMCID: "4000",
        //         XDLMSID: "DYBH20181211183604364714",
        //         XDLMROWID: $(that).attr("imgid")
        //     }, function(returnData) {
        //         if (returnData.success) {
        //             $(that).parents(".picture-moudle").remove()
        //         }
        //     })
        // } else {
        $(that).parents(".picture-moudle1").remove()
            // }
    })

}