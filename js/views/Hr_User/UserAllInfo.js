/*
 * @陕西唐远
 * @文件名: UserAllInfo.js
 * @作者: 张黎博
 * @Git: zlb
 * @Date: 2019-10-24 12:04:01
 * @描述: 个人相关信息列表
 * @版本: 1.00
 * @修改历史纪录: （版本 修改时间 修改人 修改内容）
 * @记录:  1 20191030 zlb 更换方法
 */
var $, laydate, form, layer, admin, element, treeSelect, pxjl;
layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'form', 'element', 'layer', 'laydate', 'treeSelect'], function() {
    admin = layui.admin;
    form = layui.form;
    element = layui.element;
    layer = layui.layer;
    laydate = layui.laydate;
    treeSelect = layui.treeSelect;
    $ = layui.$;
    userid = window.location.href.getQuery("userid"); //列表页单行数据id
    userName = window.location.href.getQuery("userName"); //列表页单行数据id
    // pxjl = encodeURI(encodeURI("username=" + userName))
    console.log(pxjl)
        // 员工信息
    $("#ifarmDiv").html("<iframe style='width:100%;min-height:600px;border:0' src = './User_Add.html?userid=" + userid + "'></iframe>");
    // 调动记录
    $("#ddjlDiv").html("<iframe style='width:100%;min-height:600px;border:0' src = './DataList_Transfer.html?userid=" + userid + "'></iframe>");
    // 合同管理
    $("#htglDiv").html("<iframe style='width:100%;min-height:600px;border:0' src = './DataList_Contract.html?userid=" + userid + "'></iframe>");
    // 教育经历
    $("#jyjlDiv").html("<iframe style='width:100%;min-height:600px;border:0' src = './DataList_Education.html?userid=" + userid + "'></iframe>");
    // 工作经历
    $("#gzjlDiv").html("<iframe style='width:100%;min-height:600px;border:0' src = './DataList_WorkExperience.html?userid=" + userid + "'></iframe>");
    //获得奖励
    $("#hdjlDiv").html("<iframe style='width:100%;min-height:600px;border:0' src = '../Hr_RewardPenalty/Reward.html?RewardPenalty=Reward&userid=" + userid + "'></iframe>");
    // 获得惩罚
    $("#hdcfDIv").html("<iframe style='width:100%;min-height:600px;border:0' src = '../Hr_RewardPenalty/Reward.html?RewardPenalty=Penalty&userid=" + userid + "'></iframe>");
    // 培训记录
    $("#pxjlDiv").html("<iframe style='width:100%;min-height:600px;border:0' src = '../Hr_Train/TrainManage.html?userid=" + userid + "'></iframe>");
    // 薪资统计
    // $("#zxtjDiv").html("<iframe style='width:100%;min-height:600px;border:0' src = '../Hr_Salary/SalaryStatistics.html?userid=" + userid + "'></iframe>");
    // 证件类型
    $("#zjlxDiv").html("<iframe style='width:100%;min-height:600px;border:0' src = '../Hr_Certificate/Certificate.html?userid=" + userid + "'></iframe>");
    // 所获职称
    $("#shzcDiv").html("<iframe style='width:100%;min-height:600px;border:0' src = '../Hr_PositionalTitles/PositionalTitlesManage.html?userid=" + userid + "'></iframe>");

});