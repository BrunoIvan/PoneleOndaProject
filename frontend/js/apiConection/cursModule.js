function curs_ver(){
    var recurso = get_recurso('cursos/?format=json');
    var json = JSON.parse(recurso.response);
    var cuerpo = document.getElementById('body_contenido');
    cuerpo.innerHTML = curs_list(json, true);
};

function curs_list(json, custom){
    var tabla = '<div id="curs_list" class="container"><div class="panel panel-default"><div class="panel-heading">Cursos</div><table class="table"><thead><tr><th>Nombre</th><th>año</th></tr></thead><tbody>'
    for(var x = 0; x < json.length; x++){
        var url = json[x].url;
        var id = url.slice(29, 29 + url.slice(29, -1).search('/'));
        tabla += '<tr id="'+id+'"><td>'.concat(json[x].name, '</td>');
        tabla += '<td>'.concat(json[x].anno, '</td>');
        if(custom){
            tabla += '<td id="botones"><div class="btn-group" role="group">'
            tabla += '<button onclick=\'curs_modif_vis("'+id+'")\' class="btn btn-default">Modificar</a>';
            tabla += '<button onclick=\'curs_elim_vis("'+id+'")\' class="btn btn-danger">Eliminar</a>';
            tabla += '</div></td>'
        }
        tabla += '</tr>'
    }
    tabla += '</tbody></table></div></div></div>';
    return tabla;
};

function curs_modif_vis(id){
    var alumnos = document.getElementById('alum_list');
    if(alumnos != null){
        alumnos.remove();
    }
    var profesores = document.getElementById('prof_list');
    if(profesores != null){
        profesores.remove();
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
    curso = get_recurso('cursos/'+id+'/?format=json');
    json = JSON.parse(curso.response);
    if(json.profesor.length > 0){
        var profesores = [];
        for(var x = 0; x < json.profesor.length; x++){
            var profesor = get_recurso(json.profesor[x].slice(22));
            profesores.push(JSON.parse(profesor.response));
        }
        cuerpo.innerHTML += prof_list(profesores, false);
    }
    if(json.alumno.length > 0){
        var alumnos = [];
        for(var x = 0; x < json.alumno.length; x++){
            var alumno = get_recurso(json.alumno[x].slice(22));
            alumnos.push(JSON.parse(alumno.response));
        }
        cuerpo.innerHTML += alum_list(alumnos, false);
    }
    modif += '<div class=" text-center alert alert-info">'
    modif += 'Modificar Curso'
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
    modif += '<div id="campo_anno" class="form-group has-default">'
    modif += '<input id="id_anno" name="anno" class="form-control" placeholder="Modifique el año" type="text">'
    modif += '</div>'
    modif += '<div id="campo_profesores" class="form-group has-default">'
    modif += '<label for="id_profesor">Modifique sus profesores</label>'
    modif += '<select multiple id="id_profesor" name="profesor" class="form-control">'
    var profesores = get_recurso('profesores/?format=json');
    var profesores = JSON.parse(profesores.response);
    for(var x = 0; x < profesores.length; x++){
        modif += '<option value="'+profesores[x].url+'">'+profesores[x].name+' '+profesores[x].suname+'</option>'
    }
    modif += '</select>'
    modif += '</div>'
    modif += '<div id="campo_alumnos" class="form-group has-default">'
    modif += '<label for="id_alumno">Modifique sus alumnos</label>'
    modif += '<select id="id_alumno" name="alumno" multiple class="form-control">'
    var alumnos = get_recurso('alumnos/?format=json');
    var alumnos = JSON.parse(alumnos.response);
    for(var x = 0; x < alumnos.length; x++){
        modif += '<option value="'+alumnos[x].url+'">'+alumnos[x].name+' '+alumnos[x].suname+'</option>'
    }
    modif += '</select>'
    modif += '</div>'
    modif += '<input id="submit-modif" type="button" onclick="curs_modif('+id+')" class="btn btn-info btn-block" value="Modificar">'
    modif += '</form>'
    modif += '</div>'
    modif += '</div>'
    modif += '</div>'
    modif += '</div>'
    cuerpo.innerHTML += modif;
};

function curs_elim_vis(id){
    var alumnos = document.getElementById('alum_list');
    if(alumnos != null){
        alumnos.remove();
    }
    var profesores = document.getElementById('prof_list');
    if(profesores != null){
        profesores.remove();
    }
    var extra_cont = document.getElementById('extra_cont');
    if(extra_cont != null){
        extra_cont.remove();
    }
    var filas = document.getElementsByTagName('tr');
    while(filas.length > 2){
        for(x = 1; x < filas.length; x++){
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
    curso = get_recurso('cursos/'+id+'/?format=json');
    json = JSON.parse(curso.response);
    if(json.profesor.length > 0){
        var profesores = [];
        for(var x = 0; x < json.profesor.length; x++){
            var profesor = get_recurso(json.profesor[x].slice(22));
            profesores.push(JSON.parse(profesor.response));
        }
        cuerpo.innerHTML += prof_list(profesores, false);
    }
    if(json.alumno.length > 0){
        var alumnos = [];
        for(var x = 0; x < json.alumno.length; x++){
            var alumno = get_recurso(json.alumno[x].slice(22));
            alumnos.push(JSON.parse(alumno.response));
        }
        cuerpo.innerHTML += alum_list(alumnos, false);
    }
    modif += '<div class=" text-center alert alert-danger">'
    modif += 'Eliminar Curso'
    modif += '</div>'
    modif += '<div class="panel panel-info" id="panel-elim">'
    modif += '<div class="panel-heading">'
    modif += 'Confirmación'
    modif += '</div>'
    modif += '<div class="panel-body" id="cuerpo-elim">'
    modif += '<p class="text-center">¿Está seguro que desea continuar?</p>'
    modif += '<div class="btn-group btn-group-justified" role="group">'
    modif += '<div class="btn-group" role="group">'
    modif += '<button type="button" onclick="curs_ver()" class="btn btn-default">Cancelar</button>'
    modif += '</div>'
    modif += '<div class="btn-group" role="group">'
    modif += '<button type="button" onclick="curs_elim('+id+')" class="btn btn-danger">Confirmar</button>'
    modif += '</div>'
    modif += '</div>'
    modif += '</div>'
    modif += '</div>'
    modif += '</div>'
    modif += '</div>'
    cuerpo.innerHTML += modif;
};

function curs_new_vis(){
    var cuerpo = document.getElementById('body_contenido');
    var modif = '<div class="container">'
    modif += '<div class="row">'
    modif += '<div class="panel panel-info" id="panel-new">'
    modif += '<div class="panel-heading">'
    modif += 'Agregar Curso'
    modif += '</div>'
    modif += '<div class="panel-body" id="cuerpo-new">'
    modif += '<form method="POST" id="form-new">'
    modif += '<div id="campo_name" class="form-group has-default">'
    modif += '<input id="id_name" name="name" class="form-control" placeholder="Nombre" type="text">'
    modif += '</div>'
    modif += '<div id="campo_anno" class="form-group has-default">'
    modif += '<input id="id_anno" name="anno" class="form-control" placeholder="Año" type="number">'
    modif += '</div>'
    modif += '<div id="campo_profesores" class="form-group has-default">'
    modif += '<label for="id_profesor">Profesores</label>'
    modif += '<select id="id_profesor" name="profesor" multiple class="form-control">'
    var profesores = get_recurso('profesores/?format=json');
    var profesores = JSON.parse(profesores.response);
    for(var x = 0; x < profesores.length; x++){
        modif += '<option value="'+profesores[x].url+'">'+profesores[x].name+' '+profesores[x].suname+'</option>'
    }
    modif += '</select>'
    modif += '</div>'
    modif += '<div id="campo_alumnos" class="form-group has-default">'
    modif += '<label for="id_alumno">Alumnos</label>'
    modif += '<select id="id_alumno" name="alumno" multiple class="form-control">'
    var alumnos = get_recurso('alumnos/?format=json');
    var alumnos = JSON.parse(alumnos.response);
    for(var x = 0; x < alumnos.length; x++){
        modif += '<option value="'+alumnos[x].url+'">'+alumnos[x].name+' '+alumnos[x].suname+'</option>'
    }
    modif += '</select>'
    modif += '</div>'
    modif += '<input id="submit-modif" type="button" onclick="curs_new()" class="btn btn-info btn-block" value="Agregar">'
    modif += '</form>'
    modif += '</div>'
    modif += '</div>'
    modif += '</div>'
    modif += '</div>'
    cuerpo.innerHTML = modif;
};

function curs_new(){
    var form = document.getElementById('form-new');
    var recurso = post_recurso('cursos/?format=json', form);
    if(recurso.statusText.localeCompare("BAD REQUEST") == 0){
        var json = JSON.parse(recurso.response);
        if(json.name != undefined){
            var campo_name = document.getElementById('campo_name');
            campo_name.attributes.class.value = 'form-group has-warning';
        }
        if(json.anno != undefined){
            var campo_anno = document.getElementById('campo_anno');
            campo_anno.attributes.class.value = 'form-group has-warning';
        }
        if(json.profesor != undefined){
            if (document.getElementById('no_prof') == null){
                var campo_profesores = document.getElementById('campo_profesores');
                content = '<div id="no_prof" class="text-center alert alert-warning">'
                content += 'El curso debe contar con al menos un profesor'
                content += '</div>'
                campo_profesores.innerHTML += content;
            }
        }
        if(json.alumno != undefined){
            if (document.getElementById('no_alum') == null){
                var campo_alumnos = document.getElementById('campo_alumnos');
                content = '<div id="no_alum" class="text-center alert alert-warning">'
                content += 'El curso debe contar con al menos un alumno'
                content += '</div>'
                campo_alumnos.innerHTML += content;
            }
        }
    } else if(recurso.statusText.localeCompare("CREATED") == 0){
        var cuerpo = document.getElementById('body_contenido');
        var content = '<div class="container">'
        content += '<div class="row">'
        content += '<div class=" text-center alert alert-info">'
        content += 'Curso creado'
        content += '</div>'
        content += '</div>'
        content += '</div>'
        cuerpo.innerHTML = content;
    }
};

function curs_modif(id){
    var form = document.getElementById('form-modif');
    var json = {};
    json['name'] = form.name.value;
    json['anno'] = form.anno.value;
    recurso = get_recurso('cursos/'+id+'/?format=json');
    curs = JSON.parse(recurso.response);
    profesor = [];
    if(form.profesor.selectedOptions.length > 0){
        for(var x = 0; x < form.profesor.selectedOptions.length; x++){
            profesor.push(form.profesor.selectedOptions[x].value);
        }
    } else {
        for(var x = 0; x < curs.profesor.length; x++){
            profesor.push(curs.profesor[x]);
        }
    }
    json['profesor'] = profesor;
    alumno = [];
    if(form.alumno.selectedOptions.length > 0){
        for(var x = 0; x < form.alumno.selectedOptions.length; x++){
            alumno.push(form.alumno.selectedOptions[x].value);
        }
    } else {
        for(var x = 0; x < curs.alumno.length; x++){
            alumno.push(curs.alumno[x]);
        }
    }
    json['alumno'] = alumno;
    if ((json['name'] + json['anno']).length > 0){
        if(json['name'].localeCompare("") == 0){
            json['name'] = curs.name;
        }
        if(json['anno'].localeCompare("") == 0){
            json['anno'] = curs.anno;
        }
        json = JSON.stringify(json);
        recurso = put_recurso('cursos/'+id+'/?format=json', json);
        if(recurso.statusText.localeCompare('OK') == 0){
            var cuerpo = document.getElementById('body_contenido');
            var content = '<div class="container">'
            content += '<div class="row">'
            content += '<div class=" text-center alert alert-info">'
            content += 'Curso Modificado'
            content += '</div>'
            content += '</div>'
            content += '</div>'
            cuerpo.innerHTML = content;
        }
    }
};

function curs_elim(id){
    var recurso = delete_recurso('cursos/'+id+'/?format=json');
    if(recurso.statusText.localeCompare('NO CONTENT') == 0){
        var cuerpo = document.getElementById('body_contenido');
        var content = '<div class="container">'
        content += '<div class="row">'
        content += '<div class=" text-center alert alert-info">'
        content += 'Curso eliminado'
        content += '</div>'
        content += '</div>'
        content += '</div>'
        cuerpo.innerHTML = content;
    }
};