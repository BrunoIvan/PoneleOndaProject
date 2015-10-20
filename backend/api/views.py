from api.models import Establecimiento
from api.models import Ciudad
from api.models import Provincia
from api.models import Rubro
from api.models import Calificacion
from api.models import Usuario

from api.serializers import EstablecimientoSerializer
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

from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import detail_route
from rest_framework.response import Response


class EstablecimientoViewSet(ModelViewSet):
	queryset 			= 	Establecimiento.objects.all()
	serializer_class 	= 	EstablecimientoSerializer
	pagination_class 	= 	EstablecimientosPagination

	@detail_route()
	def calificaciones(self, request, pk):
		establecimiento = 	Establecimiento.objects.get(pk = pk)
		calificaciones 	= 	Calificacion.objects.filter(establecimiento = establecimiento)
		return Response([CalificacionJson(calificacion) for calificacion in calificaciones])

	@detail_route()
	def estadisticas(self, request, pk):
		establecimiento = 	Establecimiento.objects.get(pk = pk)
		promedio 		= 	establecimiento.promedio_calificaciones()
		total 			= 	establecimiento.total_calificaciones()
		return Response(StatsJson(total, promedio))


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

	@detail_route(pagination_class 	= 	EstablecimientosPagination)
	def establecimientos(self, request, pk):
		rubro 			= Rubro.objects.get(pk = pk)
		establecimientos= Establecimiento.objects.filter(rubro = rubro)
		return Response([EstablecimientoJson(establecimiento) for establecimiento in establecimientos])


class CalificacionViewSet(ModelViewSet):
	queryset 			= 	Calificacion.objects.all()
	serializer_class 	=	CalificacionSerializer
	pagination_class 	= 	CalificacionesPagination


class UsuarioViewSet(ModelViewSet):
	queryset 			= 	Usuario.objects.all()
	serializer_class 	=	UsuarioSerializer
