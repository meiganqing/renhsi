var marriageState = {
    1: "未婚",
    2: "已婚"
}

var health = {
    '健康': '健康',
    '良好': '良好'
}
var bloodType = {
    1: 'A',
    2: 'B',
    3: 'AB',
    4: 'O'
}

var allUserList = readTextFile(baseUrl + "/BaseInfo/UserBaseInfo.json?" + Math.random());
// var allUserList = readTextFile("http://localhost:8001/rsgl" + "/BaseInfo/UserBaseInfo.json?"+Math.random());
// console.log(getUsefName(2061));

function getUsefName(id) {
    for (let i = 0; i < allUserList.length; i++) {
        if (allUserList[i]["id"] == id) {
            if (allUserList[i]["name"] == undefined) {
                return "无数据"
            }
            return allUserList[i]["name"]
        }
    }


}
var projectType = {
    0: '计算项',
    1: '财务录取',
    2: '部门上报'
}


var workState = {
    1: '在职',
    2: '离职'
}


var contractType = {
    1: '录用合同',
    2: '使用合同'
}

// var workYears = {
// 	1:'1年',
// 	2:'2年',
// 	3:'3年',
// 	4:'4年',
// 	5:'5年',
// 	6:'5年-10年',
// 	7:'10年以上'
// }





// var licenceType = {
// 	1:'健康证',
// 	2:'驾驶证',
// 	3:'暂住证',
// 	4:'技能证'
// }

// var nation = {
// 	"汉":'汉',
// 	"其他":'其他'
// }

// var careType = {
// 	1:'类型1',
// 	2:'类型2'
// }

var userAttribute = {
    1: '编制内',
    2: '编制外'
}

var sex = {
    1: '男',
    2: '女'
}

if (getCookie("httpTrue")) {
    console.log("httpTrue 存在");
    var paperType = JSON.parse(getCookie("paperType"));

    var politicalOutlook = JSON.parse(getCookie("politicalOutlook"));

    var transferType = JSON.parse(getCookie("transferType"));

    var rewardProject = JSON.parse(getCookie("rewardProject"));

    var Project = JSON.parse(getCookie("Projects"));

    var trainChannel = JSON.parse(getCookie("trainChannel"));

    var trainSfape = JSON.parse(getCookie("trainSfape"));

    var state = JSON.parse(getCookie("state"));

    var getMode = JSON.parse(getCookie("getMode"));

    var education = JSON.parse(getCookie("education"));

    var titleName = JSON.parse(getCookie("titleName"));

    var workYears = JSON.parse(getCookie("workYears"));

    var careType = JSON.parse(getCookie("careType"));

    var licenceType = JSON.parse(getCookie("licenceType"));

    // var bloodType = JSON.parse(getCookie("bloodType"));

    var nation = JSON.parse(getCookie("nation"));

} else {
    console.log("httpTrue 不存在");

    var paperType = getSelectInfo("zjlx");
    setCookie("paperType", JSON.stringify(paperType), "s300");
    var politicalOutlook = getSelectInfo("zzmm");
    setCookie("politicalOutlook", JSON.stringify(politicalOutlook), "s300");
    var transferType = getSelectInfo("ddlx");
    setCookie("transferType", JSON.stringify(transferType), "s300");
    var rewardProject = getSelectInfo("jlyy");
    setCookie("rewardProject", JSON.stringify(rewardProject), "s300");
    var Project = getSelectInfo("cfyy");
    setCookie("Projects", JSON.stringify(Project), "s300");
    var trainChannel = getSelectInfo("pxqd");
    setCookie("trainChannel", JSON.stringify(trainChannel), "s300");
    var trainSfape = getSelectInfo("pxlx");
    setCookie("trainSfape", JSON.stringify(trainSfape), "s300");
    var state = getSelectInfo("zzzt");
    setCookie("state", JSON.stringify(state), "s300");
    var getMode = getSelectInfo("zchqtj");
    setCookie("getMode", JSON.stringify(getMode), "s300");
    var education = getSelectInfo("xl");
    setCookie("education", JSON.stringify(education), "s300");

    var titleName = getSelectInfo("zcmc");
    setCookie("titleName", JSON.stringify(titleName), "s300");

    var licenceType = getSelectInfo("zjlx");
    setCookie("licenceType", JSON.stringify(licenceType), "s300");

    // var bloodType = getSelectInfo("xuex");
    // setCookie("bloodType", JSON.stringify(bloodType), "s300");

    var nation = getSelectInfo("mz");
    setCookie("nation", JSON.stringify(nation), "s300");

    var workYears = getSelectInfo("gznx");
    setCookie("workYears", JSON.stringify(workYears), "s300");

    var careType = getSelectInfo("1");
    setCookie("careType", JSON.stringify(careType), "s300");

    setCookie("httpTrue", true, "s300");
}



function getSelectInfo(TGA, isuse) {
    let data = {
        page: 1,
        limit: 10,
        QueryText: "and typeCode = '" + TGA + "'"
    }
    thisId = PostDataNolayer("/Controllers/Sys_TypeInfo/GetListByPage", JSON.stringify(data)).data[0].id;

    let datSel = {
        page: 1,
        limit: 10,
        QueryText: "and detailedTypeInfoId = '" + thisId + "'"
    }

    let newdata = PostDataNolayer("/Controllers/Sys_TypeInfoDetailed/GetListByPage", JSON.stringify(datSel)).data;
    var returnData = {};

    if (isuse == 1) {
        return newdata[0].detailedTypeName;
    }
    for (let i = 0; i < newdata.length; i++) {
        returnData[newdata[i].id] = newdata[i].detailedTypeName
    }
    return returnData;
}

function getMariageState(arr, firstOptionName) {
    var html = "<option value=''>" + firstOptionName + "</option>";
    for (var key in arr) {
        html += '<option value=' + key + '>' + arr[key] + '</option>'　　
    }
    return html
}

function returnKey(arr, val) {
    var getKey;
    for (var key in arr) {
        if (val == arr[key]) {
            getKey = key
        }　　
    }

    return getKey;
}


function returnVal(arr, key) {
    if (arr[key] == undefined) {
        return "无数据";
    }
    return arr[key];
}

function PostDataNolayer(ApiUrl, mActionData) {

    var rv;
    try {
        $.ajax({
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "basic" + appId + ";" + token);
            },
            async: false,
            type: "post",
            url: baseUrl + ApiUrl, //  /rsgl/Controllers/Hr_WorkExperience/GetListByPage
            data: mActionData,
            dataType: 'json',
            contentType: "application/json",
            success: function(returnValue) {
                if (returnValue.code == "0") {
                    rv = returnValue;
                } else {
                    rv = returnValue.msg;
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                rv = XMLHttpRequest.responseText;
            }
        })
    } catch (e) {
        rv = e.msg;
    }
    return rv;
}




function readTextFile(file) {
    var returndata;

    $.ajax({
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "basic" + appId + ";" + token);
        },
        async: false,
        type: "GET",
        url: file, //  /rsgl/Controllers/Hr_WorkExperience/GetListByPage
        dataType: 'json',
        contentType: "application/json",
        success: function(returnValue) {
            returndata = returnValue
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            rv = XMLHttpRequest.responseText;
        }
    });

    return returndata;
}