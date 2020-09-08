<?php
require('fpdf/fpdf.php');

$pagesize =  array(25,150);  // w = 9 cm h = 2.5 cm
$pdf = new FPDF('L','mm', $pagesize);
$pdf->AddPage();
$pdf-> SetMargins(0, 0);
$pdf-> SetAutoPageBreak (false);
/*$pdf->SetFont('Arial','B',10);
$pdf->Cell(10,0,'1Namaste World!');
$pdf->Cell(10,10,'2Namaste World!');
$pdf->Cell(7,20,'3Namaste World!',1);
*/

// postition parameters.
$image_file = 'flag_black_on_white.png';
$img_size = 10;
$img_top_marin = 5 ;
$img_left_margin = 84;

$pdf->Image($image_file,$img_left_margin,$img_top_marin,$img_size );
$pdf->Output("F","flag.pdf");

?>
