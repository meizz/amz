///import amz;

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
    var toString = Object.prototype.toString,
        types = {"[object NodeList]": "NodeList", "[object HTMLCollection]": "NodeList"},
        boms = [, "HTMLElement", "Attribute", "Text", , , , , "Comment", "Document", , "DocumentFragment", ],
        array = ["Arguments", "Array", "Boolean", "Date", "Error", "Function", /*"JSON", "Math",*/ "Number", "RegExp", "String"];

    // 给 types 集合赋值，建立映射
    for(var i=0, n=array.length, type; i<n; i++) {
        type = array[i];
        types[ "[object "+ type +"]" ] = type.toLowerCase();

        amz[ "is"+ type ] = new Function("unknow", "return amz.type(unknow) == \""+ type.toLowerCase() +"\"");
    }

    // main function
    return function ( unknow ) {
        var s = typeof unknow;

        return !~"object|function".indexOf(s) ? s
            : unknow == null ? "null"
            : unknow._type_
                || types[ toString.call( unknow ) ]
                || boms[ unknow.nodeType ]  // duck typing
                || ( unknow == unknow.window ? "Window" : "" )
                || "object";
    };
})();

// 20121130 在Safari 5.1.7中 typeof NodeList 为 function，没见过样坑人的
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
