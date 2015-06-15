<?php

function curlGet($url) {
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
  return $result;
}

function jsonResult($data) {
  $output = json_encode($data);

  header("Content-Type: application/json; charset=UTF-8");
  echo $output;

  die;
}

$id = $_GET["id"];

// Get info page
$infoPage = curlGet("http://popn.azu.kr/{$id}");
preg_match("/\/json\/(.*)\.json/", $infoPage, $match);

if(count($match) !== 2) {
  jsonResult([
    "result" => false
  ]);
}

// Get real username
$id = $match[1];
$popnData = curlGet("http://popn.azu.kr/json/{$id}.json");

if($popnData[0] !== "{") {
  jsonResult([
    "result" => false
  ]);
}
else {
  $data = json_decode($popnData, true);

  // Onle 47 ~ 49
  $send = [
    47 => $data["47"],
    48 => $data["48"],
    49 => $data["49"]
  ];

  jsonResult([
    "result" => true,
    "username" => $id,
    "data" => $send
  ]);
}
