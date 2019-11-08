$(function() {
	layui.use(['element', "form"], function() {

		var storeLimt_rsgl = {};

		setLimt("sykf", "", function(data) {
			if(data.msg && data.userlimit.length > 0) {
				//先取到数组里重复的数据，权限高级的优先
				//1)将重复的数据都取出来
				var repeatArry = [];
				//2）如果当前的数据在重复的数组里，不断叠加替换

				for(var i = 0; i < data.userlimit.length; i++) {

					if(repeatArry.indexOf(data.userlimit[i].itemNum) == -1) { //没有重复的
						repeatArry.push(data.userlimit[i].itemNum)

						//						$("#" + data.userlimit[i].itemNum).showDiv(String(data.userlimit[i].qx))

						storeLimt_rsgl[data.userlimit[i].itemNum] = String(data.userlimit[i].qx)
					} else { //重复的，叠加存值

						var olditemNum = storeLimt_rsgl[data.userlimit[i].itemNum].split(""); //之前的值
						var newitemNum = String(data.userlimit[i].qx).split("")

						for(var k = 0; k < newitemNum.length; k++) {
							if(newitemNum[k] == "1") {
								olditemNum[k] = "1"
							}
						}

						storeLimt_rsgl[data.userlimit[i].itemNum] = olditemNum.join("")
					}

				}
				store.set("storeLimt_rsgl", storeLimt_rsgl)

				for(var k in storeLimt_rsgl) {
					$("#" + k).showDiv(String(storeLimt_rsgl[k]))
				}

			}
		})
		$(".item-nav").each(function(key, val) {

			$(val).find("dd").each(function(key1, val1) {
				if($(val1).css('display') == "block") {

					$(val).removeClass("layui-hide")

				}
			})

		})


		form.render();
	});
})