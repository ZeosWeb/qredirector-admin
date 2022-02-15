<?php
include_once '../../bd/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

// Recepción de los datos enviados mediante POST desde el JS   

$url_code = (isset($_POST['url_code'])) ? $_POST['url_code'] : '';
$ubicacion = (isset($_POST['ubicacion'])) ? $_POST['ubicacion'] : '';
$unidad = (isset($_POST['unidad'])) ? $_POST['unidad'] : '';
$permiso = (isset($_POST['permiso'])) ? $_POST['permiso'] : '';
$activo = (isset($_POST['activo'])) ? $_POST['activo'] : '';
$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
$id = (isset($_POST['id'])) ? $_POST['id'] : '';


switch($opcion){
    case 1: //alta

       $consulta = "INSERT INTO codigos (id, url_code, ubicacion, unidad, permiso, activo) VALUES ('$id','$url_code', '$ubicacion', $unidad, $permiso, $activo) ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute(); 

        $consulta = "SELECT * FROM codigos ORDER BY id DESC LIMIT 1";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 2: //modificación
        $consulta = "UPDATE `codigos` SET `url_code` = '$url_code', `ubicacion` = '$ubicacion', `unidad` = '$unidad', `permiso` = '$permiso', `activo` = '$activo' WHERE `codigos`.`id` = '$id'";
       $resultado = $conexion->prepare($consulta);
        $resultado->execute();

        $consulta = "SELECT * FROM codigos ORDER BY id DESC LIMIT 1";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;        
    case 3://baja
        $consulta = "DELETE FROM codigos WHERE id='$id'";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();

        $consulta = "SELECT * FROM codigos ORDER BY id DESC LIMIT 1";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;        
}

print json_encode($data, JSON_UNESCAPED_UNICODE); //enviar el array final en formato json a JS
$conexion = NULL;
