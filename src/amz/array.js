///import amz.isArray;
///import amz.createChain;

/**
 * @description Array的链头
 * @author meizz
 * @create 2012-11-29
 * @function 
 * @name amz.array
 * @grammar amz.array([array])
 * @param   {Array}     array   Array对象
 * @return  {$Array}            拥有链式方法的对象
 */
amz.array = amz.createChain("array", function(){
    var pro = amz.array.fn
        ,ap = Array.prototype
        ,key;

    amz.isArray( array ) || ( array = [] );

    for (key in pro ){
        ap[key] || (array[key] = pro[key]);
    }

    return array;
});

// 对系统方法新产生的 array 对象注入自定义方法，支持完美的链式语法
amz.overwrite(amz.array.$Array, "concat slice".split(" "), function(key) {
	return function() {
		return amz.array( Array.prototype[key].apply(this, arguments) );
	}
});