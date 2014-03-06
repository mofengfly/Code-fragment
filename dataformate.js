/**
     * 时间对象的格式化;
     */
    Date.prototype.format = function(format) {
        /*
         * eg:format="yyyy-MM-dd hh:mm:ss";
         */
        var o = {
            "M+" : this.getMonth() + 1, // month
            "d+" : this.getDate(), // day
            "h+" : this.getHours(), // hour
            "m+" : this.getMinutes(), // minute
            "s+" : this.getSeconds(), // second
            "q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
            "S+" : this.getMilliseconds()
            // millisecond
        }

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4
                - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                var formatStr="";
                for(var i=1;i<=RegExp.$1.length;i++){
                    formatStr+="0";
                }

                var replaceStr="";
                if(RegExp.$1.length == 1){
                    replaceStr=o[k];
                }else{
                    formatStr=formatStr+o[k];
                    var index=("" + o[k]).length;
                    formatStr=formatStr.substr(index);
                    replaceStr=formatStr;
                }
                format = format.replace(RegExp.$1, replaceStr);
            }
        }
        return format;
    }
