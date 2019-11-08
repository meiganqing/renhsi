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
var $, depval, admin;
layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'table', "form", 'laydate', "upload", "treeSelect", "element"], function() {
    admin = layui.admin
    form = layui.form,
        laydate = layui.laydate,
        upload = layui.upload,
        element = layui.element;

    var formSelects = layui.formSelects;
    $ = layui.$;
    // 时间插件初始化
    laydate.render({
        elem: '#BegCourseTime'
    });
    laydate.render({
        elem: '#EndCourseTime'
    });



    // 培训渠道
    PostData_new(yonghu, {
            XDLMCID: "1001",
            XDLMSID: "DYBH20191015151140114015841",
            XDLMA: '12',
        }, function(data) {
            console.log("培训渠道")
            console.log(data)
            if (data.success && data.rows.length > 0) {
                getSelect("TrainChannel", data.rows, "分类名", "分类id", "分类名")
                form.render("select")
            }
        })
        //   培训方式
    PostData_new(yonghu, {
        XDLMCID: "1001",
        XDLMSID: "DYBH20191015151140114015841",
        XDLMA: '13',
    }, function(data) {
        console.log("培训渠道")
        console.log(data)
        if (data.success && data.rows.length > 0) {
            getSelect("TrainSfape", data.rows, "分类名", "分类id", "分类名")
            form.render("select")
        }
    })

    // 点击更换部门
    form.on("select(department)", function(data) {
        console.log("更换")
            // 培训讲师
        PostData_new(yonghu, {
            XDLMCID: "1001",
            XDLMSID: "DYBH20190823102601261253201",
            QueryType: "mDepart",
            QueryKey: data.value
        }, function(data) {
            if (data.success && data.rows.length > 0) {
                getSelect("TrainTeacher", data.rows, "mUserName", "id", "mUserName")
                form.render("select")
            } else {
                getSelect("TrainTeacher", data.rows, "mUserName", "id", "mUserName")
                form.render("select")
            }
        })


    })

    // 参议单位多选
    PostDataRS({
            XDLMCID: "1001",
            XDLMSID: "DYBH20190823102601261218191"
        }, "SYYHGL", function(returnData) {
            console.log("0-4")
            console.log("参议单位多选")
            var formSelects = layui.formSelects;
            getSelect("TrainDep", returnData.rows, "DepartName", "DepartName");
            formSelects.render("select")
        })
        // var formSelects = layui.formSelects;
    layui.formSelects.on('TrainDep', function(id, vals, val, isAdd, isDisabled) {

        alert("选择了: ");
        //如果return false, 那么将取消本次操作
        if (val.value == "考虑将拉开") {
            return false;
        }
    });





    // 参与培训的人员（多选）
    PostData_new(yonghu, {
        XDLMCID: "1001",
        XDLMSID: "DYBH20190823102601261253201",
    }, function(data) {
        if (data.success && data.rows.length > 0) {
            console.log("0-5")
            console.log("参议单位人员")
            var formSelects = layui.formSelects;
            getSelect("TrainUser", data.rows, "mUserName", "id", "mUserName")
            formSelects.render("select")
        }
    })





    // 修改回显数据
    if (GetRequest().choseId != null) {
        $('#TrainManageAddBtn').html('修改');
        // 回显请求全部的部门和人员
        PostDataRS({
            XDLMCID: "1001",
            XDLMSID: "DYBH20190823102601261218191"
        }, "SYYHGL", function(returnData) {
            getSelect("HostDep", returnData.rows, "DepartName", "DepartId");
            form.render("select")
            console.log("111")
            if (returnData.success) {
                // 培训讲师
                PostData_new(yonghu, {
                    XDLMCID: "1001",
                    XDLMSID: "DYBH20190823102601261253201",
                }, function(data) {
                    if (data.success && data.rows.length > 0) {
                        console.log("222")
                        getSelect("TrainTeacher", data.rows, "mUserName", "id", "mUserName")
                        form.render("select")
                        getFormValue();

                    }
                })
            }
        })


        //获取但行数据回显

    }


    // 判断 添加或者修改
    if (GetRequest().choseId) {
        // 修改操作
        form.on('submit(TrainBtn)', function(data) {
            let fileData = submitPicture("imgContent");
            // let uploadName = fileData.imgName.substring(0, fileData.imgName.lastIndexOf(','))
            let uploadPath = fileData.imgPath.substring(0, fileData.imgPath.lastIndexOf(','))
            let editdata = {
                'XKLX': 'SYRSGL',
                'XDLMCID': '6000',
                'XDLMSID': 'DYBH201908231027212721244135',
                'XDLMID': GetRequest().choseId
            }
            for (var i in data.field) {
                editdata[i] = data.field[i];
            }
            // editdata['XDLMFiles'] = $("#showfileFJ").attr("allSrc");
            editdata['XDLMFiles'] = uploadPath
            editDataXg(baSic, editdata);
            return false;

        });
    } else {
        //获取主办部门
        PostDataRS({
            XDLMCID: "1001",
            XDLMSID: "DYBH20190823102601261218191"
        }, "SYYHGL", function(returnData) {
            getSelect("HostDep", returnData.rows, "DepartName", "DepartId");
            form.render("select")
            if (returnData.success) {
                // 培训讲师
                PostData_new(yonghu, {
                    XDLMCID: "1001",
                    XDLMSID: "DYBH20190823102601261253201",
                    QueryType: "mDepart",
                    QueryKey: returnData.rows[0].DepartName
                }, function(data) {
                    if (data.success && data.rows.length > 0) {
                        getSelect("TrainTeacher", data.rows, "mUserName", "id", "mUserName")
                        form.render("select")
                    }
                })
            }
        })

        // 添加操作
        form.on('submit(TrainBtn)', function(data) {
            let fileData = submitPicture("imgContent");
            // let uploadName = fileData.imgName.substring(0, fileData.imgName.lastIndexOf(','))
            let uploadPath = fileData.imgPath.substring(0, fileData.imgPath.lastIndexOf(','))
            let addata = {
                'XKLX': 'SYRSGL',
                'XDLMCID': '5000',
                'XDLMSID': 'DYBH201908231027212721238133',
            }
            for (var i in data.field) {
                addata[i] = data.field[i];
            }
            addata['XDLMFiles'] = uploadPath
                // addata['XDLMFiles'] = $("#showfileFJ").attr("allSrc");
            addDataTjiao(baSic, addata);
            return false;
        });

    }



    // //附件调用时的上传插件
    // var uploadImg = new UploadFile({
    // 	oldName: "filename",//后台返回的图片原始路径的key值名称
    // 	newName: "filepath",//后台返回的图片服务器路径的key值名称
    // 	url: ipUploadUrl,//请求图片的地址
    // 	chooseBtn: "changefileFJ",//选择上传按钮id
    // 	tableId: $("#showfileFJ")//显示图片列表的table的容器
    // });
    // uploadImg.uploadFile()//上传调用
    //上传文件
    uploadFileRS("uploadImg", "imgContent"); //上传文件

});




// 数据回显
function getFormValue() {
    PostData_new("/xdData/xdDataManage.ashx?XAction=GetDataInterface&XKLX=SYRSGL&XDLMCID=1001&XDLMSID=DYBH20190823102721272182132&XDLMA=" + GetRequest().choseId, "", function(getData) {
        if (getData.success == true) {
            for (var i in getData.rows[0]) {
                $('#' + i).val(getData.rows[0][i]);
            }
            xghx("imgContent", getData.rows[0].Files)
        }
        console.log("333")
            // 上传文件回显getData.rows[0].Files
            // $("#showfileFJ").attr("allSrc", getData.rows[0].Files)
            // SpellItIntoTable('');
            // 参议培训部门多选
        PostDataRS({
                XDLMCID: "1001",
                XDLMSID: "DYBH20190823102601261218191"
            }, "SYYHGL", function(returnData) {
                if (returnData.success && returnData.rows.length > 0) {
                    var formSelects = layui.formSelects;
                    getSelect("TrainDep", returnData.rows, "DepartName", "DepartId");
                    formSelects.render("select")
                    var formSelects = layui.formSelects;
                    formSelects.value('TrainDep', getData.rows[0].TrainDep.split(","), true);
                    formSelects.value('TrainUser', getData.rows[0].TrainUser.split(","), true);
                    form.render("select")
                }


            })
            // 部门回显

        // PostDataRS({
        // 	XDLMCID: "1001",
        // 	XDLMSID: "DYBH20190823102601261218191"
        // }, "SYYHGL", function (returnData) {
        // 	getSelect("HostDep", returnData.rows, "DepartName", "DepartId");
        // 	$("#HostDep").val(getData.rows[0].HostDep)
        // 	form.render("select")
        // })

    });

}

//    关闭窗口寻找索引
function callBack() {
    var index543 = parent.layer.getFrameIndex(window.name); //获取窗口索引
    parent.dataTable.reload('mDataTable', {
        page: {
            curr: 1 //重新从第 1 页开始
        }
    });
    parent.layer.close(index543);
}





// function callBack() {
//   var index543 = parent.layer.getFrameIndex(window.name); //获取窗口索引
//   parent.dataTable.reload('mDataTable', {
//     page: {
//       curr: 1 //重新从第 1 页开始
//     }
//   });
//   parent.layer.close(index543);
// }




// var getDepInfoById = () =>{
// 	let data = {
// 	    limit: 99999999,
// 	    page: 1
// 	};

// 	let datas = PostData("/Controllers/Hr_Dep/GetListByPage",JSON.stringify(data));
// 	$("#TrainDep").html(cycledata(datas.data));
// 	var formSelects = layui.formSelects;
// 	formSelects.render();
// }
// var option = "";

// function cycledata(datas){
// 	for(let i = 0; i<datas.length; i++){

// 		option +=  "<option value="+datas[i].id+">"+datas[i].name+"</option>"
// 		if(datas[i].children.length != 0){
// 			cycledata(datas[i].children);
// 		}

// 	}
// 	return option;
// }