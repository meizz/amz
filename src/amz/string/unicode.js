///import amz.regexp;
///import amz.string;

/**
 * @description 将指定的文本作unicode编码，中文将被编译成 \uxxxx 格式
 * @author meizz
 * @create 2012-11-20
 * @function 
 * @name amz.string.unicode
 * @grammar amz.string().unicode()
 * @return  {String}        已经编码后的文本
 */
amz.string.extend({
    unicode: function(){
        var reg = amz.regexp("([^\\x00-\\xff])", "g");

        return this.valueOf().replace(reg, function(all, s) {
            return "\\u"+ s.charCodeAt(0).toString(16);
        });
    }
});