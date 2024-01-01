<?php
$target_dir = "uploads/";
$target_file=$_FILES['file']['name'];


if (file_exists($target_dir .$target_file)) {
    $target_file=str_replace(".", "_", strval(microtime()))."_".$target_file;
}
//$target_file = $target_dir. $_FILES['file']['name'];
    if ( 0 < $_FILES['file']['error'] ) {
        echo 'Error: ' . $_FILES['file']['error'] . '<br>';
    }
    else {
        move_uploaded_file($_FILES['file']['tmp_name'], $target_dir.$target_file);
		echo "success".$target_dir.$target_file;
    }

?>
 
