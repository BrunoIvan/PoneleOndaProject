/*
function manageFormEstablecimientoTemplate(){
	html = getTemplate("templates/altaEstablecimiento.html");
	printTemplate(html);
};
*/

function menuView(){
	printTemplate("navbar", getTemplate("js/apiConection/templates/menu.html"));
};

function altaEstablecimientoOKView(){
		printTemplate("content", getTemplate("js/apiConection/templates/altaEstablecimientoOk.html"));
		document.getElementsByTagName('title')[0].text = "Metele Onda - Establecimiento creado";
};

/*
function altaEstablecimientoBADView(){
		printTemplate("content", getTemplate("js/apiConection/templates/altaEstablecimientoBad.html"));
		document.getElementsByTagName('title')[0].text = "Metele Onda - Nombre duplicado";
};
*/

function valid_form_alerta(id, mensaje){
	if (document.getElementById(id).value === ''){
		alert(mensaje);
		return false;
	} else {
		return true;
	}
};

function valid_form_simple(id){
	return (document.getElementById(id).value.length > 0);
};

function valid_alta_establecimiento(){
		if (valid_form_alerta('id_nombre', 
				'Ingrese un nombre') == false){
			return false;
		} else if (valid_form_alerta('id_provincia', 
			'Ingrese una provincia') == false){
			return false;
		} else if (valid_form_alerta('id_ciudad', 
			'Ingrese una ciudad') == false){
			return false;
		} else if (valid_form_alerta('id_direccion', 
			'Ingrese una dirección') == false){
			return false;
		} else if (valid_form_alerta('id_rubro', 
			'Ingrese un rubro') == false){
			return false;
		} else {
			return true;
		}
};

function valid_alta_ciudad(){
	if (valid_form_alerta('txt_ciudad', 
			'Ingrese un nombre') == false){
		return false;
	} else if (valid_form_alerta('txt_codigo', 
		'Ingrese un código postal') == false){
		return false;
	} else {
		return true;
	}
};

function valid_busq_establecimiento(id, mensaje){
	var nombre_result 		= valid_form_simple('id_nombre').toFixed();
	var dirección_result 	= valid_form_simple('id_direccion').toFixed();
	return nombre_result + dirección_result;

};

function BusqEstablecimientosView(){
	printTemplate("content", getTemplate("js/apiConection/templates/busqEstablecimiento.html"));
	document.getElementsByTagName('title')[0].text = "Metele Onda - Búsqueda";
	document.getElementById('submitBusqueda').onclick = function () {
		var parametros = [];
		var nombre_is_valid = valid_form_simple('id_nombre');
		var dirección_is_valid = valid_form_simple('id_direccion');
		var form_is_valid = nombre_is_valid + dirección_is_valid;
		if (form_is_valid){
			if (nombre_is_valid){
				var nombre = document.getElementById('id_nombre').value;
				parametros.push('&nombre=' + nombre);
				parametros.push('&ordering=nombre');
			}
			if (dirección_is_valid){
				var direccion = document.getElementById('id_direccion').value;
				parametros.push('&direccion=' + direccion);
			}
			BusqEstablecimientosController(parametros, 1);
		} else {
			alert('Debe especificar al menos un campo');
		}
	}
};

function altaEstablecimientoView(){
	printTemplate("content", getTemplate("js/apiConection/templates/altaEstablecimiento.html"));
	document.getElementsByTagName('title')[0].text = "Metele Onda - Crear establecimiento";
	//Funcionalidad de los botones
	document.getElementById("agregar_ciudad").onclick = function () {
		if (valid_alta_ciudad()){
			var prov = document.getElementById("id_provincia");
			agregarCiudadController(document.getElementById("txt_ciudad").value, document.getElementById("txt_codigo").value, prov.options[prov.selectedIndex].id, prov.options[prov.selectedIndex].value);
			document.getElementById("id_direccion").focus();
		}
	}
	document.getElementById("cancelar_altaciudad").onclick = function(){
		set_disable('id_nombre', false);
		set_disable('id_direccion', false);
		set_disable('id_rubro', false);
		set_disable('submitEstablecimiento', false);
		muestraListaCiudades();
	}
	document.getElementById("submitEstablecimiento").onclick = function () {
		if (valid_alta_establecimiento()){
			agregarEstablecimientoController(document.getElementById("id_nombre").value, 
				document.getElementById("id_direccion").value, 
				document.getElementById("id_latitud").value, 
				document.getElementById("id_longitud").value, 
				document.getElementById("id_ciudad").value, 
				document.getElementById("id_rubro").value);
		}
	}
	listaRubrosController();
	listaProvinciasController();
	muestraListaCiudades();
	deshabilitaCiudad();
	document.getElementById("id_provincia").onchange = function () {
		muestraListaCiudades();
		listaCiudadesProvController(document.getElementById("id_provincia").value);
		habilitaCiudad();
		document.getElementById("nueva_ciudad").onclick = function () {
			muestraAgregarCiudades();
	 	}
	}	
};

function muestraListaCiudades(){
	document.getElementById("campo_ciudad_agregar").style.display = "none"
	document.getElementById("campo_ciudad_elegir").style.display = "block";
};

function set_disable(id, bool){
	document.getElementById(id).disabled = bool;
};

function muestraAgregarCiudades(){
	set_disable('id_nombre', true);
	set_disable('id_direccion', true);
	set_disable('id_rubro', true);
	set_disable('submitEstablecimiento', true);
	document.getElementById("txt_ciudad").value = "";
	document.getElementById("txt_codigo").value = "";
	document.getElementById("campo_ciudad_elegir").style.display = "none";
	document.getElementById("campo_ciudad_agregar").style.display = "block"
};

function deshabilitaCiudad(){
	document.getElementById("id_ciudad").readOnly = true;
	document.getElementById("nueva_ciudad").disabled = true;
};

function habilitaCiudad(){
	document.getElementById("id_ciudad").readOnly = false;
	document.getElementById("nueva_ciudad").disabled = false;
};

function muestraPostAltaCiudad(){
	muestraListaCiudades();
	marcaCiudad(document.getElementById("txt_ciudad").value);
};

function marcaCiudad(ciudad){
	var select = document.getElementById("id_ciudad");
    for (var i = 0; i < select.options.length; ++i) {
        if (select.options[i].text == ciudad){
        	select.options[i].selected = true;
        }
    };
};

function llenaListaCiudades(ciudades){
	var select = document.getElementById("id_ciudad");
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
};

function llenaListaRubros(rubros){
	var select = document.getElementById("id_rubro");
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
};

function llenaListaProvincias(provincias){
	var select = document.getElementById("id_provincia");
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
};

/*
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
*/

function CalificacionesTemplate(calificaciones){
	var html = getTemplate("js/apiConection/templates/calificacion.html");
	for (var i = 0; i < calificaciones.results.length; i++) {
		if (i % 2 == 0){
			columna = 'columna1';
		} else {
			columna = 'columna2';
		}
		var calificacion= calificaciones.results[i];
		var id 			= calificacion.id.toFixed();
		var puntaje 	= calificacion.puntaje;
		var puntaje_vis = '*';
		for (var x = 1; x < puntaje; x++) {
			puntaje_vis += '*';
		}
		var comentario 	= calificacion.comentario;
		document.getElementById(columna).innerHTML 	+= html;
		var calif = document.getElementById('calif');
		if(puntaje < 3){
			clase = 'alert alert-danger';
		} else if(puntaje == 3){
			clase = 'alert alert-warning';
		} else {
			clase = 'alert alert-success';
		}
		calif.className = clase;
		document.getElementById('calif').id 		+= id;
		document.getElementById('puntaje').id 		+= id;
		document.getElementById('comentario').id 	+= id;
		document.getElementById('puntaje' + id).textContent 	= puntaje_vis;
		document.getElementById('comentario' + id).textContent	= comentario;
	}
}

function EstablecimientoDetalleTemplate(establecimiento){
	document.getElementById('content').innerHTML = '';
	var html 		= getTemplate('js/apiConection/templates/establecimientoDetalle.html');
	var nombre 		= establecimiento.nombre;
	var id 			= establecimiento.id;
	var direccion 	= establecimiento.direccion;
	var ciudad 		= establecimiento.ciudad;
	var provincia 	= establecimiento.provincia;
	document.getElementById('content').innerHTML 	+= html;
	document.getElementById('nombre').textContent 	= nombre;
	document.getElementById('direccion').textContent= direccion;
	document.getElementById('ciudad').textContent 	= ciudad;
	document.getElementById('provincia').textContent= provincia;
	document.getElementById('rubro').textContent 	= establecimiento.rubro;
	document.getElementById('total').textContent 	= establecimiento.stats[0];
	document.getElementById('promedio').textContent = establecimiento.stats[1];
	CalificacionesView(id);
};

function EstablecimientosTemplate(establecimientos){
	document.getElementById('content').innerHTML = '';
	var html = getTemplate("js/apiConection/templates/establecimiento.html");
	for (var i = 0; i < establecimientos.results.length; i++) {
		var establecimiento = establecimientos.results[i];
		var nombre 			= establecimiento.nombre;
		var direccion 		= establecimiento.direccion;
		direccion += ', ';
		direccion += establecimiento.ciudad;
		direccion += ', ';
		direccion += establecimiento.provincia;
		direccion += '.';
		document.getElementById('content').innerHTML+= html;
		document.getElementById('panel').id = establecimiento.id;
		var panel 			= document.getElementById(establecimiento.id);
		var panel_content 	= panel.children[0].children;
		var nombre_elem 	= panel_content[0].children[0].children[0];
		var direccion_elem 	= panel_content[1].children[0].children[0].children[1];
		var rubro_elem 		= panel_content[1].children[0].children[0].children[3];
		var promedio_elem 	= panel_content[2].children[0].children[0].children[0].children[1];
		var total_elem 		= panel_content[2].children[0].children[1].children[0].children[1];
		var det_boton_elem 	= panel_content[3].children[0];
		nombre_elem.textContent 	= nombre;
		direccion_elem.textContent 	= direccion;
		rubro_elem.textContent 		= establecimiento.rubro;
		promedio_elem.textContent 	= establecimiento.stats[0];
		total_elem.textContent 		= establecimiento.stats[1];
		det_boton_elem.addEventListener('click', 
			function(e){
				alert(det_boton_elem.parentElement.parentElement.parentElement.id)
			}
		)
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
		var ultima = count/pagsxpag;
		if(ultima - parseInt(ultima) > 0){
			ultima = parseInt(ultima) + 1;
		}
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

