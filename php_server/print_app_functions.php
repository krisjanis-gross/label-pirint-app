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

function get_sort_list() {

  $cached_list = apcu_fetch ('sort_list');
  if ($cached_list == FALSE) {
        // get the list from DB
      global $db_file;
      $db = new SQLite3($db_file,SQLITE3_OPEN_READONLY);

      $results = $db->query('select * from products order by title ASC;');
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
        apcu_store ('sort_list', $data);
            //error_log ("sort list from SQL");
  }
  else {
      $data = $cached_list;
      //error_log ("sort list from APC");
  }
  return $data;
}


function comparePrintCount($a, $b)
{
  return  $b['printCount'] - $a['printCount'] ;
}

function increase_print_counter_in_cache($id) {

    $product_list = get_sort_list();
    $array_id = find_array_key_id ($product_list,'id',$id);
    $product_list[$array_id]["printCount"]++;
    apcu_store ('sort_list', $product_list);
}

function find_array_key_id($products, $field, $value)
{
   foreach($products as $key => $product)
   {
      if ( $product[$field] === $value )
         return $key;
   }
   return false;
}

function update_count_suggestion_array($curent_print_job_count_value) {
  $count_suggestion_array = apcu_fetch ('count_suggestion');
  if ($count_suggestion_array == FALSE) {
      global $db_file;
      $count_suggestion_array = array();
      $db = new SQLite3($db_file);
      $results = $db->query("select distinct (label_count), count(label_count) as c from printQueue group by label_count order by c DESC;");
      while ($row = $results->fetchArray()) {
          $printed_count_value =  $row['label_count'];
          $number_of_print_events = $row['c'];
          $count_suggestion_array[$printed_count_value] = $number_of_print_events;
       }
       $db->close();
       apcu_store ('count_suggestion',$count_suggestion_array);
  }
  else
  {
        // use lsit from chche and add 1 to
        // add 1 to count?
      $count_suggestion_array[$curent_print_job_count_value]++;
      apcu_store ('count_suggestion',$count_suggestion_array);
    //  error_log('count suggestions from APC');
  }
  //var_dump($count_suggestion_array);
  arsort ($count_suggestion_array);
  // take top 20 print counts
  //var_dump($count_suggestion_array);
  $count_suggestion_array = array_slice($count_suggestion_array, 0, 20,TRUE);
  //var_dump($count_suggestion_array);

  $result = array_keys($count_suggestion_array);
  //var_dump($result);

  $result = json_encode ($result, JSON_UNESCAPED_UNICODE);
  //error_log($result);
  return $result;
}

 ?>
