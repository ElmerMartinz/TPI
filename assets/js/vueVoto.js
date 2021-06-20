var vueVotoAlcaldes= new Vue({
    el: "#AdminVotoAlcalde",
    data:{
        alcaldes:[],
        alcaldeSelected:0,
        voto:{
            "idUsuario":{
                "idUsuario":0
            },
            "votos": 1, 
        },
    },
    methods:{
        //METODO PARA MOSTRAR EL MODAL AGREGAR
        mostrarModal:function(){
            $('#modalVotar').modal('show');
        },
        //Obtiene datos
        cargarDatos: function () {
             axios.get('http://localhost:8080/votosCandidatos/findAlcaldesMunicipio/'+sessionStorage.getItem("userMun")).then((response) => {
                  this.alcaldes = response.data;
                })
                .catch((e) => {
                  console.log(e);
                });
        },
        
        //Votar
        votar:function(){
            this.voto.idUsuario.idUsuario=this.alcaldes[this.alcaldeSelected].idUsuario.idUsuario;
            
            axios.put('http://localhost:8080/votosCandidatos/actualizarvotos',this.voto)
                .then(function (res) {
                    console.log("VOTO ALCALDE");
                })
                .catch(function (error) {
                    console.log(error);
                });
        
        
        window.location = './votoPresidente.html'
        },
    },
    mounted() {
        this.cargarDatos();
    }
});

var vueVotoPresidentes= new Vue({
    el: "#AdminVotoPresidente",
    data:{
        presidentes:[],
        presidenteSelected: 0,
        voto:{
            "idUsuario":{
                "idUsuario":0
            },
            "votos": 1, 
        },
    },
    methods:{
        //METODO PARA MOSTRAR EL MODAL AGREGAR
        mostrarModal:function(){
            $('#modalVotar').modal('show');
        },
        //Obtiene datos
        cargarDatos: function () {
    
              axios.get('http://localhost:8080/votosCandidatos/findPresidentes').then((response) => {
                  this.presidentes = response.data;
                })
                .catch((e) => {
                  console.log(e);
                });
        },
        
        //Votar
        votar:function(){
            this.voto.idUsuario.idUsuario=this.presidentes[this.presidenteSelected].idUsuario.idUsuario;
            
            axios.put('http://localhost:8080/votosCandidatos/actualizarvotos',this.voto).then(function (res) {
                    console.log("VOTO PRESIDENTE");
                }).catch(function (error) {
                    console.log(error);
                });
        
        window.location = './votoDiputado.html'
        },
        
    },
    mounted() {
        this.cargarDatos();
    }
    
});

var vueVotoDiputados= new Vue({
    el: "#AdminVotoDiputado",
    data:{
        diputados:[],
        diputadoVotado:[],
        diputadoSelected:0,
        partidoSelected:0,
        partidos:{
            ni:0,
            arena:0,
            fmln:0,
            gana:0,
            pdc:0,
        },
        mostrarPartidos:true,
        voto:{
            "idUsuario":{
                "idUsuario":0
            },
            "votos": 1, 
        },
        usuarioMod:{"idUsuario":sessionStorage.getItem("usuarioNo"),
                    "estadoVoto": true },
        cantidadVotosRestantes:0,
        contadorVotos:0,
    },
    
    methods:{
        //METODO PARA MOSTRAR EL MODAL AGREGAR
        mostrarModal:function(){
            var contador = sessionStorage.getItem("userCantidad");
            this.cantidadVotosRestantes = contador - this.contadorVotos;
            document.getElementById('idCantidadVotosRestantes').innerText = "VOTOS RESTANTES: "+ this.cantidadVotosRestantes;
            $('#modalVotar').modal('show');      
        },
        mostrarModalBandera:function(){
            $('#modalVotarBandera').modal('show');      
        },
    
        //Obtiene datos
        cargarDatos: function () {
            
            axios.get('http://localhost:8080/votosCandidatos/findDiputadosDepartamento/'+sessionStorage.getItem("userDep")).then((response) => {
                  this.diputados = response.data;
            
                     for (var i = 0 in this.diputados) {
                        if(this.diputados[i].idPartido.idPartido==1){
                            this.partidos.ni=1;
                        }
                        if(this.diputados[i].idPartido.idPartido==2){
                            this.partidos.arena=1;

                        }
                        if(this.diputados[i].idPartido.idPartido==3){
                            this.partidos.fmln=1;
                        }
                        if(this.diputados[i].idPartido.idPartido==4){
                            this.partidos.gana=1;
                        }
                        if(this.diputados[i].idPartido.idPartido==5){
                            this.partidos.pdc=1;
                        }
                        for (var j=0 in this.diputadoVotado){
                            if(this.diputadoVotado[j]==this.diputados[i].idUsuario.idUsuario){
                            this.diputados.splice(i, 1);
                            }
                        }
                    }
                  }).catch((e) => {
                  console.log(e);
                });
        },
    
      
        votar:function(){
             $('#modalVotar').modal('hide');
             $('#modalVotarBandera').modal('hide');
             //VOTO POR BANDERA
             //MODIFICA EL VOTO A +1 A TODOS LOS REGISTROS DONDE 
             //EL IDPARTIDO SEA IGUA AL ID DE LA BANDERA SELECCIONADA
             if(this.partidoSelected != 0 ){
                 console.log("Voto por partido #",this.partidoSelected);
                 for (var i=0 in this.diputados){
                     if(this.diputados[i].idPartido.idPartido==this.partidoSelected){
                            this.voto.idUsuario.idUsuario=this.diputados[i].idUsuario.idUsuario;
                            axios.put('http://localhost:8080/votosCandidatos/actualizarvotos',this.voto).then(function (res) {
                                console.log("VOTO DPUTADO");
                            }).catch(function (error) {
                                console.log(error);
                            });
                     }                     
                 }
                 this.partidoSelected=0; 
                 
                 //MODIFICA EL CAMPO DE ESTADO DE VOTO A TRUE DEL USUARIO VOTANTE 
                 axios.put('http://localhost:8080/usuario/checkvoto',this.usuarioMod).then(function (res) {
                                console.log("MOOD");
                            }).catch(function (error) {
                                console.log(error);
                            });
                 
                sessionStorage.setItem("userVoto", 1);
                window.location = './estadisticas.html'
             }
             //VOTO POR ROSTRO 
             //EL USUARIO TIENE QUE VOTAR POR CADA CANDIDATO HASTA QUE SE HALLAN CUMPLIDO
             //EL NUMERO DE VOTOS POR DIPUTADO QUE SE EXIGEN EN EL DEPARTAMENTO DEL VOTANTE
             else{
                 console.log("rostro"); 
                 this.mostrarPartidos=false;
                 
                 if(this.cantidadVotosRestantes > 1){
                     for(var i=0 in this.diputados){
                         if(this.diputados[i].idUsuario.idUsuario == this.diputados[this.diputadoSelected].idUsuario.idUsuario){
                             this.diputadoVotado.push(this.diputados[this.diputadoSelected].idUsuario.idUsuario);
                         }
                     }
                     
                     this.voto.idUsuario.idUsuario=this.diputados[this.diputadoSelected].idUsuario.idUsuario;
                     axios.put('http://localhost:8080/votosCandidatos/actualizarvotos',this.voto).then(function (res) {
                                console.log("VOTO DPUTADO");
                     }).catch(function (error) {
                                console.log(error);
                     });
                     
                     this.contadorVotos = this.contadorVotos + 1;
                 }else{
                     
                     //MODIFICA EL CAMPO DE ESTADO DE VOTO A TRUE DEL USUARIO VOTANTE 
                     axios.put('http://localhost:8080/usuario/checkvoto',this.usuarioMod).then(function (res) {
                                console.log("MOOD");
                            }).catch(function (error) {
                                console.log(error);
                            });
                    sessionStorage.setItem("userVoto", 1);
                    window.location = './estadisticas.html'
                 }
             }
             this.cargarDatos();
        },
            
    },
    mounted() {
        this.cargarDatos();
    }
});