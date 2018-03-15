<?
// Print service
//https://stackoverflow.com/questions/2036654/run-php-script-as-daemon-process


// Read print queue.
// If someting new -> Start printing that queue item

// printing means sending 1 of n print jobs to printer and updating status
// if at some point the status if print queue item is canceled, then stop printing.

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
          sleep(3);


      // pause some time
      sleep(0.1);
  }


function get_current_print_job (){
  $db = new SQLite3($db_file);
  // select record from print queue wit status 0 or 1 (new or printing) with the least id (oldest)
  $results = $db->query("select * from PrintQueue where status < 2  ORDER BY id ASC LIMIT 1;");
  //$data = array ();
  if ($row = $results->fetchArray()) {
    $print_job = [
      "id" => $row['id'],
      "title" => $row['title'],
      "count" => $row['label_count'],
      "status" => $tmp_status_list[$row['status']],
      "color" => $tmp_color_list[$row['status']]
      ];

      $list_item = [
        "id" => $row['id'],
        //"title" => $row['title'],
        "count" => $row['label_count'],
        "status" => $tmp_status_list[$row['status']],
        "print_object_json" => $row['print_object_json'],
      
        ];
      $data [] = $list_item;
    }
    $db->close();

}



?>
