///import amz.task;

/**
 * @description 让当前正在执行的事件暂停一段时间
 * @author meizz
 * @create 2012-11-20
 * @function 
 * @name amz.task.sleep
 * @grammar amz.task.sleep(msec)
 * @param   {Number}    msec    暂停的时间（单位：毫秒）
 * @return  {$Task}             返回Task对象
 */
amz.task.extend({
    sleep: function(msec){
        this.queue.push(function(){
            var now = new Date().getTime();
            this._startTime || (this._startTime = now);
            if (now - this._startTime > msec) {
                delete this._startTime;
                return true;
            }
        });
        return this;
    }
});