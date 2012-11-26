///import amz;

/*
 * @description 为当前的新链头对象赋加.getBack()方法，追溯上一个链头对象
 * @author meizz
 * @create 2012-11-19
 *
 * @function
 * @name amz.setBack
 * @grammar amz.setBack(current, oldChain)
 * @param   {Object}    current     新链头对象
 * @param   {Object}    oldChain    老链头对象
 * @return  {Object}                current
 */
amz.setBack = function(current, oldChain) {
    current._back_ = oldChain;
    current.getBack = function() {
        return this._back_;
    }
    return current;
};
