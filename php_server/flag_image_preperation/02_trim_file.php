<?php


// https://stackoverflow.com/questions/4558660/php-how-to-delete-last-n-bytes-from-large-file


$bytesToTruncate = 4; // how many bytes we are going to delete from the end of the file

$handle = fopen('flag.prn', 'r+'); // Open for reading and writing; place the file pointer at the beginning of the file.

$stat = fstat($handle);
$size = $stat['size'] - $bytesToTruncate;
$size = $size < 0 ? 0 : $size;

ftruncate($handle, $size);
fclose($handle);
