<?php require_once "vistas/parte_superior.php"?>

<!--INICIO del cont principal-->
<div class="container">
   <h1 align="center">Autor</h1>
    
    
    
 <?php
include_once '../bd/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$consulta = "SELECT * FROM codigos";
$resultado = $conexion->prepare($consulta);
$resultado->execute();
$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
?>


<div class="container">
        <div class="row">
            <div class="col-lg-12">            
            <button id="btnNuevoCodigo" type="button" class="btn btn-success" data-toggle="modal">Nuevo</button>    
            </div>    
        </div>    
    </div>    
    <br>  
<div class="container">
        <div class="row">
                <div class="col-lg-12">
                    <div class="table-responsive">        
                        <table id="tablaCodigo" class="table table-striped table-bordered table-condensed" style="width:100%">
                        <thead class="text-center">
                            <tr>
                                <th>Id Codigo</th>
                                <th>URL</th>
                                <th>Ubicacion</th>
                                <th>Unidad</th>
                                <th>Permiso</th>
                                <th>Activo</th>
                                <th>Acciones</th>                              
                            </tr>
                        </thead>
                        <tbody>
                            <?php                            
                            foreach($data as $dat) {                                                        
                            ?>
                            <tr>
                                <td><?php echo $dat['id'] ?></td>
                                <td><?php echo $dat['url_code'] ?></td>
                                <td><?php echo $dat['ubicacion'] ?></td>
                                <td><?php echo $dat['unidad'] ?></td>
                                <td><?php echo $dat['permiso'] ?></td>
                                <td><?php if($dat['activo']==1){ echo("Si");} else{ echo("No");}  ?></td>
                                <td></td>
                            </tr>
                            <?php
                                }
                            ?>                                
                        </tbody>        
                       </table>                    
                    </div>
                </div>
        </div>  
    </div>    
      
<!--Modal para CRUD-->
<div class="modal fade" id="modalCodigo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
            </div>
        <form id="formCodigo">    
            <div class="modal-body">
                <div class="form-group">
                <label for="idCodigo" class="col-form-label">Id Codigo:</label>
                <input type="text" class="form-control" id="idCodigo">
                </div>  
                <div class="form-group">
                <label for="url_code" class="col-form-label">Url Code:</label>
                <input type="text" class="form-control" id="url_code">
                </div>  
                <div class="form-group">
                <label for="ubicacion" class="col-form-label">Ubicacion:</label>
                <input type="text" class="form-control" id="ubicacion">
                </div> 
                <div class="form-group">
                <label for="unidad" class="col-form-label">Unidad:</label>
                <select class="form-control" id="unidad" placeholder="Seleccione">
                    <option value=1>1</option>;
                    <option value=2>2</option>;
                    <option value=3>3</option>;
                    <option value=4>4</option>;
                    </select>
                </div>
                <div class="form-group">
                <label for="permiso" class="col-form-label">Permisos:</label>
                <select class="form-control" id="permiso" placeholder="Seleccione">
                    <option value=1>1</option>;
                    <option value=2>2</option>;
                    <option value=3>3</option>;
                    <option value=4>4</option>;
                    </select>
                </div>
                <div class="form-group">
                <label for="activo" class="col-form-label">Activo:</label>
                <select class="form-control" id="activo" placeholder="Seleccione">
                    <option value=1>Si</option>;
                    <option value=0>No</option>;
                    </select>
                </div>
                   
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-light" data-dismiss="modal">Cancelar</button>
                <button type="submit" id="btnGuardar" class="btn btn-dark">Guardar</button>
            </div>
        </form>    
        </div>
    </div>
</div>  
      
    
    
</div>
<!--FIN del cont principal-->
<?php require_once "vistas/parte_inferior.php"?>