/**
 * @fileoverview 脚本加载器
 * @author meizz
 * @create 2005-02-27
 * @modify 2012-08-24
 */
(function(window, framework){

    window.Using = function(nslist, callback) {
        var list = cacheable ? getDependList(nslist) : nslist.split(/ *, */);
        console.log(list);

        /*
         * 1   不聚合信赖项
         * 2   删除段注释
         * 4   删除行注释
         * 8   删除行首空格
         */
        var cmd = 14;

        var queryList = [];

        for (var i=0, n=list.length; i<n; i++) {
            !getCode(list[i]) && queryList.push(list[i]);
        }

        cacheable && cache.get("@depend") && (cmd ++);

        function _callback(){
            var list = cacheable ? getDependList(nslist) : nslist.split(/ *, */);
            for (var code, i=0, n=list.length; i<n; i++) {
                var key = list[i];
                !executed[key] && (code = getCode(key)) && exec(key, code);
            }
            callback && callback();
        }

        if (queryList.length > 0) {
            var s = document.createElement("SCRIPT");
            s.type = "text/javascript";
            s.src = rootPath + "/loadjscode/"+ cmd +"/cb:Using.cb?ns=" + queryList.join(",");

            s.onload = function(){_callback(); this.onload = null;};
            s.onreadystatechange = function(){
                if (this.readyState == "loaded" || this.readyState == "complete") {
                    _callback();
                    this.onreadystatechange = null;
                }
            }
            script.parentNode.appendChild(s);
            s = null;
        } else {
            _callback();
        }
    };

    // loadjscode 服务的回调函数
    Using.cb = function(json, order) {
        for(var key in json) {
            codeStorage[key] = json[key];
            cacheable && cache.set(key, json[key]);
            //exec(key, json[key]);
        }
        if (!cacheable && order) {
            for (var key, i=0, n=order.length; i<n; i++) {
                exec((key = order[i]), json[key]);
            }
        }
    };

    // 得到jsloader.js脚本文件对应的<script>标签元素
    var script = document.getElementsByTagName("SCRIPT");
    script = script[script.length - 1];
    var t = script.src.replace(/\\/g,"/");

    // 得到加载模块的起始路径
    var rootPath = (t.lastIndexOf("/")<0?".":t.substring(0,t.lastIndexOf("/")));

    // timestamp 时间戳，以便每个HTTP都能拿到最新资源
    var TS = new Date().getTime().toString(36);

    // 判断该模块是否已加载，避免重复加载
    var existent = {};

    var codeStorage = {};

    // 已经执行的
    var executed = {};

    function getCode(key) {
        var code = false;
        cacheable && (code = cache.get(key));
        !code && (code = codeStorage[key]);
        return code;
    }

    function exec(key, code) {
        // alert("exec:"+ key)
        // 同步模式
        if (window.execScript) {    // IE
            window.execScript(code);
            executed[key] = true;
        } else {    // Chrome Firefox Mozilla Opera Safari Netscape

            // 此处原来想用 window.eval() 或 eval.call(window) 来做
            // 但是 eval 在上述各浏览器上有差异，因此用下面的方法做
            var s = document.createElement("SCRIPT");
            s.type = "text/javascript";
            s.appendChild(document.createTextNode(code));
            script.parentNode.appendChild(s);
            script.parentNode.removeChild(s);
            s = null; executed[key] = true;
        }
    }

    // module  模块的代号，通常是Import的Namespace或require的URL
    function getDependList(modules) {
        var re = [], a = [];

        var nslist = modules.split(/ *, */);
        for (var x=0, y=nslist.length; x<y; x++) {
            a = a.concat(singleDepend(nslist[x]), nslist[x]);
        }

        // 数组去重
        for(var i=0, n=a.length, json={}; i<n; i++) {
            !json[a[i]] && re.push(json[a[i]] = a[i]);
        }

        return re;
    }
    function singleDepend(module) {
        var list = dependency[module];
        list = list ? list.split(",") : [];

        // 递归
        for (var i=0, n=list.length, re=[]; i<n; i++) {
            re = re.concat(singleDepend([list[i]]), list[i]);
        }

        return re;
    }



    // [localStorage]
    var cacheable = false;
    var dependency;

    var cache = function(){
        if (!window.localStorage) return null;


        if (typeof JSON == "undefined") {
            var JSON = {
                parse: function(str){return new Function("return "+ str)()},
                stringify: function(json){
                    var a = [];
                    for(var i in json) {
                        json.hasOwnProperty(i) && a.push('"'+ i +'":"'+ json[i] +'"');
                    }
                    return "{"+ a.join(",") +"}";
                }
            }
        }


        cacheable = true;
        var version,
            prefix = "js:"+ framework +":",
            storage = window.localStorage,
            result = {
                get : function(key){return storage.getItem(prefix + key);},
                set: function(key, value){return storage.setItem(prefix + key, value);},
                remove: function(key){return storage.removeItem(prefix + key);}
            }
        dependency = result.get("@depend");
        dependency = dependency ? JSON.parse(dependency) : {};

        var s = document.createElement("SCRIPT");
        s.type = "text/javascript";
        s.src = rootPath +"/checkupdate/cb:Using.cbs" + ((version = result.get("@version")) ? "/"+ version : "");
        script.parentNode.insertBefore(s, script);
        s = null;

        // 版本更新服务的回调函数
        Using.cbs = function(list) {
            if (!(list && list.length > 0)) return;

            if (list.length > 1) {
                // 更新版本号
                cache.set("@version", list[0].substr(list[0].indexOf(":") + 1));

                var depend = cache.get("@depend");
                depend = depend ? JSON.parse(depend) : {};

                for (var i=1, n=list.length; i<n; i++) {
                    var item = list[i];
                    var key = item.substr(0, item.indexOf(":"));
                    // 删除本地存储中的老代码，以便后续新代码的存入
                    cache.remove(key);
                    depend[key] = item.substr(item.indexOf(":") + 1);
                }
                // 更新依赖关系表
                cache.set("@depend", JSON.stringify(depend));
                dependency = depend;
            }
        }

        // 在用户空闲时间里下拉代码
        var timePoint = new Date();
        function monitor(){timePoint = new Date();}
        if (window.attachEvent) document.attachEvent("onmousemove", monitor);
        else document.addEventListener("mousemove", monitor, false);
        Using.cbws = function(json) {
            for(var key in json) {
                cacheable && cache.set(key, (codeStorage[key] = json[key]));
            }
        }

        function weisuo(first){
            if (first) {setTimeout(weisuo, 10000); return}
            if (new Date().getTime() - timePoint.getTime() < 10000) {
                setTimeout(weisuo, 2000);
            } else {
                var qlist = [];
                for(var i in dependency) {
                    if (typeof result.get(i) != "string") qlist.push(i);
                    if (qlist.length > 50) break;
                }

                if (qlist.length > 0) {
                    var s = document.createElement("SCRIPT");
                    s.type = "text/javascript";
                    s.src = rootPath + "/loadjscode/15/cb:Using.cbws?ns=" + qlist.join(",");
                    script.parentNode.appendChild(s);
                    timePoint = new Date();
                    weisuo(true);
                }
                else {
                    if (window.detachEvent) document.detachEvent("onmousemove", monitor);
                    else document.removeEventListener("mousemove", monitor, false);
                }
            }
        }; weisuo(true);

        return result;
    }();

})(window, "amz");