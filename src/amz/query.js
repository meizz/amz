///import amz.each;
///import amz.merge;
///import amz.array.unique;

/**
 * @description 通过指定的CSS选择器取指定的DOM元素
 * 在用户选择使用 Sizzle 时会被覆盖成 Sizzle 方法
 * 目前这个简版的 selector 函数支持四种选择器 * #id .class tagName
 *
 * @function
 * @author meizz
 * @name amz.query
 * @create 2012-05-30
 * @modify 2012-06-10 将大函数分拆成 query() 和 queryCombo()；使用 querySelectAll()；
 *
 * @grammer amz.query(selector[, context[, results]])
 *
 * @param   {String}        selector    CSS选择器字符串
 * @param   {HTMLElement}   context     [可选]选择的范围(HTMLElement|Document)
 * @param   {Array}         results     [可选]返回的结果对象（数组）
 * @return  {Array}                     筛选后的对象组
 */
amz.query = amz.query || (function(){
    var rId = /^(\w*)#([\w\-\$]+)$/
        ,rId0= /^#([\w\-\$]+)$/
        ,rTag = /^\w+$/
        ,rClass = /^(\w*)\.([\w\-\$]+)$/
        ,rDivider = /\s*,\s*/
        ,rSpace = /\s+/g
        ,slice = Array.prototype.slice;

    // selector: #id, .className, tagName, *
    function query(selector, context) {
        var t, id, dom, tagName, className, arr, array = [];

        // tag#id
        if (rId.test(selector)) {
            id = RegExp.$2;
            tagName = RegExp.$1 || "*";

            // 本段代码效率很差，不过极少流程会走到这段
            amz.each(context.getElementsByTagName(tagName), function(dom) {
                dom.id == id && array.push(dom);
            });

        // tagName or *
        } else if (rTag.test(selector) || selector == "*") {
            amz.merge(array, context.getElementsByTagName(selector));

        // .className
        } else if (rClass.test(selector)) {
            arr = [];
            tagName = RegExp.$1;
            className = RegExp.$2;
            t = " " + className + " ";

            if (context.getElementsByClassName) {
                arr = context.getElementsByClassName(className);
            } else {
                amz.each(context.getElementsByTagName("*"), function(dom) {
                    dom.className && (" " + dom.className + " ").indexOf(t) > -1 && arr.push(dom);
                });
            }

            if (tagName && (tagName = tagName.toUpperCase())) {
                amz.each(arr, function(dom) {
                    dom.tagName.toUpperCase() === tagName && array.push(dom);
                });
            } else {
                amz.merge(array, arr);
            }
        }

        return array;
    }

    // selector 还可以是上述四种情况的组合，以空格分隔
    // @return ArrayLike
    function queryCombo(selector, context) {
        var a, s = selector, id = "__tangram__", array = [];

        // 在 #id 且没有 context 时取 getSingle，其它时 getAll
        if (!context && rId0.test(s) && (a=document.getElementById(s.substr(1)))) {
            return [a];
        }

        context = context || document;

        // 用 querySelectorAll 时若取 #id 这种唯一值时会多选
        if (context.querySelectorAll) {
            // 在使用 querySelectorAll 时，若 context 无id将貌似 document 而出错
            if (context.nodeType == 1 && !context.id) {
                context.id = id;
                a = context.querySelectorAll("#" + id + " " + s);
                context.id = "";
            } else {
                a = context.querySelectorAll(s);
            }
            return a;
        } else {
            if (s.indexOf(" ") == -1) {
                return query(s, context);
            }

            amz.each(query(s.substr(0, s.indexOf(" ")), context), function(dom, i, o) { // 递归
                amz.merge(array, queryCombo(s.substr(s.indexOf(" ") + 1), dom));
            });
        }

        return array;
    }

    return function(selector, context, results) {
        if (!selector || typeof selector != "string") {
            return results || [];
        }

        var arr = [];
        selector = selector.replace(rSpace, " ");
        results && amz.merge(arr, results) && (results.length = 0);

        amz.each(selector.indexOf(",") > 0 ? selector.split(rDivider) : [selector], function(item) {
            amz.merge(arr, queryCombo(item, context));
        });

        return amz.merge(results || [], amz.array(arr).unique());
    };
})();
