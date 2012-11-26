///import amz.task;
///import amz.isEnumerable;

/**
 * @description 判断某一组对象，都符合指定的条件
 * @author meizz
 * @create 2012-11-24
 * @function 
 * @name amz.task.every
 * @grammar amz.task().every(array, iterator)
 * @param   {Array}     array       被枚举的对象
 * @param   {Function}  iterator    枚举函数(item, index, array)
 */
amz.task.extend({
    every: function(array, iterator){
        if ( amz.isEnumerable(array) ) {
            this.queue.push( function(){
                for (var i=0, n=array.byteLength||array.length; i<n; i++) {
                    if (!iterator(array[i], i, array)) return false;
                }
                return true;
            });
        }
        return this;
    }
});