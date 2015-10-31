from api.models import Establecimiento
from api.models import Calificacion

from django_filters import FilterSet

class EstablecimientoFilter(FilterSet):
	class Meta:
		model = Establecimiento
		fields = ['nombre', 'direccion', 'rubro']

class CalificacionFilter(FilterSet):
	class Meta:
		model = Calificacion
		fields = ['establecimiento']