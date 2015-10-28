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

from api.asjson import EstablecimientoJson
from api.asjson import CiudadJson
from api.asjson import CalificacionJson
from api.asjson import StatsJson

from api.paginations import EstablecimientosPagination
from api.paginations import CalificacionesPagination

from api.filters import EstablecimientoFilter
from api.filters import CalificacionFilter

from django.shortcuts 			import render
from rest_framework.filters 	import DjangoFilterBackend
from rest_framework.viewsets 	import ModelViewSet
from rest_framework.viewsets 	import ReadOnlyModelViewSet
from rest_framework.decorators 	import detail_route
from rest_framework.decorators 	import list_route
from rest_framework.response 	import Response

class Establecimiento_detViewSet(ReadOnlyModelViewSet):
	queryset 			= 	Establecimiento.objects.all()
	serializer_class 	= 	Establecimiento_detSerializer
	pagination_class 	= 	EstablecimientosPagination
	filter_backends 	= 	(DjangoFilterBackend,)
	filter_class 		= 	EstablecimientoFilter

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
		provincia 		= Provincia.objects.get(pk = pk)
		ciudades 		= Ciudad.objects.filter(provincia = provincia)
		return Response([CiudadJson(ciudad) for ciudad in ciudades])


class RubroViewSet(ModelViewSet):
	queryset 			= 	Rubro.objects.all()
	serializer_class 	= 	RubroSerializer

class CalificacionViewSet(ModelViewSet):
	queryset 			= 	Calificacion.objects.all()
	serializer_class 	=	CalificacionSerializer
	pagination_class 	= 	CalificacionesPagination
	filter_backends 	= 	(DjangoFilterBackend,)
	filter_class 		= 	CalificacionFilter

class UsuarioViewSet(ModelViewSet):
	queryset 			= 	Usuario.objects.all()
	serializer_class 	=	UsuarioSerializer
