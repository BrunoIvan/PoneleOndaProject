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

class UsuarioGoogleFilter(FilterSet):
	class Meta:
		model = Usuario
		fields = ['google_id']
