<?php

function get_config_data_from_db () {
  $cached_data = apcu_fetch ('config_data');
  if ($cached_data == FALSE) {
    global $db_file;
    $db = new SQLite3($db_file,SQLITE3_OPEN_READONLY);

    $results = $db->query('select * from configData where id = 1;');
    while ($row = $results->fetchArray()) {
          $data = $row;
      }
    $db->close();
  }
  else {
    $data = $cached_list;
    apcu_store ('config_data', $data);
    //error_log ("sort list from APC");
  }
  return $data;
}


function get_config_parameter ($parameter_key) {
  $config_array = get_config_data_from_db ();
  return $config_array[$parameter_key];
}

function start_print_queue () {
  apcu_store ('print_queue_satus', true);
}

function pause_print_queue() {
  apcu_store ('print_queue_satus', false);
}

function get_print_queue_status () {
  $status = apcu_fetch ('print_queue_satus');
  return $status;
}

 ?>
