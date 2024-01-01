<?php
$file='data.json';
function get_i_key($arr,$value)
{
    $i=0;
    $flg=0;
foreach ($arr as $el) {
    foreach($el as $key => $val){
        if ($val['value']==$value){
            $flg=1;
            break;
        }
        }
    if ($flg==1){
        break;
    }        
     $i=$i+1;   
    }
    if ($flg==0){
          return "error";
    }
    
  return array($i, $key); 
}
///

function remove_from_arr($arr,$value)
{
//
$i=0;
$flg=0;
$new_ar=[];
foreach($arr as $element) {

	 foreach($element as $key => $val){
		 if ( $val['value']==$value)
		 {
			   $flg=1;
          }
	 }
	 if ($flg==1){
		 $flg=0;
	 }else {array_push($new_ar, $element);}
   $i++;
}

//
  return $new_ar; 
}



//
 if (file_exists($file)) {

 $jsondata = file_get_contents($file);
 $arr_data = json_decode($jsondata, true);
//$myJSON = json_encode($arr_data);


}
else {
   $arr_data =[];
}


$j_data= $_POST['json'];
$action= $_POST['action'];
$level=$_POST['level'];
//$_nodes=$_POST['nodes'];
$nodes=json_decode($_POST['nodes'],true);
$data = json_decode($j_data,true);
//			$fh = fopen('1.txt', 'w');
//fwrite($fh, json_encode($data,JSON_UNESCAPED_UNICODE));
//fclose($fh);

if ($action =='del') {
	if ($level==0){
$arr_data=remove_from_arr($arr_data,$data['id']);
	}
	elseif ($level==1){
   $k_v=get_i_key($arr_data,$nodes[0]);
   $temp_arr=$arr_data[$k_v[0]][$k_v[1]]["child_nodes"];

$arr_data[$k_v[0]][$k_v[1]]["child_nodes"]=remove_from_arr($temp_arr,$data['id']);
	}
else {
	
   $k_v=get_i_key($arr_data,$nodes[0]);
   $temp_arr=$arr_data[$k_v[0]][$k_v[1]]["child_nodes"];
	 $k_v2=get_i_key($temp_arr,$nodes[1]);
   $temp_arr2=$temp_arr[$k_v2[0]][$k_v2[1]]["child_nodes"];
   
   $arr_data[$k_v[0]][$k_v[1]]["child_nodes"][$k_v2[0]][$k_v2[1]]["child_nodes"] =remove_from_arr($temp_arr2,$data['id']);
	
}
}
else {
	if ($level==0){
	array_push($arr_data, $data);
	}
	elseif  ($level==1){
//			$fh = fopen('1.txt', 'w');
//fwrite($fh, json_encode($data,JSON_UNESCAPED_UNICODE));
//fclose($fh);
	$k_v=get_i_key($arr_data,$nodes[0]);
	
	$temp_arr=$arr_data[$k_v[0]][$k_v[1]]["child_nodes"];
		array_push($temp_arr, $data);
			$arr_data[$k_v[0]][$k_v[1]]["child_nodes"]=$temp_arr;
	//$arr_data[$k_v[0]][$k_v[1]]["child_nodes"]=$data;
	}
else {
////////////////////////////////
	$k_v=get_i_key($arr_data,$nodes[0]);
	$temp_arr=$arr_data[$k_v[0]][$k_v[1]]["child_nodes"];
	
	$k_v2=get_i_key($temp_arr,$nodes[1]);
	$temp_arr2=$temp_arr[$k_v2[0]][$k_v2[1]]["child_nodes"];
		array_push($temp_arr2, $data);
		$arr_data[$k_v[0]][$k_v[1]]["child_nodes"][$k_v2[0]][$k_v2[1]]["child_nodes"]=$temp_arr2;
		
	//		$fh = fopen('1.txt', 'w');
//fwrite($fh, json_encode($data,JSON_UNESCAPED_UNICODE));
//fclose($fh);
	
}	
}



$fh = fopen($file, 'w');
fwrite($fh, json_encode($arr_data,JSON_UNESCAPED_UNICODE));
fclose($fh);
echo 1;
?>