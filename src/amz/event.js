///import amz;
///import amz.type;
///import amz.isString;
///import amz.isFunction;
///import amz.extend;
///import amz.createChain;

/**
 * @description 对系统event对象进行封装，主要是解决浏览器兼容问题，并且做了功能增强
 * @author meizz, dron
 * @create 2012-06-14
 * @function
 * @name amz.event
 * @grammar amz.event([event])
 * @param   {Event}         event   系统 event 对象
 * @return  {TangramEvebt}          返回 new TangramEvent 对象
 */

amz.createChain("event",

    // method
    function(){
        var lastEvt = {};

        // main function
        return function( event ){
            switch( amz.type( event ) ){
                // system event
                case "object":
                    return lastEvt.originalEvent === event ? 
                        lastEvt : lastEvt = new amz.event.$Event( event );

                case "$Event":
                    return event;

                // event type
                case "string" :
                    return new amz.event.$Event( event );
            }
        }
    }(),

    // constructor
    function( event ){
        var e, t, f, me = this;

        this._type_ = "$Event";

        if( typeof event == "object" && event.type ){

            me.originalEvent = e = event;

            for( var name in e ) {
                amz.isFunction( e[name] ) || (me[ name ] = e[ name ]);
            }

            if( e.extraData ) {
                amz.extend( me, e.extraData );
            }

            me.target = me.srcElement = e.srcElement || (
                ( t = e.target ) && ( t.nodeType == 3 ? t.parentNode : t )
            );

            me.relatedTarget = e.relatedTarget || (
                ( t = e.fromElement ) && ( t === me.target ? e.toElement : t )
            );

            me.keyCode = me.which = e.keyCode || e.which;

            // Add which for click: 1 === left; 2 === middle; 3 === right
            if( !me.which && e.button !== undefined ) {
                me.which = e.button & 1 ? 1 : ( e.button & 2 ? 3 : ( e.button & 4 ? 2 : 0 ) );
            }

            var doc = document.documentElement, body = document.body;

            me.pageX = e.pageX || (
                e.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0)
            );

            me.pageY = e.pageY || (
                e.clientY + (doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc && doc.clientTop  || body && body.clientTop  || 0)
            );

            me.data;
        }

        // event.type
        amz.isString( event ) && (this.type = event);

        // event.timeStamp
        this.timeStamp = new Date().getTime();
    }

).extend({
    stopPropagation : function() {
        var e = this.originalEvent;
        e && ( e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true );
    },

    preventDefault : function() {
        var e = this.originalEvent;
        e && ( e.preventDefault ? e.preventDefault() : e.returnValue = false );
    }
});
