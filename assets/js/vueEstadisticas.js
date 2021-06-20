var vueEstadisticas= new Vue({
    el: "#adminEstadisticas",
    data:{
        usuarios:[],
        datos:[],
        datosEstadisticos:[],
        tipoEstadisticas:0,
        mostrarEstadisticas:false,
        orderByAsc:-1,
        muestra:0,
        contadorVotosTrue:0,
        contadorUsuarios:0,
    },
    methods:{
         
        cargarDatos: function () {
            this.contadorVotosTrue=0;
            this.contadorUsuarios=0;
            axios.get('http://localhost:8080/usuario/findAll').then((response) => {
                     this.usuarios = response.data;
                    }).catch((e) => {
                      console.log(e);
                    });
            
            if (this.tipoEstadisticas == 1){
                axios.get('http://localhost:8080/votosCandidatos/findAlcaldesMunicipio/'+sessionStorage.getItem("userMun")).then((response) => {
                     this.datos = response.data;
                     this.datos.sort(function(a,b){
                         return vueEstadisticas.orderByAsc*(a.votos - b.votos);
                      });
                    
                    
                    for(var i=0 in this.usuarios){
                            if(this.usuarios[i].idMunicipio.idMunicipio == sessionStorage.getItem("userMun")){
                                this.contadorUsuarios = this.contadorUsuarios + 1;
                                if(this.usuarios[i].estadoVoto == true){
                                    this.contadorVotosTrue = this.contadorVotosTrue + 1;
                                }
                            } 
                        } 

                  this.datosEstadisticos.length=0;
                   for(var i=0 in this.datos){
                       var porcentaje = parseFloat((this.datos[i].votos * 100) / this.contadorUsuarios).toFixed(2);
                       var nombre=this.datos[i].idUsuario.nombres +" "+this.datos[i].idUsuario.apellidos;
                       this.datosEstadisticos[i]={"nombre":nombre,"porcentaje":porcentaje};
                    }
                         
                    var porcentaje = parseFloat((this.contadorVotosTrue * 100) / this.contadorUsuarios).toFixed(2);
                    var spanPorcentaje=" ("+porcentaje+"%)";
                    document.getElementById('idSpanPorcentaje').innerText = spanPorcentaje;
                    document.getElementById('idUsuariosContadorTrue').innerText = this.contadorVotosTrue;
                    document.getElementById('idUsuariosContador').innerText = this.contadorUsuarios;
                    
                    }).catch((e) => {
                      console.log(e);
                    });
                 
                
                this.mostrarEstadisticas= true;
                this.muestra=1;
                
                
            }
            else if(this.tipoEstadisticas == 2){
                axios.get('http://localhost:8080/votosCandidatos/findPresidentes').then((response) => {
                     this.datos = response.data;
                     this.datos.sort(function(a,b){
                         return vueEstadisticas.orderByAsc*(a.votos - b.votos);
                      });
                    
                    
                    this.contadorUsuarios=this.usuarios.length;
                    for(var i=0 in this.usuarios){
                        if(this.usuarios[i].estadoVoto == true){
                                    this.contadorVotosTrue = this.contadorVotosTrue + 1;
                        }
                    } 
                
                    this.datosEstadisticos.length=0;
                   for(var i=0 in this.datos){
                       var porcentaje = parseFloat((this.datos[i].votos * 100) / this.contadorUsuarios).toFixed(2);
                       var nombre=this.datos[i].idUsuario.nombres +" "+this.datos[i].idUsuario.apellidos;
                       this.datosEstadisticos[i]={"nombre":nombre,"porcentaje":porcentaje};
                    }
                         
                    var porcentaje = parseFloat((this.contadorVotosTrue * 100) / this.contadorUsuarios).toFixed(2);
                    var spanPorcentaje=" ("+porcentaje+"%)";
                    document.getElementById('idSpanPorcentaje').innerText = spanPorcentaje;
                    document.getElementById('idUsuariosContadorTrue').innerText = this.contadorVotosTrue;
                    document.getElementById('idUsuariosContador').innerText = this.contadorUsuarios;
                    
                    
                    
                    }).catch((e) => {
                      console.log(e);
                    });
                this.mostrarEstadisticas= true;
                this.muestra=2;
            }
            else if(this.tipoEstadisticas == 3){
                
                axios.get('http://localhost:8080/votosCandidatos/findDiputadosDepartamento/'+sessionStorage.getItem("userDep")).then((response) => {
                     this.datos = response.data;
                     this.datos.sort(function(a,b){
                         return vueEstadisticas.orderByAsc*(a.votos - b.votos);
                      });
                    this.datos.length = sessionStorage.getItem("userCantidad");
                    
                    for(var i=0 in this.usuarios){
                            if(this.usuarios[i].idMunicipio.idDepartamento.idDepartamento == sessionStorage.getItem("userDep")){
                                this.contadorUsuarios = this.contadorUsuarios + 1;
                                if(this.usuarios[i].estadoVoto == true){
                                    this.contadorVotosTrue = this.contadorVotosTrue + 1;
                                }
                            } 
                        } 

                  this.datosEstadisticos.length=0;
                   for(var i=0 in this.datos){
                       var porcentaje = parseFloat((this.datos[i].votos * 100) / this.contadorUsuarios).toFixed(2);
                       var nombre=this.datos[i].idUsuario.nombres +" "+this.datos[i].idUsuario.apellidos;
                       this.datosEstadisticos[i]={"nombre":nombre,"porcentaje":porcentaje};
                    }
                         
                    var porcentaje = parseFloat((this.contadorVotosTrue * 100) / this.contadorUsuarios).toFixed(2);
                    var spanPorcentaje=" ("+porcentaje+"%)";
                    document.getElementById('idSpanPorcentaje').innerText = spanPorcentaje;
                    document.getElementById('idUsuariosContadorTrue').innerText = this.contadorVotosTrue;
                    document.getElementById('idUsuariosContador').innerText = this.contadorUsuarios;
                    
                    }).catch((e) => {
                      console.log(e);
                    });
                    
                this.mostrarEstadisticas= true;
                this.muestra=3;
            }
        },
        
       prueba:function(){
           console.log(this.datosEstadisticos.length);
            for(var i=0 in this.datosEstadisticos){
               console.log(this.datosEstadisticos[i]);
            }
       }         
    },
    mounted() {
        this.cargarDatos();
    }
});