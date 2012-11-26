///import amz;

/**
 * @description 在开发状态下使用，检查两个指定的对象是否相等，不等时提示信息
 *
 * @author meizz
 * @create 2012-11-20
 *
 * @function
 * @name amz.equal
 * @grammar amz.equal(first, second, hint)
 *
 * @param   {any}       first   判断相等的第一个条件
 * @param   {any}       second  判断相等的第二个条件
 * @param   {String}    hint    指定的提示信息
 */
amz.equal = function(first, second, hint){
    var result = first == second;
    hint = hint ? hint +", " : "";

    if (!result) {
        throw new Error(hint +'first:"'+ first +'" second:"'+ second +'"');
    }

    return result;
};
