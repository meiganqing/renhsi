/*
 * @陕西唐远
 * @文件名: 
 * @作者: 李浩源
 * @Git: e
 * @Date: 2019-10-24 14:11:58
 * @描述: 
 * @版本: 1.00
 * @修改历史纪录: （版本 修改时间 修改人 修改内容）
 * @记录:  
 */
// if(baseUrl == "http://192.168.28.251:8111/rsgl"){
// 	//Widget文件夹的根目录路径
// 	var basePath= "http://192.168.28.251:8111"+"/Widget";
// }else{
// 	var basePath= baseUrl+"/Widget";
// }


var basePath= baseUrl+"/Widget";


function UploadFile(obj) {

	this.oldName = obj.oldName;//图片的原始名称key：dog.jpg
	this.newName = obj.newName;//后台返回的图片路径的key
	this.url = obj.url;//上传图片请求的地址
	this.chooseBtn = obj.chooseBtn;//选择按钮的id
	this.tableId = obj.tableId;//显示图片列表的table的id
	//返回数据的属性名:默认为data
	obj.returnDataKey ? this.returnDataKey = obj.returnDataKey : this.returnDataKey = "data";
}
//创建监听函数
var xhrOnProgress = function(fun) { //上传进度必需的
	xhrOnProgress.onprogress = fun; //绑定监听
	//使用闭包实现监听绑
	return function() {
		//通过$.ajaxSettings.xhr();获得XMLHttpRequest对象
		var xhr = $.ajaxSettings.xhr();
		//判断监听函数是否为函数
		if(typeof xhrOnProgress.onprogress !== 'function')
			return xhr;
		//如果有监听函数并且xhr对象支持绑定时就把监听函数绑定上去
		if(xhrOnProgress.onprogress && xhr.upload) {
			xhr.upload.onprogress = xhrOnProgress.onprogress;
		}
		return xhr;
	}
}
UploadFile.prototype = {

	uploadFile: function() { //上传附件	
		var that = this
		var indexload = ""
		layui.use(["form", "upload", "element"], function() {
			var upload = layui.upload,
				element = layui.element;
			var filexxx = { //上传进度需要用到
				fileIndex: [],
				loadIndex: 0
			}
			fileend = {}
			uploadListIns = upload.render({
				elem: $("#" + that.chooseBtn),
				url: that.url,
				accept: 'file',
				multiple: true,
				auto: true,
				method: "POST",
				xhr: xhrOnProgress,
				choose: function(obj) {},
				before: function(obj) {
					obj.preview(function(index, file, result) { //预读本地文件，如果是多文件，则会遍历。(不支持ie8/9)
						var res = file
						filexxx.fileIndex.push(index) //将选择的index加到load的数组中			
						var tr = $(['<tr type="new" id="upload-' + index + '" oldName="' + res.name + '" newName="">',
							'<td><div class="imgDiv" style="cursor: pointer;">',
							'<div class="layadmin-homepage-pad-ver" >',
							'<img onclick=lookPic("' + index + '","' + index + '") id="uploadImg' + index + '"  class="layadmin-homepage-pad-img" src="'+basePath+'/lose.png" width="66" height="66">',
							'</div>',
							'</div></td>',
							'<td>' + res.name + '</td>',
							'<td><div class="layui-progress" lay-showpercent="true" lay-filter="demo' + index + '">',
							'<div class="layui-progress-bar" lay-percent="20%"></div>',
							'</div></td>',
							'<td id="load' + index + '">正在上传</td>',
							'<td>',
							'<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>',
							'<span class="layui-btn layui-btn-xs layui-btn-danger " id="delete' + index + '" onclick=deleteFile("' + index + '","' + index + '")>删除</span>',
							'<span class="layui-btn layui-btn-xs layui-btn-warm demo-look" id="look' + index + '" onclick=lookPic("' + index + '","' + index + '")>预览</span>',
							//							'<span class="layui-btn layui-btn-xs edit-picture" id="edit' + index + '" onclick=editPic("' + index + '","new")>编辑</span>',
							'<span class="layui-hide import-img layui-btn layui-btn-xs " onclick="firstPic(this)">设为主图</span>',
							'</td>', '</tr>'
						].join(''));
						$(that.tableId).append(tr);
					});
				},
				progress: function(value) { //上传进度回调 value进度值		
					console.log(value);
					var progress = 'demo' + filexxx.fileIndex[filexxx.loadIndex]
					element.progress(progress, value + '%') //设置页面进度条
					if(value == "100") { //进度条是回调函数，多个文件是需要一一对应
						filexxx.loadIndex++
					}
				},
				done: function(res, index, upload) {
					console.log(res);
					if(res.message == '上传失败'){
						layer.msg(res.msg);
						$("#load"+index).html("上传失败");
						$("#look"+index).remove();

						return;
					}else{
						// res = JSON.parse(res);
					}
					
					var lastName = res.filepath;
					res.filepath = baseUrlImg + res.filepath;
					filexxx.fileIndex = []; //上传成功本次操作选择的值都要清零
					filexxx.loadIndex = 0;
					fileend[index] = res[that.newName]
					$("#upload-" + index).attr("newName", res[that.newName]);
					var fileSuffix =  res[that.newName].substring(res[that.newName].lastIndexOf('.'),res[that.newName].length);
					if(fileSuffix==".png" || fileSuffix==".jpg" || fileSuffix==".jpeg" || fileSuffix==".gif"){
						$("#uploadImg" + index).attr("src", res[that.newName].replace("ss.", "."))
					}
					else{
						$("#uploadImg" + index).attr("src", basePath+"/lose.png")
					}
					var fieldName = that.tableId.attr("allSrc");
					if(fieldName == undefined){
						fieldName = "";
					}
					that.tableId.attr("allSrc",fieldName+lastName+",");

					element.progress("demo" + index, '100%'); //设置页面进度条,不管成功没成功走到这都成功了
					$("#load" + index).html("上传成功");
					layer.closeAll('loading'); //关闭loading
					return;
					this.error(index, upload);
				},
				error: function(index, upload) {
					layer.closeAll('loading'); //关闭loading
					console.log(upload);
					var tr = $(demoListView).find('tr#upload-' + index),
						tds = tr.children();
					tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');

				}
			});
		})

	},

	addFileData: function() { //tr的ID，附件加到数据库里
		var that = this;
		var pictureUrl = ""; //调用该函数会返回图片的地址，多个图片用|隔开
		if($(that.tableId).find("tr").length > 0) {
			$.each($(that.tableId).find("tr"), function(key, val) {
				if($(that.tableId).find("tr").length - 1 == key) { //最后一个不加|
					pictureUrl += $(val).attr("newName") + "," + $(val).attr("oldName")
				} else {
					pictureUrl += $(val).attr("newName") + "," + $(val).attr("oldName") + "|"
				}
			})
		}
		return pictureUrl
	},
	echoDataFile: function(objData, type, type2) { //回显附加信息
		var that = this
		that.postData(objData, function(data) {
			var html = ""
			for(var i = 0; i < data.rows.length; i++) {
				html += `
			<tr id="upload-old${i}" oldName="${data[that.returnDataKey][i][that.oldName]}" newName="${data[that.returnDataKey][i][that.newName]}">
			<td>${data[that.returnDataKey][i][that.oldName]}</td>
			<td><div class="layui-progress">
  			<div class="layui-progress-bar" lay-percent="100%"></div>
			</div></td>
			<td>上传成功</td>
			<td>
			<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>
			<span class="layui-btn layui-btn-xs layui-btn-danger " id="delete${i}" 
			onclick="deleteFile('${data[that.returnDataKey][i][that.newName]}','','edit','${data[that.returnDataKey][i].id}')">删除</span>
			<span class="layui-btn layui-btn-xs layui-btn-warm demo-look"  onclick="lookPic('${data[that.returnDataKey][i][that.newName]}')" >预览</span>
			</td></tr>`
			}
			$("#" + that.tableId).append(html)
		})
	},
	postData: function(mActionData, callback) {
		var rv;
		var that = this;
		try {
			$.ajax({
				async: false,
				cache: false,
				type: "post",
				url: that.url,
				data: mActionData,
				dataType: 'json',
				success: function(returnValue) {
					callback(returnValue)
					if(returnValue.msg || returnValue.success) {
						rv = returnValue
					} else {
						rv = returnValue.message;
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					rv = XMLHttpRequest.responseText;
				}
			});
		} catch(e) {
			rv = e.message;
		}
		return rv;
	}
}

function deleteFile(res, index, type) {
//	var delurl = "/xdData/xdDelData.ashx";

	var index007 = layer.confirm("确定要删除吗？", {
		btn: ['确定', '再想想']
	}, function() {
		
		//1)从数据库删除图片
		//		if(type == "edit") { //修改的删除
		//			postData('DelDataById', {
		//				XDLMTableName: "遗址资料列表",
		//				XDLMID: id
		//			}, function(data) {
		//				if(data.msg) {
		//					layer.msg(data.message, {
		//						icon: 1,
		//						time: 1000
		//					})
		//					$("#upload-" + index).remove()
		//					layer.close(index007)
		//				}
		//			}, delurl)
		//		}
		var src=$("#showfileFJ").attr('allsrc');
		var delsrc = $('#upload-'+index).attr("newname");


		$("#showfileFJ").attr('allsrc',src.replace(delsrc+',', ''))

		$("#upload-" + index).remove()
		layer.close(index007)
	})
}

function lookPic(imgSrc, imgSrcIndex) {
	if(imgSrcIndex) { //新添加的图片的查看，在函数中直接点击会陷入死循环
		if(imgSrcIndex == "批次导入") {
			ShowVideo(false, imgSrc, '90%', '90%', 1, "03");
		} else if(imgSrcIndex == "系统上传") {
			ShowVideo(false, imgSrc, '90%', '90%', 1, "03");
		} else {//新添加的图片的查看
			imgSrc = fileend[imgSrcIndex]
			ShowVideo(false, imgSrc, '90%', '90%', 1, "03");
		}
	} else {
		ShowVideo(false, imgSrc, '90%', '90%', 1, "03");
	}

}
//判断是哪一种查看图片的方式
function getScanPictureType(pictureType, path) {
	//	pictureType  01最基本的查看图片的形式
	//	pictureType  02最基本的查看切片的形式
	//	pictureType  03可以在切片上画图的形式
	var url = "";
	var imgPath = path.split(",")[0]
	//1)系统批量上传，切片大小自己获取

	if(pictureType == "03") {
		$.ajax({
			type: "GET",
			url: imgPath.split(".")[0] + "/ImageProperties.xml",
			async: false,
			success: function(dataxml) {
				var width_ = Number($(dataxml).find("IMAGE_PROPERTIES").attr("WIDTH"));
				var heigh_ = Number($(dataxml).find("IMAGE_PROPERTIES").attr("HEIGHT"));
				url = basePath+"/measurablePicture/openTitleImage.html?h=" + heigh_ + "&w=" + width_ + "&path=" + imgPath
			},
			error: function() {
				url = basePath+'/imgTools/ShowImage.html?path=' + imgPath;
			}
		});

	} else if(pictureType == "02") {
		url = basePath+'/pictureDetail/showPicture.html?path=' + imgPath;

	} else if(pictureType == "01") {
		url = basePath+'/imgTools/ShowImage.html?path=' + imgPath;
	} else {
		url = basePath+'/imgTools/ShowImage.html?path=' + imgPath;
	}
	return url;
}

function ShowVideo(mtitle, mpath, w, h, clobtn, system) {
	if(mpath == '') {
		layer.msg('未找到文件');
	} else {

		var yl = false;
		var index = mpath.lastIndexOf("\.");
		var r = mpath.substring(index + 1, mpath.length);

		var url = basePath+"/video/ShowVideo.html?path=" + mpath;
		switch(r.toLowerCase()) {
			case "doc":
			case "docx":
					url = '/'+mpath;
					yl = true;
				break;
			case "txt":
			case "zip":
			case "rar":
			case "xls":
			case "xlsx":
				break;
			case "pdf":
				url = basePath+'/pdfViewer/pdfView.html?path=' + mpath;
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
				if(getScanPictureType(system, mpath)) {
					url = getScanPictureType(system, mpath)
					yl = true;
				} else {
					yl = false;
				}

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
				url = +"/video/ShowVideo.html?path=" + mpath;
				yl = true;
				break;
			default:
				yl = false;

		}

		if(yl) {
			if(clobtn) {
				clobtn = 1;
			} else {
				clobtn = clobtn;
			}
			var index = layer.open({
				type: 2,
				//      maxmin: true,
				content: url,
				area: [w, h],
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
// 查看 文件
function showInfo(i){
	ShowVideo(false, $("#lookFile"+i).attr("srcPath"), '90%', '90%', 1, "03");
}

// 删除文件

function removeInfo(i){
	var str = $("#showfileFJ").attr("allsrc");
	strs = str.replace($("#lookFile"+i).prev().attr("srcPath")+",","");
	$("#showfileFJ").attr("allsrc",strs);
	$("#lookFile"+i).parent().parent().remove();
}


function SpellItIntoTable(typenum){
	if($("#showfileFJ").attr("allsrc") == "" || $("#showfileFJ").attr("allsrc") == undefined){
		return;
	}
	if(typenum == 1){
		var isshow = "layui-hide";
	}else{
		var isshow = "";
	}
	var tableData = $("#showfileFJ").attr("allsrc").split(',')
	for(let i = 0;i<tableData.length-1;i++){
		var fileName =  tableData[i].substring(tableData[i].lastIndexOf('/')+1,tableData[i].length);
		var fileLast = 	tableData[i].substring(tableData[i].lastIndexOf('.'),tableData[i].length);
		var tableHtml= "";
		var filepath = baseUrlImg+tableData[i];
		if(fileLast==".png" || fileLast==".jpg" || fileLast==".jpeg" || fileLast==".gif"){
			var imgsrcq=baseUrlImg+tableData[i];
		}else{
			var imgsrcq=basePath+"/lose.png";
		}

		tableHtml+='<tr type="new">',
		tableHtml+='<td><div class="imgDiv" style="cursor: pointer;">',
		tableHtml+='<div class="layadmin-homepage-pad-ver" >',
		tableHtml+='<img class="layadmin-homepage-pad-img" src="'+imgsrcq+'" width="66" height="66">',
		tableHtml+='</div>',
		tableHtml+='</div></td>',
		tableHtml+='<td>' + fileName + '</td>',
		tableHtml+='<td class="'+isshow+'"><div class="layui-progress" lay-filter="demo'+i+'" lay-showpercent="true">',
		tableHtml+='<div class="layui-progress-bar" lay-percent="100%"></div>',
		tableHtml+='</div></td>',
		tableHtml+='<td class="'+isshow+'">上传完毕</td>',
		tableHtml+='<td>',
		tableHtml+='<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>',
		tableHtml+='<span class="layui-btn layui-btn-xs layui-btn-danger '+isshow+'" srcPath='+tableData[i]+' onclick="removeInfo('+i+')">删除</span>',
		tableHtml+='<span class="layui-btn layui-btn-xs layui-btn-warm demo-look" id="lookFile'+i+'" srcPath = '+filepath+' onclick="showInfo('+i+');">预览</span>',
		tableHtml+='<a class="layui-btn layui-btn-xs layui-btn-warm demo-look" href='+filepath+' download='+fileName+'>下载</a>',
		tableHtml+='<span class="layui-hide import-img layui-btn layui-btn-xs " onclick="firstPic(this)">设为主图</span>',
		tableHtml+='</td>', '</tr>'
		$("#showfileFJ").append(tableHtml);

		element.progress("demo"+i, '100%');
	}
}


function SpellItIntoTableByid(typenum,imgurl){
	console.log(imgurl);
	if(typenum == 1){
		var isshow = "layui-hide";
	}else{
		var isshow = "";
	}

	var tableData = imgurl.split(',')
	var tableHtml= "";
	for(let i = 0;i<tableData.length-1;i++){
		var fileName =  tableData[i].substring(tableData[i].lastIndexOf('/')+1,tableData[i].length);
		var fileLast = 	tableData[i].substring(tableData[i].lastIndexOf('.'),tableData[i].length);
		var filepath = baseUrlImg+tableData[i];
		if(fileLast==".png" || fileLast==".jpg" || fileLast==".jpeg" || fileLast==".gif"){
			var imgsrcs=baseUrlImg+tableData[i];
		}else{
			var imgsrcs=basePath+"/lose.png";
		}

		tableHtml+='<tr type="new">',
		tableHtml+='<td><div class="imgDiv" style="cursor: pointer;">',
		tableHtml+='<div class="layadmin-homepage-pad-ver" >',
		tableHtml+='<img class="layadmin-homepage-pad-img" src="'+imgsrcs+'" width="66" height="66">',
		tableHtml+='</div>',
		tableHtml+='</div></td>',
		tableHtml+='<td>' + fileName + '</td>',
		tableHtml+='<td class="layui-hide"><div class="layui-progress" lay-filter="demo'+i+'" lay-showpercent="true">',
		tableHtml+='<div class="layui-progress-bar" lay-percent="100%"></div>',
		tableHtml+='</div></td>',
		tableHtml+='<td class="layui-hide">上传完毕</td>',
		tableHtml+='<td>',
		tableHtml+='<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>',
		tableHtml+='<span class="layui-btn layui-btn-xs layui-btn-danger '+isshow+'" srcPath='+tableData[i]+' onclick="removeInfo('+i+')">删除</span>',
		tableHtml+='<span class="layui-btn layui-btn-xs layui-btn-warm demo-look" id="lookFile'+i+'" srcPath = '+filepath+' onclick="showInfo('+i+');">预览</span>',
		tableHtml+='<a class="layui-btn layui-btn-xs layui-btn-warm demo-look" href='+filepath+'  download='+fileName+'>下载</a>',
		tableHtml+='<span class="layui-hide import-img layui-btn layui-btn-xs " onclick="firstPic(this)">设为主图</span>',
		tableHtml+='</td>', '</tr>'
		// $("#showfileFJ").append(tableHtml);
		// element.progress("demo"+i, '100%');
	}
	return tableHtml;
}