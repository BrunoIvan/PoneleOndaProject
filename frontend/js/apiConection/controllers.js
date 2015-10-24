function mainController(){
	menuView();
	altaEstablecimientoView();
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

function EstablecimientosView(pag){
	getObjetoModel("establecimientosdetalle", 
	EstablecimientosTemplate, 
	pag);
};

function BusqEstablecimientosController(parametros, pag){
	getBusqObjetoModel("establecimientosdetalle",
		parametros,
		function (establecimientos){
			if (establecimientos.count == 0){
				alert('Al parecer el sistema no encuentra resultados, procure respetar mayúsculas y minusculas');
			} else {
				EstablecimientosTemplate(establecimientos);
			}
		},
		pag
		)
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
	getObjetoModel("provincias", function (provincias){
		llenaListaProvincias(provincias);   
	});	
};

function listaCiudadesProvController(provincia){
	getCiudadesxProvinciaModel(provincia, function (ciudades){   
		llenaListaCiudades(ciudades);
	});	
};

function listaRubrosController(){
	getObjetoModel("rubros", function (rubros){
		llenaListaRubros(rubros);   
	});	
};

/*
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

*/