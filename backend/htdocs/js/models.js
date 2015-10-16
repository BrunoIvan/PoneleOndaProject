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


function getObjetoModel(objeto, funcion){
	var xmlhttp, resp;
	xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			resp = JSON.parse(xmlhttp.responseText);
			funcion(resp)
		}
	}	
	xmlhttp.open("GET","http://localhost:8000/" + objeto + "?format=json",true);
	xmlhttp.send();
//	return resp;
}

function borrarObjetoModel(url){
	var xmlhttp;
	xmlhttp=new XMLHttpRequest();
	xmlhttp.open("DELETE",url,false);
	xmlhttp.send();
   	return true;
}

function modificarObjetoModel(url, formData){
	var xmlhttp; 
	var resp = false;
	xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
	  if (xmlhttp.readyState==4 && xmlhttp.status==200){
		resp = true;
	  }
	} 
	xmlhttp.open("PUT",url,false);
	xmlhttp.send(formData);
	return resp;
}
function agregarObjetoModel(objeto, formData){
	var xmlhttp = new XMLHttpRequest();
	var resp = false;
	xmlhttp.onreadystatechange=function(){
	  if (xmlhttp.readyState==4 && xmlhttp.status==201){
		resp = true;
	  }
	} 
	xmlhttp.open("POST","http://localhost:8000/" + objeto + "/",false);
	xmlhttp.send(formData);
	return resp;
}
