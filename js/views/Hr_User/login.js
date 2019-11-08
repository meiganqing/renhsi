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
    base: 'src/layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'user', 'jquery'], function() {
    var setter = layui.setter,
        admin = layui.admin,
        form = layui.form,
        router = layui.router(),
        search = router.search;
    $ = layui.$;

    where = {
        // XDLMmLoginName: $('#mUserName').val(),
        // XDLMPassword: $('#Password').val(),
        // XDLMCID:'7000',
        // XDLMSID:'DYBH2019100817082905540958',
        // XDLMTID:'7001',
        // XKLX:'SYYHGL',
        // XKLX_APPID:'92837277'
    };

    form.on('submit(LAY-user-login-submit)', function(data) {
        console.log("kkk")
        console.log(data)
        data.field.XDLMmLoginName = $("#mUserName").val();
        data.field.XDLMPassword = $("#Password").val();
        data.field.XDLMCID = '7000',
            data.field.XDLMSID = 'DYBH2019100817082905540958',
            data.field.XDLMTID = '7001',
            data.field.XKLX = 'SYYHGL',
            data.field.XKLX_APPID = '92837277'
        login(data.field)
    })
});

function login(where) {
    PostDataLogin(where, function(data) {
        if (data.message == "登陆成功") {
            console.log("登陆成功")
            console.log(data)
                // 人事原本cookie存储
            setCookie("rsgl_userid", data.data[0].id, "d7") 
            setCookie("rsgl_name", data.data[0].mLoginName, "d7")
            setCookie('rsgl_level', data.data[0].mUserLevel, 'h8');
            setCookie('rsgl_onlynum', data.data[0].onlynum, 'h8'); 
            // cookie新存储
            setCookie("mUserID", data.data[0].id, "d1")
            setCookie("mDepart", data.data[0].mDepart, "d1")
            setCookie("mUserLevel", data.data[0].mUserLevel, "d1")
            setCookie("mUserName", data.data[0].mUserName, "d1") //名字
            setCookie("mUserOnlyNum", data.data[0].onlynum, "d1") //唯一编码    

            //
            localStorage.setItem("mUserName", data.data[0].mUserName);
            localStorage.setItem("sytoken", data.sytoken)
            layer.msg(data.message);

            window.location.href = "src/views/index.html";
        } else {
            layer.msg(data.message)
        }

    });

}



// getconfigInfo();
function getconfigInfo() {
    console.log(getSelectInfo("sys_login")); // 登录前景图

    console.log(getSelectInfo("sys_loginbg")); // 登录背景图

    $("#loginlogotxt").html(getSelectInfo("sys_loginlogotxt", 1)); // 登录 logo 文字

    $("#logintechnique").html(getSelectInfo("sys_logintechnique", 1)); // 技术支持

    $("#loginlogo").attr("src", getSelectInfo("sys_loginlogo", 1)); // logo

    $("#dlybj").attr("src", getSelectInfo("sys_loginbg", 1)); // l登录页背景图
}

document.body.addEventListener('keyup', function(e) {
    if (e.keyCode == '13') {
        $("#loginBtn").click();
    }
});

function getloginId(Uid) {
    let data = {
        QueryText: 'and remarks =' + Uid,
        limit: 10,
        page: 1
    }
    var rv;
    $.ajax({
        beforeSend: function(xhr, data) {
            xhr.setRequestHeader("Authorization", "basic" + appId + ";" + token);
        },
        async: false,
        type: "post",
        url: baseUrl + "/Controllers/Hr_User/GetListByPage", //  /rsgl/Controllers/Hr_WorkExperience/GetListByPage
        data: data,
        dataType: 'json',
        success: function(returnValue) {
            if (returnValue.code == "0") {
                rv = returnValue;
            } else {
                rv = null;
            }
        },
    })
    return rv;
}