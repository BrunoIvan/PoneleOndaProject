from api.models import Establecimiento

from django_filters import FilterSet

class EstablecimientoFilter(FilterSet):
    class Meta:
        model = Establecimiento
        fields = ['nombre', 'direccion']