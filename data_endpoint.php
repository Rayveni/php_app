<?php
 $myFile = "data.json";
 if (file_exists($myFile)) {
    try {
      
 $jsondata = file_get_contents($myFile);
 $arr_data = json_decode($jsondata, true);
$myJSON = json_encode($arr_data);

echo $myJSON;
} catch (Exception $e) {
    echo $e->getMessage();
}
} else {
    echo "no_file";
}
 


?>