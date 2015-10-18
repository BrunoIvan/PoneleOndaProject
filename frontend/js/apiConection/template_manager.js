function manageFormEstablecimientoTemplate(){
	html = getTemplate("templates/altaEstablecimiento.html");
	printTemplate(html);
	document.getElementById("btn_nuevaciudad").onclick = function () {
		var prov = document.getElementById("provincia");
		agregarCiudadController(document.getElementById("txt_ciudad").value, document.getElementById("codigo").value, prov.options[prov.selectedIndex].id, prov.options[prov.selectedIndex].value);
		document.getElementById("nombre").focus();
	}
	document.getElementById("cancelaraltaciudad").onclick = function(){
		muestraListaCiudades();
	}
	document.getElementById("agregar").onclick = function () {
		var ciud = document.getElementById("ciudad");
		var rubr = document.getElementById("rubro");
		agregarEstablecimientoController(document.getElementById("nombre").value, document.getElementById("direccion").value, document.getElementById("latitud").value, document.getElementById("longitud").value, ciud.options[ciud.selectedIndex].value, rubr.options[rubr.selectedIndex].value);
	}
	deshabilitaGeolocalizacion();
	listaRubrosController();
	listaProvinciasController();
	muestraListaCiudades();
	deshabilitaCiudad();
	document.getElementById("provincia").onchange = function () {
		muestraListaCiudades();
		listaCiudadesProvController(document.getElementById("provincia").value);
		habilitaCiudad();
		document.getElementById("nuevaciudad").onclick = function () {
			muestraAgregarCiudades();
	 	}
	}
}

function muestraPostAltaCiudad(){
	muestraListaCiudades();
	marcaCiudad(document.getElementById("txt_ciudad").value);
}

function marcaCiudad(ciudad){
	var select = document.getElementById("ciudad");
    for (var i = 0; i < select.options.length; ++i) {
        if (select.options[i].text == ciudad){
        	select.options[i].selected = true;
        }
    }
}

function llenaListaCiudades(ciudades){
	var select = document.getElementById("ciudad");
	select.innerHTML = "";
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
}

function llenaListaRubros(rubros){
	var select = document.getElementById("rubro");
	select.innerHTML = "";
	var opt = document.createElement('option');
	opt.value = "";
    opt.innerHTML = "Elegir un rubro ...";
    opt.selected = true;
 	opt.disabled = true;
    select.appendChild(opt);
	for(i = 0; i < rubros.length; i++) {
		var opt = document.createElement('option');
		opt.value = rubros[i].url;
    	opt.innerHTML = rubros[i].nombre;
    	select.appendChild(opt);
    }	
}

function llenaListaProvincias(provincias){
	var select = document.getElementById("provincia");
	var opt = document.createElement('option');
	opt.value = "";
    opt.innerHTML = "Elegir una provincia ...";
    opt.selected = true;
 	opt.disabled = true;
    select.appendChild(opt);
	for(i = 0; i < provincias.length; i++) {
		var opt = document.createElement('option');
		opt.id = provincias[i].url;
    	opt.value = provincias[i].id;
    	opt.innerHTML = provincias[i].nombre;
    	select.appendChild(opt);
	}
}

function muestraListaCiudades(){
	document.getElementById("agregarciudad").style.display = "none"
	document.getElementById("elegirciudad").style.display = "block";
}

function muestraAgregarCiudades(){
	document.getElementById("txt_ciudad").value = "";
	document.getElementById("codigo").value = "";
	document.getElementById("elegirciudad").style.display = "none";
	document.getElementById("agregarciudad").style.display = "block"
}

function deshabilitaGeolocalizacion(){
	document.getElementById("latitud").value = 0.0;
	document.getElementById("latitud").disabled = true;
	document.getElementById("longitud").value = 0.0;
	document.getElementById("longitud").disabled = true;
}

function deshabilitaCiudad(){
	document.getElementById("ciudad").readOnly = true;
	document.getElementById("nuevaciudad").disabled = true;
}

function habilitaCiudad(){
	document.getElementById("ciudad").readOnly = false;
	document.getElementById("nuevaciudad").disabled = false;
}

/*
function manageListaCursosTemplate(cursos){
	var partial = "";
	for(c in cursos){
		partial += "<li>" + cursos[c].name + "</li>";
	}
	html = getTemplate("templates/lista_cursos.html");
	html = html.replace("[lista_de_cursos]", partial);
	printTemplate(html);
}

function listaDeCursos(listacursospersona,cursos){
	var lista_cursos_nombre = "";
	var lista_cursos = (listacursospersona + '').split(",");
		var longitud_lista = lista_cursos.length;
		for (var j = 0; j < longitud_lista; j++){
			lista_cursos_nombre += cursos[lista_cursos[j]];
		}    
	return lista_cursos_nombre;
}

function listaDePersonas(listapersonacursos,personas){
	var lista_personas_nombre = "";
	var lista_personas = (listapersonacursos + '').split(",");
		var longitud_lista = lista_personas.length;
		for (var j = 0; j < longitud_lista; j++){
			lista_personas_nombre += personas[lista_personas[j]];
		}    
	return lista_personas_nombre;
}

function manageProfesoresTemplate(profesores, cursos){
	var partial = "<table><tr><th>nombre</th><th>apellido</th><th>dni</th><th>cursos</th>";
	for(i = 0; i < profesores.length; i++) {
		partial += "<tr><td>" +
		profesores[i].name +
		"</td><td>" +
		profesores[i].surname +
		"</td><td>"+
		profesores[i].dni +
		"</td><td>" +
		listaDeCursos(profesores[i].cursos, cursos) +
		"</td><td>" +
		"<button id=\"borrar" + i + "\" onclick=\"borrarProfesorController('" + profesores[i].url + "')\">Borrar</button>" +
		"</td><td>" +
		"<button id=\"modificar" + i + "\" onclick=\"modificarProfesorController('" + profesores[i].url + "','" + profesores[i].name + "','" + profesores[i].surname + "','" + profesores[i].dni + "','" + profesores[i].cursos + "')\">Modif</button>" +
		"</td></tr>";
	}
		partial += "</td><td colspan=6>" +
		"<button onclick=\"agregarProfesorController()\">Agregar Profesor</button>" +
		"</table>";

	html = getTemplate("templates/profesores.html");
	html = html.replace("[tabla_de_profesores]", partial);
	printTemplate(html);
}

function manageAlumnosTemplate(alumnos, cursos){
	var partial = "<table><tr><th>nombre</th><th>apellido</th><th>legajo</th><th>cursos</th>";
	for(i = 0; i < alumnos.length; i++) {
		partial += "<tr><td>" +
		alumnos[i].name +
		"</td><td>" +
		alumnos[i].surname +
		"</td><td>"+
		alumnos[i].legajo +
		"</td><td>" +
		listaDeCursos(alumnos[i].cursos, cursos) +
		"</td><td>" +
		"<button id=\"borrar" + i + "\" onclick=\"borrarAlumnoController('" + alumnos[i].url + "')\">Borrar</button>" +
		"</td><td>" +
		"<button id=\"modificar" + i + "\" onclick=\"modificarAlumnoController('" + alumnos[i].url + "','" + alumnos[i].name + "','" + alumnos[i].surname + "','" + alumnos[i].legajo + "','" + alumnos[i].cursos + "')\">Modif</button>" +
		"</td></tr>";
	}
		partial += "</td><td colspan=6>" +
		"<button onclick=\"agregarAlumnoController()\">Agregar Alumno</button>" +
		"</table>";

	html = getTemplate("templates/alumnos.html");
	html = html.replace("[tabla_de_alumnos]", partial);
	printTemplate(html);
}

function manageCursosTemplate(cursos, profesores, alumnos){
	var partial = "<table><tr><th>nombre</th><th>año</th><th>profesores</th><th>alumnos</th>";
	for(i = 0; i < cursos.length; i++) {
		partial += "<tr><td>" +
		cursos[i].name +
		"</td><td>" +
		cursos[i].year +
		"</td><td>"+
		listaDePersonas(cursos[i].profesores, profesores) +
		"</td><td>" +
		listaDePersonas(cursos[i].alumnos, alumnos) +
		"</td><td>" +
		"<button id=\"borrar" + i + "\" onclick=\"borrarCursoController('" + cursos[i].url + "')\">Borrar</button>" +
		"</td><td>" +
		"<button id=\"modificar" + i + "\" onclick=\"modificarCursoController('" + cursos[i].url + "','" + cursos[i].name + "','" + cursos[i].year + "','" + cursos[i].profesores + "','" + cursos[i].alumnos + "')\">Modif</button>" +
		"</td></tr>";
	}
		partial += "</td><td colspan=6>" +
		"<button onclick=\"agregarCursoController()\">Agregar Curso</button>" +
		"</table>";

	html = getTemplate("templates/cursos.html");
	html = html.replace("[tabla_de_cursos]", partial);
	printTemplate(html);
}

function manageFormPersonaTemplate(){
	html = getTemplate("templates/form_persona.html");
	printTemplate(html);
}

function manageFormCursoTemplate(){
	html = getTemplate("templates/form_curso.html");
	printTemplate(html);
}
*/