var kfJson = {
	colsName: {
		T32: [ //系统日志表
			[{
					title: '序号',
					type: 'numbers'
				}, {
					field: 'mUserName',
					title: '用户名',
					width: '7.5%',
					align: 'center',
					templet: '#colorYHM'
				}, {
					field: 'mDataTime',
					title: '时间',
					width: '10%',
					align: 'center',
					templet: '#colorSJ'
				}, {
					field: 'mUserIP',
					title: 'IP地址',
					width: '10%',
					align: 'center',
					templet: '#colorIP'
				}, {
					field: 'mUserBehavior',
					title: '记录行为',
					width: '20%',
					align: 'center',
					templet: '#colorJLLX'
				}, {
					field: 'mUserContent',
					title: '统计内容',
					width: '50%',
					align: 'center',
					templet: '#opeTpl'
				},

			]
		],
		T384: [ //系统日志表
			[{
					title: '序号',
					type: 'numbers'
				}, {
					field: 'groupName',
					title: '组名',
					width: '95%',
					align: 'center'
				},
			]
		],
		T7000: [ //用户表
			[{
					title: '序号',
					type: 'numbers'
				},
				{
					field: 'mUserName',
					title: '用户名',
					width: '15%',
					align: 'center',
					templet: "#colorYHM"
				},
				{
					field: 'realName',
					title: '真实姓名',
					width: '10%',
					align: 'center',
					templet: "#colorZSXM"
				},
				//				{
				//					field: 'storages',
				//					title: '所属库房',
				//					width: '25%',
				//					align: 'center',
				//					templet: "#colorSSKF"
				//				},
//				{
//					field: 'mUserLevel',
//					title: '用户级别',
//					width: '25%',
//					align: 'censter',
//					templet: "#colorYHJB"
//				},
				{
					field: 'Role',
					title: '角色',
					width: '50%',
					align: 'center',
					templet: "#colorJS"
				},
				{
					title: '操作',
					width: '22%',
					align: 'center',
					templet: '#opeTpl'
				},

			]
		],

		T384: [ //用户表
			[{
					title: '序号',
					type: 'numbers',
					width: '15%'
				},
				{
					field: 'groupName',
					title: '组名',
					width: '44%',
					align: 'center'
				},
				{
					title: '操作',
					width: '40%',
					align: 'center',
					templet: '#opeTpl'
				},

			]
		],

		T7013: [
			[{
				checkbox: true,
				LAY_CHECKED: false
			}, {

				type: 'numbers'

			}, {
				field: 'rolename',
				title: '角色名称',
				width: '20%',
				align: 'center',
				templet: '#colorJSMC'
			}, {
				field: 'miaoshu',
				title: '角色描述',
				width: '50%',
				align: 'center',
				templet: ''

			}, {
				field: '',
				title: '操作',
				width: '24%',
				align: 'center',
				templet: '#opeTpl'
			}]
		],
		
		T175: [
			[{
					field: 'sysname',
					title: '名称',
					width: "33%",
					align: 'center',
					id: 'onlynum',

				},
				{
					field: 'sysvalue',
					title: '数值',
					width: "33%",
					align: 'center',
					id: 'onlynum',

				},

				{
					field: '',
					title: '操作',
					width: "34%",
					align: 'center',
					id: 'onlynum',

					templet: "#opeTpl"
				},
			]
		],



	SearchDataRepeatT305:function (){
		return this.T305.wwzllb
	},
	SearchDataRepeatT386:function (){
		return this.T386.djblb
	}
	}

}
Window.kfJson = kfJson