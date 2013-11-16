//url正则
var urlReg=new RegExp("((^http)|(^https)|(^ftp)):\/\/(\\w)+\.(\\w)+");

//简单html标签
var RE_SIMPLE_TAG = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;

var R_HTML = /<|&#?\w+;/;
//标签
var RE_TAG = /<([\w:]+)/;
var R_LEADING_WHITESPACE = /^\s+/;
var R_TAIL_WHITESPACE = /\s+$/,
