Expires:

session_start();  

header('Expires:'.date('D, d M Y H:i:s \G\M\T', time()+60));  

$_SESSION['url']='www.phpben.com';  

last-modified and if-last-modified

if(isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) && (time()-strtotime($_SERVER['HTTP_IF_MODIFIED_SINCE']) < 10))  
{  
   header("HTTP/1.1 304 Not Modified");  
   exit;  
} else  {  
  if (date_default_timezone_get()=='UTC')  
  {  
    header("Last-Modified:" . date('D, d M Y H:i:s \G\M\T', time()));  
  } else   {  //这是针对时区设为PRC、Asia/ShangHai等中国时区
    header("Last-Modified:" . date('r', time()));  
  }  

}  
