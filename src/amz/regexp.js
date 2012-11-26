///import amz.global;
///import amz.isRegExp;
///import amz.isString;

/**
 * @description 将所有的正则表达式对象进行预编译处理，存储到全局对象中，以便重复调用
 *
 * @author meizz
 * @create 2012-09-24
 *
 * @function 
 * @name amz.regexp
 * @grammar amz.regexp(reg[, modal])
 * @param {String} reg 正则表达式的文本
 * @param {String} modal 正则表匹配模式(mgi)
 * @return {RegExp} 返回一个正则表达式对象
 */
amz.regexp = amz.regexp || function(){
	var modalReg = /[^mig]/,
        maps = amz.global("_maps_RegExp");

    return function(reg, modal){
        var key, result;

        if ( amz.isString(reg) ) {
        
        	modalReg.test(modal) && (modal = "");
            key = reg + "$$" + (modal || "");
            (result = maps[ key ]) || (result = maps[ key ] = new RegExp( reg, modal ));
        
        } else if ( amz.isRegExp(reg) ) {
        
            modal = (reg.global ? "g" : "") + (reg.ignoreCase ? "i" : "") + (reg.multiline ? "m" : "");
            key = reg.source + "$$" + modal;
            result = maps[key] || (maps[key] = reg);
        }

        // 注意：加了这句代码之后，会对 g 模式的 lastIndex 赋值的情况产生影响
        (result || (result = reg)) && reg.lastIndex > 0 && ( reg.lastIndex = 0 );
        return result;
    }
}();