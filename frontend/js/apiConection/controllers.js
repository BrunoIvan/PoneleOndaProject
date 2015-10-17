function mainController(){
	printTemplate(getTemplate("js/apiConection/templates/altaEstablecimiento.html"));
	llenaProvincias();
}

function altaEstablecimientoController(){
	manageFormEstablecimientoTemplate();
	escondeCiudad();
	document.getElementById("provincia").onchange = function () {llenaCiudadesProv(document.getElementById("provincia").value); muestraCiudad() };
	llenaProvincias();
//	var formElement = document.getElementById("formprofesores");
//	document.getElementById("dni_legajo").name = "dni";
//	document.getElementById("modificar").innerHTML = "Agregar";
//	document.getElementById("modificar").type = "submit";
//	document.getElementById("cancelar").onclick = function () { profesoresController() };

}

function llenaProvincias(){
	provincias 	= 	get_recurso('http://127.0.0.1:8000/provincias/?format=json');
	provincias 	= 	JSON.parse(provincias.response);
	opciones 	= 	document.getElementById('id_provincia');
	for(i = 0; i < provincias.length; i++) {
		var opcion 		= 	document.createElement('option');
		opcion.value 	= 	provincias[i].id;
		opcion.text 	= 	provincias[i].nombre;
		opciones.appendChild(opcion);
	}
}

function llenaProvinciasfer(){
	getObjetoModel("provincias", function (provincias){   
		var select = document.getElementById("provincia");
		var opt = document.createElement('option');
		opt.value = "";
		opt.innerHTML = "Elegir una provincia ...";
		opt.selected = true;
		opt.disabled = true;
		select.appendChild(opt);
		for(i = 0; i < provincias.length; i++) {
			var opt = document.createElement('option');
			opt.value = provincias[i].id;
			opt.innerHTML = provincias[i].nombre;
			select.appendChild(opt);
		}
	});	
}	

function llenaCiudadesProv(provincia){
	getCiudadesxProvinciaModel(provincia, function (ciudades){   
		var select = document.getElementById("ciudad");
		var opt = document.createElement('option');
		opt.value = "";
		opt.innerHTML = "Elegir una ciudad ...";
		opt.selected = true;
		opt.disabled = true;
		select.appendChild(opt);
		for(i = 0; i < ciudades.length; i++) {
			var opt = document.createElement('option');
			opt.value = ciudades[i].url;
			opt.innerHTML = ciudades[i].nombre;
			select.appendChild(opt);
		}
	});	
}	

/*
function manejoResultadoConsultaCursos(cursos) {
	manageListaCursosTemplate(cursos);
}

function listadoCursosController(){
	getCursosDiccModel(manejoResultadoConsultaCursos);
}

function profesoresController(){
	getCursosDiccModel( function (cursos) {
		getObjetoModel("profesores", function (profesores) {
			manageProfesoresTemplate(profesores,cursos)		
		});
	});
}

function alumnosController(){
	var cursos = getCursosDiccModel();
	var alumnos = getObjetoModel("alumnos");
	manageAlumnosTemplate(alumnos,cursos);
}

function cursosController(){
	var profesores = getPersonasDiccModel("profesores");
	var alumnos = getPersonasDiccModel("alumnos");
	var cursos = getObjetoModel("cursos");
	manageCursosTemplate(cursos, profesores, alumnos);
}

function borrarProfesorController(url){
	var x = confirm("Seguro que borramos?");
	if (x){
		borrarObjetoModel(url);
		profesoresController();
	} else
		return false;
}

function borrarAlumnoController(url){
	var x = confirm("Seguro que borramos?");
	if (x){
		borrarObjetoModel(url);
		alumnosController();
	} else
		return false;
}

function borrarCursoController(url){
	var x = confirm("Seguro que borramos?");
	if (x){
		borrarObjetoModel(url);
		cursosController();
	} else
		return false;
}

function llenaCursos(){
	var dicc_cursos = getCursosDiccModel();
	var select = document.getElementById("cursos");
	for (var i in dicc_cursos){
		var opt = document.createElement('option');
		opt.id = i;
		opt.value = i;
		opt.innerHTML = dicc_cursos[i];
		select.appendChild(opt);
	}
}	

function llenaPersonas(persona){
	var dicc_personas = getPersonasDiccModel(persona);
	var select = document.getElementById(persona);
	for (var i in dicc_personas){
		var opt = document.createElement('option');
		opt.id = i;
		opt.value = i;
		opt.innerHTML = dicc_personas[i];
		select.appendChild(opt);
	}
}	

function marcaCursos(cursos){
	var lista_cursos = cursos.split(",");
	var longitud_lista = lista_cursos.length;
	for (var i = 0; i < longitud_lista; i++){
		document.getElementById(lista_cursos[i]).selected = true;
	}	
}

function marcaPersonas(personas){
	var lista_personas = personas.split(",");
	var longitud_lista = lista_personas.length;
	for (var i = 0; i < longitud_lista; i++){
		document.getElementById(lista_personas[i]).selected = true;
	}	
}

function modificarProfesorController(url, nombre, apellido, dni, cursos){
	manageFormPersonaTemplate();
	var formElement = document.getElementById("formpersonas");
	document.getElementById("nombre").value = nombre;
	document.getElementById("apellido").value = apellido;
	document.getElementById("lbl_dni_legajo").innerHTML = "DNI: ";
	document.getElementById("dni_legajo").name = "dni";
	document.getElementById("dni_legajo").value = dni;
	llenaCursos();
	marcaCursos(cursos);
	document.getElementById("modificar").innerHTML = "Cambiar";
	document.getElementById("modificar").type = "button";
	document.getElementById("modificar").onclick = function () { modificarObjetoModel(url, new FormData(formElement)); profesoresController() };
	document.getElementById("cancelar").onclick = function () { profesoresController() };
}

function modificarAlumnoController(url, nombre, apellido, legajo, cursos){
	manageFormPersonaTemplate();
	var formElement = document.getElementById("formpersonas");
	document.getElementById("nombre").value = nombre;
	document.getElementById("apellido").value = apellido;
	document.getElementById("lbl_dni_legajo").innerHTML = "Legajo: ";
	document.getElementById("dni_legajo").name = "legajo";
	document.getElementById("dni_legajo").value = legajo;
	llenaCursos();
	marcaCursos(cursos);
	document.getElementById("modificar").innerHTML = "Cambiar";
	document.getElementById("modificar").type = "button";
	document.getElementById("modificar").onclick = function () { modificarObjetoModel(url, new FormData(formElement)); alumnosController() };
	document.getElementById("cancelar").onclick = function () { alumnosController() };
}

function modificarCursoController(url, nombre, ano, profesores, alumnos){
	manageFormCursoTemplate();
	var formElement = document.getElementById("formcursos");
	document.getElementById("nombre").value = nombre;
	document.getElementById("ano").value = ano;
	llenaPersonas("profesores");
	marcaCursos(profesores);
	llenaPersonas("alumnos");
	marcaCursos(alumnos);
	document.getElementById("modificar").innerHTML = "Cambiar";
	document.getElementById("modificar").type = "button";
	document.getElementById("modificar").onclick = function () { modificarObjetoModel(url, new FormData(formElement)); cursosController() };
	document.getElementById("cancelar").onclick = function () { cursosController() };
}

function agregarProfesorController(){
	manageFormPersonaTemplate();
	llenaCursos();
	var formElement = document.getElementById("formprofesores");
	document.getElementById("dni_legajo").name = "dni";
	document.getElementById("modificar").innerHTML = "Agregar";
	document.getElementById("modificar").type = "submit";
	document.getElementById("modificar").onclick = function () { nuevoProfesorController(new FormData(formElement)) };
	document.getElementById("cancelar").onclick = function () { profesoresController() };

}

function nuevoProfesorController(formData){
	agregarObjetoModel("profesores", formData); 
	profesoresController()
}

function agregarAlumnoController(){
	manageFormPersonaTemplate();
	llenaCursos();
	var formElement = document.getElementById("formprofesores");
	document.getElementById("dni_legajo").name = "legajo";
	document.getElementById("modificar").innerHTML = "Agregar";
	document.getElementById("modificar").type = "submit";
	document.getElementById("modificar").onclick = function () { nuevoAlumnoController(new FormData(formElement)) };
	document.getElementById("cancelar").onclick = function () { alumnosController() };

}

function nuevoAlumnoController(formData){
	agregarObjetoModel("alumnos", formData); 
	alumnosController()
}

function agregarCursoController(){
	manageFormCursoTemplate();
	llenaPersonas("profesores");
	llenaPersonas("alumnos");
	var formElement = document.getElementById("formcursos");
	document.getElementById("modificar").innerHTML = "Agregar";
	document.getElementById("modificar").type = "submit";
	document.getElementById("modificar").onclick = function () { nuevoCursoController(new FormData(formElement)) };
	document.getElementById("cancelar").onclick = function () { cursosController() };

}

function nuevoCursoController(formData){
	agregarObjetoModel("cursos", formData); 
	cursosController()
}
*/