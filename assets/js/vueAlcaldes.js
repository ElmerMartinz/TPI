var vueAlcaldes= new Vue({
    el: "#AdminAlcaldes",
    data:{
        alerta:{
          titulo: "Error",
          mensaje:"Texto"
        },
        textoBusqueda:"",        
        textoBusquedaUser:"",
        alcaldeSelected: 0,
        numeroMun:1,
        numeroDep:1,
        usuarioSelected:0,
        partidoEncontrado:false,
        nuevoCandidato:{
            "idUsuario":{
                "idUsuario":1
            },
            "votos": 0,
            "idCargo": {
                "idCargo": 2
            },
            "idPartido": {
                "idPartido": 1
            },
        },
        usuarios:[],
        partidos:[],
        alcaldes:[],
    },
    methods:{
        //METODO PARA BUSCAR USUARIOS DENTRO DE LA TABLA 
        buscar:function(x){
            
            if(this.textoBusqueda=="")
                return true;
                    
            var cad=this.alcaldes[x].idUsuario.nombres + 
                this.alcaldes[x].idUsuario.apellidos +
                this.alcaldes[x].idUsuario.dui +
                this.alcaldes[x].idPartido.nombre;
            cad=cad.toUpperCase();
            
            if(cad.indexOf(this.textoBusqueda.toUpperCase())>=0)
                        return true;
            else
                return false;  
        },
        buscarU:function(x){
            
            if(this.textoBusquedaUser=="")
                return true;
                    
            var cad=this.usuarios[x].nombres + 
                this.usuarios[x].apellidos +
                this.usuarios[x].dui +
                this.usuarios[x].idMunicipio.municipio +
                this.usuarios[x].idMunicipio.idDepartamento.departamento;
            cad=cad.toUpperCase();
            
            if(cad.indexOf(this.textoBusquedaUser.toUpperCase())>=0)
                        return true;
            else
                return false;  
        },
       //METODO PARA MOSTRAR EL MODAL AGREGAR
        mostrarAgregar:function(){
            $('#modalAgregar').modal('show');
        },
        mostrarAgregar1:function(){
            $('#modalAgregar1').modal('show');
        },
        //Obtiene datos
        cargarDatos: function () {
            axios.get('http://localhost:8080/usuario/sin-cargo').then((response) => {
              this.usuarios = response.data;
            })
            .catch((e) => {
              console.log(e);
            });
            axios.get('http://localhost:8080/partidos/findAll').then((response) => {
              this.partidos = response.data;
            })
            .catch((e) => {
              console.log(e);
            });
            axios.get('http://localhost:8080/votosCandidatos/findAlcaldesMunicipio/'+this.numeroMun).then((response) => {
              this.alcaldes = response.data;
            })
            .catch((e) => {
              console.log(e);
            });
       },
        //CREAR CANDIDATO
        crear:function(){
            var partidoEncontrado=false;
            for (var i=0 in this.alcaldes){
                if(this.nuevoCandidato.idPartido.idPartido != this.alcaldes[i].idPartido.idPartido){
                    this.partidoEncontrado=false;
                }else{
                    this.partidoEncontrado=true;
                    console.log(this.alcaldes[i].idPartido.nombres);
                    break;
                }
            }
            if(this.partidoEncontrado == true){
                this.mostrarAlerta("ERROR","ya hay un candidato registrado con ese partido!");
             }else {
                this.nuevoCandidato.idUsuario.idUsuario=this.usuarios[this.usuarioSelected].idUsuario;
                console.log(this.nuevoCandidato.idUsuario.idUsuario);
                console.log(this.nuevoCandidato.votos);
                console.log(this.nuevoCandidato.idCargo.idCargo);
                console.log(this.nuevoCandidato.idPartido.idPartido);

                axios.post('http://localhost:8080/votosCandidatos/crearVotoscandidatos',this.nuevoCandidato)
                    .then(function (res) {
                        vueAlcaldes.cargarDatos();
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    });
                $('#modalAgregar').modal('hide');
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
         //CREAR CANDIDATO
        prueba:function(){
            
        },
        
    },
        
    mounted() {
    this.cargarDatos();
    }

});