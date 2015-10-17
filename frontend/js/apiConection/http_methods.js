function put_recurso(url, json){
    var recurso = new XMLHttpRequest();
    recurso.open('PUT', url, false);
    recurso.setRequestHeader('Content-type', 'application/json');
    recurso.send(json);
    return recurso;
};

function delete_recurso(url){
    var recurso = new XMLHttpRequest();
    recurso.open('DELETE', url, false);
    recurso.send();
    return recurso;
}

function post_recurso(url, json){
    var recurso = new XMLHttpRequest();
    recurso.open('POST', url, false);
    recurso.setRequestHeader('Content-type', 'application/json');
    recurso.send(json);
    return recurso;
};

function get_recurso(url){
	var recurso = new XMLHttpRequest();
	recurso.open('GET', url, false);
    recurso.send();
    return recurso;
};