<?php 
require_once('function.php');

if(isset($_POST['token'])) {
	$data=json_decode($_POST['data']);
	$counter=1;
	foreach($data as $key=>$val)
	{
		save_record($val,$counter);
		$counter++;
	}	
	echo "saved";
}
?>