#serializers.py
from models import Establecimiento, Ciudad, Provincia, Rubro, Calificacion, Usuario
from rest_framework.serializers import HyperlinkedModelSerializer


class EstablecimientoSerializer(HyperlinkedModelSerializer):
	class Meta:
		model = Establecimiento
		fields = ('url', 'nombre', 'direccion', 'ciudad', 'rubro', 'calificaciones')

class CiudadSerializer(HyperlinkedModelSerializer):
	class Meta:
		model = Ciudad
#		fields = ('url', 'name', 'surname', 'legajo', 'cursos')

class ProvinciaSerializer(HyperlinkedModelSerializer):
	class Meta:
		model = Provincia

class RubroSerializer(HyperlinkedModelSerializer):
	class Meta:
		model = Rubro

class CalificacionSerializer(HyperlinkedModelSerializer):
	class Meta:
		model = Calificacion

class UsuarioSerializer(HyperlinkedModelSerializer):
	class Meta:
		model = Usuario
