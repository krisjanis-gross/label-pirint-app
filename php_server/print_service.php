<?
// Print service

// Read print queue.
// If someting new -> Start printing that queue item

// printing means sending 1 of n print jobs to printer and updating status
// if at some point the status if print queue item is canceled, then stop printing.

// has to be added to services in order to be started automatically and run in background
//https://stackoverflow.com/questions/2036654/run-php-script-as-daemon-process



// parameters
$db_file = "print_app.db";

// loop forever

while (1)
  {
      // read print queue
      $print_job  = get_current_print_job ();

      if ($print_job)
        {
          print_label ($print_job);
          update_print_job_status($print_job);
        }
      else
        {
          sleep(3);
        }


      // pause some time
      sleep(0.1);
  }


function get_current_print_job (){
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
      "status" => $tmp_status_list[$row['status']],
      "color" => $tmp_color_list[$row['status']]
      ];
    }
  else $print_job = NULL;
  $db->close();
  return $print_job;
}

function update_print_job_status($print_job) {
  $db = new SQLite3($db_file);
  $job_id = $print_job["id"]
  $status = 2; // printing
  $new_printed_count = $print_job["printed_count"] +1;

  $results = $db->query("update set printed_count = $new_printed_count , status = $status  PrintQueue where id = $job_id;");

}



function print_label ($print_job) {
   // TODO:
   sleep(3);
}

?>
