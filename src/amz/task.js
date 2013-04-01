///import amz.isFunction;
///import amz.createChain;

/**
 * @description 创建“事物”对象，该对象可以附加各种先决条件
 * @author meizz
 * @create 2012-11-20
 * @function 
 * @name amz.task
 * @grammar amz.task(fn)
 * @param   {Function}  fn  准备要做的事
 * @return  {$Task}         返回一个Task对象
 */
amz.createChain("task",
    function(fn){
        return new amz.task.$Task(fn);
    },
    // constructor
    function(task){
        this.finalTask = amz.isFunction(task) ? [task] : [];
        this.queue = [];
        this.interval = 16;
        this.finished = false;
    }
).extend({
    /**
     * @description 启动执行事物
     * @param   {Function}  fn  可以指定被执行的事物
     */
    run: function(fn){
        var me = this;
        amz.isFunction(fn) && me.finalTask.push(fn);
        if ( me.queue.length>0 ) {
            me._timer = setInterval(function(){me._pluse()}, me.interval);
        } else me._pluse();
        return this;
    }

    /**
     * @description 循环等待条件函数返回true，如果条件函数没有true的返回值分支，则整个事物进入死循环
     * @param   {Function}  condition   条件函数，必须有返回值true的分支
     */
    ,when: function(condition){
        amz.isFunction(condition) && this.queue.push(condition);
        return this;
    }

    /**
     * @description 当上一个条件满足时，做一件任务
     * @param   {Function}  job     指定的任务
     */
    ,then: function(job) {
        var me = this;
        amz.isFunction(job) && this.queue.push(function(){job(me); return true});
        return this;
    }

    /**
     * @description 事件的时间脉冲函数
     */
    ,_pluse: function(){
        if ( this.queue.length>0 ) {
            this.queue[0](this) && this.queue.shift();
        } else {
            for (var i=0, n=this.finalTask.length; i<n; i++) {
                this.finalTask[i](this);
            }
            this.abort();
        }
    }

    /**
     * @description 直接中断事物
     */
    ,abort: function() {
        this._timer && clearInterval(this._timer);

        // dispose
        for (var pro in this) delete this[pro];

        this.finished = true;
        return this;
    }
});