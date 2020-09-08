<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once("functions_print_app.php");

// db connection
$db_file = "print_appv2.db";

    //http://stackoverflow.com/questions/15485354/angular-http-post-to-php-and-undefined
$postdata = file_get_contents("php://input");
if (isset($postdata)) {
	$request = json_decode($postdata);
	$request_type = $request->request_type;
}
else {
		echo "Not called properly with request_type parameter!";
}



if ($request_type == 'get_sort_list') {
  $data = get_sort_list();
}


if ($request_type == 'get_sort_list_favourites') {
  // - list: auto favourites ( top today+top total )
  // should query print history to find out most printed items for (a) today and (b) total
  // (a) today - to do
  $product_list_fav = get_sort_list();
  usort($product_list_fav, 'comparePrintCount');
  $product_list_fav = array_slice($product_list_fav, 0, 10);
  //var_dump ($product_list);
  $data = $product_list_fav;

}


  if ($request_type == 'save_sort_data') {
    $request_data = $request->request_data;
  /*var_dump ($request);
    var_dump ($request_data);*/

		/*
		public blank_product = {
		   id : 0,
		   Nosaukums : "",
		   LatinNosaukums : "",
		   Potcelms : "",
		   Zona : "",
		   Kods1 : "",
		   Suga : "",
		   PasesKrasa : "",
		   printCount : 0,
		 }
		*/
    $productID = $request_data->id;
    $Nosaukums = $request_data->Nosaukums;
    $LatinNosaukums = $request_data->LatinNosaukums;
    $Potcelms = $request_data->Potcelms;
		$Zona = $request_data->Zona;
		$Kods1 = $request_data->Kods1;
		$Suga = $request_data->Suga;
		$PasesKrasa = $request_data->PasesKrasa;


    $db = new SQLite3($db_file);
    if ($productID == 0) {
      // new record
    //  INSERT INTO `products`(`id`,`title`,`bot_nosaukums`,`potcelms`,`syncStatus`) VALUES (NULL, 'Aprikoze R','Prunus L','Aprikoze',0);
      $results = $db->query("INSERT INTO `products`(`id`,`Nosaukums`,`LatinNosaukums`,`Potcelms`,`Zona`,`Kods1`,`Suga`,`PasesKrasa`,`printCount`)
                        VALUES (NULL, '$Nosaukums','$LatinNosaukums','$Potcelms','$Zona','$Kods1','$Suga','$PasesKrasa',0);" );
    }
    else  {
      // update existing
      //UPDATE `products` SET `bot_nosaukums`=? WHERE `_rowid_`='171';
      $results = $db->query("UPDATE `products` SET
        `Nosaukums` = '$Nosaukums',
        `LatinNosaukums`= '$LatinNosaukums' ,
        `Potcelms` = '$Potcelms',
				 `Zona` = '$Zona',
				`Kods1` = '$Kods1',
			  `Suga` = '$Suga',
				`PasesKrasa` = '$PasesKrasa'
        WHERE id = $productID ;");
    }
    $data = [
        "message" => "Data saved: " . $productID .   $Nosaukums
    ];
    apcu_delete ('sort_list');
  }




if ($request_type == 'get_config_data') {
  $row = get_config_data_from_db ();
  $data = [
      "GadsPartija" =>  $row['GadsPartija'],
      "SyncON" => $row['SyncON'],
      "Line1" => $row['Line1'],
      "Line2" => $row['Line2'],
      "Line3" => $row['Line3'],
      "Line4" => $row['Line4'],
      "lmargin" => $row['lmargin'],
      "gap_after_label" => $row['gap_after_label'],
      "scroll_parameter" => $row['scroll_parameter'],

  ];
}




if ($request_type == 'save_config_data') {
  $request_data = $request->request_data;
/*var_dump ($request);
  var_dump ($request_data);*/
  $GadsPartija = $request_data->GadsPartija;
  $SyncON = $request_data->SyncON;
  $Line1 = $request_data->Line1;
  $Line2= $request_data->Line2;
  $Line3 = $request_data->Line3;
  $Line4 = $request_data->Line4;
  $lmargin = $request_data->lmargin;
  $gap_after_label = $request_data->gap_after_label;
  $scroll_parameter = $request_data->scroll_parameter;


  $db = new SQLite3($db_file);

  // update configData data to reflect the last print_app_API

	$q1 = "UPDATE `configData` SET
    `GadsPartija` = '$GadsPartija',
    `SyncON` = '$SyncON',
    `Line1` = '$Line1',
    `Line2` = '$Line2',
    `Line3` = '$Line3',
    `Line4` = '$Line4',
    `lmargin` = '$lmargin',
    `gap_after_label` = '$gap_after_label',
    `scroll_parameter` = '$scroll_parameter'
    WHERE id = 1 ;";

//error_log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqquery = " . $q1);


  $results = $db->query($q1);


// update skaits favourites

// update skirnes favourites

$db->close();
apcu_delete ('config_data');
  $data = [
      "message" => "Saglabāts!"
  ];
}





if ($request_type == 'reboot_server') {
 $return = exec ( "sudo reboot"  );
  $data = [
      "message" => "Restart initiated"
  ];
}
if ($request_type == 'shutdown_server') {
 $return = exec ( "sudo shutdown"  );
  $data = [
      "message" => "Shutdown initiated"
  ];
}




if ($request_type == 'scroll_paper') {
  $request_data = $request->request_data;
/*var_dump ($request);
  var_dump ($request_data);*/
  $direction = $request_data->direction;
  $step = $request_data->step;
//error_log("//////////////////////////////// scroll paper");
  $scroll_parameter =  get_config_parameter ('scroll_parameter');
  $scroll_step = $step  * $scroll_parameter;
  require_once("functions_printer.php");
  scroll_paper( $direction, $scroll_step ) ;
  $data = [
      "message" => "$direction $scroll_step done"
  ];
}






if ($request_type == 'get_queue_status') {
  $status = get_print_queue_status ();
//  var_dump ( $status);
  $data = [
      "queue_status" =>  $status
  ];
}


if ($request_type == 'update_queue') {
  $current_status = get_print_queue_status ();
  if ($current_status)
    {
     pause_print_queue();
     $message = "Paused";
    }
  else
    {
      start_print_queue ();
      $message = "Started";
    }
  $data = [
      "message" => $message
  ];
}





if ($request_type == 'cancel_print_job') {
  $request_data = $request->request_data;
/*var_dump ($request);
  var_dump ($request_data);*/

  $job_id = $request_data->queue_id;
  $status = 3; // atcelts

	$current_print_job = get_current_print_job();

	if ($current_print_job['id'] == $job_id) {
			//cancel current print job
			$current_print_job['status'] = $status;
			update_print_job_in_db ($current_print_job);
			apcu_delete ('print_job_from_cache');
			apcu_delete ('print_list_today_cache');

	}
	else
	{
			// cancel some other job in queue
			global $db_file;
		  $db = new SQLite3($db_file);

		  $update_query = "update PrintQueue set status = $status where id = $job_id;";

		  $results = $db->query($update_query);
		  $db->close();
			apcu_delete ('print_list_today_cache');

	}
	$data = [
			"message" => "atcelts: $job_id"
	];

}



if ($request_type == 'getProductSuggestions') {

  $db = new SQLite3($db_file,SQLITE3_OPEN_READONLY);

  $results = $db->query('select distinct (Suga) from products;');
  $data = array ();
  $Sugasuggestions = array ();
  while ($row = $results->fetchArray()) {
        $Sugasuggestions [] =  $row['Suga'];
  }

	$results = $db->query('select distinct (Potcelms) from products;');
	$data = array ();
	$Potcelmssuggestions = array ();
	while ($row = $results->fetchArray()) {
	      $Potcelmssuggestions [] =  $row['Potcelms'];
	 }

	$results = $db->query('select distinct (Zona) from products;');
	$data = array ();
	$Zonasuggestions = array ();
	 while ($row = $results->fetchArray()) {
	      $Zonasuggestions [] =  $row['Zona'];
	 }

	$results = $db->query('select distinct (Kods1) from products;');
	$data = array ();
	$Kods1suggestions = array ();
	while ($row = $results->fetchArray()) {
	       $Kods1suggestions [] =  $row['Kods1'];
	 }

	$results = $db->query('select distinct (PasesKrasa) from products;');
	$data = array ();
	$PasesKrasasuggestions = array ();
	while ($row = $results->fetchArray()) {
	      $PasesKrasasuggestions [] =  $row['PasesKrasa'];
	}

	$results = $db->query('select distinct (LatinNosaukums) from products;');
	$data = array ();
	$LatinNosaukumssuggestions = array ();
	while ($row = $results->fetchArray()) {
				$LatinNosaukumssuggestions [] =  $row['LatinNosaukums'];
	}

  $db->close();


    $data = [
    		"Suga_suggestions" =>  $Sugasuggestions,
				"Potcelmssuggestions" =>  $Potcelmssuggestions,
				"Zonasuggestions" => $Zonasuggestions,
				"Kods1suggestions" => $Kods1suggestions,
				"PasesKrasasuggestions" => $PasesKrasasuggestions,
				"LatinNosaukumssuggestions" => $LatinNosaukumssuggestions
    ];











}





if ($request_type == 'get_print_list_today') {
	$print_list_today_cache = apcu_fetch ('print_list_today_cache');
	if ($print_list_today_cache == FALSE)
		{
			  $tmp_status_list = array("Gaida","Drukā","Gatavs","Atcelts"); // 0 1 2 3
			  $tmp_color_list = array("dark","primary","","");

			  $db = new SQLite3($db_file,SQLITE3_OPEN_READONLY);

			  $results = $db->query("select * from PrintQueue where  datetime > datetime('now','localtime','-1 day') ORDER BY id DESC;");
			  $data = array ();
			  while ($row = $results->fetchArray()) {
			      $list_item = [
			        "id" => $row['id'],
			        "title" => $row['title'],
			        "count" => $row['label_count'],
			        "printed_count" => $row['printed_count'],
			        "status" => $tmp_status_list[$row['status']],
			        "color" => $tmp_color_list[$row['status']]
			        ];
			      $data [] = $list_item;
			    }
			    $db->close();

					apcu_store ('print_list_today_cache', $data);
			}
	else
		{
			$data = $print_list_today_cache;
		}
}

if ($request_type == 'get_print_list_history') {
	$print_list_history_cache = apcu_fetch ('print_list_history_cache');
	if ($print_list_history_cache == FALSE)
	  {
				  $tmp_status_list = array("Gaida","Drukā","Gatavs","Atcelts"); // 1 2 3 4
				  $tmp_color_list = array("dark","primary","");

				  $db = new SQLite3($db_file,SQLITE3_OPEN_READONLY);

				  $results = $db->query("select * from PrintQueue where  datetime <= datetime('now','localtime','-1 day') ORDER BY id DESC LIMIT 30;");
				  $data = array ();
				  while ($row = $results->fetchArray()) {
				      $list_item = [
				        "id" => $row['id'],
				        "title" => $row['title'],
				        "count" => $row['label_count'],
				        "printed_count" => $row['printed_count'],
				        "status" => $tmp_status_list[$row['status']],
				        "color" => $tmp_color_list[$row['status']]
				        ];
				      $data [] = $list_item;
				    }
				    $db->close();
           apcu_store ('print_list_history_cache', $data);
	  }
	else
	  {
	     $data = $print_list_history_cache;
	  }

}






if ($request_type == 'print_label') {
  $request_data = $request->request_data;
//var_dump ($request);
  //var_dump ($request_data);
  $id = $request_data->id;
  $Nosaukums = $request_data->Nosaukums;
  $LatinNosaukums = $request_data->LatinNosaukums;
  $Potcelms = $request_data->Potcelms;
  $Zona = $request_data->Zona;
  $Kods1 = $request_data->Kods1;
  $Suga = $request_data->Suga;
	$PasesKrasa = $request_data->PasesKrasa;

  $Daudzums = $request->label_count;


// compose queue object and andd to queue.

// get line - Line 4 templates from DB
$row = get_config_data_from_db ();
$GadsPartija = $row['GadsPartija'];

$line1 = $row['Line1'];
$line2 = $row['Line2'];
$line3 = $row['Line3'];
$line4 = $row['Line4'];
// substitute parameters strings

$print_object = [
  "line1" => $line1,
  "line2" => $line2,
  "line3" => $line3,
  "line4" => $line4,
];

$print_object = json_encode($print_object, JSON_UNESCAPED_UNICODE);


// replace placeholders with variables
$print_object  =  str_replace ( "{{Nosaukums}}" , $Nosaukums , $print_object  );
$print_object  =  str_replace ( "{{LatinNosaukums}}" , $LatinNosaukums , $print_object  );
$print_object  =  str_replace ( "{{Potcelms}}" , $Potcelms , $print_object  );
$print_object  =  str_replace ( "{{Zona}}" , $Zona , $print_object  );
$print_object  =  str_replace ( "{{Kods1}}" , $Kods1 , $print_object  );
$print_object  =  str_replace ( "{{Suga}}" , $Suga , $print_object  );
$print_object  =  str_replace ( "{{GadsPartija}} " , $GadsPartija , $print_object  );
$print_object  =  str_replace ( "{{id}} " , $id , $print_object  );


// save in queue
$db = new SQLite3($db_file);
  // update main form data to reflect the last print_app_API
$date_now = date('Y-m-d H:i:s');
$results = $db->query("INSERT INTO `PrintQueue`(`id`,`title`,`status`,`datetime`,`print_object_json`,`label_count`,`sync_status`,`printed_count`,`label_color`)
                  VALUES (NULL,'$Nosaukums',0,'$date_now','$print_object',$Daudzums,0,0,'$PasesKrasa') ;");
$db->close();

apcu_delete ('print_list_today_cache');

// update skaits favourites
$count_suggestion_array_json = update_count_suggestion_array ($Daudzums);


// update print count for products. Used to determine favourites
  $db = new SQLite3($db_file);
  $results = $db->query("update products set printCount = printCount  + 1 where id = $id");
  increase_print_counter_in_cache($id);

$db->close();
  $data = [
      "message" => "Pievienots rindai $Nosaukums x $Daudzums"
  ];
}



if ($request_type == 'get_print_count_suggestions') {
  $count_suggestion_array = get_count_suggestion_array ();

	arsort ($count_suggestion_array);
  // take top 20 print counts
  //var_dump($count_suggestion_array);
  $count_suggestion_array = array_slice($count_suggestion_array, 0, 20,TRUE);
  //var_dump($count_suggestion_array);
  $result = array_keys($count_suggestion_array);


  $data = [
      "print_count_suggestions" =>  $result
  ];
}







// return result
//http://stackoverflow.com/questions/18382740/cors-not-working-php
	if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 0');    // cache for 0 day
    }
    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
        exit(0);
    }

print json_encode($data, JSON_UNESCAPED_UNICODE);
?>
