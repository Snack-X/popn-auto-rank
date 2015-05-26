<?php

$req = curl_init();
curl_setopt($req, CURLOPT_URL, $url);
curl_setopt($req, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.146");
curl_setopt($req, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($req, CURLOPT_SSLVERSION, 3);
curl_setopt($req, CURLOPT_RETURNTRANSFER, true);
curl_setopt($req, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($req, CURLOPT_HEADER, false);

$result = curl_exec($req);
curl_close($req);

if($result[0] !== "{") {
  $output = json_encode([
    "result" => false
  ]);
}
else {
  $data = json_decode($result, true);

  $send = [
    47 => $data["47"],
    48 => $data["48"],
    49 => $data["49"]
  ];

  $output = json_encode([
    "result" => true,
    "data" => $send
  ]);
}

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

echo $output;
