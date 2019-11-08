var $, dataTable, layer;
layui.use(['form', 'tree', 'layer', "table"], function() {

    $ = layui.$;
    // 	var data = {
    // 	    limit: 99999999,
    // 	    page: 1
    // 	};
    // 	var jsonData = PostData('/Controllers/Hr_Dep/GetListByPage',JSON.stringify(data)).data;

    // 	console.log(jsonData);
    // 	var formatter = (value) =>{
    // 		return value.split("").join("\n");
    // 	}

    // 	var callBackFun = (jsonArr,type) =>{

    // 		var json = new Array();
    // 		var size;
    // 		var useName;
    // 		for(let i = 0;i<jsonArr.length;i++){
    // 			if(!type){
    // 				size =  [160, 36];
    // 				useName = jsonArr[i].name;
    // 			}else{
    // 				size = [36,160];
    // 				useName = formatter(jsonArr[i].name);
    // 			}
    // 			if(jsonArr[i].children.length!=0){
    // 				json[i] = {
    // 	                name: useName,
    // 	                value: jsonArr[i].children.length,
    // 	                symbol: 'none',
    // 	                itemStyle: {
    //                         normal: {
    //                         	color: '#426abb',
    //                             label: {
    //                                 show: true,
    //                             }
    //                         },
    //                         emphasis:{
    // 							color: '#426abb',
    //                             label: {
    //                                 show: true,
    //                             }
    // 						}
    //                     },
    // 	                symbolSize: size,
    // 	                children:callBackFun(jsonArr[i].children,1)
    // 	            }
    // 			}else{
    // 				json[i] = {
    // 	                name: useName,
    // 	                value: jsonArr[i].children.length,
    // 	                symbol: 'none',
    // 	                itemStyle: {
    //                         normal: {
    //                         	color: '#426abb',
    //                             label: {
    //                                 show: true,
    //                             }
    //                         },
    //                         emphasis:{
    // 							color: '#426abb',
    //                             label: {
    //                                 show: true,
    //                             }
    // 						}
    //                     },
    // 	                symbolSize: size,
    // 	                children:[]
    // 	            }
    // 			}

    // 		}

    // 		return json;
    // 	}
    // 	optionData = callBackFun(jsonData);

    // 	var myChart = echarts.init(document.getElementById('main'));
    // 	var option = {
    // 	    title : {
    // 	        subtext: ''
    // 	    },
    // 	    tooltip : {
    // 	        trigger: 'item',
    // 	        formatter: "{b}: {c}"
    // 	    },
    // 	    toolbox: {
    // 	        show : true,
    // 	        feature : { 
    // 	            mark : {show: true},
    // 	            dataView : {show: true, readOnly: false},
    // 	            restore : {show: true},
    // 	            saveAsImage : {show: true}
    // 	        }
    // 	    },
    // 	    calculable : false,

    // 	    series : [
    // 	        {
    // 	            name:'树图',
    // 	            type:'tree',
    // 	            orient: 'vertical',  // vertical horizontal
    // 	            roam:true,
    // 	            rootLocation: {x: 'center', y: '20%'}, // 根节点位置  {x: 'center',y: 10}
    // 	            nodePadding: 20,
    // 	            symbol: 'circle',
    // 	            symbolSize: 50,
    // 	            layerPadding: 120,
    // 	            itemStyle: {
    // 	                normal: {
    // 	                	barBorderRadius: 10,
    // 	                    label: {
    // 	                        show: true,
    // 	                        position: 'inside',
    // 	                        textStyle: {
    // 	                            color: '#fff',
    // 	                            fontSize: 15,
    // 	                            fontWeight:  '',
    // 	                        }
    // 	                    },

    // 	                    lineStyle: {
    // 	                        color: '#000',
    // 	                        width: 1,
    // 	                        type: 'broken' // 'curve'|'broken'|'solid'|'dotted'|'dashed'
    // 	                    }
    // 	                },

    // 	                emphasis: {
    // 	                	barBorderRadius: 10,
    // 	                    label: {
    // 	                        show: true
    // 	                    }
    // 	                }
    // 	            },
    // 	            data: [
    // 	                {
    // 	                    name: '公司',
    // 	                    value: 6,
    // 	                    symbolSize: [160, 36],
    // 	                    symbol: 'none',

    // 	                    itemStyle: {

    // 	                        normal: {
    // 	                        	color: '#426abb',
    // 	                            label: {
    // 	                                show: true,
    // 	                                textStyle: {
    // 	                                    fontWeight:'',
    // 	                                    fontSize : '14',
    // 	                                    fontFamily : '微软雅黑',
    // 	                                },

    // 	                            }

    // 	                        },
    // 	                        emphasis:{
    // 								color: '#426abb',
    // 	                            label: {
    // 	                                show: true,
    // 	                            }
    // 							}
    // 	                    },

    // 	                    children: optionData
    // 	                }
    // 	            ]
    // 	        }
    // 	    ]
    // 	};
    // myChart.setOption(option);
});