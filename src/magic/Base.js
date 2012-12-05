///import magic;

///import amz.regexp;
///import amz.isString;
///import amz.isElement;
///import amz.base.Class;
///import amz.base.inherits;

/**
 *
 */
magic.Base = function(){
    amz.base.Class.call(this);

    // 作为DOM元素id组合的前缀，以达到页面唯一id
    this._eid = this._type_.replace(amz.regexp("\\W", "g"), "_") +"__"+ this.guid +"__";

    // 指定自定义 id<->dom 映射，主要应用于先有dom，反向创建控件的场景
    this._ids = {};
};

amz.base.inherits(magic.Base, amz.base.Class, "magic.Base").extend({

    /**
     * @description 取得一个页面唯一的 id
     * @param   {String}    key     该ID对应的关键字(可选参数)
     * @return  {String}            页面唯一的 id，可以作为DOM元素的id
     */
    getId: function(key) {
        key = amz.isString(key) ? key : "";
        return this._ids[key] || this._eid + key;
    }

    /**
     * 取得 ui 模块对应的 dom element 对象
     * @param   {String}    key     该ID对应的关键字(可选参数)
     * @param   {Document}  owner   目标元素所处的 documnet
     * @return  {Object}    ui模块对应的dom element
     */
    ,getElement: function(id, owner) {
        return (owner||document).getElementById(this.getId(id));
    }

    /**
     * @description 这是一个针对 setup 反向创建对象的特有方法，将类里key与DOM建立映射
     * @param   {String}    key
     * @param   {HTMLElement | String}  dom 被映射的DOM对象
     */
    ,mappingDom: function(key, dom){
        if (amz.isString(dom)) {
            this._ids[key] = dom;

        } else if (amz.isElement(dom)) {
            dom.id ? this._ids[key] = dom.id : dom.id=this.getId(key);
        }
        return this;
    }

    // 私有方法，与 .render() 方法配合使用
    ,_render: function(html, container) {
        // 指定容器则直接innerHTML插入
        if (amz.isElement(container)) {
            container.innerHTML = html;
            this.fire("onrender");

        // 没有容器则返回 HTML 以便用户自己决定如何处理
        } else {
            var me = this;
            var timer = setInterval(function(){
                if (me.getElement()) {
                    clearInterval(timer);
                    me.fire("onrender");
                }
            }, 14);
            return html;
        }
    }
});