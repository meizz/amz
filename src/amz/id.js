///import amz.isObject;
///import amz.isString;
///import amz.global;

/**
 * 给对象赋一个唯一标识
 * 通过唯一标识取对象
 *
 * @name amz.id
 * @author meizz
 * @create 2012-06-29
 * @modify
 *
 * @grammer amz.id( )
 * @grammer amz.id( id )
 * @grammer amz.id( id[, command] )
 * @grammer amz.id( object )
 * @grammer amz.id( object[, command] )
 *
 * @param   {Object}        object      Object or id
 * @param   {String}        command     [可选] 操作名，若该字符不是指定操作符时将认为是指定 id
 * @return  {Object}        String or Object
 */
amz.id = function() {
    var key = amz.key,
        maps = amz.global("_maps_id");
        
    amz._global_._counter = amz._global_._counter || 1;

    return function( object, command ) {
        var e
            ,str_1= amz.isString( object )
            ,obj_1= amz.isObject( object )
            ,id = obj_1 ? object[ key ] : str_1 ? object : "";

        // 第二个参数为 String
        if ( amz.isString( command ) ) {
            switch ( command ) {
            case "get" :
                return obj_1 ? id : maps[id];
            break;
            case "remove" :
            case "delete" :
                if ( e = maps[id] ) {
                    delete e[ key ];
                    delete maps[ id ];
                }
                return id;
            break;
            default :
                if ( str_1 ) {
                    (e = maps[ id ]) && delete maps[ id ];
                    e && ( maps[ e[ key ] = command ] = e );
                } else if ( obj_1 ) {
                    id && delete maps[ id ];
                    maps[ object[ key ] = command ] = object;
                }
                return command;
            }
        }

        // 第一个参数不为空
        if ( obj_1 ) {
            !id && (maps[ object[ key ] = id = amz.id() ] = object);
            return id;
        } else if ( str_1 ) {
            return maps[ object ];
        }

        return "AMZ__" + amz._global_._counter ++;
    };
}();
