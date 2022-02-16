
 //### Tabla de Carga de Elementos con Data Tables

//Usuario Datatable
$(document).ready(function(){
    tablaUsuario = $("#tablaUsuario").DataTable({
       "columnDefs":[{
        "targets": -1,
        "data":null,
        "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btnEditarUsuario'>Editar</button><button class='btn btn-danger btnBorrarUsuario'>Borrar</button></div></div>"  
       }],
        
    "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast":"Último",
                "sNext":"Siguiente",
                "sPrevious": "Anterior"
             },
             "sProcessing":"Procesando...",
        }
    });
});

//Codigo Datatable
$(document).ready(function(){
    tablaCodigo = $("#tablaCodigo").DataTable({
       "columnDefs":[{
        "targets": -1,
        "data":null,
        "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btnEditarCodigo'>Editar</button><button class='btn btn-danger btnBorrarCodigo'>Borrar</button></div></div>"  
       }],
        
    "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast":"Último",
                "sNext":"Siguiente",
                "sPrevious": "Anterior"
             },
             "sProcessing":"Procesando...",
        }
    });
});

 //### Botones para crear nuevos Formularios

//Botones Nuevo Usuario
$("#btnNuevoUsuario").click(function(){
    $("#formUsuario").trigger("reset");
    $(".modal-header").css("background-color", "#1cc88a");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Nuevo Usuario");            
    $("#modalUsuario").modal("show");        
    opcion = 1; //alta
});

//Botones Nueva Codigo
$("#btnNuevoCodigo").click(function(){
    $("#formCodigo").trigger("reset");
    $(".modal-header").css("background-color", "#1cc88a");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Nuevo Codigo");            
    $("#modalCodigo").modal("show");        
    opcion = 1; //alta
});



var fila; //capturar la fila para editar o borrar el registro
    

 //### Botones para crear Editar Formularios

//Usuario Editar
$(document).on("click", ".btnEditarUsuario", function(){
    fila = $(this).closest("tr");
    id = parseInt(fila.find('td:eq(0)').text());
    usuario = fila.find('td:eq(1)').text();
    nombre = fila.find('td:eq(2)').text();
    unidad = fila.find('td:eq(3)').text();
    permiso = fila.find('td:eq(4)').text();
    
    $("#idUsuario").val(id);
    $("#usuario").val(usuario);
    $("#nombre").val(nombre);
    $("#unidad").val(unidad);
    $("#permiso").val(permiso);
    opcion = 2; //editar
    
    $(".modal-header").css("background-color", "#4e73df");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Editar Usuario");            
    $("#modalUsuario").modal("show");  
    
});

//codigo Editar
$(document).on("click", ".btnEditarCodigo", function(){
    fila = $(this).closest("tr");
    id = fila.find('td:eq(0)').text();
    url_code  = fila.find('td:eq(2)').text();
    ubicacion = fila.find('td:eq(3)').text();
    unidad = parseInt(fila.find('td:eq(4)').text());
    permiso = parseInt(fila.find('td:eq(5)').text());
    activo = fila.find('td:eq(6)').text();
    
    $("#idCodigo").val(id);
    $("#url_code").val(url_code);
    $("#ubicacion").val(ubicacion);
    $("#unidad").val(unidad);
    $("#permiso").val(permiso);
    /*if ($("#activo").val(activo)=="Si") {
        $("#activo").val("Si");
    } else {
        $("#activo").val("No");
    }*/
    $("#activo").val(activo);
    opcion = 2; //editar
    
    $(".modal-header").css("background-color", "#4e73df");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Editar Código");            
    $("#modalCodigo").modal("show");  
    
});


 //### Botones para Eliminar Formularios

//Borrar Usuario
$(document).on("click", ".btnBorrarUsuario", function(){    
    fila = $(this);
    id = parseInt($(this).closest("tr").find('td:eq(0)').text());
    opcion = 3 //borrar
    var respuesta = confirm("¿Está seguro de eliminar el registro: "+id+"?");
    if(respuesta){
        $.ajax({
            url: "model/Usuario.php",
            type: "POST",
            dataType: "json",
            data: {opcion:opcion, id:id},
            success: function(){
                tablaUsuario.row(fila.parents('tr')).remove().draw();
            }
        });
    }   
});

//Borrar Codigo
$(document).on("click", ".btnBorrarCodigo", function(){    
    fila = $(this);
    id = $(this).closest("tr").find('td:eq(0)').text();
    opcion = 3 //borrar
    var respuesta = confirm("¿Está seguro de eliminar el registro: "+id+"?");
    if(respuesta){
        $.ajax({
            url: "model/Codigo.php",
            type: "POST",
            dataType: "json",
            data: {opcion:opcion, id:id},
            success: function(){
                tablaCodigo.row(fila.parents('tr')).remove().draw();
            }
        });
    }   
});

    
 //### Crear Modal con nuevos Formularios

//Submit Form Autor
$("#formUsuario").submit(function(e){
    e.preventDefault();
    id =$.trim($("#idUsuario").val());
    usuario = $.trim($("#usuario").val());
    nombre = $.trim($("#nombre").val());
    unidad = $.trim($("#unidad").val());
    permiso = $.trim($("#permiso").val());
    $.ajax({
        url: "model/Usuario.php",
        type: "POST",
        dataType: "json",
        data: {id:id, usuario:usuario, nombre:nombre , unidad:unidad, permiso:permiso, opcion:opcion},
        success: function(data){
            id = data[0].id;            
            usuario = data[0].usuario;
            nombre = data[0].nombre;
            unidad = data[0].unidad;
            permiso = data[0].permiso;
            if(opcion == 1){tablaUsuario.row.add([id, usuario, nombre, unidad, permiso]).draw();}
            else{tablaUsuario.row(fila).data([id, usuario, nombre, unidad, permiso]).draw();}
            window.location.reload(true);            
        }        
    });
    $("#modalUsuario").modal("hide");
});

//Submit Form libros
$("#formCodigo").submit(function(e){
    e.preventDefault();
    id = $.trim($("#idCodigo").val());
    url_code = $.trim($("#url_code").val());
    ubicacion = $.trim($("#ubicacion").val());
    unidad = $.trim($("#unidad").val());
    permiso = $.trim($("#permiso").val());
    activo = $.trim($("#activo").val());
    $.ajax({
        url: "model/Codigo.php",
        type: "POST",
        dataType: "json",
        data: {id:id, url_code:url_code, ubicacion:ubicacion , unidad:unidad, permiso:permiso, activo:activo, opcion:opcion},
        success: function(data){
            id = data[0].id;            
            url_code = data[0].url;
            ubicacion = data[0].ubicacion;
            unidad = data[0].unidad;
            permiso = data[0].permiso;
            activo = data[0].activo;
            if(opcion == 1){tablaCodigo.row.add([id, url_code, ubicacion, unidad, permiso, activo]).draw();}
            else{tablaCodigo.row(fila).data([id, url_code, ubicacion, unidad, permiso, activo]).draw();}
            window.location.reload(true);

        }

    });
    $("#modalCodigo").modal("hide");
});