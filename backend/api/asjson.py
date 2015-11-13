def CiudadJson(ciudad):
	json 					= {}
	json['url'] 			= "http://127.0.0.1:8000/ciudades/%i/" % ciudad.id
	json['id'] 				= ciudad.id
	json['nombre'] 			= ciudad.nombre
	json['codigo_postal'] 	= ciudad.codigo_postal
	return json

def EstablecimientoJson(establecimiento):
	json 					= {}
	json['id'] 				= establecimiento.id
	json['nombre'] 			= establecimiento.nombre
	json['direccion'] 		= establecimiento.direccion
	json['ciudad'] 			= establecimiento.ciudad.nombre
	json['provincia'] 		= establecimiento.ciudad.provincia.nombre
	json['rubro'] 			= establecimiento.rubro.nombre
	json['latitud'] 		= establecimiento.latitud
	json['longitud'] 		= establecimiento.longitud
	json['stats'] 			= establecimiento.estadisticas()
	return json

def PaginationCustomEstJson(count, next, previous, results):
	json = {}
	json['count'] = count
	json['previous'] = previous
	json['next'] = next
	json['results'] = [EstablecimientoJson(result) for result in results]
	return json