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

from django.shortcuts 				import render
from rest_framework.filters 		import DjangoFilterBackend
from rest_framework.viewsets 		import ModelViewSet
from rest_framework.viewsets 		import ReadOnlyModelViewSet
from rest_framework.decorators 		import detail_route
from rest_framework.decorators 		import list_route
from rest_framework.response 		import Response
from django.views.decorators.csrf 	import csrf_exempt
from django.views.decorators.csrf 	import ensure_csrf_cookie

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

def getTipoSesion(request):
	tipo_sesion = request.session.get('tipo_sesion', False)
	return tipo_sesion

def autenticacionStatus(request):
	from django.http import HttpResponse
	return HttpResponse(getTipoSesion(request))

def autenticarGoogle(request):
	import urllib2
	print request.POST.getlist('gtoken')[0]
	f =  urllib2.urlopen('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' +  request.POST.getlist('gtoken')[0])
	print f.read() + 'la choza'


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
