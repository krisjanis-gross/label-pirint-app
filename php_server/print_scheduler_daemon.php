<?php

gc_enable();//

$command = 'wget -O - -q -t 1 "http://127.0.0.1/print_service.php"';
sleep (10);
exec ( $command . "?start_queue=true" );
while (true) {

  //Code Logic
   exec ( $command  );

   sleep (2);

  //sleep and usleep could be useful
    if (PHP_SAPI == "cli") {
        if (rand(5, 100) % 5 == 0) {
            gc_collect_cycles(); //Forces collection of any existing garbage cycles
        }
    }

}


 ?>
