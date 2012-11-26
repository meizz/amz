///import amz.base;

/**
 * @description 向某个类注册插件
 * author meizz
 * create 2011/11/29
 *
 * @function
 * @name amz.base.register
 * @grammar amz.base.register(Class, constructorHook, methods)
 * @param   {Class}     Class   		接受注册的载体 类
 * @param   {Function}  constructorHook 运行在载体类构造器里钩子函数
 * @param	{Object}  methods   [可选]挂载到载体类原型链上的方法集
 * @return  {Object}            返回 Class 类
 */
amz.base.register = function (Class, constructorHook, methods) {
    (Class._reg_ || (Class._reg_ = [])).push( constructorHook );

    for (var method in methods) {
        Class.prototype[method] = methods[method];
    }
    return Class;
};

// 20111221 meizz   修改插件函数的存放地，重新放回类构造器静态属性上
// 20111129 meizz   添加第三个参数，可以直接挂载方法到目标类原型链上
