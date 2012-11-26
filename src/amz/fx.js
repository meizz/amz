///import amz.type;
///import amz.createChain;

/**
 * @description 动画类的名称空间，也是动画类操作的链头函数
 * @function
 * @name amz.fx
 *
 * @author meizz
 * @create 2012-09-27
  */
amz.fx = amz.fx || amz.createChain("fx", 
    // method
    function(tdom, options){
        amz.type(tdom) == "$DOM" && (tdom = tdom[0]);
        if ( !amz.isElement(tdom) ) {
            throw new Error("no fx element");
            return null;
        }

        var fx = new amz.fx.$Fx(options);
        fx.element = tdom;
        return fx;
    }, 

    // constructor
    function(options){
        this._type_ = "$FX";
    }
);