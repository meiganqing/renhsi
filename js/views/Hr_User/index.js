var $, form, layer, laydate, element, storeLimt_rsgl;
layui.config({
    base: '../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'jquery', 'form', 'laydate', 'table', 'element'], function() {
    $ = layui.$;
    form = layui.form;
    layer = layui.layer;
    laydate = layui.laydate;
    element = layui.element;
    storeLimt_rsgl = {};

    $('#userName').html(getCookie('rsgl_name'));
    // $("#index_leftLogo").css({
    //     "background-image": "url(" + getSelectInfo("index_leftLogo", 1) + ")",
    //     "top": "69px",
    //     "background-repeat": "no-repeat",
    //     "background-position": "50% 100%",
    //     "background-color": "#4168ba!important"
    // });

    // $("#indexbj").css({
    //     "background": "url(" + getSelectInfo("sys_indexbg", 1) + ")",
    //     "height": "70px",
    //     "line-height": "70px"
    // });

    // $("#index_leftbottom").attr("src", getSelectInfo("index_left_bottom", 1))

    // $("#index_logo").attr("src", getSelectInfo("index_logo", 1))

    // 获取配置项
    PostDataRS({
        XDLMCID: "1001",
        XDLMSID: "DYBH20191024201400140225251"
    }, "SYRSGL", function(data) {
        if (data.success && data.rows.length > 0) {
            for (let i in data.rows) {
                if (data.rows[i].SysName == "使用单位") {
                    $("#copyright_name_value").text(data.rows[i].SysValue)
                    console.log(data.rows[i].SysValue)
                }
                if (data.rows[i].SysName == "技术支持") {
                    $("#support_name_value").text(data.rows[i].SysValue)
                    console.log(data.rows[i].SysValue)
                }
                // if (data.rows[i].SysName == "LOGO") {
                //     $("#index_logo").attr("src", data.rows[i].SysValue)
                //     console.log(data.rows[i].SysValue)
                // }
            }
        }
    })
    $("#signOut").click(function() {
        // delCookie('rsgl_userid');
        // delCookie('rsgl_name');
        // delCookie('rsgl_level');
        // delCookie('rsgl_onlynum');
        // delcookNouserId();
        // window.location.href = "../../login.html";
        signOut()
    });


    setLimt("rsgl", "", function(data) {
        if (data.msg && data.userlimit.length > 0) {
            let rsglrolearr = []
                //先取到数组里重复的数据，权限高级的优先
                //1)将重复的数据都取出来
            var repeatArry = [];
            //2）如果当前的数据在重复的数组里，不断叠加替换

            for (var i = 0; i < data.userlimit.length; i++) {

                if (repeatArry.indexOf(data.userlimit[i].itemNum) == -1) { //没有重复的
                    repeatArry.push(data.userlimit[i].itemNum)

                    $("#" + data.userlimit[i].itemNum).showDiv(String(data.userlimit[i].qx))

                    storeLimt_rsgl[data.userlimit[i].itemNum] = String(data.userlimit[i].qx)
                } else { //重复的，叠加存值

                    var olditemNum = storeLimt_rsgl[data.userlimit[i].itemNum].split(""); //之前的值
                    var newitemNum = String(data.userlimit[i].qx).split("")

                    for (var k = 0; k < newitemNum.length; k++) {
                        if (newitemNum[k] == "1") {
                            olditemNum[k] = "1"
                        }
                    }

                    storeLimt_rsgl[data.userlimit[i].itemNum] = olditemNum.join("")
                }
                if (rsglrolearr.indexOf(data.userlimit[i].rolename) == -1) {
                    rsglrolearr.push(data.userlimit[i].rolename)
                }

            }
            store.set("storeLimt_rsgl", storeLimt_rsgl);
            console.log(rsglrolearr)
                // for (var k in storeLimt_rsgl) {
                //     console.log(String(storeLimt_rsgl[k]))
                //     $("#" + k).showDiv(String(storeLimt_rsgl[k]))
                // }
                // console.log(kyxxrolearr)

            //  if (kyxxrolearr.includes('科研管理员')) {
            //     // console.log(data.userlimit[0].rolename)
            //     $("#xsxxglId").removeClass("layui-hide") //学术信息管理
            //     $("#tjglid").removeClass("layui-hide") //统计管理
            //     $("#peglId").removeClass("layui-hide") //配置管理
            //     $("#hszId").removeClass("layui-hide") //回收站

            // } else {
            //     $("#xsxxglId").removeClass("layui-hide") //学术信息管理
            //     $("#tjglid").removeClass("layui-hide") //统计管理
            //     $("#hszId").removeClass("layui-hide") //回收站
            //     $("#grxxId").removeClass("layui-hide")
            //     $("#HMxs").attr("src", "./home.html")

            // }
            indexlimit("storeLimt_rsgl")
        }
    });
    console.log(store.get("storeLimt_rsgl"));
    // $(".item-nav").each(function(key, val) {

    //     $(val).find("dd").each(function(key1, val1) {
    //         if ($(val1).css('display') == "block") {

    //             $(val).removeClass("layui-hide")

    //         }
    //     })

    // })
});