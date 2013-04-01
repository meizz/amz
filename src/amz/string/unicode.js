///import amz.string;

/**
 * @description 将指定的文本作unicode编码，中文将被编译成 \uxxxx 格式
 * @author meizz
 * @create 2012-11-20
 * @function 
 * @name amz.string.unicode
 * @grammar amz.string.unicode(str)
 * @return  {String}        已经编码后的文本
 */
amz.string.unicode = function(){
    var reg = /([^\x00-\xff])/g,
        replacer = function(all, s) {
            return "\\u"+ s.charCodeAt(0).toString(16);
        };

    // main function
    return function(str){
        return str.replace(reg, replacer);
    }
}();