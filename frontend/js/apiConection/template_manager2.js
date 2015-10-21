function manageFormEstablecimientoTemplate(){
	html = getTemplate("templates/altaEstablecimiento.html");
	printTemplate(html);
};

function escondeCiudad(){
	document.getElementById("campo_ciudad").style.visibility = 'hidden';
	document.getElementById("label_ciudad").style.visibility = 'hidden';
	document.getElementById("group_ciudad").style.visibility = 'hidden';
	document.getElementById("id_ciudad").style.visibility = 'hidden';
	document.getElementById("span_ciudad").style.visibility = 'hidden';
	document.getElementById("nueva_ciudad").style.visibility = 'hidden';
};

function muestraCiudad(){
	document.getElementById("campo_ciudad").style.visibility = 'visible';
	document.getElementById("label_ciudad").style.visibility = 'visible';
	document.getElementById("group_ciudad").style.visibility = 'visible';
	document.getElementById("id_ciudad").style.visibility = 'visible';
	document.getElementById("span_ciudad").style.visibility = 'visible';
	document.getElementById("nueva_ciudad").style.visibility = 'visible';
};

function llenaRubrosTemplate(rubros){
	var opciones 	= 	document.getElementById('id_rubro');
	for(i = 0; i < rubros.length; i++) {
		var opcion 		= 	document.createElement('option');
		opcion.value 	= 	rubros[i].url;
		opcion.id 		= 	rubros[i].id;
		opcion.text 	= 	rubros[i].nombre;
		opciones.appendChild(opcion);
	}
};

function llenaProvinciasTemplate(provincias){
	var opciones 		= document.getElementById('id_provincia');
	opciones.onchange = refrescaCiudades;
	for(i = 0; i < provincias.length; i++) {
		var opcion 		= 	document.createElement('option');
		opcion.value 	= 	provincias[i].url;
		opcion.id 		= 	provincias[i].id;
		opcion.text 	= 	provincias[i].nombre;
		opciones.appendChild(opcion);
	}
};

function refrescaCiudadesTemplate(ciudades){
	var ciudades_x 	= document.getElementById('id_ciudad').options;
	while(ciudades_x.length > 1){
		ciudades_x[1].remove();
	}
	var opciones 	= 	document.getElementById('id_ciudad');
	for(i = 0; i < ciudades.length; i++) {
		var opcion 	= 	document.createElement('option');
		opcion.value= 	ciudades[i].url;
		opcion.id 	= 	ciudades[i].id;
		opcion.text = 	ciudades[i].nombre;
		opciones.appendChild(opcion);
	}
};

function altaCiudadTemplate(resultado){
	var index = document.getElementById('provincia').index;
	var ciudad = document.getElementById('id_nombre').value;
	altaEstablecimientoView();
	document.getElementById('id_provincia').selectedIndex = index;
	refrescaCiudades();
	ciudades = document.getElementById('id_ciudad');
	for (var i = 0; i < ciudades.length; i++) {
		if (ciudades[i].text === ciudad){
			ciudades.selectedIndex = i;
			break;
		}
	}
};

function EstablecimientosTemplate(establecimientos){
	document.getElementById('content').innerHTML = '';
	for (var i = 0; i < establecimientos.results.length; i++) {
		establecimiento = establecimientos.results[i];
		var html = getTemplate("js/apiConection/templates/establecimiento.html");
		document.getElementById('content').innerHTML += html;
		nombre = establecimiento.nombre;
		id = establecimiento.id;
		document.getElementById('nombre').textContent = nombre;
		document.getElementById('nombre').id = id;
		var direccion = establecimiento.direccion;
		direccion += ', ';
		direccion += establecimiento.ciudad;
		direccion += ', ';
		direccion += establecimiento.provincia;
		direccion += '.'
		document.getElementById('direccion').textContent = direccion;
		document.getElementById('direccion').id = id;
		document.getElementById('rubro').textContent = establecimiento.rubro;
		document.getElementById('rubro').id = id;
		document.getElementById('total').textContent = establecimiento.total;
		document.getElementById('total').id = id;
		document.getElementById('promedio').textContent = establecimiento.promedio;
		document.getElementById('promedio').id = id;
	}
	// Paginación
	var html = getTemplate("js/apiConection/templates/paginacion.html");
	document.getElementById('content').innerHTML += html;
	var prev = establecimientos.previous;
	if (prev == null) {
		var actual = 1;
		document.getElementById('paginasAnteriores').remove();
	} else {
		if (prev[prev.length-1] > 1) {
			var prev_n = parseInt(prev[prev.length-1]);
		} else {
			var prev_n = 1;
		}
		var actual = prev_n+1;
		var primera = 1;
		document.getElementById('paginaAnterior').value = actual-1;
		document.getElementById('paginaAnterior').onclick = function () {
			EstablecimientosView(actual-1);
		}
		document.getElementById('paginaPrimera').value = 1;
		document.getElementById('paginaPrimera').onclick = function () {
			EstablecimientosView(primera);
		} 
	}
	var next = establecimientos.next;
	if (next == null){
		var ultima = actual;
		document.getElementById('paginasSiguientes').remove();
	} else {
		var next_n = parseInt(next[next.length-1]);
		var count = establecimientos.count;
		var pagsxpag = establecimientos.results.length;
		var ultima = (count/pagsxpag);
		document.getElementById('paginaSiguiente').value = actual+1;
		document.getElementById('paginaSiguiente').onclick = function () {
			EstablecimientosView(actual+1);
		}
		document.getElementById('paginaUltima').value = ultima;
		document.getElementById('paginaUltima').onclick = function () {
			EstablecimientosView(ultima);
		}
	}
	document.getElementById('paginaActual').innerHTML = 'Página '+actual+' de '+ultima;
	document.getElementsByTagName('title')[0].text = "Metele Onda - Listado de establecimientos";
};

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