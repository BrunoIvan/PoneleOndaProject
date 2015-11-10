from api.models import Establecimiento
from api.models import Ciudad
from api.models import Provincia
from api.models import Rubro
from api.models import Calificacion
from api.models import Usuario

from api.serializers import EstablecimientoSerializer
from api.serializers import Establecimiento_detSerializer
from api.serializers import CiudadSerializer
from api.serializers import ProvinciaSerializer
from api.serializers import RubroSerializer
from api.serializers import CalificacionSerializer
from api.serializers import UsuarioSerializer

from api.asjson import CiudadJson
from api.asjson import EstablecimientoJson

from api.paginations import EstablecimientosPagination
from api.paginations import CalificacionesPagination

from api.filters import EstablecimientoFilter
from api.filters import CalificacionFilter
from api.filters import UsuarioFilter

from django.shortcuts 				import render
from rest_framework.filters 		import DjangoFilterBackend
from rest_framework.viewsets 		import ModelViewSet
from rest_framework.viewsets 		import ReadOnlyModelViewSet
from rest_framework.decorators 		import detail_route
from rest_framework.decorators 		import list_route
from rest_framework.response 		import Response
from django.views.decorators.csrf 	import csrf_exempt
from django.views.decorators.csrf 	import ensure_csrf_cookie
from django.http 					import HttpResponse

class Establecimiento_detViewSet(ReadOnlyModelViewSet):
	queryset 			= 	Establecimiento.objects.all()
	serializer_class 	= 	Establecimiento_detSerializer
	pagination_class 	= 	EstablecimientosPagination
	filter_backends 	= 	(DjangoFilterBackend,)
	filter_class 		= 	EstablecimientoFilter

	@list_route()
	def mejores(self, request):
		establecimientos= 	Establecimiento.objects.all()
		establecimientos= 	sorted(establecimientos, key=lambda a: -a.estadisticas()[1])[:10]
		return Response([EstablecimientoJson(establecimiento) for establecimiento in establecimientos])

	@list_route()
	def peores(self, request):
		establecimientos= 	Establecimiento.objects.all()
		establecimientos= 	sorted(establecimientos, key=lambda a: a.estadisticas()[1])[:10]
		return Response([EstablecimientoJson(establecimiento) for establecimiento in establecimientos])

class EstablecimientoViewSet(ModelViewSet):
	queryset 			= 	Establecimiento.objects.all()
	serializer_class 	= 	EstablecimientoSerializer
	pagination_class 	= 	EstablecimientosPagination


class CiudadViewSet(ModelViewSet):
	queryset 			= 	Ciudad.objects.all()
	serializer_class 	= 	CiudadSerializer


class ProvinciaViewSet(ModelViewSet):
	queryset 			= 	Provincia.objects.all()
	serializer_class 	= 	ProvinciaSerializer

	@detail_route()
	def ciudades(self, request, pk):
		ciudades 		= Ciudad.objects.filter(provincia__pk = pk)
		return Response([CiudadJson(ciudad) for ciudad in ciudades])

class RubroViewSet(ModelViewSet):
	queryset 			= 	Rubro.objects.all()
	serializer_class 	= 	RubroSerializer

	@detail_route()
	def recomendaciones(self, request, pk):
		establecimientos= 	Establecimiento.objects.filter(rubro_id = pk)
		establecimientos= 	sorted(establecimientos, key=lambda a: -a.estadisticas()[1])[:5]
		return Response([EstablecimientoJson(establecimiento) for establecimiento in establecimientos])

class CalificacionViewSet(ModelViewSet):
	queryset 			= 	Calificacion.objects.all()
	serializer_class 	=	CalificacionSerializer
	pagination_class 	= 	CalificacionesPagination
	filter_backends 	= 	(DjangoFilterBackend,)
	filter_class 		= 	CalificacionFilter

class UsuarioViewSet(ModelViewSet):
	queryset 			= 	Usuario.objects.all()
	serializer_class 	=	UsuarioSerializer
	filter_backends 	= 	(DjangoFilterBackend,)
	filter_class 		= 	UsuarioFilter

def getTipoSesion(request):
	tipo_sesion = request.session.get('tipo', False)
	return tipo

def autenticacionStatus(request):
	return HttpResponse(getTipoSesion(request))

def autenticarGoogle(request):
	import urllib2
	import json
#	urlopen trae un objeto tipo file, por eso lo paso a json, que funciona como diccionario
	usu_google =  urllib2.urlopen('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' +  request.POST.getlist('gtoken')[0])
	google_datos = json.load(usu_google)
	usu_metele =  urllib2.urlopen('http://localhost:8000/usuarios/?format=json&google_id=' + google_datos["sub"]);	
	metele_datos = json.load(usu_metele)
	if len(metele_datos) == 1:
		setSesion(request, metele_datos[0]["id"], google_datos["name"], "google")
	elif not len(metele_datos):
		usu_metele = crearUsuario(request, google_datos["sub"])
		metele_datos = json.load(usu_metele)
		setSesionGoogle(request, metele_datos["id"], google_datos["name"])
	else:
		print "usuarioduplicado"	
	print request.session["nombre"] + " " + str(request.session["id"])
	resp = '{"nombre" : "' + request.session['nombre'] + '"}'
	return HttpResponse(resp)

def setSesion(request, id, nombre, tipo):
	request.session["id"] = id
	request.session["nombre"] = nombre
	request.session["tipo"] = tipo

def crearUsuario(request, id_google):
	import urllib2, urllib
	values = urllib.urlencode({'google_id' : id_google})
	usu_metele =  urllib2.urlopen('http://localhost:8000/usuarios/', data=values);
	return usu_metele


#@csrf_exempt
#def autenticarGoogle(request, token):	
#	from oauth2client import client, crypt

	# (Receive token by HTTPS POST)

#	try:
#		idinfo = client.verify_id_token(token, CLIENT_ID)
#		# If multiple clients access the backend server:
#		if idinfo['aud'] not in [ANDROID_CLIENT_ID, IOS_CLIENT_ID, WEB_CLIENT_ID]:
#			raise crypt.AppIdentityError("Unrecognized client.")
#		if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
#			raise crypt.AppIdentityError("Wrong issuer.")
#		if idinfo['hd'] != APPS_DOMAIN_NAME:
#			raise crypt.AppIdentityError("Wrong hosted domain.")
#	except crypt.AppIdentityError:
#		# Invalid token
#		print 'invalid token'
#	userid = idinfo['sub']
#	print userid
#	return userid
