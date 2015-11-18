
/*
function manageFormEstablecimientoTemplate(){
	html = getTemplate("templates/altaEstablecimiento.html");
	printTemplate(html);
};
*/
function menuLogueoView(autenticado){
	if (autenticado == 1){
		printTemplate("navbar-content-login", getTemplate("js/apiConection/templates/menu_logout.html"));
	}
	else{
		printTemplate("navbar-content-login", getTemplate("js/apiConection/templates/menu_login.html"));
	}
};

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

function valid_alta_calificacion() {
	if (valid_form_alerta('id_puntaje', 
		'Debe elegir un puntaje') == false){
		return false;
	} else {
		return true;
	}
};

function valid_llena_fecha() {
	if (valid_form_alerta('id_anno', 
		'Debe elegir un año') == false){
		return false;
	} else if (10000 <= document.getElementById('id_anno').value){
		alert('Debe elegir un año válido');
		return false;
	} else if (valid_form_alerta('id_mes', 
		'Debe elegir un mes') == false){
		return false;
	} else if (valid_form_alerta('id_dia', 
		'Debe elegir un dia') == false){
		return false;
	} else if (0 >= document.getElementById('id_dia').value){
		alert('Debe elegir un dia válido');
		return false;
	} else if (31 < document.getElementById('id_dia').value){
		alert('Debe elegir un dia válido');
		return false;
	} else {
		return true;
	}
}

function valid_form_estadisticas () {
	if (valid_form_alerta('id_nombre', 
		'Debe ingresar un establecimiento') == false) {
		return false;
	} else if (document.getElementById('id_nombre').tagName === 'INPUT'){ 
		alert('Debe ingresar un establecimiento');
		return false;
	} else if (valid_form_alerta('id_desde', 
		'Debe elegir una fecha "Desde"') == false) {
		return false;
	} else if (valid_form_alerta('id_hasta', 
		'Debe elegir una fecha "Hasta"') == false) {
		return false;
	} else if (document.getElementById('id_desde') === document.getElementById('id_hasta')){ 
		alert('Las fechas deben ser diferentes');
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

function GraficoTemplate(nombreEst, desde, pointInterval) {
    var chart1 = new Highcharts.Chart({
        chart: {
            renderTo: 'container',
            type: 'line',
            zoomType: 'x'
        }, 
        title: {
        	text: 'Calificaciones de ' + nombreEst
        }, 

        xAxis: {
            type: 'datetime', 
        },
        yAxis: { 
            title: {
                text: 'Calificaciones'
            }
        },

        series: [{
            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4, 
            29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
            pointStart: Date.UTC(desde.anno, desde.mes-1, desde.dia),
            pointInterval: pointInterval // one day
        }]
    });
};

function EstadisticasTemplate(){
	printTemplate("content", getTemplate("js/apiConection/templates/estadisticas.html"));
	printTemplate("form_est", getTemplate("js/apiConection/templates/buscar_est.html"));
};

function CancelEstController () {
	printTemplate("form_est", getTemplate("js/apiConection/templates/buscar_est.html"));
}

function LlenaMejoresTemplate(mejores){
	var tabla = document.getElementById('estadisticas');
	for (var i = 0; i < 10; i++) {
		tabla.children[i].children[0].textContent = mejores[i].nombre;
	}
};

function LlenaPeoresTemplate(peores){
	var tabla = document.getElementById('estadisticas');
	for (var i = 0; i < 10; i++) {
		tabla.children[i].children[1].textContent = peores[i].nombre;
	}
};

function atrasAnno(){
	var annos = document.getElementsByName('anno');
	for (var i = 0; i < annos.length; i++) {
		annos[i].value--;
		annos[i].textContent--;
		annos[i].className = 'btn btn-default';
	}
	document.getElementById('id_anno').value = '';
};

function sigAnno(){
	var annos = document.getElementsByName('anno');
	for (var i = 0; i < annos.length; i++) {
		annos[i].value++;
		annos[i].textContent++;
		annos[i].className = 'btn btn-default';
	}
	document.getElementById('id_anno').value = '';
};

function elijeAnno(ind) {
	var annos = document.getElementsByName('anno');
	for (var i = 0; i < annos.length; i++) {
		if(i == ind){
			annos[i].className = 'btn btn-success';
			document.getElementById('id_anno').value = annos[i].value;
		} else {
			annos[i].className = 'btn btn-default';
		}
	}
};

function elijeMes(ind) {
	var meses = document.getElementsByName('mes');
	for (var i = 0; i < meses.length; i++) {
		if(i == ind){
			meses[i].className = 'btn btn-success';
			document.getElementById('id_mes').value = meses[i].value;
		} else {
			meses[i].className = 'btn btn-default';
		}
	}
};

function llenaFecha(param){
	if (valid_llena_fecha()){
		if(param == 1){
			fecha = document.getElementById('id_desde');
		} else {
			fecha = document.getElementById('id_hasta');
		}
		dia = document.getElementById('id_dia').value;
		if (dia > 31){
			dia = 31;
		} else if (dia < 10){
			dia = '0' + dia;
		}
		mes = document.getElementById('id_mes').value;
		anno = document.getElementById('id_anno').value;
		concat = dia + '/' + mes + '/' + anno;
		fecha.value = concat;
	}
};

/*
function DescartaRepetidos(){
	resultados = [];
	tabla = document.getElementById('estadisticas');
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 2; j++) {
			if(tabla.children[i].children[j].textContent in resultados){
				tabla.children[i].children[j].textContent = '';
			} else {
				resultados.push(tabla.children[i].children[j].textContent);
			}
		}
	}
};
*/

function BusqEstablecimientosView(){
	printTemplate("content", getTemplate("js/apiConection/templates/busqEstablecimiento.html"));
	document.getElementsByTagName('title')[0].text = "Metele Onda - Búsqueda";
	document.getElementById('submitBusqueda').onclick = function () {
		var nombre_is_valid = valid_form_simple('id_nombre');
		var dirección_is_valid = valid_form_simple('id_direccion');
		var form_is_valid = nombre_is_valid + dirección_is_valid;
		if (form_is_valid){
			if (nombre_is_valid && dirección_is_valid){
				var nombre = document.getElementById('id_nombre').value;
				var direccion = document.getElementById('id_direccion').value;
				param = 'dualbusq/' + nombre + '/' + direccion + '/';
			} else if (nombre_is_valid){
				var nombre = document.getElementById('id_nombre').value;
				param = 'nombre/' + nombre + '/';
			} else if (dirección_is_valid){
				var direccion = document.getElementById('id_direccion').value;
				param = 'direccion/' + direccion + '/';
			}
			BusqEstablecimientosController(param, 1);
		} else {
			alert('Debe especificar al menos un campo');
		}
	}
};

function altaCalificacionView(id, nombre){
	var puntaje, i, j, k, alta;
	printTemplate("content", getTemplate("js/apiConection/templates/altaCalificacion.html"));
	document.getElementById('est').textContent = 'Crear calificacion para ' + nombre;
	puntaje = document.getElementById('puntaje');
	puntaje.attributes.valueOf()[1].value;
	for (i = 0; i < puntaje.children.length; i++) {
		puntaje.children[i].addEventListener('click', 
			function (e) {
				puntaje = document.getElementById('puntaje');
				if(e.target.tagName === 'A'){
					k = parseInt(e.target.attributes[1].value);
				} else if(e.target.tagName === 'SPAN'){
					k = parseInt(e.target.parentElement.attributes[1].value);
				}
				k--;
				document.getElementById('id_puntaje').value = puntaje.children[k].children[0].attributes[1].value;
				for (j = 0; j < puntaje.children.length; j++) {
					if(j <= (k)){
						puntaje.children[j].className = 'active';
					} else {
						puntaje.children[j].className = '';
					}
				}
			}
		);
	}
	alta = document.getElementById('submitCalificacion')
	alta.addEventListener('click', 
		function (){
			if(valid_alta_calificacion() == true){
				altaCalificacionController();
			}
		}
	);
	volver = document.getElementById('volver')
	volver.addEventListener('click', 
		function (e){
			EstablecimientoDetalleView(id);
		}
	);
	document.getElementsByTagName('title')[0].text = "Metele Onda - Calificar establecimiento";
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

function llenaListaEstablecimientos (establecimientos) {
	printTemplate("form_est", getTemplate("js/apiConection/templates/lista_est.html"));
	var select = document.getElementById('id_nombre');
	for (var i = 0; i < establecimientos.results.length; i++) {
		var establecimiento = establecimientos.results[i];
		var option = document.createElement('option');
		option.value = establecimiento.id;
		var nombre = establecimiento.nombre + ', ' + establecimiento.ciudad + ', ' + establecimiento.provincia
		option.textContent = nombre;
		select.appendChild(option);
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
	document.getElementById('content').innerHTML = '';
	var html = getTemplate("js/apiConection/templates/calificaciones.html");
	var star = getTemplate('js/apiConection/templates/star_icon.html');
	document.getElementById('content').innerHTML += html;
	html = getTemplate("js/apiConection/templates/calificacion.html");
	if (calificaciones.results.length > 0){
		nombre = calificaciones.results[0].establecimiento_nombre;
		document.getElementById('nombre').textContent = 'Calificaciones de ' + nombre;
	} else {
		document.getElementById('nombre').textContent = 'Este establecimiento no tiene calificaciones aún';
	}
	for (var i = 0; i < calificaciones.results.length; i++) {
		if (i % 2 == 0){
			columna = 'columna1';
		} else {
			columna = 'columna2';
		}
		var calificacion= calificaciones.results[i];
		var id 			= calificacion.id.toFixed();
		var puntaje 	= calificacion.puntaje;
		var puntaje_vis = star;
		for (var x = 1; x < puntaje; x++) {
			puntaje_vis += star;
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
		document.getElementById('puntaje' + id).innerHTML 		= puntaje_vis;
		document.getElementById('comentario' + id).textContent	= comentario;
	}
	// Paginacion
	var html = getTemplate("js/apiConection/templates/paginacion.html");
	document.getElementById('paginacion').innerHTML += html;
	var prev = calificaciones.previous;
	if(prev == null){
		var actual = 1;
		document.getElementById('paginasAnteriores').remove();
	} else {
		if (prev[prev.length-1] > 1) {
			var prev_n = parseInt(prev[prev.length-1]);
		} else { var prev_n = 1 }
		var actual = prev_n+1;
		var primera = 1;
		document.getElementById('paginaAnterior').value = actual-1;
		document.getElementById('paginaAnterior').onclick = function () {
			CalificacionesView(calificacion.establecimiento_id, actual-1);
		}
		document.getElementById('paginaPrimera').value = 1;
		document.getElementById('paginaPrimera').onclick = function () {
			CalificacionesView(calificacion.establecimiento_id, primera);
		}
	}
	var next = calificaciones.next;
	if (next == null){
		var ultima = actual;
		document.getElementById('paginasSiguientes').remove();
	} else {
		var next_n = parseInt(next[next.length-1]);
		var count = calificaciones.count;
		var pagsxpag = calificaciones.results.length;
		var ultima = count/pagsxpag;
		if(ultima - parseInt(ultima) > 0){
			ultima = parseInt(ultima) + 1;
		}
		document.getElementById('paginaSiguiente').value = actual+1;
		document.getElementById('paginaSiguiente').onclick = function () {
			CalificacionesView(calificacion.establecimiento_id, actual+1);
		}
		document.getElementById('paginaUltima').value = ultima;
		document.getElementById('paginaUltima').onclick = function () {
			CalificacionesView(calificacion.establecimiento_id, ultima);
		}
	}
	document.getElementById('paginaActual').innerHTML = 'Página '+actual+' de '+ultima;
	document.getElementsByTagName('title')[0].text = "Metele Onda - Listado de establecimientos";
	var volver = document.getElementById('volver');
	volver.addEventListener('click', 
		function (e) {
			EstablecimientoDetalleView(calificacion.establecimiento_id);
		}
	);
};

function EstablecimientoDetalleTemplate(establecimiento){
	document.getElementById('content').innerHTML = '';
	var html 		= getTemplate('js/apiConection/templates/establecimientoDetalle.html');
	html 			= html.replace('mapsrc', establecimiento.map);
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
	document.getElementById('ver_calif').textContent= 'Ver calificaciones para ' + nombre;
	document.getElementById('ver_calif').onclick 	= function() {
		CalificacionesView(id, 1);
	}
	document.getElementById('alta_calif').onclick 	= function() {
		altaCalificacionView(id, nombre);
	}
};

function EstablecimientosTemplate(establecimientos){
	var html, panel, panel_content, nombre_elem, direccion_elem, rubro_elem;
	var promedio_elem, total_elem, det_boton_elem, calif_ver_elem, calif_alta_elem;
	var nombre, direccion, i, j, ver_est;
	document.getElementById('content').innerHTML = '';
	var html = getTemplate("js/apiConection/templates/establecimiento.html");
	if(establecimientos.results == undefined){
		resultados 	= establecimientos;
		paginado = false;
		if(resultados.length > 0){
			printTemplate('content', 
				getTemplate('js/apiConection/templates/recoAlertOk.html'));
		} else {
			printTemplate('content', 
				getTemplate('js/apiConection/templates/recoAlertBad.html'));
		}
	} else {
		resultados 	= establecimientos.results;
		paginado = true;
	}
	for (i = 0; i < resultados.length; i++) {
		establecimiento = resultados[i];
		nombre 			= establecimiento.nombre;
		direccion 		= establecimiento.direccion;
		direccion += ', ';
		direccion += establecimiento.ciudad;
		direccion += ', ';
		direccion += establecimiento.provincia;
		direccion += '.';
		document.getElementById('content').innerHTML+= html;
		document.getElementById('panel').id = establecimiento.id;
		panel 			= document.getElementById(establecimiento.id);
		panel_content 	= panel.children[0].children;
		nombre_elem 	= panel_content[0].children[0].children[0];
		direccion_elem 	= panel_content[1].children[0].children[0].children[1];
		rubro_elem 		= panel_content[1].children[0].children[0].children[3];
		promedio_elem 	= panel_content[2].children[0].children[0].children[0].children[1];
		total_elem 		= panel_content[2].children[0].children[1].children[0].children[1];
		nombre_elem.textContent 	= nombre;
		direccion_elem.textContent 	= direccion;
		rubro_elem.textContent 		= establecimiento.rubro;
		promedio_elem.textContent 	= establecimiento.stats[1];
		total_elem.textContent 		= establecimiento.stats[0];
	}
	if(paginado == true){
		// Paginación
		var html = getTemplate("js/apiConection/templates/paginacion.html");
		document.getElementById('content').innerHTML += html;
		var prev = establecimientos.previous;
		if (prev == null || prev === 'null') {
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
				if (prev.includes('format')) {
					EstablecimientosView(actual-1);
				} else {
					BusqEstablecimientosController(param, actual-1);
				}
			}
			document.getElementById('paginaPrimera').value = 1;
			document.getElementById('paginaPrimera').onclick = function () {
				if (prev.includes('format')) {
					EstablecimientosView(primera);
				} else {
					BusqEstablecimientosController(param, primera);
				}
			} 
		}
		var next = establecimientos.next;
		if (next == null || next === 'null'){
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
				if (next.includes('format')) {
					EstablecimientosView(actual+1);
				} else {
					BusqEstablecimientosController(param, actual+1);
				}
			}
			document.getElementById('paginaUltima').value = ultima;
			document.getElementById('paginaUltima').onclick = function () {
				if (next.includes('format')) {
					EstablecimientosView(ultima);
				} else {
					BusqEstablecimientosController(param, ultima);
				}
			}
		}
		document.getElementById('paginaActual').innerHTML = 'Página '+actual+' de '+ultima;
		document.getElementsByTagName('title')[0].text = "Metele Onda - Listado de establecimientos";
	}
	var ver_ests 	= 	document.getElementsByName('ver_est');
	var ver_califs 	= 	document.getElementsByName('ver_calif');
	var alta_califs 	= 	document.getElementsByName('alta_calif');
	for (var i = 0; i < ver_ests.length; i++) {
		ver_ests[i].addEventListener('click', 
			function (e) {
				var id = e.target.parentElement.parentElement.parentElement.id;
				EstablecimientoDetalleView(id);
			}
		);
		ver_califs[i].addEventListener('click', 
			function (e) {
				var id = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id;
				CalificacionesView(id, 1);
			}
		);
		alta_califs[i].addEventListener('click', 
			function (e) {
				panel 	= e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
				var id 	= panel.id;
				nombre 	= panel.children[0].children[0].children[0].children[0].textContent;
				altaCalificacionView(id, nombre);
			}
		);
	}
};

