///import amz.forEach;

/**
 * @description 判断对象类型
 *
 * @author meizz
 * @create 2012-05-04
 *
 * @function
 * @name amz.type
 * @grammer amz.type( unknow )
 *
 * @param   {Any}       unknow  任意类型的对象
 * @return  {String}            对应对象类型的字符串
 */
amz.type = (function() {
    var objectType = {},
        nodeType = [, "HTMLElement", "Attribute", "Text", , , , , "Comment", "Document", , "DocumentFragment", ],
        str = "Array Boolean Date Error Function Number RegExp String",
        toString = objectType.toString;

    // 给 objectType 集合赋值，建立映射
    amz.forEach(str.split(" "), function(name) {
        objectType[ "[object " + name + "]" ] = name.toLowerCase();

        amz[ "is" + name ] = function ( unknow ) {
            return amz.type(unknow) == name.toLowerCase();
        }
    });

    // 方法主体
    return function ( unknow ) {
        var s = typeof unknow;

        return s != "object" ? s
            : unknow == null ? "null"
            : unknow._type_
                || objectType[ toString.call( unknow ) ]
                || nodeType[ unknow.nodeType ]
                || ( unknow == unknow.window ? "Window" : "" )
                || "object";
    };
})();

/*
 1-ELEMENT
 2-ATTRIBUTE
 3-TEXT
 4-CDATA
 5-ENTITY REFERENCE
 6-ENTITY
 7-PI (processing instruction)
 8-COMMENT
 9-DOCUMENT
10-DOCUMENT TYPE
11-DOCUMENT FRAGMENT
12-NOTATION
*/
