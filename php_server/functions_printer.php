  <?php
/*
ini_set('display_errors', 1);
error_reporting(E_ALL);
*/

require __DIR__ . '/vendor/autoload.php';

use Mike42\Escpos\Printer;
use Mike42\Escpos\PrintConnectors\CupsPrintConnector;
//use Mike42\Escpos\CapabilityProfiles\DefaultCapabilityProfile;


const INPUT_ENCODING = "UTF-8";
const REPLACEMENT_CHAR = "?";


function scroll_paper( $direction, $step = 10) {
    if (!is_numeric ($step)) $step = 10;

    if ($direction == "up")
      $command = "J";
    else
      $command = "j";

//error_log("//////////////////////////////// scroll paper direction = $direction  step = $step");

    $connector = new CupsPrintConnector("EPSON_LX-350");
    $printer = new Printer($connector);


    if ($step != 4750) {
      $my_command = Printer::ESC . $command . chr($step);
      $printer->getPrintConnector()->write($my_command);
    //  error_log("//////////////////////////////// scroll paper direction = $direction  step = $step");
    }
    else // maximum scroll button. we call scroll command multiple times
    {
      $step = 95 ;  // 475 / 5
      $my_command = Printer::ESC . $command . chr($step);
      $printer->getPrintConnector()->write($my_command);
      $printer->getPrintConnector()->write($my_command);
      $printer->getPrintConnector()->write($my_command);
      $printer->getPrintConnector()->write($my_command);
      $printer->getPrintConnector()->write($my_command);
    //error_log("//////////////////////////////// scroll paper direction = $direction  step = $step");

    }


    $printer -> close();
}

function print_label ($print_data ,$left_margin, $gap_after_label, $label_color ) {
      try {

          //$gap_after_label = "40";
          //$left_margin = 42;
          $connector = new CupsPrintConnector("EPSON_LX-350");
          //$profile = DefaultCapabilityProfile::getInstance();
          $printer = new Printer($connector);




////////////////////////////////////////////////////////////////////////
////////////////////// Print flag - binary file

// https://ubuntuforums.org/archive/index.php/t-891909.html
// add user pi to lp group    sudo adduser pi lp    sudo adduser www-data lp    then log out and log in(or reboot).

// print command is "cat flag_image_preperation/flag.prn > /dev/usb/lp0"
exec ( "cat flag_image_preperation/flag.prn > /dev/usb/lp0" ) ;

// after flag is printed we need to scroll paper back.
    $direction = "up";
    $step = 47;


    if ($direction == "down")
      $command = "J";
    else
      $command = "j";


    $my_command = Printer::ESC . $command . chr($step);
    $printer->getPrintConnector()->write($my_command);



////////////////////////////////////////////////////////////////////////



          // send custom command to use LATVIAN charset
          $my_command = Printer::ESC . "(t" . chr(3) . chr(0) .
                                              chr(48) . chr (14) . chr(32);
          $printer->getPrintConnector()->write($my_command);
          $my_command = Printer::ESC . "t" . chr(48);
          $printer->getPrintConnector()->write($my_command);

          // set small font
          $printer -> setLineSpacing(30);
          $my_command = Printer::ESC . "g";  // set small font
          $printer->getPrintConnector()->write($my_command);


          // set left margin
          $my_command = Printer::ESC . "l" . chr($left_margin);
          $printer->getPrintConnector()->write($my_command);






          $encoding_map = get_encoding_map ();

          $print_data_json = json_decode($print_data);

    /*    $line1 = "      Augu Pase -AZ/Plant passport -PZERWIRAM";
          $line2 = "      A Malus domestica B LV LV3001694 C 2033 D LV";
          $line2 =str_pad($line2, 46," ", STR_PAD_RIGHT);
          $line3 = "***Gita***";
          $line3 =str_pad($line3, 52," ", STR_PAD_BOTH);
          $line4 = "Ābele MM106   www.betras.lv";
*/

          $line1 = $print_data_json->{'line1'} ;
          $line1_encoded = encode_4_printer($line1, $encoding_map );

          $line2 = $print_data_json->{'line2'} ;
          $line2 =str_pad($line2, 46," ", STR_PAD_RIGHT);
          $line2_encoded = encode_4_printer($line2, $encoding_map );

          $line3 = $print_data_json->{'line3'} ;
          $line3 =str_pad($line3, 52," ", STR_PAD_BOTH);
          $line3_encoded = encode_4_printer($line3, $encoding_map );

          $line4 = $print_data_json->{'line4'} ;
          $line4_encoded = encode_4_printer($line4, $encoding_map );




          $printer -> textRaw( $line1_encoded );
          $printer -> text("\n");

          $step = 5;
          $command = "J";
          $my_command = Printer::ESC . $command . chr($step);
          $printer->getPrintConnector()->write($my_command);


          if ($label_color != 'dzeltena')  // balta etiķete. -> 2. rinda ir ar underline
                $printer -> setUnderline(1);
          $printer -> textRaw( $line2_encoded );
          $printer -> text("\n");
          if ($label_color != 'dzeltena')  // balta etiķete. -> 2. rinda ir ar underline
                $printer -> setUnderline(0);

          //if ($label_color != 'dzeltena') { //  balta etikete -> papildus atstarpe peec 2. rindas
                 $step = 15;
                 $command = "J";
                 $my_command = Printer::ESC . $command . chr($step);
                 $printer->getPrintConnector()->write($my_command);
        //  }



          if ($label_color == 'dzeltena')  // dzeltena etiķete. -> 3. rinda ir ar underline
                    $printer -> setUnderline(1);
          $printer -> setEmphasis(1);
          $printer -> textRaw( $line3_encoded );
          $printer -> setEmphasis(0);
          if ($label_color == 'dzeltena')  // dzeltena etiķete. -> 3. rinda ir ar underline
                $printer -> setUnderline(0);
          $printer -> text("\n");


/////////////// bug to remove Emphasis  -> reconnect to printer.
          $printer -> close();
          $printer = new Printer($connector);
          $my_command = Printer::ESC . "(t" . chr(3) . chr(0) .
                                                    chr(48) . chr (14) . chr(32);
                $printer->getPrintConnector()->write($my_command);
                $my_command = Printer::ESC . "t" . chr(48);
                $printer->getPrintConnector()->write($my_command);



                $printer -> setLineSpacing(30);
                $my_command = Printer::ESC . "g";  // set small font
                $printer->getPrintConnector()->write($my_command);



                // set left margin
                $my_command = Printer::ESC . "l" . chr($left_margin);
                $printer->getPrintConnector()->write($my_command);
/////////////// bug to remove Emphasis


                $printer -> textRaw( $line4_encoded );
                $printer -> text("\n");

        //  if ($label_color == 'dzeltena') $gap_after_label = $gap_after_label + 15;
          $my_command = Printer::ESC . "J" . chr($gap_after_label); // scroll paper
          $printer->getPrintConnector()->write($my_command);
              /* Close printer */





          $printer -> close();
      } catch (Exception $e) {
          echo "Couldn't print to this printer: " . $e -> getMessage() . "\n";
      }

}


function encode_4_printer($printable_text, $encodeMap ) {
//   return  $printable_text;

  $len = mb_strlen($printable_text, INPUT_ENCODING);
      $rawText = str_repeat(REPLACEMENT_CHAR, $len);
      $j = 0;
      for ($i = 0; $i < $len; $i++) {
          $char = mb_substr($printable_text, $i, 1, INPUT_ENCODING);
          if (isset($encodeMap[$char])) {
              $rawText[$j] = $encodeMap[$char];
          }
         // } elseif ($char === "\r") {
              /* Skip past Windows line endings (UTF-8 usage) */
        //      continue;
        //  }
          $j++;
      }
   return $rawText;
}

function get_encoding_map () {

  //$printer -> textRaw( "\x1 \x2 \x3 \x4 \x5 \x6 \x7 \x8 \x9 \xa \xb \xc \xd \xe \xf \x10 \x11 \x12 \x13 \x14 \x15 \x16 \x17 \x18 \x19 \x1a \x1b \x1c \x1d \x1e \x1f \x20 \x21 \x22 \x23 \x24 \x25 \x26 \x27 \x28 \x29 \x2a \x2b \x2c \x2d \x2e \x2f \x30 \x31 \x32 \x33 \x34 \x35 \x36 \x37 \x38 \x39 \x3a \x3b \x3c \x3d \x3e \x3f \x40 \x41 \x42 \x43 \x44 \x45 \x46 \x47 \x48 \x49 \x4a \x4b \x4c \x4d \x4e \x4f \x50 \x51 \x52 \x53 \x54 \x55 \x56 \x57 \x58 \x59 \x5a \x5b \x5c \x5d \x5e \x5f \x60 \x61 \x62 \x63 \x64 \x65 \x66 \x67 \x68 \x69 \x6a \x6b \x6c \x6d \x6e \x6f \x70 \x71 \x72 \x73 \x74 \x75 \x76 \x77 \x78 \x79 \x7a \x7b \x7c \x7d \x7e \x7f \x80 \x81 \x82 \x83 \x84 \x85 \x86 \x87 \x88 \x89 \x8a \x8b \x8c \x8d \x8e \x8f \x90 \x91 \x92 \x93 \x94 \x95 \x96 \x97 \x98 \x99 \x9a \x9b \x9c \x9d \x9e \x9f \xa0 \xa1 \xa2 \xa3 \xa4 \xa5 \xa6 \xa7 \xa8 \xa9 \xaa \xab \xac \xad \xae \xaf \xb0 \xb1 \xb2 \xb3 \xb4 \xb5 \xb6 \xb7 \xb8 \xb9 \xba \xbb \xbc \xbd \xbe \xbf \xc0 \xc1 \xc2 \xc3 \xc4 \xc5 \xc6 \xc7 \xc8 \xc9 \xca \xcb \xcc \xcd \xce \xcf \xd0 \xd1 \xd2 \xd3 \xd4 \xd5 \xd6 \xd7 \xd8 \xd9 \xda \xdb \xdc \xdd \xde \xdf \xe0 \xe1 \xe2 \xe3 \xe4 \xe5 \xe6 \xe7 \xe8 \xe9 \xea \xeb \xec \xed \xee \xef \xf0 \xf1 \xf2 \xf3 \xf4 \xf5 \xf6 \xf7 \xf8 \xf9 \xfa \xfb \xfc \xfd \xfe \xff" );



    $encoding_map = array ();

    $encoding_map [" "] = "\x20";




    $encoding_map ["!"] = "\x21";

    $encoding_map ['"'] = "\x22";
$encoding_map ['“'] = "\x22";
$encoding_map ['”'] = "\x22";



    $encoding_map ["#"] = "\x23";
    $encoding_map ["$"] = "\x24";
    $encoding_map ["%"] = "\x25";
    $encoding_map ["&"] = "\x26";
    $encoding_map ["'"] = "\x27";
    $encoding_map ["("] = "\x28";
    $encoding_map [")"] = "\x29";
    $encoding_map ["*"] = "\x2a";
    $encoding_map ["+"] = "\x2b";
    $encoding_map [","] = "\x2c";
    $encoding_map ["-"] = "\x2d";
    $encoding_map ["."] = "\x2e";
    $encoding_map ["/"] = "\x2f";

    $encoding_map ["0"] = "\x30";
  $encoding_map ["1"] = "\x31";
  $encoding_map ["2"] = "\x32";
  $encoding_map ["3"] = "\x33";
  $encoding_map ["4"] = "\x34";
  $encoding_map ["5"] = "\x35";
  $encoding_map ["6"] = "\x36";
  $encoding_map ["7"] = "\x37";
  $encoding_map ["8"] = "\x38";
  $encoding_map ["9"] = "\x39";


  $encoding_map [":"] = "\x3a";
  $encoding_map [";"] = "\x3b";
  $encoding_map ["<"] = "\x3c";
  $encoding_map ["="] = "\x3d";
  $encoding_map [">"] = "\x3e";
  $encoding_map ["?"] = "\x3f";
  $encoding_map ["@"] = "\x40";
  $encoding_map ["A"] = "\x41";
  $encoding_map ["B"] = "\x42";
  $encoding_map ["C"] = "\x43";
  $encoding_map ["D"] = "\x44";
  $encoding_map ["E"] = "\x45";
  $encoding_map ["F"] = "\x46";
  $encoding_map ["G"] = "\x47";
  $encoding_map ["H"] = "\x48";
  $encoding_map ["I"] = "\x49";
  $encoding_map ["J"] = "\x4a";
  $encoding_map ["K"] = "\x4b";
  $encoding_map ["L"] = "\x4c";
  $encoding_map ["M"] = "\x4d";
  $encoding_map ["N"] = "\x4e";
  $encoding_map ["O"] = "\x4f";
  $encoding_map ["P"] = "\x50";
  $encoding_map ["Q"] = "\x51";
  $encoding_map ["R"] = "\x52";
  $encoding_map ["S"] = "\x53";
  $encoding_map ["T"] = "\x54";
  $encoding_map ["U"] = "\x55";
  $encoding_map ["V"] = "\x56";
  $encoding_map ["W"] = "\x57";
  $encoding_map ["X"] = "\x58";
  $encoding_map ["Y"] = "\x59";
  $encoding_map ["Z"] = "\x5a";
  $encoding_map ["["] = "\x5b";
  $encoding_map ["\\"] = "\x5c";
  $encoding_map ["]"] = "\x5d";
  $encoding_map ["^"] = "\x5e";
  $encoding_map ["_"] = "\x5f";
  $encoding_map ["`"] = "\x60";
  $encoding_map ["a"] = "\x61";
  $encoding_map ["b"] = "\x62";
  $encoding_map ["c"] = "\x63";
  $encoding_map ["d"] = "\x64";
  $encoding_map ["e"] = "\x65";
  $encoding_map ["f"] = "\x66";
  $encoding_map ["g"] = "\x67";
  $encoding_map ["h"] = "\x68";
  $encoding_map ["i"] = "\x69";
  $encoding_map ["j"] = "\x6a";
  $encoding_map ["k"] = "\x6b";
  $encoding_map ["l"] = "\x6c";
  $encoding_map ["m"] = "\x6d";
  $encoding_map ["n"] = "\x6e";
  $encoding_map ["o"] = "\x6f";
  $encoding_map ["p"] = "\x70";
  $encoding_map ["q"] = "\x71";
  $encoding_map ["r"] = "\x72";
  $encoding_map ["s"] = "\x73";
  $encoding_map ["t"] = "\x74";
  $encoding_map ["u"] = "\x75";
  $encoding_map ["v"] = "\x76";
  $encoding_map ["w"] = "\x77";
  $encoding_map ["x"] = "\x78";
  $encoding_map ["y"] = "\x79";
  $encoding_map ["z"] = "\x7a";
  $encoding_map ["{"] = "\x7b";
  $encoding_map ["|"] = "\x7c";
  $encoding_map ["}"] = "\x7d";
  $encoding_map ["~"] = "\x7e";

  $encoding_map ["Ā"] = "\xb5";
  $encoding_map ["ņ"] = "\xb7";
  $encoding_map ["Č"] = "\xd3";
  $encoding_map ["ā"] = "\xc6";
  $encoding_map ["Š"] = "\xd0";
  $encoding_map ["č"] = "\xd2";
  $encoding_map ["ģ"] = "\xd6";
  $encoding_map ["Ī"] = "\xd7";
  $encoding_map ["ī"] = "\xd8";
  $encoding_map ["ū"] = "\xdd";
  $encoding_map ["Ū"] = "\xde";
  $encoding_map ["Ē"] = "\xf0";
  $encoding_map ["ē"] = "\xf1";
  $encoding_map ["Ģ"] = "\xf2";
  $encoding_map ["ķ"] = "\xf3";
  $encoding_map ["Ķ"] = "\xf4";
  $encoding_map ["ļ"] = "\xf5";
  $encoding_map ["Ļ"] = "\xf6";
  $encoding_map ["ž"] = "\xf7";
  $encoding_map ["Ž"] = "\xf8";
  $encoding_map ["Ņ"] = "\xfc";
  $encoding_map ["š"] = "\xfd";


    return $encoding_map ;
}
