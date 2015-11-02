<?php
$token = '';
$token_secret = '';
$consumer_key = 'mi8Cn50JkJyCpA8xdzBjxGVQw';
$consumer_secret = 'z55ziQXMT6wWoyTI9dt8ZmepFeiUApeIoa6VUGxORV36IXlUpH';

$host = 'api.twitter.com';
$method = 'POST';
$path = '/oauth/request_token'; // api call path

//$query = array( // query parameters
//    'screen_name' => 'supercamisetas',
//    'count' => '5'
//);

$oauth = array(
    'oauth_nonce' => (string)mt_rand(), // a stronger nonce is recommended
    'oauth_callback' => 'http://www.futbolpasion.com',
    'oauth_signature_method' => 'HMAC-SHA1',
    'oauth_timestamp' => time(),
    'oauth_consumer_key' => $consumer_key,
    'oauth_version' => '1.0'
);

$oauth = array_map("rawurlencode", $oauth); // must be encoded before sorting
//$query = array_map("rawurlencode", $query);

//$arr = array_merge($oauth, $query); // combine the values THEN sort
$arr = $oauth;
asort($arr); // secondary sort (value)
ksort($arr); // primary sort (key)

// http_build_query automatically encodes, but our parameters
// are already encoded, and must be by this point, so we undo
// the encoding step
$querystring = urldecode(http_build_query($arr, '', '&'));

$url = "https://$host$path";

// mash everything together for the text to hash
$base_string = $method."&".rawurlencode($url)."&".rawurlencode($querystring);
echo nl2br("url es \r\n" . rawurlencode($url) . "\r\n");
echo nl2br("param es \r\n" . rawurlencode($querystring) . "\r\n");
echo nl2br("base string es \r\n" . $base_string . "\r\n");
// same with the key
$key = rawurlencode($consumer_secret)."&".rawurlencode($token_secret);
// generate the hash
$signature = rawurlencode(base64_encode(hash_hmac('sha1', $base_string, $key, true)));

// this time we're using a normal GET query, and we're only encoding the query params
// (without the oauth params)
//$url .= "?".http_build_query($query);
$url=str_replace("&amp;","&",$url); //Patch by @Frewuill

$oauth['oauth_signature'] = $signature; // don't want to abandon all that work!
ksort($oauth); // probably not necessary, but twitter's demo does it

// also not necessary, but twitter's demo does this too
function add_quotes($str) { return '"'.$str.'"'; }
$oauth = array_map("add_quotes", $oauth);

// this is the full value of the Authorization line
$auth = "OAuth " . urldecode(http_build_query($oauth, '', ', '));

// if you're doing post, you need to skip the GET building above
// and instead supply query parameters to CURLOPT_POSTFIELDS
echo nl2br("\nel array de parametros es : \n". $auth . "\n");
$options = array( CURLOPT_HTTPHEADER => array("Authorization: $auth"),
                  //CURLOPT_POSTFIELDS => $postfields,
                  CURLOPT_HEADER => false,
                  CURLOPT_URL => $url,
                  CURLOPT_RETURNTRANSFER => true,
                  CURLOPT_SSL_VERIFYPEER => false);

// do our business
$feed = curl_init();
curl_setopt_array($feed, $options);
$json = curl_exec($feed);
curl_close($feed);

$twitter_data = json_decode($json);

//$tweetout = '';  
//foreach ($twitter_data as &$value) {
//   $tweetout .= preg_replace("/(http:\/\/|(www\.))(([^\s<]{4,68})[^\s<]*)/", '<a href="http://$2$3" target="_blank">$1$2$4</a>', $value->text);
//   $tweetout = preg_replace("/@(\w+)/", "<a href=\"http://www.twitter.com/\\1\" target=\"_blank\">@\\1</a>", $tweetout);
//   $tweetout = preg_replace("/#(\w+)/", "<a href=\"http://search.twitter.com/search?q=\\1\" target=\"_blank\">#\\1</a>", $tweetout);
//}

//echo $tweetout;
echo "\n el json es :\n". $json;
?>