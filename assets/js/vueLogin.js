var vueLogin= new Vue({
    el: "#adminLogin",
    data:{
        alerta:{
          titulo: "Error",
          mensaje:"Texto"
        },
        user:{
            dui: "",
            contraseña: "",
        },
        usuarios:[],
        usuarioSelected: 0,
        encontrado:false,
        userRol: 0,
        userName: "",
        userId:0,
        userEstadoVoto:0,
        userDep:0,
        userNombreDep:"",
        userNombreMun:"",
        userMun:0,
        userNumeroDip:0,
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
        
        //METODO DEL LOGIN
        login:function(){
            
            if (this.user.dui!="" && this.user.contraseña !="") {
                //AQUI VA EL METODO 
                    for (var i = 0 in this.usuarios) {
                        if(this.usuarios[i].dui==this.user.dui && this.usuarios[i].contrasenia==this.user.contraseña ){
                        
                            
                            if(this.usuarios[i].estadoVoto == false){
                                this.userEstadoVoto=0;
                            } else{
                                this.userEstadoVoto=1;
                            }
                            this.encontrado=true;
                            this.userRol=this.usuarios[i].idRol.idRol;
                            this.userId=this.usuarios[i].idUsuario;
                            this.userName=this.usuarios[i].nombres + " " +this.usuarios[i].apellidos;
                            this.userDep=this.usuarios[i].idMunicipio.idDepartamento.idDepartamento;
                            this.userNombreDep=this.usuarios[i].idMunicipio.idDepartamento.departamento;
                            this.userNombreMun=this.usuarios[i].idMunicipio.municipio;
                            this.userMun=this.usuarios[i].idMunicipio.idMunicipio;
                            this.userNumDip=this.usuarios[i].idMunicipio.idDepartamento.cantidadDiputados;
                            break;
                            }
                    }
                    if(this.encontrado==true){
                        sessionStorage.setItem("userName", this.userName);
                        sessionStorage.setItem("userRol", this.userRol);
                        sessionStorage.setItem("encontradoLog", this.encontrado);
                        sessionStorage.setItem("usuarioNo", this.userId);
                        sessionStorage.setItem("userVoto", this.userEstadoVoto);
                        sessionStorage.setItem("userDep", this.userDep);
                        sessionStorage.setItem("userMun", this.userMun);
                        sessionStorage.setItem("userCantidad", this.userNumDip);
                        sessionStorage.setItem("userNombreDep",this.userNombreDep);
                        sessionStorage.setItem("userNombreMun",this.userNombreMun);
                        window.location = './index.html'
                    } 
                    else{
                        this.mostrarAlerta("Datos incorrectos","Por favor ingrese datos correctos!");
                    } 
                }
            else{
                 this.mostrarAlerta("Datos Vacios","Por favor complete los campos!");
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
       
    },
    mounted() {
        this.cargarDatos();
    }
});