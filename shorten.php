<?php
session_start();
require_once 'core/app.php';

$web = "localhost"; //Setting URL disini, contoh : www.google.com (tanpa http)
$s = new Shortener;

if(isset($_POST['url'])){
	$url = $_POST['url'];

	if($code = $s->makeCode($url)){
		$_SESSION['feedback'] = "<div class=\"alert alert-success\">Sukses! URL kamu adalah: <Strong><a href=\"http://{$web}/{$code}\">{$web}/$code</a></Strong></div>";
	}else{
		$_SESSION['feedback'] = "<div class=\"alert alert-danger\">Error, yakin udah input dengan benar?</div>";
	}
}

header('Location: index.php');

?>