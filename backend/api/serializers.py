#serializers.py
from models import Establecimiento
from models import Ciudad
from models import Provincia
from models import Rubro
from models import Calificacion
from models import Usuario

from rest_framework.serializers import HyperlinkedModelSerializer


class EstablecimientoSerializer(HyperlinkedModelSerializer):
	class Meta:
		model = Establecimiento
		fields = ('id', 'nombre', 'direccion', 'ciudad', 'rubro', 'latitud', 'longitud')

class CiudadSerializer(HyperlinkedModelSerializer):
	class Meta:
		model = Ciudad
		fields = ('id', 'url', 'nombre', 'provincia', 'codigo_postal')

class ProvinciaSerializer(HyperlinkedModelSerializer):
	class Meta:
		model = Provincia
		fields = ('id', 'url', 'nombre')

class RubroSerializer(HyperlinkedModelSerializer):
	class Meta:
		model = Rubro

class CalificacionSerializer(HyperlinkedModelSerializer):
	class Meta:
		model = Calificacion

class UsuarioSerializer(HyperlinkedModelSerializer):
	class Meta:
		model = Usuario
