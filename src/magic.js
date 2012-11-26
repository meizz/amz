/*
 * JavaScript framework: amz
 * Copyright (c) 2010 meizz, http://www.meizz.com/amz/
 *
 * http://www.meizz.com/amz/license/ MIT-style license
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
 * @description magic UI模块代码库的顶级命名空间
 *
 * @name magic
 * @author meizz
 * @version 2012-11-11
 * @modify
 *
 * @grammer magic()
 */
var magic = magic || {};

/msie 6/i.test(navigator.userAgent) && 
document.execCommand("BackgroundImageCache", false, true);
/* 形参推荐用词
 * callback context filter options key value selector
 * any from to item iterator match unknow target type
 * duration interval enumerable
 * array element event fn htmlstring number string src url
 * amzDom
 */