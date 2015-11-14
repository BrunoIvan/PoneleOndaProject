from rest_framework.pagination import PageNumberPagination

class EstablecimientosPagination(PageNumberPagination):
	page_size = 10
	page_size_query_param = 'page_size'
	max_page_size = 100

class CalificacionesPagination(PageNumberPagination):
	page_size = 20
	page_size_query_param = 'page_size'
	max_page_size = 100

def PaginationCustom(results, pag, url, resxpag):
	count = len(results)
	ni = (int(pag) - 1) * int(resxpag)
	ne = int(pag) * int(resxpag)
	results = results[ni:ne]
	pags = count / (int(resxpag))
	if int(pag) < pags:
		id_next = int(url[-1]) + 1
		next = url[:-1] + str(id_next) 
	else:
		next = 'null'
	if int(pag) > 1:
		id_previous = int(url[-1]) - 1
		previous = (url[:-1]) + str(id_previous) 
	else:
		previous = 'null'
	return count, next, previous, results
