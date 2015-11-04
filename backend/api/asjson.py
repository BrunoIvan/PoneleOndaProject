def CiudadJson(ciudad):
	json 					= {}
	json['url'] 			= "http://127.0.0.1:8000/ciudades/%i/" % ciudad.id
	json['id'] 				= ciudad.id
	json['nombre'] 			= ciudad.nombre
	json['codigo_postal'] 	= ciudad.codigo_postal
	return json
