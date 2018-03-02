<?php

$msg = $_POST['first_name']." ".$_POST['last_name'];
$msg .= "\n\n";
$msg .= $_POST['email_address'];
$msg .= "\n\n";
$msg .= $_POST['inquiry_type'];
$msg .= "\n\n";
$msg .= $_POST['message_box'];
$msg .= "\n\n";
$msg .= "\n\n";
$msg .= "\n\n";
$msg .= "\n\n";
$headers = "From: ".$_POST['email_address']."\r\n";

mail("support@pinnaclepointetax.com","Site Inquiry",$msg,$headers);

?>

