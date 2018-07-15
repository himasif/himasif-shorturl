<?php
session_start();

?>
<!DOCTYPE html>
<html lang="en">
<head>

<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta charset="utf-8">
<meta name="description" content="Short url by Himasif">
<link rel="shortcut icon" href="assets/favicon.ico">
<link rel="stylesheet prefetch" href='http://fonts.googleapis.com/css?family=Roboto' type='text/css'>
<link rel="stylesheet prefetch" href='http://fonts.googleapis.com/css?family=PT+Sans+Narrow' type='text/css'>
<link rel="stylesheet prefetch" href="http://fonts.googleapis.com/css?family=Open+Sans:400,300" type="text/css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<link rel="stylesheet prefetch" href="assets/font-awesome.min.css" />
<link rel="stylesheet prefetch" href="assets/jquery-ui.css" />
<link rel="stylesheet" href="assets/spectrum.css" />
<link rel="stylesheet" href="assets/ui.anglepicker.css" />
<link rel="stylesheet" href="assets/styles.css?1.0.5" />
<link rel="stylesheet" href="assets/global.css">
<title>Short URL by Himasif</title>
</head>
<body>
<div id="container">
<script type="text/javascript">
		window.twttr=(function(d,s,id){var t,js,fjs=d.getElementsByTagName(s)[0];if(d.getElementById(id)){return}js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);return window.twttr||(t={_e:[],ready:function(f){t._e.push(f)}})}(document,"script","twitter-wjs"));
		</script>
<div id="fb-root"></div>
<script>(function(d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0];
		  if (d.getElementById(id)) return;
		  js = d.createElement(s); js.id = id;
		  js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.0";
		  fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
		</script>
<header>
<i class="fa fa-link fa-2x"></i>
<br></br>
<h1>Short URL</h1>
</header>

<div class="container">
<hr class="style" color="white">
<div id="main">

<?php
		if(isset($_SESSION['feedback'])){
			echo "<p>{$_SESSION['feedback']}</p>";
			unset($_SESSION['feedback']);
		}
		?>
		<form action="shorten.php" method="post">
			<input type="url" name="url" placeholder="Masukkan URL Anda." autocomplete="off" value="" required>
			<input type="submit" class="btn btn-danger" value="Shorten">
		</form>
</div>
</div>
<div class="footer">
<div id="credits"> Made with <i class="fa fa-heart" title="Himasif"></i> 
by <a href="http://himasif.ilkom.unej.ac.id/" target="_blank">HIMASIF </a><strong>&middot;</strong><a href="http://himasif.ilkom.unej.ac.id/" target="_blank"> <i class="fa fa-github fa-2x"></i></a>  
</div>
</div>

<script src="js/jquery-1.11.0.min.js"></script>
<script src="js/jquery-migrate-1.2.1.min.js"></script>
<script src="js/jquery-ui.min.js"></script>
<script src="js/jquery.ui.touch-punch.min.js"></script>
<script src="js/spectrum.js"></script>
<script src="js/ui.anglepicker.js"></script>
<script src="js/jquery.keyframes.min.js"></script>
<script src="js/site.js?1.0.8"></script>

</div>
</body>
</html>