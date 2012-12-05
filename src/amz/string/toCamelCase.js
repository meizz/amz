///import amz.string;
///import amz.camelCase;

/**
 * @description 对指定的字符串作驼峰化处理
 * @author meizz
 * @create 2012-12-03
 * @function
 * @name amz.string.toCamelCase
 * @grammer amz.string(str).toCamelCase()
 * @return {String} 被驼峰化的字符串
 */
amz.string.extend({
    toCamelCase: function(){
        return amz.camelCase(this.valueOf());
    }
});
