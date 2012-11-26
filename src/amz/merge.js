///import amz;

/**
 * 将第二个 ArrayLike对象合并到第一个 ArrayLike 中去
 *
 * @author meizz
 * @create 2012-05-04
 * @modify
 *
 * @name amz.merge
 * @grammer amz.merge( arrayLike, arraylike )
 *
 * @param   {ArrayLike}     first       ArrayLike
 * @param   {ArrayLike}     second      ArrayLike
 * @return  {ArrayLike}     first ArrayLike
 */
amz.merge = function( first, second ) {
    var i = first.length,
        j = 0;

    if ( typeof second.length === "number" ) {
        for ( var l = second.length; j < l; j++ ) {
            first[ i++ ] = second[ j ];
        }

    } else {
        while ( second[ j ] !== undefined ) {
            first[ i++ ] = second[ j++ ];
        }
    }

    first.length = i;

    return first;
};
