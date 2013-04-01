///import amz.extend;
///import amz.fx.Effect;
///import amz.isFunction;
///import amz.base.Class;
///import amz.base.inherits;

/**
 * 时间轴对象，可以在该时间轴上挂载许多的片断(section)
 * @author meizz
 * @create 2013-3-21
 * @class
 * @name amz.fx.Timeline
 * @grammar new amz.fx.Timeline([options])
 */
amz.fx.Timeline = function( options ) {
    amz.base.Class.call(this);

    this.interval = 12;
    this.fps = 80;              // max fps

    this._effects_ = [];
    this._sections_ = [];

    amz.extend(this, options);
};
amz.base.inherits(amz.fx.Timeline, amz.base.Class, "amz.fx.Timeline").extend({
    section: function( time, effectOptions ){}
    /**
     * 脉冲函数
     * @param  {Boolean} first 是否为第一次运行
     */
    ,_pulsed_: function(first){
        var me = this, item, fx, fn, i
            ,now = new Date().getTime()
            ,n = now - me._beginTime_;

        for (i = me._sections_.length - 1; i >= 0; i--) {
            if (n >= (item = me._sections_[i])[0]){
                fx = new amz.fx.Effect( item[1] );
                me._effects_[ fx.guid ] = fx.play;
                me._sections_.splice(i, 1);
                fn = function(e){delete me._effects_[e.currentTarget.guid]};
                fx.on("finish", fn);
                fx.on("abort", fn);
            }
        };

        if (me._sections_.length) {
            clearTimeout(me._timer_);
            me._timer_ = setTimeout(function(){me._pulsed_()}, me.interval);
        }
    }
    /**
     * 暂停时间轴，包括正在运行的动画
     * @return {amz.fx.Timeline} 时间轴对象
     */
    ,pause: function(){
        var me = this, fx;

        me._pauseTime_ = new Date().getTime();
        for ( fx in me._effects_ ) me._effects_[fx].pause();
        me.fire("onpause");

        return me;
    }
    /**
     * 中断时间轴
     * @return {amz.fx.Timeline} 时间轴对象
     */
    ,abort: function(){
        var me = this, fx;

        for ( fx in me._effects_ ) me._effects_[fx].abort();
        me.fire("onabort");

        return me;
    }
    /**
     * 时间轴正式开始运行
     * @return {amz.fx.Timeline} 时间轴对象
     */
    ,play: function(){
        var me = this
            ,now = new Date().getTime()
            ,first = !me._pauseTime_;

        // first
        if (first) {
            me.fire("onbeforestart");
            amz.isFunction(me.initialize) && me.initialize();
            me.fire("onstart");

            me.interval = Math.floor(1000 / me.fps);
            me._beginTime_ = now;
            me._pulsed_(first);

        // pause replay
        } else {
            for (var fx in me._effects_) me._effects_[ fx ].play();
            me._beginTime_ = now - me._pauseTime_ + me._beginTime_;
            me._pauseTime_ = false;
            me._pulsed_();
        }

        return this;
    }
});