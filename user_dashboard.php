<?php
session_start();
include("utils/functions.php");
if(isset($_SESSION["user_id"])) {
	if(isLoginSessionExpired()) {
		header("Location:logout.php?session_expired=1");
	}
}
?>
<html>
	<head>
	 <meta charset="utf-8">
		<title>User Login</title>
		<link rel="stylesheet" type="text/css" href="css/styles.css" />
	</head>
	<body>
		<table class="mainframe" id="frame_table">
			<tr class="tableheader">
				<td align="center">User Dashboard</td>
			</tr>
			

			<tr class="tablerow">
				<td>
					<?php
if(isset($_SESSION["user_name"])) {
?>
Welcome <?php echo $_SESSION["user_name"]; ?>. Click here to <a href="logout.php" tite="Logout">Logout.
						<?php
}
?>
					</td>
				</tr>

			<tr class="flash" id="flash_msg" style="display: none;">
				<td><span class="close">&times;</span></td>
			</tr>
			<tr class="nav" id="nave_bar" >
				<td>
				<button type="submit" id="add_row_btn" onclick="process_row()" >HTML</button>
				<button  type="submit" id="nav_back"><span class="nav_back_arrow" onclick="process_level()">&#8678;</span></button>
				
				</td>
			</tr>
				<tr >
				
				<table class="workingdata" id="main_table">
				</table>

				</tr>
			</table>


		</body>
		
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
		<script src="js/script.js"></script>
		</html>