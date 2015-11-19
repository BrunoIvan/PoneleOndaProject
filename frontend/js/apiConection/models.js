function getObjetoModel(objeto, funcion, pagina){
	var xmlhttp, resp;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status==200){
			resp = JSON.parse(xmlhttp.responseText);
			funcion(resp)
		}
	}
	var url = "http://localhost:8000/" + objeto + "?format=json";
	if (typeof pagina !== 'undefined') {
		url += "&page=" + pagina;
	}	
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
//	return resp;
};

function getBusqObjetoModel(objeto, parametros, funcion, pagina){
	var xmlhttp, resp;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status==200){
			resp = JSON.parse(xmlhttp.responseText);
			funcion(resp)
		}
	}
	var url = "http://localhost:8000/" + objeto + "?format=json";
	for (var i = 0; i < parametros.length; i++) {
		url += parametros[i]
	};
	if (typeof pagina !== 'undefined') {
		url += "&page=" + pagina;
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
//	return resp;
};

function getCiudadesxProvinciaModel(provincia_pk, funcion){
	var xmlhttp, resp;
	xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			resp = JSON.parse(xmlhttp.responseText);
			funcion(resp)
		}
	}	
	xmlhttp.open("GET","http://localhost:8000/provincias/" + provincia_pk + "/ciudades/?format=json",true);
	xmlhttp.send();
//	return resp;
};

/* // Hay tiempo para volar funciones viejas que andaban bien
function agregarObjetoModel(objeto, formData, funcion){
	var xmlhttp = new XMLHttpRequest();
	var resp = false;
	xmlhttp.onreadystatechange=function(){
	  if (xmlhttp.readyState==4 && xmlhttp.status==201){
		funcion(resp);
	  }
	} 
	xmlhttp.open("POST","http://localhost:8000/" + objeto + "/",true);
	xmlhttp.send(formData);
}
*/

function agregarObjetoModel(objeto, formData, funcionOK, funcionBAD){
	var xmlhttp = new XMLHttpRequest();
	var resp = false;
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status==201){
			funcionOK(resp);
		} else if (xmlhttp.readyState == 4 && xmlhttp.status==400){
			funcionBAD(resp);
		}
	}
	xmlhttp.open("POST","http://localhost:8000/" + objeto + "/",true);
	xmlhttp.send(formData);
};

function get_recurso_s(url, funcion){
	var recurso = new XMLHttpRequest();
	recurso.open('GET', url, false);
	recurso.send();
	var respuesta = JSON.parse(recurso.responseText);
	return respuesta;
};

function autenticarModel(sitio, formData, funcionOK, funcionBAD){
	var xmlhttp = new XMLHttpRequest();
	var resp = false;
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status==200){
			resp = JSON.parse(xmlhttp.responseText);
			funcionOK(resp);
		} else if (xmlhttp.readyState == 4 && xmlhttp.status==400){
			funcionBAD(resp);
		}
	}
	xmlhttp.open("POST","http://localhost:8000/api-auth/" + sitio + "/",true);
	xmlhttp.send(formData);

}

/*function buscarUsuarioModel(sitio, id, funcionOK, funcionBAD){
	var xmlhttp = new XMLHttpRequest();
	var resp = false;
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status==200){
			resp = JSON.parse(xmlhttp.responseText);
			funcionOK(resp);
		} else if (xmlhttp.readyState == 4 && xmlhttp.status==400){
			funcionBAD(resp);
		}
	}
	xmlhttp.open("GET","http://localhost:8000/usuario/" + sitio + "/?format=json&" + sitio + "_id=" + id, true);
	xmlhttp.send();

}*/

function corroboraSesion () {
	var token = getCookie('token');
	if (token === ''){
		estado_sesion = false;
		return undefined;
	}
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status==200){
			resp = JSON.parse(xmlhttp.responseText);
			if(resp.tipo === 'anonymous'){
				estado_sesion = false;
			} else {
				estado_sesion = true;
			}
		}
	}
	xmlhttp.open("GET","http://localhost:8000/sesion/" + token, true);
	xmlhttp.send();
}

function estadoSesionModel(){
	var xmlhttp = new XMLHttpRequest();
	var resp = false;
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status==200){
			resp = JSON.parse(xmlhttp.responseText);
			funcionOK(resp);
		} else if (xmlhttp.readyState == 4 && xmlhttp.status==400){
			funcionBAD(resp);
		}
	}
	xmlhttp.open("GET","http://localhost:8000/sesion/", true);
	xmlhttp.send();
}

function loginModel(sitio, funcionOK, funcionBAD){
	var xmlhttp = new XMLHttpRequest();
	var resp = false;
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status==200){
			resp = JSON.parse(xmlhttp.responseText);
			funcionOK(resp);
		} else if (xmlhttp.readyState == 4 && xmlhttp.status==400){
			funcionBAD(resp);
		}
	}
	xmlhttp.open("GET","http://meteleonda.com:8000/login/" + sitio + "/?next=/home/", true);
	xmlhttp.send();

}

function loginModelFB(sitio, formData, funcionOK, funcionBAD){
	var xmlhttp = new XMLHttpRequest();
	var resp = false;
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status==200){
			resp = JSON.parse(xmlhttp.responseText);
			funcionOK(resp);
		} else if (xmlhttp.readyState == 4 && xmlhttp.status==400){
			funcionBAD(resp);
		}
	}
	xmlhttp.open("POST","http://meteleonda.com:8000/api/login/social/session/",true);
	xmlhttp.send(formData);

}

/*
function getCursosDiccModel(funcion){
	var xmlhttp;
	var dicc_cursos = new Object;
	xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			var resp =  JSON.parse(xmlhttp.responseText);
			for(i = 0; i < resp.length; i++) {
				dicc_cursos[resp[i].url] = resp[i].name;
			}
			funcion(dicc_cursos)
		}
	}
	 	
	xmlhttp.open("GET","http://localhost:8000/cursos?format=json",true);
	xmlhttp.send();
//	return dicc_cursos;
}

function getPersonasDiccModel(persona){
	var xmlhttp;
	var dicc_personas = new Object;
	xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			var resp =  JSON.parse(xmlhttp.responseText);
			for(i = 0; i < resp.length; i++) {
				dicc_personas[resp[i].url] = resp[i].name + ' ' + resp[i].surname;
			}
		}
	}
	xmlhttp.open("GET","http://localhost:8000/" + persona + "?format=json",false);
	xmlhttp.send();
	return dicc_personas;
}
*/