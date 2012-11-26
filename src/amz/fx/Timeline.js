///import amz.base.inherits;
///import amz.base.Class;

/**
 * @description 提供一个按时间进程的时间线类
 * @class
 * @name amz.fx.Timeline
 * @grammer amz.fx.Timeline([options])
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
 *  onupdate
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
amz.fx.Timeline = function(options) {
    amz.base.Class.call(this);

    this.interval = 16;
    this.duration = 500;
    this.delay    = 0;  // 0立即执行 n延迟n毫秒 -1只实例化不执行(用于效果组合)
    this.from     = 0;
    this.to       = 1;
    this.minFrames= 0;
    this.transitional   = true;   // 连续渐变的

    this.delta    = 0;  // 每次脉冲的间隔步长
    this.schedule = 0;  // 进度，0 到 1 (浮点小数)

    amz.extend(this, options);
};

amz.base.inherits(amz.fx.Timeline, amz.base.Class, "amz.fx.Timeline").extend({

    launch: function(){return this.play(true);}

    // 脉冲函数
    ,_pulsed_: function(first){
        var me = this
            , old = me.schedule
            , now = new Date().getTime();

        first && (me._endTime_ = (me._beginTime_ = now) + me.duration);

        me.schedule = (now - me._beginTime_) / me.duration;
        me.delta = me.schedule - old;

        // 时间线终点
        if (now >= me._endTime_) {
            typeof me.render == "function" && me.render(me.transition(me.schedule = 1));
            typeof me.finish == "function" && me.finish();

            me.fire("onfinish");
            me.fire("onafterfinish");
            me.dispose();
            return;
        }

        /**
         * [interface run] render() 用来实现每个脉冲所要实现的效果
         * @param {Number} schedule 时间线的进度
         */
        typeof me.render == "function" && me.render(me.transition(me.schedule));
        me.fire("onupdate");

        me._timer_ = setTimeout(function(){me._pulsed_()}, me.interval);
    }
    ,transition: function(schedule){return schedule;}

    ,abort: function(){
        this._timer_ && clearTimeout(this._timer_);
        this.fire("onabort");
        this.dispose();
    }
    ,cancel: function(){
        this._timer_ && clearTimeout(this._timer_);
        this._endTime_ = this._beginTime_;

        typeof this.restore == "function" && this.restore();
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
    ,play: function(first){
        var me = this
            , now = new Date().getTime();

        // first run
        if (first) {
            me.fire("onbeforestart");
            typeof me.initialize == "function" && me.initialize();
            me.fire("onstart");

            if (me.delay) {setTimeout(function(){me._pulsed_(first)}, me.delay)}
            else me._pulsed_(first);
        
        // pause replay
        } else {
            me._beginTime_ = now - parseInt(me.schedule * me.duration);
            me._endTime_ = me._beginTime_ + me.duration;
            me._pulsed_();
        }

        return this;
    }
});
