function getTemplate(path){
	var xmlhttp;
	var resource;
	xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			resource = xmlhttp.responseText;
		}
	}
	xmlhttp.open("GET",path,false);
	xmlhttp.send();
	return resource;
}

function printTemplate(html){
	document.getElementById("content").innerHTML = html;
}

function printTemplateMenu(html){
	document.getElementById("menu").innerHTML = html;
}
