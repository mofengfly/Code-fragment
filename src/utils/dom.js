/**
 * @fileoverview 提供DOM的基本操作
 * @module util
 **/
 KISSY.add('etao/header/util', function(S){
     var doc = document,
         win = window,
         SPACE = ' ';
     var DOM = {
         /**
          * id 选择器
          * @return {DOM Object}
          */
          $: function(id){
              return doc.getElementById(id);
          },
         get: this.$,
         /**
          * 类选择器
          * @return {DOM Object}
          */
         getElementsByClass: function(cls, context) {
             var self = this,
                 node = context ? doc.getElementById(context) || context : doc;
             if (doc.querySelectorAll) {
                 return node.querySelectorAll('.' + cls);
             } else {
                 var els = node.getElementsByTagName('*'),
                     len = els.length,
                     ret = [];

                 for (var i = 0; i < len; i++) {
                     var el = els[i];
                     self.hasClass(el, cls) && ret.push(el);
                 }
                 return ret;
             }
         },
         query: this.getElementsByClass,
         html: function(node, htmlString){

         },
         /**
          *  判断DOM节点是否还有cls
          * @param  el   {Object}
          * @param cls   {String}
          */
         hasClass: function(el, cls){
             var className = el && el.className;
             return className && (SPACE + className + SPACE).indexOf(SPACE + cls + SPACE) > -1;
         },
         /**
          *  增加Class
          * @param  el   {Object}
          * @param cls   {String}
          */
         addClass: function(el, cls) {
             var className = el && el.className;

             if (el) {
                 className = (SPACE + className + SPACE);
                 !~className.indexOf(SPACE + cls + SPACE) && (el.className = S.trim(className + cls));
             }
         },
         /**
          * 移除cls
          * @param {Object} el
          * @param {String} cls
          */
         removeClass: function(el, cls) {
             var className = el && el.className;
             if (className) {
                 className = (SPACE + className + SPACE).replace(SPACE + cls + SPACE, SPACE);
                 el.className = S.trim(className);
             }
         },
         /**
          * 获取设置节点样式
          * @param {Object} node
          * @param {String} name
          * @param {String} value
          */
         css: function(node, name, value) {
             /**
              * 获取节点样式
              * @param {Object} node
              * @param {String} name
              */
             var get = function(node, name) {
                 var value;

                 if (win.getComputedStyle) {
                     // 标准浏览器
                     value = win.getComputedStyle(node, null)[name];
                 } else {
                     // IE 浏览器
                     value = node.currentStyle[name];

                     // 未设置宽高默认返回 auto
                     if (value === 'auto' && (name === 'width' || name == 'height')) {
                         return util.getWH(node, name);
                     }
                 }

                 return value;
             };

             /**
              * 设置节点样式
              * @param {Object} node
              * @param {String} name
              * @param {String} value
              */
             var set = function(node, name, value) {
                 node.style[name] = value;
             };

             if (value) {
                 set(node, name, value);
             } else {
                 return get(node, name);
             }
         }

    };
     var Event = {
         /**
          * 添加事件
          * @param {Object}   el
          * @param {String}   type
          * @param {Function} fn
          * @param {Boolean}  capture
          */
         addEvent: function(el, type, fn, capture) {
             if (!el) return;
             if (el.addEventListener) {
                 el.addEventListener(type, fn, !!capture);
             } else if (el.attachEvent) {
                 el.attachEvent('on' + type, fn);
             }
         },
         /**
          * 移除事件
          * @param {Object}   el
          * @param {String}   type
          * @param {Function} fn
          * @param {Boolean}  capture
          */
         removeEvent: function(el, type, fn, capture) {
             if (!el) return;
             if (el.removeEventListener) {
                 el.removeEventListener(type, fn, !!capture);
             } else if (el.detachEvent) {
                 el.detachEvent('on' + type, fn);
             }
         } ,
         /**
          * 获取事件对象
          * @param  {Object} event
          * @return {Object}
          */
         getEvent: function(event) {
             return event ? event : win.event;
         },

         /**
          * 获取事件目标
          * @param  {Object} event
          * @return {Object}
          */
         getTarget: function(event) {
             return event.target || event.srcElement;
         },
         /**
          * 取消事件默认行为
          * @param {Object} event
          */
         preventDefault: function(event) {
             if (event.preventDefault) {
                 event.preventDefault();
             } else {
                 event.returnValue = false;
             }
         },

         /**
          * 取消事件向上冒泡
          * @param {Object} event
          */
         stopPropagation: function(event) {
             if (event.stopPropagation) {
                 event.stopPropagation();
             } else {
                 event.cancelBubble = true;
             }
         },
         /**
          * 是否IE6浏览器
          * @return {Boolean}
          */
         isIE6: function() {
             var ua = util.getUA(),
                 m  = ua.match(/MSIE ([\w.]+)/);

             return !!(m && m[1] === '6.0');
         }
     };
     var MILLISECONDS_OF_DAY = 24 * 60 * 60 * 1000,
         encode = encodeURIComponent,
         decode = S.urlDecode;

     function isNotEmptyString(val) {
         return (typeof val == 'string') && val !== '';
     }
     var Cookie = {
         /**
          * 获取制定名字的cookie值
          * @return {String} name cookie名字
          */
         get: function (name) {
             var ret, m;
             if (isNotEmptyString(name)) {
                 if ((m = String(doc.cookie).match(
                     new RegExp('(?:^| )' + name + '(?:(?:=([^;]*))|;|$)')))) {
                     ret = m[1] ? decode(m[1]) : '';
                 }
             }
             return ret;
         },

         set: function (name, val, expires, domain, path, secure) {
             var text = String(encode(val)), date = expires;

             // 从当前时间开始，多少天后过期
             if (typeof date === 'number') {
                 date = new Date();
                 date.setTime(date.getTime() + expires * MILLISECONDS_OF_DAY);
             }
             // expiration date
             if (date instanceof Date) {
                 text += '; expires=' + date.toUTCString();
             }

             // domain
             if (isNotEmptyString(domain)) {
                 text += '; domain=' + domain;
             }

             // path
             if (isNotEmptyString(path)) {
                 text += '; path=' + path;
             }

             // secure
             if (secure) {
                 text += '; secure';
             }

             doc.cookie = name + '=' + text;
         },

         /**
          * 移除cookie
          * @param {String} name 要移除的cookie名称.
          * @param {String} domain
          * @param {String} path
          * @param {String} secure
          */
         remove: function (name, domain, path, secure) {
             this.set(name, '', -1, domain, path, secure);
         }
     };
     /*
      * 工具函数
      */
     var tools = {
         // 编码 HTML (from prototype framework 1.4)
         escapeHTML: function (str) {
             var div = doc.createElement('div');
             var text = doc.createTextNode(str);
             div.appendChild(text);
             return div.innerHTML;
         },

         // 获取环境(daily，online，dev)
         getEnv: function () {
             var domain = doc.domain;
             var env = 'dev';
             if (domain.indexOf('daily.etao.net') != -1) env = 'daily';
             if (domain.indexOf('etao.com') != -1) env = 'online';
             return env;
         },
         //渲染，将模板字符串t里面的{k}替换为d[k]
         render: function (t, d) {
             return t.replace(/{([^}]+)}/g, function (all, k) { return d[k]; });
         },
         IE6Hover: function (el, cls) {
             var IE6 = !!(S.UA.ie < 7);
             if (!IE6 || !el) return;

             cls = cls || 'hover';
             el = DOM.get(el);

             Event.on(el, 'mouseenter', function () {
                 DOM.addClass(this, cls);
             });

             Event.on(el, 'mouseleave', function () {
                 DOM.removeClass(this, cls);
             });
         },
         initAria: function (el) {
             // tab 切换展开菜单
             el = DOM.get(el);
             if (!el) return;

             var link = DOM.children(el, 'a')[0];

             Event.on(link, 'keydown', function (evt) {
                 S.log(evt.keyCode);
                 // esc取消弹出层
                 if (evt.keyCode == 27) {
                     evt.halt(true);
                     DOM.removeClass(el, 'hover');
                 }

                 //下键展开弹出层
                 if (evt.keyCode == 40) {
                     evt.halt(true);
                     DOM.addClass(el, 'hover');
                 }
             });

             Event.on(el, 'mouseleave', function (evt) {
                 if (DOM.hasClass(el, 'hover')) {
                     DOM.removeClass(el, 'hover');
                 }
             });
         }
     };

     return {
         DOM: DOM,
         Event: Event,
         Cookie: Cookie,
         tools:tools
     };
 })
