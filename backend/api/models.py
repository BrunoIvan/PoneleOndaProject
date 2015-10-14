from django.db import models
from django.conf import settings
#prueba para subir
class Establecimiento(models.Model):
	nombre		=	models.CharField(max_length = 200)
	direccion	=	models.CharField(max_length = 200)
	ciudad		=	models.ForeignKey("Ciudad")
	latitud		= 	models.FloatField()
	longitud	= 	models.FloatField()
	rubro		=	models.ForeignKey("Rubro")
	def __unicode__(self):return self.nombre

class Ciudad(models.Model):
	nombre			=	models.CharField(max_length = 200)
	codigo_postal	=	models.CharField(max_length = 8)
	provincia		= 	models.ForeignKey("Provincia")
	def __unicode__(self):return self.nombre

class Provincia(models.Model):
	nombre	 = 	models.CharField(max_length = 50)
	def __unicode__(self):return self.nombre

class Rubro(models.Model):
	nombre	 = 	models.CharField(max_length = 200)
	def __unicode__(self):return self.nombre

class Calificacion(models.Model):
	puntaje	 		= 	models.IntegerField()
	comentario 		=	models.CharField(max_length = 200)
	establecimiento = 	models.ForeignKey("Establecimiento")
	usuario			=	models.ForeignKey("Usuario")
	def __unicode__(self):return self.puntaje

class Usuario(models.Model):
	fb_id		=	models.CharField(max_length = 200)
	tw_id		=	models.CharField(max_length = 200)
	google_id	=	models.CharField(max_length = 200)
	def __unicode__(self):return self.id
	