function cloneObject(obj){
     var o = obj.constructor === Array ? [] : {};
     for(var i in obj){
         if(obj.hasOwnProperty(i)) {
             o[i] = typeof obj[i] === "object" ? cloneObject(obj[i]) : obj[i];
         }
      }
}
