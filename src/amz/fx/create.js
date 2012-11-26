///import amz.fx;
///import amz.fx.Timeline;

/**
 * 效果基类。
 * @function
 * @grammar amz.fx.collapse(element, options, fxName)
 * @param     {HTMLElement}           element            添加效果的DOM元素
 * @param     {JSON}                  options            时间线的配置参数对象
 * @config    {Function}              transition         function(schedule){return schedule;},时间线函数
 * @config    {Function}              onbeforestart      function(){},//效果开始前执行的回调函数
 * @config    {Function}              onbeforeupdate     function(){},//每次刷新画面之前会调用的回调函数
 * @config    {Function}              onafterupdate      function(){},//每次刷新画面之后会调用的回调函数
 * @config    {Function}              onafterfinish      function(){},//效果结束后会执行的回调函数
 * @config    {Function}              oncancel           function(){},//效果被撤销时的回调函数
 * @param     {String}                fxName             效果名（可选）
 * @return {amz.fx.Timeline}  时间线类的一个实例
 */
amz.fx.extend({
    create: function(element, options, fxName) {
        var timeline = new amz.fx.Timeline(options);

        fxName && (timeline._type_ = fxName);
        timeline["\x06original"] = {};   // 20100708
        var catt = "amz_current_effect";

        /**
         * 将实例的guid记录到DOM元素上，以便多个效果叠加时的处理
         */
        timeline.on("onbeforestart", function(){
            var me = this, guid;
            me.attribName = "att_"+ me.__type.replace(/\W/g, "_");
            guid = me.element.getAttribute(catt);
            me.element.setAttribute(catt, (guid||"") +"|"+ me.guid +"|", 0);

            if (!me.overlapping) {
                (guid = me.element.getAttribute(me.attribName)) 
                    && window[amz.guid]._instances[guid].cancel();

                //在DOM元素上记录当前效果的guid
                me.element.setAttribute(me.attribName, me.guid, 0);
            }
        });

        /**
         * 打扫dom元素上的痕迹，删除元素自定义属性
         */
        timeline["\x06clean"] = function(e) {
            var me = this, guid;
            if (e = me.element) {
                e.removeAttribute(me.attribName);
                guid = e.getAttribute(catt);
                guid = guid.replace("|"+ me.guid +"|", "");
                if (!guid) e.removeAttribute(catt);
                else e.setAttribute(catt, guid, 0);
            }
        };

        /**
         * 在时间线结束时净化对DOM元素的污染
         */
        timeline.on("oncancel", function() {
            this["\x06clean"]();
            this["\x06restore"]();
        });

        /**
         * 在时间线结束时净化对DOM元素的污染
         */
        timeline.on("onafterfinish", function() {
            this["\x06clean"]();
            this.restoreAfterFinish && this["\x06restore"]();
        });

        /**
         * 保存原始的CSS属性值 20100708
         */
        timeline.protect = function(key) {
            this["\x06original"][key] = this.element.style[key];
        };

        /**
         * 时间线结束，恢复那些被改过的CSS属性值
         */
        timeline["\x06restore"] = function() {
            var o = this["\x06original"],
                s = this.element.style,
                v;
            for (var i in o) {
                v = o[i];
                if (typeof v == "undefined") continue;

                s[i] = v;    // 还原初始值

                // [TODO] 假如以下语句将来达不到要求时可以使用 cssText 操作
                if (!v && s.removeAttribute) s.removeAttribute(i);    // IE
                else if (!v && s.removeProperty) s.removeProperty(i); // !IE
            }
        };

        return timeline;
    }
});
