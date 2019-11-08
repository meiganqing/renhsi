layui.define("form", function(exports) {
    var MOD_NAME = "formSubmit",
        $ = layui.jquery,
        form = layui.form,
        table = layui.table
    var Class = function() { //挂载的类
        this.dataUrl = "";
        this.addData = "";
        this.editData = "";
        this.echoData = "";
    }
    var baseData = {
        //obj的key包含（addData，editData，submitChangeData）
        //addData:是添加数据的接口的固定参数,比如：{XDLMCID: "5000",XDLMSID: "DYBH20190529131215121511603"}【对象格式】
        //editData:是修改数据的接口的固定参数,比如：{XDLMCID: "1001",XDLMSID: "DYBH20190529131215121515902"}【对象格式】
        //submitChangeData：是最后的表单提交（修改）的时候部分表单数据的自定义修改【对象格式】
        init: function(obj) {
            var that = this
            if (obj && obj.constructor === Object && obj.isEmptyObject != {}) {
                obj.dataUrl ? that.dataUrl = obj.dataUrl : console.error("请出入求情地址");
                obj.addData ? that.addData = obj.addData : console.error("请出入init函数的修改参数");
                obj.editData ? that.editData = obj.editData : console.error("请出入init函数的修改参数");
                obj.echoData ? that.echoData = obj.echoData : console.error("请出入init函数的修改参数");
                obj.beforeEchoDataCallback ? that.beforeEchoDataCallback = obj.beforeEchoDataCallback : "";
                obj.addDataEndCallback ? that.addDataEndCallback = obj.addDataEndCallback : ""
            } else {
                console.error("formSubmit.init()传参不是正确格式，请参考文档");
            }
            var rowid = window.location.href.getQuery("rowId")
                //1)判断修改还是添加
            if (rowid) {
                // $("#XDLMID").val(rowid)
                that.SetUIValue(that.echoData)
                $("#submit").html("修改")
            } else {
                // $("#库内编号").val(that.getTimeAndRandom())
            }
            //2)提交数据
            form.on("submit(submit)", function(data) {
                //第三个参数有值，并且是函数，解决特殊处理的数据
                if (obj.beforeSubmitCallback && obj.beforeSubmitCallback instanceof Function) {
                    obj.beforeSubmitCallback(data.field);
                    console.log("*****提交前的数据*******")
                    console.log(data.field)
                }
                that.mAddNewData(data.field)
                return false
            })
        },
        SetUIValue: function(SetUIValuedata) {
            var that = this;
            that.PostData(SetUIValuedata, function(data) {
                if (data.success && data.rows.length > 0) {
                    if (that.beforeEchoDataCallback) {
                        that.beforeEchoDataCallback(data)
                    }

                    for (var k in data.rows[0]) {
                        //判断标签的类型

                        switch ($("#" + k).prop("tagName")) {
                            case "DIV":
                            case "SPAN":
                            case "P":
                            case "li":
                                $("#" + k).html(data.rows[0][k])
                                break;
                            case "INPUT":
                            case "TEXTAREA":



                                $("#" + k).val(data.rows[0][k]);

                                break;
                            case "SELECT":
                                console.log(data.rows[0][k])
                                console.log($("#" + k).find("option").length)
                                $("#" + k).val(data.rows[0][k]);
                                $("#" + k).attr("echoData", data.rows[0][k]);
                                break;
                            case "IMG":
                                $("#" + k).attr("src", data.rows[0][k]);
                                break;



                        }
                        //						$("#" + k).val(data.rows[0][k])
                    }
                    form.render("select")
                    form.render()
                }
            })

        },
        PostData: function(requestData, callback) { //异步的ajax请求


            var that = this;
            try {
                $.ajax({
                    async: true,
                    cache: false,
                    type: "post",
                    url: that.dataUrl.url,
                    data: requestData,
                    dataType: 'json',
                    headers: {
                        Authorization: getAuth()
                    },
                    success: function(returnData) {
                        if (returnData.success || returnData.msg) {
                            if (callback) {
                                callback(returnData, this)
                            }
                            rv = returnData
                        } else {
                            rv = returnData.message;
                            if (rv == "NOTLOGIN") {
                                //								var isQcode = window.location.href.getQuery("ewm"); //是否手机打开的
                                //								if(isQcode) {
                                //									window.location.href = window.location.origin + basePath + "/login-app.html?nextUrl=" + escape(window.location.href)
                                //								} else {
                                //									parent.location.href = baseUrl + "/login.html"
                                //								}
                                parent.location.href = "/login.html"
                            } else {
                                layer.msg(rv)
                            }
                        }
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        rv = XMLHttpRequest.responseText;
                        layer.msg(rv)
                    }
                });
            } catch (e) {

                rv = e.message;
            }
        },
        mAddNewData: function(where) {
            //判断添加还是修改
            var tip, that = this;
            if (rowid != null) {
                //合并两个对象，参数传添加和修改的必要参数和提交前的data.field的数据
                Object.assign(where, that.editData);
                tip = "确定要修改吗？"
            } else {
                Object.assign(where, that.addData);
                tip = "确定要添加吗？"
            }
            that.submitDataTip(tip, function() {
                console.log("添加")
                that.PostData(where, function(data) {
                    if (data.success) {
                        if (typeof that.addDataEndCallback == 'function') {
                            typeof that.addDataEndCallback(data)
                        } else {
                            that.tipMsg(data)
                        }


                    }
                })

            })
        },
        submitDataTip: function(tip, callback, data) { //没有验证码的弹框	
            layer.confirm(tip, {
                    btn: ['确定', '再想想'] //按钮
                },
                function() //确定
                {
                    var index000002 = layer.msg('正在提交，请稍等...', {
                        icon: 1,
                        time: 500,
                        success: function() {
                            layer.close(index000002)
                            callback(data)

                        }
                    });
                }

            );

        },
        tipMsg: function(data, callback) {
            var that = this;
            var iconType = "";
            var tipMessage = data.message;

            if (data.msg || data.success) {
                iconType = 1;
                if (data.message) {

                } else {
                    tipMessage = "操作成功"
                }
            } else {
                iconType = 5;
                if (data.message) {

                } else {
                    tipMessage = "操作失败"
                }
            }

            layer.msg(tipMessage, {
                icon: iconType,
                time: 500
            }, function() {
                if (callback) {
                    callback()
                } else {
                    that.QXALL()
                }

            });
        },
        QXALL: function() {

            // var indexlayer = parent.layer.getFrameIndex
            var indexlayer = parent.layer.getFrameIndex(window.name); //获取窗口索引
            if (parent.dataTable) {
                parent.dataTable.reload();
            }
            parent.layer.close(indexlayer);
        },
        RndNum: function(n) {
            var rnd = "";
            for (var i = 0; i < n; i++) {
                rnd += Math.floor(Math.random() * 10);
            }

            return rnd;
        },

        getTimeAndRandom: function() {
            return this.curDateTime() + this.RndNum(4);
        },

        curDateTime: function() {
            var d = new Date();
            var year = d.getFullYear() + "";
            var month = d.getMonth() + 1;
            var date = d.getDate();
            var day = d.getDay();
            var Hours = d.getHours(); //获取当前小时数(0-23)
            var Minutes = d.getMinutes(); //获取当前分钟数(0-59)
            var Seconds = d.getSeconds(); //获取当前秒数(0-59)
            var Milliseconds = d.getMilliseconds();
            var curDateTime = year;
            if (month > 9) {
                curDateTime = curDateTime + month;

            } else {
                curDateTime = curDateTime + "0" + month;
            }
            if (date > 9)
                curDateTime = curDateTime + date;
            else
                curDateTime = curDateTime + "0" + date;
            if (Hours > 9)
                curDateTime = curDateTime + Hours;
            else
                curDateTime = curDateTime + "0" + Hours;
            if (Minutes > 9)
                curDateTime = curDateTime + Minutes;
            else
                curDateTime = curDateTime + "0" + Minutes;
            if (Seconds > 9)
                curDateTime = curDateTime + Seconds;
            else
                curDateTime = curDateTime + "0" + Seconds;
            curDateTime = curDateTime + "0" + Milliseconds;
            return curDateTime;
        }
    }
    Class.prototype = baseData;
    String.prototype.getQuery = function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = this.substr(this.indexOf("?") + 1).match(reg);

            if (r != null) return unescape(r[2]);
            return null;
        }
        //  String.prototype.getQuery = function(name) {
        //      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        //
        //      var data_=this.substr(0,this.length).split("?")
        //      var newData=data_[data_.length-1]
        //      var r = newData.match(reg);
        //      if (r != null) return unescape(r[2]);
        //      return null;
        //  }

    var i = new Class();
    exports(MOD_NAME, i);
});