<?php
echo "aaaaaaaaaaaaaaa\n";
ini_set('display_errors', 1);
error_reporting(E_ALL);


$bar = 'BAR';
apcu_store('foo', $bar);
var_dump(apcu_fetch('foo'));
echo "\n";

?>
