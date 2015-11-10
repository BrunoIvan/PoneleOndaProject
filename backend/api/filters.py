from api.models import Establecimiento
from api.models import Calificacion
from api.models import Usuario

from django_filters import FilterSet

class EstablecimientoFilter(FilterSet):
	class Meta:
		model = Establecimiento
		fields = ['nombre', 'direccion', 'rubro']

class CalificacionFilter(FilterSet):
	class Meta:
		model = Calificacion
		fields = ['establecimiento']

class UsuarioFilter(FilterSet):
	class Meta:
		model = Usuario
		fields = ['fb_id', 'tw_id', 'google_id']
