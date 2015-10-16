function alum_ver(){
    var recurso = get_recurso('alumnos/?format=json');
    var json = JSON.parse(recurso.response);
    var cuerpo = document.getElementById('body_contenido');
    cuerpo.innerHTML = alum_list(json, true);
};

function alum_list(json, custom){
    var tabla = '<div id="alum_list" class="container"><div class="panel panel-default"><div class="panel-heading">Alumnos</div><table class="table"><thead><tr><th>Nombre</th><th>Apellido</th><th>Legajo</th></tr></thead><tbody>'
    for(var x = 0; x < json.length; x++){
        var url = json[x].url;
        var id = url.slice(30, 30 + url.slice(30, -1).search('/'));
        tabla += '<tr id="'+id+'"><td>'.concat(json[x].name, '</td>');
        tabla += '<td>'.concat(json[x].suname, '</td>');
        tabla += '<td>'.concat(json[x].legajo, '</td>');
        if(custom){
            tabla += '<td id="botones"><div class="btn-group" role="group">'
            tabla += '<button onclick=\'alum_modif_vis("'+id+'")\' class="btn btn-default">Modificar</a>';
            tabla += '<button onclick=\'alum_elim_vis("'+id+'")\' class="btn btn-danger">Eliminar</a>';
            tabla += '</div></td>'
        }
        tabla += '</tr>'
    }
    tabla += '</tbody></table></div></div></div>';
    return tabla;
};

function alum_modif_vis(id){
    var cursos = document.getElementById('curs_list');
    if(cursos != null){
        cursos.remove();
    }
    var extra_cont = document.getElementById('extra_cont');
    if(extra_cont != null){
        extra_cont.remove();
    }
    var filas = document.getElementsByTagName('tr');
    while(filas.length > 2){
        for(var x = 1; x < filas.length; x++){
            if(parseInt(filas[x].attributes.id.value) != id){
                filas[x].remove();
            }
        }
    }
    var botones = document.getElementById('botones');
    botones.remove();
    var cuerpo = document.getElementById('body_contenido');
    var modif = '<div id="extra_cont" class="container">'
    modif += '<div class="row">'
    var cursos_prof = get_recurso('alumnos/'+id+'/cursos/?format=json');
    var json = JSON.parse(cursos_prof.response);
    if(json.length > 0){
        cuerpo.innerHTML += curs_list(json, false);
    }
    modif += '<div class=" text-center alert alert-info">'
    modif += 'Modificar Alumno'
    modif += '</div>'
    modif += '<div class="panel panel-info" id="panel-modif">'
    modif += '<div class="panel-heading">'
    modif += 'Modificación'
    modif += '</div>'
    modif += '<div class="panel-body" id="cuerpo-modif">'
    modif += '<form method="POST" id="form-modif">'
    modif += '<div id="campo_name" class="form-group has-default">'
    modif += '<input id="id_name" name="name" class="form-control" placeholder="Modifique el nombre" type="text">'
    modif += '</div>'
    modif += '<div id="campo_suname" class="form-group has-default">'
    modif += '<input id="id_suname"  name="suname" class="form-control" placeholder="Modifique el apellido" type="text">'
    modif += '</div>'
    modif += '<div id="campo_legajo" class="form-group has-default">'
    modif += '<input id="id_legajo" name="legajo" class="form-control" placeholder="Modifique el legajo" type="text">'
    modif += '</div>'
    modif += '<input id="submit-modif" type="button" onclick="alum_modif('+id+')" class="btn btn-info btn-block" value="Modificar">'
    modif += '</form>'
    modif += '</div>'
    modif += '</div>'
    modif += '</div>'
    modif += '</div>'
    cuerpo.innerHTML += modif;
};

function alum_elim_vis(id){
    var cursos = document.getElementById('curs_list');
    if(cursos != null){
        cursos.remove();
    }
    var filas = document.getElementsByTagName('tr');
    while(filas.length > 2){
        for(var x = 1; x < filas.length; x++){
            if(parseInt(filas[x].attributes.id.value) != id){
                filas[x].remove();
            }
        }
    }
    var botones = document.getElementById('botones');
    botones.remove();
    var cuerpo = document.getElementById('body_contenido');
    var modif = '<div id="extra_cont" class="container">'
    modif += '<div class="row">'
    var cursos_prof = get_recurso('alumnos/'+id+'/cursos/?format=json');
    var json = JSON.parse(cursos_prof.response);
    if(json.length > 0){
        cuerpo.innerHTML += curs_list(json, false);
    }
    modif += '<div class=" text-center alert alert-danger">'
    modif += 'Eliminar Alumno'
    modif += '</div>'
    modif += '<div class="panel panel-info" id="panel-elim">'
    modif += '<div class="panel-heading">'
    modif += 'Confirmación'
    modif += '</div>'
    modif += '<div class="panel-body" id="cuerpo-elim">'
    modif += '<p class="text-center">¿Está seguro que desea continuar?</p>'
    modif += '<div class="btn-group btn-group-justified" role="group">'
    modif += '<div class="btn-group" role="group">'
    modif += '<button type="button" onclick="alum_ver()" class="btn btn-default">Cancelar</button>'
    modif += '</div>'
    modif += '<div class="btn-group" role="group">'
    modif += '<button type="button" onclick="alum_elim('+id+')" class="btn btn-danger">Confirmar</button>'
    modif += '</div>'
    modif += '</div>'
    modif += '</div>'
    modif += '</div>'
    modif += '</div>'
    modif += '</div>'
    cuerpo.innerHTML += modif;
};

function alum_new_vis(){
    var cuerpo = document.getElementById('body_contenido');
    var modif = '<div class="container">'
    modif += '<div class="row">'
    modif += '<div class="panel panel-info" id="panel-new">'
    modif += '<div class="panel-heading">'
    modif += 'Agregar Alumno'
    modif += '</div>'
    modif += '<div class="panel-body" id="cuerpo-new">'
    modif += '<form method="POST" id="form-new">'
    modif += '<div id="campo_name" class="form-group has-default">'
    modif += '<input id="id_name" name="name" class="form-control" placeholder=Nnombre" type="text">'
    modif += '</div>'
    modif += '<div id="campo_suname" class="form-group has-default">'
    modif += '<input id="id_suname"  name="suname" class="form-control" placeholder="Apellido" type="text">'
    modif += '</div>'
    modif += '<div id="campo_legajo" class="form-group has-default">'
    modif += '<input id="id_legajo" name="legajo" class="form-control" placeholder="Legajo" type="number">'
    modif += '</div>'
    modif += '<input id="submit-modif" type="button" onclick="alum_new()" class="btn btn-info btn-block" value="Agregar">'
    modif += '</form>'
    modif += '</div>'
    modif += '</div>'
    modif += '</div>'
    modif += '</div>'
    cuerpo.innerHTML = modif;
};

function alum_new(){
    var form = document.getElementById('form-new');
    var recurso = post_recurso('alumnos/?format=json', form);
    if(recurso.statusText.localeCompare("BAD REQUEST") == 0){
        var json = JSON.parse(recurso.response);
        if(json.name != undefined){
            var campo_name = document.getElementById('campo_name');
            campo_name.attributes.class.value = 'form-group has-warning';
        }
        if(json.suname != undefined){
            var campo_suname = document.getElementById('campo_suname');
            campo_suname.attributes.class.value = 'form-group has-warning';
        }
        if(json.legajo != undefined){
            var campo_legajo = document.getElementById('campo_legajo');
            campo_legajo.attributes.class.value = 'form-group has-warning';
        }
    } else if(recurso.statusText.localeCompare("CREATED") == 0){
        var cuerpo = document.getElementById('body_contenido');
        var content = '<div class="container">'
        content += '<div class="row">'
        content += '<div class=" text-center alert alert-info">'
        content += 'Alumno creado'
        content += '</div>'
        content += '</div>'
        content += '</div>'
        cuerpo.innerHTML = content;
    }
};

function alum_modif(id){
    var form = document.getElementById('form-modif');
    var json = {};
    json['name'] = form.name.value;
    json['suname'] = form.suname.value;
    json['legajo'] = form.legajo.value;
    if ((json['name'] + json['suname'] + json['legajo']).length > 0){
        recurso = get_recurso('alumnos/'+id+'/?format=json');
        prof = JSON.parse(recurso.response);
        if(json['name'].localeCompare("") == 0){
            json['name'] = prof.name;
        }
        if(json['suname'].localeCompare("") == 0){
            json['suname'] = prof.suname;
        }
        if(json['legajo'].toString().localeCompare("") == 0){
            json['legajo'] = prof.legajo;
        }
        json = JSON.stringify(json);
        recurso = put_recurso('alumnos/'+id+'/?format=json', json);
        if(recurso.statusText.localeCompare('OK') == 0){
            var cuerpo = document.getElementById('body_contenido');
            var content = '<div class="container">'
            content += '<div class="row">'
            content += '<div class=" text-center alert alert-info">'
            content += 'Alumno Modificado'
            content += '</div>'
            content += '</div>'
            content += '</div>'
            cuerpo.innerHTML = content;
        }
    }
};

function alum_elim(id){
    var recurso = delete_recurso('alumnos/'+id+'/?format=json');
    if(recurso.statusText.localeCompare('NO CONTENT') == 0){
        var cuerpo = document.getElementById('body_contenido');
        var content = '<div class="container">'
        content += '<div class="row">'
        content += '<div class=" text-center alert alert-info">'
        content += 'Alumno eliminado'
        content += '</div>'
        content += '</div>'
        content += '</div>'
        cuerpo.innerHTML = content;
    }
};