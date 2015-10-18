from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from django.db.models import Sum
from django.db.models import Count


class Establecimiento(models.Model):
	nombre		=	models.CharField(max_length = 200)
	direccion	=	models.CharField(max_length = 200)
	ciudad		=	models.ForeignKey("Ciudad")
	latitud		= 	models.FloatField()
	longitud	= 	models.FloatField()
	rubro		=	models.ForeignKey("Rubro")
	
	def __unicode__(self):
		return self.nombre

	def promedio_calificaciones(self):
		calificaciones 	= 	Calificacion.objects.filter(establecimiento = self)
		suma 			= 	calificaciones.aggregate(Sum('puntaje'))
		cantidad 		= 	calificaciones.aggregate(Count('puntaje'))
		return suma['puntaje__sum'] / float(cantidad['puntaje__count'])


class Ciudad(models.Model):
	nombre			=	models.CharField(max_length = 200)
	codigo_postal	=	models.CharField(max_length = 8)
	provincia		= 	models.ForeignKey("Provincia")

	class Meta:
		unique_together = 	("nombre", "provincia")

	def __unicode__(self):
		return self.nombre


class Provincia(models.Model):
	nombre	 = 	models.CharField(max_length = 50)
	
	def __unicode__(self):
		return self.nombre


class Rubro(models.Model):
	nombre	 = 	models.CharField(max_length = 200)
	
	def __unicode__(self):
		return self.nombre


class Calificacion(models.Model):
	puntaje 			= 	models.IntegerField()
	comentario 			= 	models.CharField(max_length = 200)
	establecimiento 	= 	models.ForeignKey("Establecimiento", related_name = "calificaciones")
	usuario 			= 	models.ForeignKey("Usuario")

	class Meta:
		unique_together = 	("establecimiento", "usuario")
	
	def __unicode__(self):
		return "%i" % self.puntaje


class Usuario(models.Model):
	fb_id		=	models.CharField(max_length = 200, null = True, unique = True)
	tw_id		=	models.CharField(max_length = 200, null = True, unique = True)
	google_id	=	models.CharField(max_length = 200, null = True, unique = True)

	def __unicode__(self):
		return " ID Usuaro %i" % self.id