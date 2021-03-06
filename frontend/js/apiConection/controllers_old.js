function altaEstablecimientoView(){
	printTemplate(getTemplate("js/apiConection/templates/altaEstablecimiento.html"));
	document.getElementsByTagName('title')[0].text = "Metele Onda - Crear establecimiento";
	escondeCiudad();
	llenaProvincias();
	llenaRubros();
};

function altaEstablecimientoController(){
	json = {};
	form = document.getElementById('formEstablecimiento');
	json['nombre'] 		= 	form.nombre.value;
	json['ciudad'] 		= 	form.ciudad.selectedOptions[0].value;
	json['direccion'] 	= 	form.direccion.value;
	json['rubro'] 		= 	form.rubro.selectedOptions[0].value;
	// Latitud y longitud en desarrollo
	json['longitud'] 	= 	0.00;
	json['latitud'] 	= 	0.00;
	return post_recurso('http://127.0.0.1:8000/establecimientos/?format=json',
		JSON.stringify(json),
		function (resultado){
			printTemplate(getTemplate("js/apiConection/templates/altaEstablecimientoOk.html"));
			document.getElementsByTagName('title')[0].text = "Metele Onda - Establecimiento creado"
		}
	)
};

function EstablecimientosView(pag){
	get_recurso('http://127.0.0.1:8000/establecimientos/?format=json&page='+pag, 
		function (establecimientos){
			for (var i = 0; i < establecimientos.results.length; i++) {
				establecimiento 			= establecimientos.results[i];
				id 							= establecimiento.id;
				ciudad 						= get_recurso_s(establecimiento.ciudad);
				provincia 					= get_recurso_s(ciudad.provincia);
				establecimiento.ciudad 		= ciudad.nombre;
				establecimiento.provincia 	= provincia.nombre;
				rubro 						= get_recurso_s(establecimiento.rubro);
				establecimiento.rubro 		= rubro.nombre;
				estadisticas 				= get_recurso_s('http://127.0.0.1:8000/establecimientos/'+id+'/estadisticas/?format=json');
				establecimiento.total 		= estadisticas.total;
				establecimiento.promedio 	= estadisticas.promedio;
			}
			EstablecimientosTemplate(establecimientos);		
		}
	)
};

function altaCiudadView(){
	var provincia = document.getElementById('id_provincia').selectedOptions[0];
	var index = document.getElementById('id_provincia').selectedIndex;
	printTemplate(getTemplate("js/apiConection/templates/altaCiudad.html"));
	document.getElementsByTagName('title')[0].text 		= "Metele Onda - Crear ciudad";
	document.getElementById('provincia').textContent 	= provincia.text;
	document.getElementById('provincia').value 			= provincia.value;
	document.getElementById('provincia').index 			= index;
	document.getElementById('desistCiudad').onclick 	= altaEstablecimientoView;
};

function altaCiudadController(){
	var json = {};
	form = document.getElementById('formCiudad');
	json['nombre'] 		= 	form.nombre.value;
	json['codigo_postal'] 	= 	form.codigo_postal.value;
	json['provincia'] 		= 	document.getElementById('provincia').value;
	post_recurso('http://127.0.0.1:8000/ciudades/?format=json',
		JSON.stringify(json),
		altaCiudadTemplate
	)
};

function refrescaCiudades(){
	var index 	= 	document.getElementById('id_provincia').selectedIndex;
	if (index > 0){
		muestraCiudad();
		var id 		= 	document.getElementById('id_provincia').options[index].id;
		get_recurso('http://127.0.0.1:8000/provincias/'+id+'/ciudades/?format=json', 
		refrescaCiudadesTemplate
		)
	} else {
		escondeCiudad();
	}
};

function llenaProvincias(){
	get_recurso('http://127.0.0.1:8000/provincias/?format=json', 
	llenaProvinciasTemplate
	)
};

function llenaRubros(){
	get_recurso('http://127.0.0.1:8000/rubros/?format=json', 
	llenaRubrosTemplate
	)
};

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