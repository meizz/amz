///import amz.fx;
///import amz.extend;
///import amz.isFunction;
///import amz.base.Class;
///import amz.base.inherits;

/**
 * @description 提供一个按时间进程的时间线类
 * @class
 * @name amz.fx.Effect
 * @grammer amz.fx.Effect([options])
 * @author meizz
 * @create 2012-09-28
 *
 * 本类提供两个方法：
 *  abort()     中断
 *  cancel()    取消操作
 *  end()       直接结束
 *  pause()     暂停
 *  play()      启动
 *
 * 事件：
 *  onbeforestart
 *  onstart
 *  onupdate
 *  onfinish
 *  onafterfinish
 *  onabort
 *  oncancel
 *  onend
 *  onpause
 *  ondispose
 *
 * 使用本类时需要实现五个接口：
 *  initialize()            用于类初始化时的操作
 *  transition(schedule)    重新计算时间线进度曲线
 *  finish()                用于类结束时时的操作
 *  render(schedule)        每个脉冲在DOM上的效果展现
 *  restore()               效果被取消时作的恢复操作
 *
 * @config {Number} interval 脉冲间隔时间（毫秒）
 * @config {Number} duration 时间线总时长（毫秒）
 * @config {Number} schedule 时间线进度的百分比（0.0-1.0）
 * @config {Number} delay    延迟（毫秒）
 * @config {Number} delta    步长，两帧之间的进度差（毫秒）
 * @config {Number} form     起始点（0.0-1.0）
 * @config {Number} to       终止点（0.0-1.0）
 * @config {Boolean}transitional    连续渐变的
 */
amz.fx.Effect = function(options) {
    amz.base.Class.call(this);

    this.interval = 12;
    this.duration = 500;
    this.percent  = 0;  // 进度，0 到 1 (浮点小数)
    this.delay    = 0;  // 0立即执行 n延迟n毫秒 -1只实例化不执行(用于效果组合)
    this.delta    = 0;  // 每次脉冲的间隔步长
    this.from     = 0;
    this.to       = 1;
    this.fps      = 80; // max fps
    this.frames   = 0;  // min frames

    this.transitional   = true;   // 连续渐变的
    amz.extend(this, options);
};

amz.base.inherits(amz.fx.Effect, amz.base.Class, "amz.fx.Effect").extend({

    launch: function(){return this.play();}

    ,_render_: function(percent){
        var me = this;

        me._frame_ ++;

        // 延时保帧
        if ( me.frames>0 && me._frame_/me.frames<percent ) {
            me.duration = Math.ceil(me.duration * percent * me.frames / me._frame_);
            me._endTime_= me._beginTime_ + me.duration;
        }

        me.delta = percent - me.percent;
        me.percent = percent;

        /**
         * [interface run] render() 用来实现每个脉冲所要实现的效果
         * @param {Number} percent 时间线的进度
         */
        amz.isFunction( me.render ) && me.render(me.transition(percent));
        me.fire("onupdate");
    }
    // 脉冲函数
    ,_pulsed_: function(first){
        var me = this
            , now = new Date().getTime();

        first && (me._endTime_ = (me._beginTime_ = now) + me.duration);

        // 时间线终点
        if (now >= me._endTime_) {
            me._render_(1);
            amz.isFunction( me.finish ) && me.finish();

            me.fire("onfinish");
            me.fire("onafterfinish");
            me.dispose();
            return;
        }
        me._render_((now - me._beginTime_) / me.duration);

        me._timer_ = setTimeout(function(){me._pulsed_()}, me.interval);
    }
    ,transition: function(percent){return percent;}

    ,abort: function(){
        this._timer_ && clearTimeout(this._timer_);
        this.fire("onabort");
        this.dispose();
    }
    ,cancel: function(){
        this._timer_ && clearTimeout(this._timer_);
        this._endTime_ = this._beginTime_;

        amz.isFunction( this.restore ) && this.restore();
        this.fire("oncancel");
        this.dispose();
    }
    ,end: function(){
        this._timer_ && clearTimeout(this._timer_);
        this._endTime_ = this._beginTime_;
        this._pulsed_();
    }
    ,pause: function(){
        this._timer_ && clearTimeout(this._timer_);
        this.fire("onpause");
    }
    ,play: function(){
        var me = this
            , first = !me._beginTime_
            , now = new Date().getTime();

        // delay
        if (!me._delay_ && me.delay) {
            setTimeout(function(){me.play()}, me.delay);
            me._delay_ = true;
            return me;
        }

        // first run
        if (first) {
            me.fire("onbeforestart");
            amz.isFunction( me.initialize ) && me.initialize();
            me.fire("onstart");
            me._frame_ = 0;
            me.interval = Math.floor(1000 / me.fps);

            me._pulsed_(first);
        
        // pause replay
        } else {
            me._beginTime_ = now - parseInt(me.percent * me.duration);
            me._endTime_ = me._beginTime_ + me.duration;
            me._pulsed_();
        }

        return this;
    }
});
