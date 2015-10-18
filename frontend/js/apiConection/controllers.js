function mainController(){
	printTemplate(getTemplate("js/apiConection/templates/altaEstablecimiento.html"));
	llenaProvincias();
}

function altaEstablecimientoController(){
	manageFormEstablecimientoTemplate();
 }

function agregarEstablecimientoController(nombre, direccion, latitud, longitud, ciudad, rubro){
	var formData = new FormData();
	formData.append("nombre", nombre);
	formData.append("direccion", direccion);
	formData.append("latitud", latitud);
	formData.append("longitud", longitud);
	formData.append("ciudad", ciudad);
	formData.append("rubro", rubro);
	//var formElement = document.getElementById("formestablecimiento");
	agregarObjetoModel("establecimientos", formData, function(){
		alert('Establecimiento dado de alta con éxito');
	});	
}

function agregarCiudadController(ciudad, codigo, provincia_url, provincia_id){
	var formData = new FormData();
	formData.append("nombre", ciudad);
	formData.append("codigo_postal", codigo);
	formData.append("provincia", provincia_url);
	agregarObjetoModel("ciudades", formData, function(){
		getCiudadesxProvinciaModel(provincia_id, function (ciudades){   
			llenaListaCiudades(ciudades);
			muestraPostAltaCiudad();
		});	
	}); 
}

function listaProvinciasController(){
	getObjetoModel("provincias", function (provincias){
		llenaListaProvincias(provincias);   
	});	
}	

function listaCiudadesProvController(provincia){
	getCiudadesxProvinciaModel(provincia, function (ciudades){   
		llenaListaCiudades(ciudades);
	});	
}	

function listaRubrosController(){
	getObjetoModel("rubros", function (rubros){
		llenaListaRubros(rubros);   
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