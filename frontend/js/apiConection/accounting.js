function login_vista(json){
    // Password no provisto en el campo
    if (json.password != undefined){
       	var campo_password = document.getElementById('campo_password');
       	campo_password.attributes.class.value = 'form-group has-warning';
    }
    // User no provisto en el campo
    if (json.username != undefined){
       	var campo_username = document.getElementById('campo_username');
      	campo_username.attributes.class.value = 'form-group has-warning';
    }
    // User o contrasenna incorrecta
    if (json.non_field_errors != undefined){
       	if (document.getElementById('clave-incorrecta') == null){
       		var cuerpo = document.getElementById('cuerpo-logueo');
            cuerpo.innerHTML += '<div id="clave-incorrecta" class="alert alert-warning">Nombre de user o contraseña incorrecta.</div>';
            var submit = document.getElementById('submit-logueo');
            submit.attributes.class.value = 'btn btn-warning btn-block';
            var panel = document.getElementById('panel-logueo');
            panel.attributes.class.value = 'panel panel-warning';
      	}
    // Login correcto
    } else if(json.token != undefined){
       	document.cookie = json.token;
        interfaz_usuario();
 	}
};

function login(){
	var recurso = new XMLHttpRequest();
	recurso.open('POST', 'http://127.0.0.1:8000/api-token-auth/', false);
	var form = document.getElementById('form-logueo');
	var PostData = new FormData(form);
	recurso.send(PostData);
	var json = JSON.parse(recurso.response);
	login_vista(json);
};

function logout(){
    var navbar = document.getElementById('navbar_contenido');
    navbar.innerHTML = '';
    content = '<div class="container">'
    content += '<div class="row">'
    content += '<div class=" text-center alert alert-info">'
    content += 'Bienvenido'
    content += '</div>'
    content += '<div class="panel panel-default" id="panel-logueo">'
    content += '<div class="panel-heading">'
    content += 'Ingreso'
    content += '</div>'
    content += '<div class="panel-body" id="cuerpo-logueo">'
    content += '<form method="POST" id="form-logueo">'
    content += '<div id="campo_username" class="form-group has-default">'
    content += '<input required id="id_username" name="username" class="form-control" placeholder="Ingrese su nombre de usuario" type="text">'
    content += '</div>'
    content += '<div id="campo_password" class="form-group has-default">'
    content += '<input required id="id_password" name="password" class="form-control" placeholder="Ingrese su contraseña" type="password">'
    content += '</div>'
    content += '<input id="submit-logueo" type="button" onclick="login()" class="btn btn-primary btn-block" value="Ingresar">'
    content += '</form>'
    content += '</div>'
    content += '</div>'
    content += '</div>'
    content += '</div>'
    var cuerpo = document.getElementById('body_contenido');
    cuerpo.innerHTML = content;
    document.cookie = '';
};

function user_o_anonimo(){
    if(document.cookie.localeCompare("") == 0){
        interfaz_anonimo();
    } else {
        interfaz_usuario();
    }
}

function interfaz_usuario(){
	var navbar = document.getElementById('navbar_contenido');
    var prof_opcion = '<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button">Profesores<span class="caret"></span></a><ul class="dropdown-menu"><li><a href="#" onclick="prof_ver()">Ver todos</a></li><li><a onclick="prof_new_vis()" href="#">Agregar nuevo</a></li></ul></li>';
    var alum_opcion = '<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button">Alumno<span class="caret"></span></a><ul class="dropdown-menu"><li><a href="#" onclick="alum_ver()">Ver todos</a></li><li><a onclick="alum_new_vis()" href="#">Agregar nuevo</a></li></ul></li>';
    var curs_opcion = '<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button">Curso<span class="caret"></span></a><ul class="dropdown-menu"><li><a href="#" onclick="curs_ver()">Ver todos</a></li><li><a onclick="curs_new_vis()" href="#">Agregar nuevo</a></li></ul></li>';
    var logout_opcion = '<li><a onclick="logout()">Salir</a></li>';
    navbar.innerHTML = ''.concat(prof_opcion, alum_opcion, curs_opcion, logout_opcion);
    var contenido = document.getElementById('body_contenido');
    contenido.innerHTML = '<div id="body_contenido"><div class="container"><div class="row"><div class="alert alert-info text-center">Elija una de las opciones que aparecen en la barra superior. Recuerde que usted tiene una sesion activa</div></div></div></div>';
};

function interfaz_anonimo(){
    var cuerpo = document.getElementById('body_contenido');
    var modif = '<div class="container">'
    modif += '<div class="row">'
    modif += '<div class=" text-center alert alert-info">'
    modif += 'Bienvenido'
    modif += '</div>'
    modif += '<div class="panel panel-default" id="panel-logueo">'
    modif += '<div class="panel-heading">'
    modif += 'Ingreso'
    modif += '</div>'
    modif += '<div class="panel-body" id="cuerpo-logueo">'
    modif += '<form method="POST" id="form-logueo">'
    modif += '<div id="campo_username" class="form-group has-default">'
    modif += '<input required id="id_username" name="username" class="form-control" placeholder="Ingrese su nombre de usuario" type="text">'
    modif += '</div>'
    modif += '<div id="campo_password" class="form-group has-default">'
    modif += '<input required id="id_password" name="password" class="form-control" placeholder="Ingrese su contraseña" type="password">'
    modif += '</div>'
    modif += '<input id="submit-logueo" type="button" onclick="login()" class="btn btn-primary btn-block" value="Ingresar">'
    modif += '</form>'
    modif += '</div>'
    modif += '</div>'
    modif += '</div>'
    modif += '</div>'
    cuerpo.innerHTML = modif;
};