/*
 * JavaScript framework: amz
 * Copyright (c) 2010 meizz, http://www.meizz.com/amz/
 *
 * http://www.opensource.org/licenses/MIT
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software
 */

/*
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * @description amz 脚本框架的顶级命名空间
 *
 * @name amz
 * @author meizz
 * @version 2012-04-01
 * @modify
 *
 * @grammer amz( selector[, context] )
 *
 * @param   {object}        selector    String|Array|NodeList|HTMLElement|Document|HTMLString|Function
 * @param   {HTMLElement}   context     [可选]CSS选择器的选择范围
 * @return  {ArrayLike}     first ArrayLike
 */
var amz = amz || function( selector, context ) {
    return amz.$ ? amz.$( selector, context ) : null;
};

amz.version = "20120401";

// Page unique id
amz.guid = "$MEIZZ$";
amz.key = "amz_guid";

// 20120709 mz 添加参数类型检查器，对参数做类型检测保护
amz.check = amz.check || function(){};
amz.argument = amz.argument || function(){};
amz.equal = amz.equal || function(){};

// 顶级域名 amz 有可能被闭包劫持，而需要页面级唯一信息时需要用到下面这个对象
var _ = window[amz.guid] = window[amz.guid] || {};
(_.versions || (_.versions=[])).push(amz.version);

// Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = amz;
}

/* 形参推荐用词
 * callback context filter options key value selector
 * any from to item iterator match unknow target type
 * duration interval enumerable
 * array element event fn htmlstring number string src url
 * amzDom
 */