def CalificacionJson(calificacion):
	json 					= {}
	json['url'] 			= "http://127.0.0.1:8000/calificaciones/%i/" % calificacion.id
	json['puntaje'] 		= calificacion.puntaje
	json['comentario'] 		= calificacion.comentario
	json['establecimiento'] = "http://127.0.0.1:8000/establecimientos/%i/" % calificacion.establecimiento.id
	json['usuario']			= "http://127.0.0.1:8000/usuarios/%i/" % calificacion.usuario.id
	return json

def CiudadJson(ciudad):
	json 					= {}
	json['url'] 			= "http://127.0.0.1:8000/ciudades/%i/" % ciudad.id
	json['id'] 				= ciudad.id
	json['nombre'] 			= ciudad.nombre
	json['codigo_postal'] 	= ciudad.codigo_postal
	return json

def EstablecimientoJson(establecimiento):
	json 				= {}
	json['url'] 		= "http://127.0.0.1:8000/establecimientos/%i/" % establecimiento.id
	json['nombre'] 		= establecimiento.nombre
	json['direccion'] 	= establecimiento.direccion
	json['latitud'] 	= establecimiento.latitud
	json['lngitud'] 	= establecimiento.longitud
	json['ciudad'] 		= "http://127.0.0.1:8000/ciudades/%i/" % establecimiento.ciudad.id
	json['rubro'] 		= "http://127.0.0.1:8000/rubros/%i/" % establecimiento.rubro.id
	return json

def StatsJson(total, promedio):
	json 				= {}
	json['promedio'] 	= promedio
	json['total'] 		= total
	return json