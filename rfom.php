<?php
ini_set('display_errors', 0);

header('Access-Control-Allow-Origin: *');

if($_GET['do'] == 'setURL' && $_GET['url']  !=''){
  file_put_contents('url.txt', $_GET['url']);
  echo "";
}
else{
  echo file_get_contents('url.txt');
}
?>
