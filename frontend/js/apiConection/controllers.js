function mainController(){
	menuView();
	EstadisticasView();
};

function EstadisticasController () {
	if (valid_form_estadisticas() == true) {
		desde 		= document.getElementById('id_desde').value;
		hasta 		= document.getElementById('id_hasta').value;
		nombreEst 	= document.getElementById('id_nombre').selectedOptions[0].textContent;
		desde 		= {
			dia 	: parseInt(desde.slice(0, 2)), 
			mes 	: parseInt(desde.slice(3, 5)), 
			anno 	: parseInt(desde.slice(6, desde.length))
		}
		hasta 		= {
			dia 	: parseInt(hasta.slice(0, 2)), 
			mes 	: parseInt(hasta.slice(3, 5)), 
			anno 	: parseInt(hasta.slice(6, hasta.length))
		}
		if (desde.anno == hasta.anno) {
			if (desde.mes == hasta.mes) {
				pointInterval =  3600 * 1000 * 24
			} else {
				pointInterval =  3600 * 1000 * 24 * 7 * 4
			}
		} else {
			pointInterval =  3600 * 1000 * 24 * 7 * 4 * 12
		}
		GraficoTemplate(nombreEst, desde, pointInterval);
	}
};

/*
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
*/

function RecomendacionesView(rubro){
	getObjetoModel('rubros/' + rubro + '/recomendaciones/', 
		EstablecimientosTemplate);
};

function EstadisticasView(){
	EstadisticasTemplate();
	getObjetoModel('establecimientosdetalle/mejores/', 
		LlenaMejoresTemplate);
	getObjetoModel('establecimientosdetalle/peores/', 
		LlenaPeoresTemplate);
};

function EstablecimientosView(pag){
	getObjetoModel("establecimientosdetalle/", 
	EstablecimientosTemplate, 
	pag);
};

function EstablecimientoDetalleView(id){
	getObjetoModel("establecimientosdetalle/" + id + "/", 
	EstablecimientoDetalleTemplate);
};

function CalificacionesView(establecimiento_id, pag){
	getBusqObjetoModel("calificaciones/", 
	['&establecimiento=' + establecimiento_id], 
	CalificacionesTemplate, 
	pag);
};

function BusqEstablecimientosController(param, pag){
	getObjetoModel("establecimientosdetalle/" + param + pag + '/',
		function (establecimientos){
			if (establecimientos.count == 0){
				alert('Al parecer el sistema no encuentra resultados');
			} else {
				EstablecimientosTemplate(establecimientos);
			}
		}
	)
};

function BuscaEstController () {
	if (valid_form_alerta('id_nombre', 
		'Debe ingresar un nombre') == true) {;
		var param = document.getElementById('id_nombre').value;
		getObjetoModel("establecimientosdetalle/nombre/" + param + "/1/", 
		function (establecimientos) {
			if (establecimientos.results.length < 1) {
				alert('No hay resultados para ' + param);
			} else {
				llenaListaEstablecimientos(establecimientos);
			}
		});
	}
};

/*
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
*/

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
		altaEstablecimientoOKView();
	},
	function(){
		alert('Este establecimiento para esta ciudad ya existe');
	});	
};

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
		set_disable('id_nombre', false);
		set_disable('id_direccion', false);
		set_disable('id_rubro', false);
		set_disable('submitEstablecimiento', false);
	}, function(){
		alert('Esta ciudad para esta provincia ya existe');
	}); 
};

function listaProvinciasController(){
	getObjetoModel("provincias/", function (provincias){
		llenaListaProvincias(provincias);   
	});	
};

function listaCiudadesProvController(provincia){
	getCiudadesxProvinciaModel(provincia, function (ciudades){   
		llenaListaCiudades(ciudades);
	});	
};

function listaRubrosController(){
	getObjetoModel("rubros/", function (rubros){
		llenaListaRubros(rubros);   
	});	
};

function autenticarGoogleController(token){
	var formData = new FormData();
	formData.append("gtoken", token);
	autenticarModel("google", formData, function(datos_sesion){
		setCookies(datos_sesion["nombre"],  datos_sesion["tipo"], datos_sesion["token"]);
		alert (getCookie("nombre"));
	}, function(){
		alert('Problema autenticando');
	});
}

function autenticarFBController(token){
	var formData = new FormData();
	formData.append("gtoken", token);
	autenticarModel("google", formData, function(datos_sesion){
		setCookies(datos_sesion["nombre"],  datos_sesion["tipo"], datos_sesion["token"]);
		alert (getCookie("nombre"));
	}, function(){
		alert('Problema autenticando');
	});
}

function poneBotonesController(){
	var token = getCookie("token");
	alert(token);
	if (token == ""){
		poneBotonesTemplate();
	}else{
		getObjetoModel("sesion/"+ token + "/", function (datos_sesion){
			if (datos_sesion["tipo"] == "{}"){
				poneBotonesTemplate();
			}else{
				alert(datos_sesion["tipo"]);
				poneSignOut(datos_sesion["tipo"]);
			}
		})
	}
}

function setCookies(nombre, tipo, token, exp_minutos){
    var d = new Date();
    d.setTime(d.getTime() + (exp_minutos*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = "nombre=" + nombre + "; " + expires;
    document.cookie = "tipo=" + tipo + "; " + expires;
    document.cookie = "token=" + token + "; " + expires;
}

function getCookie(nombre) {
    var name = nombre + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function cerrarSesionController(){
	setCookies("", "", "", 1);
}