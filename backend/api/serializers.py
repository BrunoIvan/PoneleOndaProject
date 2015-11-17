#serializers.py
from models import Establecimiento
from models import Ciudad
from models import Provincia
from models import Rubro
from models import Calificacion
from models import Usuario

from rest_framework.serializers import HyperlinkedModelSerializer
from rest_framework.serializers import SerializerMethodField
from rest_framework.serializers import ReadOnlyField

class Establecimiento_detSerializer(HyperlinkedModelSerializer):
	ciudad 			= ReadOnlyField(source = 'ciudad.nombre')
	provincia 		= ReadOnlyField(source = 'ciudad.provincia.nombre')
	rubro 			= ReadOnlyField(source = 'rubro.nombre')
	stats 			= ReadOnlyField(source = 'estadisticas')
	map 			= SerializerMethodField()

	class Meta:
		model  	= Establecimiento
		fields 	= ('id', 
			'nombre', 
			'direccion', 
			'ciudad', 
			'provincia', 
			'rubro', 
			'latitud',
			'stats', 
			'longitud', 
			'map'
		)

	def get_map(self, obj):
		return	'https://www.google.com/maps/embed/v1/place?q=%s,%s,%s&key=AIzaSyCF5P_MlEWVxa5k3O6hyHOn8rNPkNVUokw' % (obj.direccion, obj.ciudad, obj.ciudad.provincia)


class EstablecimientoSerializer(HyperlinkedModelSerializer):
	class Meta:
		model  	= Establecimiento
		fields 	= ('id', 
			'nombre', 
			'direccion', 
			'ciudad', 
			'rubro', 
			'latitud',
			'longitud')

class CiudadSerializer(HyperlinkedModelSerializer):
	class Meta:
		model 	= Ciudad
		fields 	= ('id', 
			'url', 
			'nombre', 
			'provincia', 
			'codigo_postal')

class ProvinciaSerializer(HyperlinkedModelSerializer):
	class Meta:
		model 	= Provincia
		fields 	= ('id', 
			'url', 
			'nombre')

class RubroSerializer(HyperlinkedModelSerializer):
	class Meta:
		model 	= Rubro

class CalificacionSerializer(HyperlinkedModelSerializer):
	establecimiento_id 		= ReadOnlyField(source = 'establecimiento.id')
	establecimiento_nombre 	= ReadOnlyField(source = 'establecimiento.nombre')

	class Meta:
		model 	= Calificacion
		fields 	= ('id', 
			'url', 
			'puntaje', 
			'fecha', 
			'comentario', 
			'usuario', 
			'establecimiento', 
			'establecimiento_id', 
			'establecimiento_nombre')

class UsuarioSerializer(HyperlinkedModelSerializer):
	class Meta:
		model 	= Usuario
		fields 	= ('id', 
			'url', 
			'fb_id', 
			'tw_id', 
			'google_id')

