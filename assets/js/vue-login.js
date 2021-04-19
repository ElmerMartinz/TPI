var vueLogin= new Vue({
    el: "#AdminApp",
    data:{
        alerta:{
          titulo: "Error",
          mensaje:"Texto"
        },
        user:{
            dui: "",
            paswword: "",
        },
        users:[   
            {
    "idUsuario": 1,
    "nombre": "Admin",
    "apellido": "nistrador",
    "sexo":"m",
    "rol":"administrador",
    "fechaNac":2008/11/28,
    "dui":00000001,
    "password":12345,
    "voto":true,
  },
            {
    "idUsuario": 2,
    "nombre": "Nacha",
    "apellido": "Hola",
    "sexo":"f",
    "rol":"usuario",
    "fechaNac":2008/11/29,
    "dui":00000002,
    "password":12345,        
    "voto":false,
  },
            {
    "idUsuario": 3,
    "nombre": "Prueba",
    "apellido": "Hol",
    "sexo":"f",
    "rol":"usuario",
    "fechaNac":2009/11/29,
    "dui":00000003,
    "password":12345,
  },
            {
    "idUsuario": 4,
    "nombre": "Nose",
    "apellido": "Hla",
    "sexo":"m",
    "rol":"usuario",
    "fechaNac":2002/11/29,
    "dui":00000004,
    "password":12345,
  },
        ],
        encontrado:false,
        userRol: "",
        userName: "",
        userId:0,
        userVoto:false,
    },
    
   methods:{
        mostrarAlerta:function(titu,msg){
            this.alerta.titulo=titu;
            this.alerta.mensaje=msg;
           
            $("#miAlerta").show('fade');
            setTimeout(function(){
                $("#miAlerta").hide('fade');
            },3000);
            
        },
        login:function(){
            
            if (this.user.dui!="" && this.user.password !="") {
                //AQUI VA EL METODO 
                    for (var i = 0 in vueLogin.users) {
                        if(this.users[i].dui==this.user.dui && this.users[i].password==this.user.password ){
                            this.encontrado=true;
                            this.userRol=this.users[i].rol;
                            this.userId=this.users[i].idUsuario;
                            this.userVoto=this.users[i].voto;
                            this.userName=this.users[i].nombre + " " +this.users[i].apellido;
                            break;
                            }
                    }
                    if(this.encontrado==true){
                        sessionStorage.setItem("userName", this.userName);
                        sessionStorage.setItem("userRol", this.userRol);
                        sessionStorage.setItem("encontradoLog", this.encontrado);
                        sessionStorage.setItem("usuarioNo", this.userId);
                        sessionStorage.setItem("userVoto", this.userVoto);
                        window.location = './index.html'
                    } 
                    else{
                        vueLogin.mostrarAlerta("Datos incorrectos","Por favor ingrese datos correctos!");
                    } 
                }
            else{
                 vueLogin.mostrarAlerta("Datos Vacios","Por favor complete los campos!");
            }
      
      },
      
    },    
});