function put_recurso(url, json, funcion){
	var recurso = new XMLHttpRequest();
	recurso.onreadystatechange = function(){
		if (recurso.readyState == 4 && recurso.status == 200){
			var respuesta = JSON.parse(recurso.responseText);
			funcion(respuesta);
		}
	}
	recurso.open('PUT', url, false);
	recurso.setRequestHeader('Content-type', 'application/json');
	recurso.send(json);
};

function delete_recurso(url, funcion){
	var recurso = new XMLHttpRequest();
	recurso.onreadystatechange = function(){
		if (recurso.readyState == 4 && recurso.status == 200){
			var respuesta = JSON.parse(recurso.responseText);
			funcion(respuesta);
		}
	}
	recurso.open('DELETE', url, false);
	recurso.send();
};

function post_recurso(url, json, funcion){
	var recurso = new XMLHttpRequest();
	recurso.onreadystatechange = function(){
		if (recurso.readyState == 4 && recurso.status == 201){
			var respuesta = JSON.parse(recurso.responseText);
			funcion(respuesta);
		}
	}
	recurso.open('POST', url, false);
	recurso.setRequestHeader('Content-type', 'application/json');
	recurso.send(json);
};

function get_recurso(url, funcion){
	var recurso = new XMLHttpRequest();
	recurso.onreadystatechange = function(){
		if (recurso.readyState == 4 && recurso.status == 200){
			var respuesta = JSON.parse(recurso.responseText); 
			funcion(respuesta);
		}
	}
	recurso.open('GET', url, false);
	recurso.send();
};

function put_recurso_s(url, json, funcion){
	var recurso = new XMLHttpRequest();
	recurso.open('PUT', url, false);
	recurso.setRequestHeader('Content-type', 'application/json');
	recurso.send(json);
	var respuesta = JSON.parse(recurso.responseText);
	return respuesta;
};

function delete_recurso_s(url, funcion){
	var recurso = new XMLHttpRequest();
	recurso.open('DELETE', url, false);
	recurso.send();
	var respuesta = JSON.parse(recurso.responseText);
	return respuesta;

};

function post_recurso_s(url, json, funcion){
	var recurso = new XMLHttpRequest();
	recurso.open('POST', url, false);
	recurso.setRequestHeader('Content-type', 'application/json');
	recurso.send(json);
	var respuesta = JSON.parse(recurso.responseText);
	return respuesta;
};

function get_recurso_s(url, funcion){
	var recurso = new XMLHttpRequest();
	recurso.open('GET', url, false);
	recurso.send();
	var respuesta = JSON.parse(recurso.responseText);
	return respuesta;
};