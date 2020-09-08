<?php
/* https://www.technipages.com/send-prn-file-to-printer
C:\wamp64\www\tmp>copy /B eu_flag_black_5.prn "\\DESKTOP-VVBLQ9B\Receipt Printer"
        1 file(s) copied.
*/
// printer must be shared (windows)


$PRNfile= "flag.prn";
$hostname = "DESKTOP-VVBLQ9B";
$printername = "Receipt Printer";
$command = 'copy /B ' . $PRNfile .  ' "\\\\' . $hostname . '\\' . $printername . '"';
exec ($command);

print ($command);

 ?>
