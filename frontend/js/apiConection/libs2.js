function getTemplate(path){
	var xmlhttp;
	var resource;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			resource = xmlhttp.responseText;
		}
	}
	xmlhttp.open("GET", path, false);
	xmlhttp.send();
	return resource;
};

function printTemplate(locacion, html){
	document.getElementById(locacion).innerHTML = html;
};
