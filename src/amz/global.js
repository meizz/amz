///import amz;

/**
 * @description 在页面全局读取或写入指定值
 *
 * @author meizz
 * @create 2011-07-21
 * @modify
 *
 * @function
 * @name amz.global
 * @grammar amz.global(key[, value[, overwrite]])
 *
 * @param   {String}    key         被存储的变量名
 * @param   {Object}    value       [可选]需要存储的变量值
 * @param   {String}    overwrite   [可选]true 覆盖原值
 * @return  {Object}                该key对象的对象
 */
amz.global = (function() {
    var me = amz._global_ = window[ amz.guid ],
        global = me._ = me._ || {};

    return function( key, value, overwrite ) {
        if ( typeof value != "undefined" ) {
            overwrite || ( value = typeof global[ key ] == "undefined" ? value : global[ key ] );
            global[ key ] =  value;

        } else if (key && typeof global[ key ] == "undefined" ) {
            global[ key ] = {};
        }

        return global[ key ];
    }
})();

