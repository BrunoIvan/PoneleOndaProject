function manageFormEstablecimientoTemplate(){
	html = getTemplate("templates/altaEstablecimiento.html");
	printTemplate(html);
}

function escondeCiudad(){
	document.getElementById("ciudad").style.visibility = 'hidden';
	document.getElementById("lbl_ciudad").style.visibility = 'hidden';
	document.getElementById("nuevaciudad").style.visibility = 'hidden';
}

function muestraCiudad(){
	document.getElementById("ciudad").style.visibility = 'visible';
	document.getElementById("lbl_ciudad").style.visibility = 'visible';
	document.getElementById("nuevaciudad").style.visibility = 'visible';
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