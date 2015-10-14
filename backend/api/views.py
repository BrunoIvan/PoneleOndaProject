from django.shortcuts import render
from serializers import EstablecimientoSerializer, CiudadSerializer, ProvinciaSerializer, RubroSerializer, CalificacionSerializer, UsuarioSerializer
from models import Establecimiento, Ciudad, Provincia, Rubro, Calificacion, Usuario
from rest_framework.viewsets import ModelViewSet
#from rest_framework.decorators import detail_route
#from rest_framework.response import Response

class EstablecimientoViewSet(ModelViewSet):
	queryset	 = 	Establecimiento.objects.all()
	serializer_class =	EstablecimientoSerializer

class CiudadViewSet(ModelViewSet):
	queryset	 = 	Ciudad.objects.all()
	serializer_class =	CiudadSerializer

class ProvinciaViewSet(ModelViewSet):
	queryset	 = 	Provincia.objects.all()
	serializer_class = 	ProvinciaSerializer

class RubroViewSet(ModelViewSet):
	queryset	 = 	Rubro.objects.all()
	serializer_class =	RubroSerializer

class CalificacionViewSet(ModelViewSet):
	queryset	 = 	Calificacion.objects.all()
	serializer_class =	CalificacionSerializer

class UsuarioViewSet(ModelViewSet):
	queryset	 = 	Usuario.objects.all()
	serializer_class =	UsuarioSerializer

