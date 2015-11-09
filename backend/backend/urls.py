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

from api.views import EstablecimientoViewSet
from api.views import Establecimiento_detViewSet
from api.views import CiudadViewSet
from api.views import ProvinciaViewSet
from api.views import RubroViewSet
from api.views import CalificacionViewSet
from api.views import UsuarioViewSet
from api.views import UsuarioGoogleViewSet
from api.views import autenticacionStatus
from api.views import autenticarGoogle

from django.conf.urls 			import include
from django.conf.urls 			import url
from django.contrib 			import admin
from rest_framework.routers 	import SimpleRouter
from rest_framework.authtoken 	import views

router = SimpleRouter()
router.register(r'establecimientos', 		EstablecimientoViewSet)
router.register(r'establecimientosdetalle',	Establecimiento_detViewSet)
router.register(r'ciudades', 				CiudadViewSet)
router.register(r'provincias', 				ProvinciaViewSet)
router.register(r'rubros', 					RubroViewSet)
router.register(r'calificaciones', 			CalificacionViewSet)
router.register(r'usuarios', 				UsuarioViewSet)
router.register(r'usuario/google', 			UsuarioGoogleViewSet)

urlpatterns = [
	url(r'^admin/', 			include(admin.site.urls)),
	url(r'^',					include(router.urls)),	
#	url(r'^api-token-auth/', 	views.obtain_auth_token),
#	url(r'^api-auth/', 			autenticacionStatus),
	url(r'^api-auth/google/', 	autenticarGoogle),
]
