///import amz._extend;

/**
 * @description 创建链头对象，用于链式语法
 * @author meizz
 * @create 2012-05-20
 * @modify
 *
 * @function
 * @name amz.createChain
 * @grammar amz.createChain(chainName[, fn[, constructor]])
 * @param   {String}    chainName   链头方法名，一般小写
 * @param   {Function}  fn          链头方法函数体
 * @param   {Function}  constructor 内部类的构造器
 * @return  {Object}                链头函数
 */
amz.createChain = function(chainName, fn, constructor) {
    // 创建一个内部类名
    var className = "$"+chainName.charAt(0).toUpperCase()+chainName.substr(1);

    chainName == "dom" && (className = "$DOM");

    // 构建链头执行方法
    var chain = amz[chainName] = amz[chainName] || fn || function(object) {
        return amz._extend(object, amz[chainName].fn);
    };

    // 扩展 .extend 静态方法，通过本方法给链头对象添加原型方法
    chain.extend = function(extended) {
        return amz._extend(amz[chainName].fn, extended);
    };

    // 创建 链头对象 构造器
    amz[chainName][className] = amz[chainName][className] || constructor || function() {};

    // 给 链头对象 原型链做一个短名映射
    chain.fn = amz[chainName][className].prototype;
    chain.fn._type_ = className;

    return chain;
};

/**
 * @description 将系统对象上的方法重写到 自定义对象上去（为链式语法准备）
 *
 * @function
 * @grammar amz.overwrite(Class, list, fn)
 * @param   {Object}        Class   系统对象原型
 * @param   {Array}         list    需要重写的方法名列表
 * @param   {Function}      fn      被覆盖的函数
 * @return  {Function}              自定义的类
 */
amz.overwrite = function(Class, list, fn) {
    for (var i = list.length - 1; i > -1; i--) {
        Class.prototype[list[i]] = fn(list[i]);
    }

    return Class;
};