<?php
/*
ini_set('display_errors', 1);
error_reporting(E_ALL);
*/

// Print service

// Read print queue.
// If someting new -> Start printing that queue item

// printing means sending 1 of n print jobs to printer and updating status
// if at some point the status if print queue item is canceled, then stop printing.

// has to be added to services in order to be started automatically and run in background
//https://stackoverflow.com/questions/2036654/run-php-script-as-daemon-process


require_once(__DIR__ . "//print_worker.php");
require_once(__DIR__ . "//print_app_functions.php");

// parameters
$db_file = "print_app.db";


if (isset($_GET['start_queue']))
    start_print_queue ();

// check is queue is enabled (not paused)
$queue_running = get_print_queue_status();

if ($queue_running == true)
  {
    //          error_log(",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,queue running");
              // read print queue
    $print_job  = get_current_print_job ();
      //        var_dump($print_job);
    if ($print_job)
      {
        send_label_to_printing ($print_job);
        update_print_job_status($print_job);
      }

}


function get_current_print_job () {
  $print_job_from_cache = apcu_fetch ('print_job_from_cache');
  if ($print_job_from_cache == FALSE) {
        global $db_file;
        $db = new SQLite3($db_file,SQLITE3_OPEN_READONLY);
        // select record from print queue wit status 0 or 1 (new or printing) with the least id (oldest)
        $results = $db->query("select * from PrintQueue where status < 2  ORDER BY id ASC LIMIT 1;");
        //$data = array ();
        if ($row = $results->fetchArray()) {
          $print_job = [
            "id" => $row['id'],
            "title" => $row['title'],
            "count" => $row['label_count'],
            "printed_count" => $row['printed_count'],
            "print_object_json" => $row['print_object_json'],
            "status" => $row['status']
            ];
          }
        else $print_job = NULL;
        $db->close();
        apcu_store ('print_job_from_cache',$print_job);
    }
  else
    $print_job = $print_job_from_cache;
  return $print_job;
}

function update_print_job_status($print_job) {

  $new_printed_count = $print_job["printed_count"] +1;
  $print_job['printed_count'] =  $new_printed_count;

  if ($new_printed_count >= $print_job["count"])
    {
      $print_job['status'] = 2; // done
      // if job complete then write in DB.
      update_print_job_in_db ($print_job);
      apcu_delete ('print_job_from_cache');
      apcu_delete ('print_list_today_cache');
    }
  else
    {
       $print_job['status'] = 1; // printing
       apcu_store ('print_job_from_cache',$print_job);
       update_single_job_in_cache ($print_job);

    }

}

function update_single_job_in_cache ($print_job)
{
  $tmp_status_list = array("Gaida","Drukā","Gatavs","Atcelts"); // 0 1 2 3
  $tmp_color_list = array("dark","primary","","");


  $print_list_today_cache = apcu_fetch ('print_list_today_cache');
  $job_id = $print_job["id"];
  $array_id = find_array_key_id ($print_list_today_cache,'id',$id);

  $print_list_today_cache[$array_id]["printed_count"]=$print_job['printed_count'];
  $print_list_today_cache[$array_id]["status"]= $tmp_status_list[$print_job['status']];
  $print_list_today_cache[$array_id]["color"]= $tmp_color_list[$print_job['status']];

  apcu_store ('print_list_today_cache', $print_list_today_cache);

}
function update_print_job_in_db ($print_job) {
  $job_id = $print_job["id"];
  $status = $print_job["status"];
  $new_printed_count = $print_job["printed_count"];

  global $db_file;
  $db = new SQLite3($db_file);
  $update_query = "update PrintQueue set printed_count = $new_printed_count , status = $status where id = $job_id;";
  print "<br> <br> <br> ";
  var_dump (  $update_query);
  $results = $db->query($update_query);
  $db->close();
}

function send_label_to_printing ($print_job) {

   //print "<br> printing teh label<br> ";

   $label_data = $print_job["print_object_json"];

   //var_dump($label_data);

    $left_margin =  get_config_parameter ('lmargin');
    $gap_after_label =  get_config_parameter ('gap_after_label');

   //print "<br> left margin: $left_margin  <br> gap_after_label: $gap_after_label  <br>";
   print_label( $label_data,$left_margin, $gap_after_label ) ;

}

?>
