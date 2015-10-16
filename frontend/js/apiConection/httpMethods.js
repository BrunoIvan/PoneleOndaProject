function put_recurso(uri, json){
    var recurso = new XMLHttpRequest();
    recurso.open('PUT', 'http://127.0.0.1:8000/'.concat(uri), false);
    recurso.setRequestHeader('Authorization', 'Token '.concat(document.cookie));
    recurso.setRequestHeader('Content-type', 'application/json');
    recurso.send(json);
    return recurso;
};

function delete_recurso(uri){
    var recurso = new XMLHttpRequest();
    recurso.open('DELETE', 'http://127.0.0.1:8000/'.concat(uri), false);
    recurso.setRequestHeader('Authorization', 'Token '.concat(document.cookie));
    recurso.send();
    return recurso;
}

function post_recurso(uri, form){
    var recurso = new XMLHttpRequest();
    recurso.open('POST', 'http://127.0.0.1:8000/'.concat(uri), false);
    recurso.setRequestHeader('Authorization', 'Token '.concat(document.cookie));
    var post = new FormData(form);
    recurso.send(post);
    return recurso;
};

function get_recurso(uri){
	var recurso = new XMLHttpRequest();
	recurso.open('GET', 'http://127.0.0.1:8000/'.concat(uri), false);
	recurso.setRequestHeader('Authorization', 'Token '.concat(document.cookie));
	recurso.send();
    return recurso;
};