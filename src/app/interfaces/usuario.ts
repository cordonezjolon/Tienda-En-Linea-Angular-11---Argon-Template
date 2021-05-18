export interface Usuario {
    Id_Usuario?: number; 
    Id_TipoUsuario?: number; 
    Id_Municipio?: number; 
    Id_Estado?: number; 
    Descripcion?: String; 
    PrimerNombre?: String; 
    SegundoNombre?: String; 
    PrimerApellido?: String; 
    SegundoApellido?: String; 
    Direccion?: String; 
    Telefono?: String; 
    NIT?: String; 
    DireccionEntrega?: String; 
    NombreFacturacion?: String; 
    DireccionFactura?: String; 
    password?: String; 
    Id_UsuarioCrea?: number; 
    FechaRegistro?: String; 
    FechaModifica?: String; 
    Id_UsuarioModifica?: number;
    email?: String;
    username?: String;
    Id_RolUsuario?: number;
    Fotografia?: String;
    Id_Departamento?: number;

}
