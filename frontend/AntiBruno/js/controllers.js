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
