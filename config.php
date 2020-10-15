<?php 

error_reporting(0);
set_time_limit(0);

/* define database credentials*/
define('DBHOST','localhost');
define('DBUSER','u258359028_navratriwithmi');
define('DBPASS','NavratriMi8');
define('DBNAME','u258359028_Navratriwithmi');

/* Connection to Database*/
$connection = mysqli_connect(DBHOST,DBUSER,DBPASS,DBNAME);
if(!$connection){
    die('Can not connect to server.');
}

/* sanitise input from user to avoid geting hacked */

function sanitise($string){
    $string = mysqli_real_escape_string($GLOBALS['connection'],$string);
    $string = htmlentities($string);
    return $string;
}



?>
