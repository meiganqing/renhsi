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
var $,IndexPagecolorList = [
	'#52B1F3', '#AFD548', '#FFB55C', '#46BFBD', '#8BA3E9',
	'#BDD98B', '#FF935C', '#58C1DF', '#FFD578', '#A1B395',
  ];
layui.config({
	base: '../../layuiadmin/' //静态资源所在路径
}).extend({
	index: 'lib/index' //主入口模块
}).use(['index', 'console', 'form', 'jquery', 'element', 'laydate'], function () {
	$ = layui.$;

// 职称统计
PostData_({
	'XDLMCID':'8000',
	'XDLMSID':'DYBH2019110110504109970321',
	'XDLMTID':'8001',
	'XDTJLX':'count',
	'XDTJMC':'TitleName'
},function(data){
zhicheng('postionState2',data.category,data.series[0].data )
})

// 学历统计
PostData_({
	'XDLMCID':'8000',
	'XDLMSID':'DYBH2019110111022108922775',
	'XDLMTID':'8001',
	'XDTJLX':'count',
	'XDTJMC':'Education'
},function(data){

var xulall=[];
for(let i=0;i<data.category.length;i++){
   
	xulall.push({ value: data.series[0].data[i],
		          name: data.category[i]});
  }
  Education('Degree', data.category, xulall,"学历统计")

})

// 性别统计
PostData_YH({
	'XDLMCID':'8000',
	'XDLMSID':'DYBH2019110111044609455631',
	'XDLMTID':'8001',
	'XDTJLX':'count',
	'XDTJMC':'sex'
},function(data){
	var xulall=[];
	for(let i=0;i<data.category.length;i++){
   
		xulall.push({ value: data.series[0].data[i],
					  name: data.category[i]});
	  }
	  Education('sex', data.category, xulall,"性别统计")

})

// 顶部数据员工状态
PostData_YH({
	'XDLMCID':'1001',
	'XDLMSID':'DYBH2019102418004306972851',
},function(data){
	$("#all").html(data.rows[2].num);//总数
	$("#dtj").html(data.rows[3].num);//在职
	$("#shz").html(data.rows[0].num);//编制
	$("#ylx").html(data.rows[1].num);//编制外

})

//职位统计
PostData_YH({
	'XDLMCID':'8000',
	'XDLMSID':'DYBH2019110110582903181348',
	'XDLMTID':'8001',
	'XDTJLX':'count',
	'XDTJMC':'Position'
},function(data){
	
	zhicheng('postionState',data.category,data.series[0].data )
})

// 通知公告

getCookie("UserId")

PostData_({
	'XDLMCID':'1001',
	'XDLMSID':'DYBH201908231027212721123141',
	// 'XDLMA':getCookie("UserId"),
	// 'XDLMB':""
},function(data){

var liinhtml=""
 for(var i=0;i<data.rows.length;i++){
 liinhtml+='<li class="proposal"  style=" text-overflow: ellipsis; border-bottom: 1px solid #f2f2f2;white-space:nowrap; overflow:hidden;" id="'+data.rows[i].Id+'">'+"<div onclick='tztiaoXq("+data.rows[i].Id+")'  style=' float: left;cursor: pointer;'>"+data.rows[i]['TransferTime']+"&nbsp&nbsp&nbsp"+data.rows[i]['TransferFDepId']+data.rows[i]['UserName']+data.rows[i]['TransferType']+data.rows[i]['TransferADepId']+data.rows[i]['TransferFPostId']+"</div>"+'</li>';}
 
 $('#informList').html(liinhtml);

})

});

// 职称统计
function zhicheng(id, Xdatas, Ydata, nameid) {
	var postionchart2 = echarts.init(document.getElementById(id));
	var postionoption2 = {
		title: {
			text: nameid,
			subtext: ''
		},
		tooltip: {
			trigger: 'axis'
		},

		toolbox: {
			show: true,
			feature: {
				mark: { show: true },
				dataView: { show: true, readOnly: false },
				magicType: { show: true, type: ['line', 'bar'] },
				restore: { show: true },
				saveAsImage: { show: true }
			}
		},
		calculable: true,
		xAxis: [
			{
				type: 'category',
				data: Xdatas
			}
		],
		yAxis: [
			{
				type: 'value'
			}
		],
		series: [
			{
				name: '人数',
				type: 'bar',
				data: Ydata,
				itemStyle: {
					normal: {
						color: function (params) {
							// build a color map as your need.
							var colorList = [
								'#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
								'#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
								'#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
							];
							return colorList[params.dataIndex]
						},
						label: {
							show: true,
							position: 'top',
						}
					}
				},
			}
		]
	};
	postionchart2.setOption(postionoption2);


  }

// 学历统计
function Education(id, Xdatas, xulall,nameid){
	var Degree = echarts.init(document.getElementById(id));
	var Degreeoption = {
		title: {
			text: nameid,
			subtext: '每日更新',
			x: 'center'
		},
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			orient: 'vertical',
			x: 'left',
			data: Xdatas
		},
		toolbox: {
			show: true,
			feature: {
				mark: { show: true },
				dataView: { show: true, readOnly: false },
				magicType: {
					show: true,
					type: ['pie', 'funnel'],
					option: {
						funnel: {
							x: '25%',
							width: '50%',
							funnelAlign: 'left',
							max: 1548
						}
					}
				},
				restore: { show: true },
				saveAsImage: { show: true }
			}
		},
		calculable: true,
		series: [
			{
				name: '访问来源',
				type: 'pie',
				radius: '55%',
				center: ['50%', '60%'],
				data: xulall,//总数据
				itemStyle: {
					normal: {
						label: {
							//                              	指示字与线
							show: true,
							//                                  显示百分比
							formatter: '{b} : {c} ({d}%)'
						},
						labelLine: {
							//                              	指示线
							show: true
						},
					},
				},
			}
		]
	};
	Degree.setOption(Degreeoption);
}


// 通知公告跳转
function tztiaoXq(value){
    openWindow("2", "../../../src/views/HrUserPage/Hr_User/Transfer_check.html?rowId="+value, "调动详情")
}
