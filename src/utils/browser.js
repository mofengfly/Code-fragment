 function  isChrome360(){
      if( navigator.userAgent.toLowerCase().indexOf('chrome') > -1 ) {
          var desc = navigator.mimeTypes['application/x-shockwave-flash'].description.toLowerCase();
          if( desc.indexOf('adobe') > -1 ) {
              return true;
          }
      }
      return false;
  },
