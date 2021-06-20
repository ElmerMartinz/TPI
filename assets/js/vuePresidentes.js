var vuePresidente= new Vue({
    el: "#adminPresidentes",
    data:{
        alerta:{
          titulo: "Error",
          mensaje:"Texto"
        },
        textoBusqueda:"",
        textoBusquedaUser:"",
        presidenteSelected: 0,
        presidentes:[],
        usuarios:[],
        partidos:[],
        usuarioSelected:0,
        nuevoCandidato:{
            "idUsuario":{
                "idUsuario":1
            },
            "votos": 0,
            "idCargo": {
                "idCargo": 1
            },
            "idPartido": {
                "idPartido": 1
            },
        },
    },
    methods:{
        //METODO PARA BUSCAR USUARIOS DENTRO DE LA TABLA 
        buscar:function(x){
            
            if(this.textoBusqueda=="")
                return true;
                    
            var cad=this.presidentes[x].idUsuario.nombres + 
                this.presidentes[x].idUsuario.apellidos +
                this.presidentes[x].idUsuario.dui +
                this.presidentes[x].idPartido.nombre;
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
        //CREAR CANDIDATO
        crear:function(){
            var partidoEncontrado=false;
            for (var i=0 in this.presidentes){
                if(this.nuevoCandidato.idPartido.idPartido != this.presidentes[i].idPartido.idPartido){
                    this.partidoEncontrado=false;
                }else{
                    this.partidoEncontrado=true;
                    console.log(this.presidentes[i].idPartido.nombres);
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
                        vuePresidente.cargarDatos();
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
        //Obtiene datos
        cargarDatos: function () {
          axios.get('http://localhost:8080/votosCandidatos/findPresidentes').then((response) => {
              this.presidentes = response.data;
            })
            .catch((e) => {
              console.log(e);
            });
            
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

        },
        
    },
    mounted() {
    this.cargarDatos();
    }
});