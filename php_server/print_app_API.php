<?php
/*
ini_set('display_errors', 1);
error_reporting(E_ALL);
*/
require_once("print_app_functions.php");

// db connection
$db_file = "print_app.db";

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

if ($request_type == 'test1') {
update_count_suggestion_array(5);

}

if ($request_type == 'get_sort_list_favourites') {
  // - list: auto favourites ( top today+top total )
  // should query print history to find out most printed items for (a) today and (b) total

  $product_list_fav = get_sort_list();
  usort($product_list_fav, 'comparePrintCount');
  $product_list_fav = array_slice($product_list_fav, 0, 10);
  //var_dump ($product_list);
  $data = $product_list_fav;
  /*$db = new SQLite3($db_file,SQLITE3_OPEN_READONLY);

  $results = $db->query('select * from products where printCount > 0 ORDER BY printCount DESC LIMIT 10;');
  $data = array ();
  while ($row = $results->fetchArray()) {
      $list_item = [
        "id" => $row['id'],
        "title" => $row['title'],
        "bot_nosaukums" => $row['bot_nosaukums'],
        "potcelms" => $row['potcelms'],
        "printCount" => $row['printCount']
        ];
      $data [] = $list_item;
    }
    $db->close();
*/


}



  if ($request_type == 'save_sort_data') {
    $request_data = $request->request_data;
  /*var_dump ($request);
    var_dump ($request_data);*/
    $productID = $request_data->productID;
    $Nosaukums = $request_data->Nosaukums;
    $BotNosaukums = $request_data->BotNosaukums;
    $Potcelms = $request_data->Potcelms;

    $db = new SQLite3($db_file);
    if ($productID == 0) {
      // new record
    //  INSERT INTO `products`(`id`,`title`,`bot_nosaukums`,`potcelms`,`syncStatus`) VALUES (NULL, 'Aprikoze R','Prunus L','Aprikoze',0);
      $results = $db->query("INSERT INTO `products`(`id`,`title`,`bot_nosaukums`,`potcelms`,`syncStatus`,`printCount`)
                        VALUES (NULL, '$Nosaukums','$BotNosaukums','$Potcelms',0,0);" );
    }
    else  {
      // update existing
      //UPDATE `products` SET `bot_nosaukums`=? WHERE `_rowid_`='171';
      $results = $db->query("UPDATE `products` SET
        `title` = '$Nosaukums',
        `bot_nosaukums`= '$BotNosaukums' ,
        `potcelms` = '$Potcelms'
        WHERE id = $productID ;");
    }
    $data = [
        "message" => "Data saved: " . $productID .   $Nosaukums . $BotNosaukums . $Potcelms
    ];
    apcu_delete ('sort_list');
  }



if ($request_type == 'get_main_data') {
  $db = new SQLite3($db_file,SQLITE3_OPEN_READONLY);

  $results = $db->query('select * from mainFormData where id = 1;');
  while ($row = $results->fetchArray()) {
    $data = [
        "id" =>  $row['productID'],
        "title" => $row['productTitle'],
        "bot_nosaukums" => $row['productBotNos'],
        "potcelms" => $row['productPotcelms'],
        "kategorija" => $row['Kategorija'],
        "skira" => $row['skira'],
        "daudzums" => $row['daudzums'],
        "skaits" => $row['skaits'],
        "skaits_favoriiti" =>  json_decode ($row['skaitsFavoriiti'])
    ];

    }
    $db->close();

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
      "scroll_parameter" => $row['scroll_parameter']
  ];
}




if ($request_type == 'save_config_data') {
  $request_data = $request->request_data;
/*var_dump ($request);
  var_dump ($request_data);*/
  $GadsPartija = $request_data->GadsPartija;
  $SyncON = $request_data->SyncON;
  $Line1 = $request_data->Line1;
  $Line2 = $request_data->Line2;
  $Line3 = $request_data->Line3;
  $Line4 = $request_data->Line4;
  $lmargin = $request_data->lmargin;
  $gap_after_label = $request_data->gap_after_label;
  $scroll_parameter = $request_data->scroll_parameter;

  $db = new SQLite3($db_file);

  // update configData data to reflect the last print_app_API

  $results = $db->query("UPDATE `configData` SET
    `GadsPartija` = '$GadsPartija',
    `SyncON` = '$SyncON',
    `Line1` = '$Line1',
    `Line2` = '$Line2',
    `Line3` = '$Line3',
    `Line4` = '$Line4',
    `lmargin` = '$lmargin',
    `gap_after_label` = '$gap_after_label',
    `scroll_parameter` = '$scroll_parameter'

    WHERE id = 1 ;");

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

  $scroll_parameter =  get_config_parameter ('scroll_parameter');
  $scroll_step = $step  * $scroll_parameter;
  require_once("print_worker.php");
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


  global $db_file;
  $db = new SQLite3($db_file);

  $update_query = "update PrintQueue set status = $status where id = $job_id;";

  $results = $db->query($update_query);
  $db->close();

  $data = [
      "message" => "atcelts: $job_id"
  ];
}

if ($request_type == 'get_potcelms_suggestions') {
  $db = new SQLite3($db_file,SQLITE3_OPEN_READONLY);
  $results = $db->query('select distinct (potcelms) from products;');
  $data = array ();
  $suggestions = array ();
  while ($row = $results->fetchArray()) {
        $suggestions [] =  $row['potcelms'];
    }
    $db->close();
    $data = [
    		"potcelms_suggestions" =>  $suggestions
    ];
}






if ($request_type == 'get_print_list_today') {
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
}

if ($request_type == 'get_print_list_history') {
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

}




if ($request_type == 'print_label') {
  $request_data = $request->request_data;
//var_dump ($request);
  //var_dump ($request_data);
  $id = $request_data->id;
  $Title = $request_data->Title;
  $Skaits = $request_data->Skaits;
  $Bot_nosaukums = $request_data->Bot_nosaukums;
  $Potcelms = $request_data->Potcelms;
  $Kategorija = $request_data->Kategorija;
  $Skira = $request_data->Skira;
  $Daudzums = $request_data->Daudzums;


// compose queue object and andd to queue.

// get line - Line 4 templates from DB
$row = get_config_data_from_db ();
$GadsPartija = $row['GadsPartija'];

$line1 = $row['Line1'];
$line2 = $row['Line2'];
$line3 = $row['Line3'];
$line4 = $row['Line4'];
// substitute parameters strings

// 5. Part {{Part}}-{{ID}}  6. Bot. Nos: {{BotNos}}
$line2  =  str_replace ( "{{Part}}" , $GadsPartija , $line2  );
$line2  =  str_replace ( "{{ID}}" , $id , $line2  );
$line2  =  str_replace ( "{{BotNos}}" , $Bot_nosaukums , $line2  );

// 6. {{nosaukums}} ({{potcelms}})
$line3  =  str_replace ( "{{nosaukums}}" , $Title , $line3  );
$line3  =  str_replace ( "{{potcelms}}" , $Potcelms , $line3  );

// 7. Kategorija: {{kategorija}} Šķira: {{skira}}  Daudzums: {{daudzums}} ZP-b2
$line4  =  str_replace ( "{{kategorija}}" , $Kategorija , $line4  );
$line4  =  str_replace ( "{{skira}}" , $Skira , $line4  );
$line4  =  str_replace ( "{{daudzums}}" , $Daudzums , $line4  );

$print_object = [
  "line1" => $line1,
  "line2" => $line2,
  "line3" => $line3,
  "line4" => $line4,
];

$print_object = json_encode($print_object, JSON_UNESCAPED_UNICODE);
// save in queue
$db = new SQLite3($db_file);
  // update main form data to reflect the last print_app_API
$date_now = date('Y-m-d H:i:s');
$results = $db->query("INSERT INTO `PrintQueue`(`id`,`title`,`status`,`datetime`,`print_object_json`,`label_count`,`sync_status`,`printed_count`) VALUES (NULL,'$Title',0,'$date_now','$print_object',$Skaits,0,0) ;");
$db->close();

// update skaits favourites
$count_suggestion_array_json = update_count_suggestion_array ($Skaits);


// update print count for products. Used to determine favourites
  $db = new SQLite3($db_file);
  $results = $db->query("update products set printCount = printCount  + 1 where id = $id");
  increase_print_counter_in_cache($id);
//$db = new SQLite3($db_file);
  // update main form data to reflect the last print_app_API

  $results = $db->query("UPDATE `mainFormData` SET
    `productID` = '$id',
    `productTitle` = '$Title',
    `skaits` = '$Skaits',
    `productBotNos` = '$Bot_nosaukums',
    `productPotcelms` = '$Potcelms',
    `Kategorija` = '$Kategorija',
    `skira` = '$Skira',
    `daudzums` = '$Daudzums',
    `skaitsFavoriiti` = '$count_suggestion_array_json'
    WHERE id = 1 ;");

// update skaits favourites

// update skirnes favourites

$db->close();
  $data = [
      "message" => "Pievienots rindai $Title x $Skaits"
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
