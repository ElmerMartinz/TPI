var vueUser= new Vue({
    el: "#adminUser",
    data:{
        alerta:{
          titulo: "Error",
          mensaje:"Texto"
        },
        usuarios:[],
        textoBusqueda: "",
        usuarioSelected: 1,
        dep:1,
        nuevoRegistro:{ 
            "nombres": "",
            "apellidos": "", 
            "dui": 0, 
            "sexo": "M",
            "contrasenia": "0", 
            "estadoVoto": false, 
            "idMunicipio": { 
                "idMunicipio": 1 
            },
            "idRol": { 
                "idRol": 2 
            } 
        },
    },
    methods: {
                
        //Obtiene datos
        cargarDatos: function () {
          axios.get('http://localhost:8080/usuario/findAll').then((response) => {
              this.usuarios = response.data;
            })
            .catch((e) => {
              console.log(e);
            });
            

        },
        
        //METODO CREAR USUARIO
        crear:function(){
            // VALIDACIONES DE CAMPOS VACIOS    
            var registroEncontrado=false;
           if(this.nuevoRegistro.nombres == "" && this.nuevoRegistro.apellidos == "" 
              && this.nuevoRegistro.contrasenia == "0"){
             this.mostrarAlerta("ERROR","Por favor Complete los campos!");
               document.getElementById("inputNombres").focus();
           }else{
               for (var i=0 in this.usuarios){
                    if(this.nuevoRegistro.dui != this.usuarios[i].dui){
                        this.registroEncontrado=false;
                    }else{
                        this.registroEncontrado=true;
                        console.log(this.usuarios[i].nombres);
                        break;
                    }
                }
                
               if(this.nuevoRegistro.nombres == ""){
                    this.mostrarAlerta("ERROR","Por favor ingrese los Nombres!");
                    document.getElementById("inputNombres").focus();
                }else if(this.nuevoRegistro.apellidos == ""){
                    this.mostrarAlerta("ERROR","Por favor ingrese los Apellidos!");
                    document.getElementById("inputApellidos").focus();
                }else if(this.nuevoRegistro.dui.length != 9 ){
                    this.mostrarAlerta("ERROR","Por favor ingrese un No de Dui valido de 9 digitos!");
                    document.getElementById("inputDui").focus();
                }else if(this.registroEncontrado == true){
                    this.mostrarAlerta("ERROR","El No de Dui ingresado ya se encuentra registrado!");
                    document.getElementById("inputDui").focus();
                }else if(this.dep != 1 && this.nuevoRegistro.idMunicipio.idMunicipio == 1){
                    this.mostrarAlerta("ERROR","Por favor seleccione un Municipio!");
                    if(this.dep==2){
                        document.getElementById("inputMun").focus();
                    }else{
                        document.getElementById("inputMun2").focus();
                    }
                }else if(this.nuevoRegistro.contrasenia == "" || this.nuevoRegistro.contrasenia == "0"){
                    this.mostrarAlerta("ERROR","Por favor ingrese contraseña!");
                    document.getElementById("inputContrasenia").focus();
                }else if(this.nuevoRegistro.contrasenia.length < 5 ){
                    this.mostrarAlerta("ERROR","Por favor ingrese una contraseña de mas digitos!");
                    document.getElementById("inputContrasenia").focus();
                }else{
    
                    if(this.nuevoRegistro.idRol.idRol==1){
                        this.nuevoRegistro.estadoVoto=true;
                    }else{
                        this.nuevoRegistro.estadoVoto=false;
                    }
                    axios.post('http://localhost:8080/usuario/crearUsuario',this.nuevoRegistro)
                        .then(function (res) {
                        vueUser.nuevoRegistro.nombres= "";
                        vueUser.nuevoRegistro.apellidos= "";
                        vueUser.nuevoRegistro.dui= 0;
                        vueUser.nuevoRegistro.sexo= "M";
                        vueUser.nuevoRegistro.contrasenia= ""; 
                        vueUser.nuevoRegistro.idMunicipio.idMunicipio= 1; 
                        vueUser.nuevoRegistro.idRol.idRol= 2; 
                        vueUser.cargarDatos();
                        })
                        .catch(function (error) {
                            // handle err
                            console.log(error);
                        });
                $('#modalAgregar').modal('hide');
               }
               
        }
        },
        
        //METODO PARA MOSTRAR ALERTA
        mostrarAlerta:function(titu,msg){
            this.alerta.titulo=titu;
            this.alerta.mensaje=msg;
           
            $("#miAlerta").show('fade');
            setTimeout(function(){
                $("#miAlerta").hide('fade');
            },3000);
            
        },
        
        //METODO PARA MOSTRAR EL MODAL AGREGAR
        mostrarAgregar:function(){
            $('#modalAgregar').modal('show');
        },
        
        //METODO PARA BUSCAR USUARIOS DENTRO DE LA TABLA 
        buscar:function(x){
            
            if(this.textoBusqueda=="")
                return true;
                    
            var cad=this.usuarios[x].nombres + 
                this.usuarios[x].apellidos +
                this.usuarios[x].dui +
                this.usuarios[x].idRol.rol +
                this.usuarios[x].idMunicipio.municipio +
                this.usuarios[x].idMunicipio.idDepartamento.departamento;
            cad=cad.toUpperCase();
            
            if(cad.indexOf(this.textoBusqueda.toUpperCase())>=0)
                        return true;
            else
                return false;  
        },
        
    },
    mounted() {
    this.cargarDatos();
    }
});