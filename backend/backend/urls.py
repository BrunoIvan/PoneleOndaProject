"""poneleonda URL Configuration
The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin
from api.views import EstablecimientoViewSet, CiudadViewSet, ProvinciaViewSet, RubroViewSet, CalificacionViewSet, UsuarioViewSet
from rest_framework.routers import SimpleRouter
from rest_framework.authtoken import views

router = SimpleRouter()
router.register(r'establecimientos',EstablecimientoViewSet)
router.register(r'ciudades',CiudadViewSet)
router.register(r'provincias',ProvinciaViewSet)
router.register(r'rubros',RubroViewSet)
router.register(r'calificaciones',CalificacionViewSet)
router.register(r'usuarios',UsuarioViewSet)


urlpatterns = [
 	url(r'^admin/', include(admin.site.urls)),
 #   url(r'^alumnos/(?P<pk>[0-9]+)/cursos/$', cursos),
    url(r'^',include(router.urls)),	
 #   url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
 #   url(r'^api-token-auth/', views.obtain_auth_token),
 ]
