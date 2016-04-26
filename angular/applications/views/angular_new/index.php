<html lang="en" ng-app="welcome">
<head>
<meta charset="UTF-8">
<title>Example of Bootstrap 3 Horizontal Form Layout</title>



<script src="<?php echo base_url('assets/js/angular/angular.js');?>"> </script>
<script src="<?php echo base_url('assets/js/angular/angular-route.min.js');?>"> </script>
<script src="<?php echo base_url('assets/js/angular/angular-cookies.js');?>"> </script>
<script src="<?php echo base_url('assets/angularjs/app.js');?>"></script>
<script src="<?php echo base_url('assets/angularjs/AngularFormApp.js');?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/css/angular_style.css');?>">


</head>
<body >

<div >
	<div id="wrapper">
		<header>
			<p>Angular JS</p>
			<nav>
				<ul role=navigation>
					<li><a href="#/home">Home</a></li>
					<li><a href="#/profile">Profile</a></li>
					<li><a href="#/userdata">Data</a></li>
					<li ng-controller="logoutController"><a href="" ng-click="logout()">Logout</a></li></li>

				</ul>
			</nav>
		</header>


		<section>
			<div ng-view>				
      		</div>
		</section>
	</div>
</div>



    
</body>
</html>  