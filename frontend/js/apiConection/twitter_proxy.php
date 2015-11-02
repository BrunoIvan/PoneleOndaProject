<?php
/**
 *  Usage:
 *  Send the url you want to access url encoded in the url paramater, for example (This is with JS): 
 *  /twitter-proxy.php?url='+encodeURIComponent('statuses/user_timeline.json?screen_name=MikeRogers0&count=2')
*/
// The tokens, keys and secrets from the app you created at https://dev.twitter.com/apps
$config = array(
	'oauth_access_token' => '157666898-rjletafrGBBXQlrGDyi4qsjbPWQgOQKtLX8Kszxd',
	'oauth_access_token_secret' => 'FFbtSNq5665cXF8FAVvAa7DHTU2dYYXC2bYiB2HL4iHrV',
	'consumer_key' => 'rXxkt64UKgsdZuw11Zydp3m59',
	'consumer_secret' => 'Kp0Dp5WxuSMW0wy6WyUyzr1aigHUvLUk8HR1wDE3GX3FKZ7vRJ',
	'use_whitelist' => true, // If you want to only allow some requests to use this script.
	'base_url' => 'https://api.twitter.com/1.1/'
);
// Only allow certain requests to twitter. Stop randoms using your server as a proxy.
$whitelist = array(
	'statuses/user_timeline.json?screen_name=SuperCamisetas0&count=10&include_rts=false&exclude_replies=true'=>true,
	'oauth/request_token'=>true
);
/*
* Ok, no more config should really be needed. Yay!
*/
// We'll get the URL from $_GET[]. Make sure the url is url encoded, for example encodeURIComponent('statuses/user_timeline.json?screen_name=MikeRogers0&count=10&include_rts=false&exclude_replies=true')
if(!isset($_GET['url'])){
	die('No URL set');
}
$url = $_GET['url'];
//echo $url;
//echo $whitelist[$url];
//echo !isset($whitelist[$url]);
if($config['use_whitelist'] && !isset($whitelist[$url])){
//	die('URL is not authorised');
}
// Figure out the URL parmaters
$url_parts = parse_url($url);
parse_str($url_parts['query'], $url_arguments);
$full_url = $config['base_url'].$url; // Url with the query on it.
$base_url = $config['base_url'].$url_parts['path']; // Url without the query.
/**
* Code below from http://stackoverflow.com/questions/12916539/simplest-php-example-retrieving-user-timeline-with-twitter-api-version-1-1 by Rivers 
* with a few modfications by Mike Rogers to support variables in the URL nicely
*/
function buildBaseString($baseURI, $method, $params) {
	$r = array();
	ksort($params);
	foreach($params as $key=>$value){
	$r[] = "$key=" . rawurlencode($value);
	}
	return $method."&" . rawurlencode($baseURI) . '&' . rawurlencode(implode('&', $r));
}
function buildAuthorizationHeader($oauth) {
	$r = 'Authorization: OAuth ';
	$values = array();
	foreach($oauth as $key=>$value)
	$values[] = "$key=\"" . rawurlencode($value) . "\"";
	$r .= implode(', ', $values);
	return $r;
}
// Set up the oauth Authorization array
$oauthpre = array(
	'oauth_consumer_key' => $config['consumer_key'],
	'oauth_nonce' => time(),
	'oauth_callback' => "http%3A%2F%2Fmyapp.com%3A3005%2Ftwitter%2Fprocess_callback",
	'oauth_signature_method' => 'HMAC-SHA1',
	'oauth_timestamp' => time(),
	'oauth_version' => '1.0'
);

$oauth = array(
	'oauth_consumer_key' => $config['consumer_key'],
	'oauth_nonce' => time(),
	'oauth_signature_method' => 'HMAC-SHA1',
	'oauth_token' => $config['oauth_access_token'],
	'oauth_timestamp' => time(),
	'oauth_version' => '1.0'
);
	
$base_info = buildBaseString($base_url, 'GET', array_merge($oauth, $url_arguments));
$composite_key = rawurlencode($config['consumer_secret']) . '&' . rawurlencode($config['oauth_access_token_secret']);
$oauth_signature = base64_encode(hash_hmac('sha1', $base_info, $composite_key, true));
$oauth['oauth_signature'] = $oauth_signature;
// Make Requests
$header = array(
	buildAuthorizationHeader($oauthpre), 
	'Expect:'
);
$options = array(
	CURLOPT_HTTPHEADER => $header,
	//CURLOPT_POSTFIELDS => $postfields,
	CURLOPT_HEADER => false,
	CURLOPT_URL => $full_url,
	CURLOPT_RETURNTRANSFER => true,
	CURLOPT_SSL_VERIFYPEER => false
);
$feed = curl_init();
curl_setopt_array($feed, $options);
$result = curl_exec($feed);
$info = curl_getinfo($feed);
curl_close($feed);
// Send suitable headers to the end user.
if(isset($info['content_type']) && isset($info['size_download'])){
	header('Content-Type: '.$info['content_type']);
	header('Content-Length: '.$info['size_download']);
}
echo($result);
?>