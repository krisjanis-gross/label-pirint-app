<?php
// Print service

// Read print queue.
// If someting new -> Start printing that queue item

// printing means sending 1 of n print jobs to printer and updating status
// if at some point the status if print queue item is canceled, then stop printing.

// has to be added to services in order to be started automatically and run in background
//https://stackoverflow.com/questions/2036654/run-php-script-as-daemon-process


require_once("print_worker.php");
require_once("print_app_functions.php");

// parameters
$db_file = "print_app.db";

// loop forever
$loop_counter = 1000;
while ($loop_counter > 0)   {
      // read print queue
      $print_job  = get_current_print_job ();
      var_dump($print_job);
      if ($print_job)
        {
          send_label_to_printing ($print_job);
          update_print_job_status($print_job);
        }
      else
        {
          print "<br> nothing to print right now.";
          sleep(3);

        }


      // pause some time
      sleep(0.1);
      $loop_counter--;
  }


function get_current_print_job (){
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
      "print_object_json" => $row['print_object_json']
      ];
    }
  else $print_job = NULL;
  $db->close();
  return $print_job;
}

function update_print_job_status($print_job) {
  global $db_file;
  $db = new SQLite3($db_file);
  $job_id = $print_job["id"];

  $new_printed_count = $print_job["printed_count"] +1;
  if ($new_printed_count >= $print_job["count"])
      $status = 2; // done
  else $status = 1; // printing


  $update_query = "update PrintQueue set printed_count = $new_printed_count , status = $status where id = $job_id;";
  print "<br> <br> <br> ";
  var_dump (  $update_query);
  $results = $db->query($update_query);

}



function send_label_to_printing ($print_job) {

   print "<br> printing teh label<br> ";

   $label_data = $print_job["print_object_json"];

   var_dump($label_data);

    $left_margin =  get_config_parameter ('left_margin');
    $gap_to_next_label =  get_config_parameter ('gap_to_next_label');

   print "<br> left margin: $left_margin  <br> gap_to_next_label: $gap_to_next_labe  <br>";
   print_label( $label_data,$left_margin, $gap_to_next_label ) ;


   sleep(3);

}

?>
