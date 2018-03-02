
<?php
$ch = curl_init();
$url = 'https://www.google.com/recaptcha/api/siteverify';

curl_setopt($ch, CURLOPT_URL,$url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, "secret=".$_POST['secret']."&response=".$_POST['response']."");

// receive server response ...
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec ($ch);
echo $response;
curl_close ($ch);
?>
