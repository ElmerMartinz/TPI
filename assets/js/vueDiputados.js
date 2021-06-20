var vueDiputados= new Vue({
    el: "#adminDiputados",
    data:{
        alerta:{
          titulo: "Error",
          mensaje:"Texto"
        },
        textoBusqueda:"",
        textoBusquedaUser:"",
        diputadoSelected: 0,
        diputados:[],
        usuarios:[],
        partidos:[],
        usuarioSelected:0,
        numeroDep:1,
        cantidadDiputadosDisponibles:0,
        nuevoCandidato:{
            "idUsuario":{
                "idUsuario":1
            },
            "votos": 0,
            "idCargo": {
                "idCargo": 3
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
                    
            var cad=this.diputados[x].idUsuario.nombres + 
                this.diputados[x].idUsuario.apellidos +
                this.diputados[x].idUsuario.dui +
                this.diputados[x].idPartido.nombre +
                this.diputados[x].idMunicipio.municipio;
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
            $('#modalAgregar1').modal('hide');
            $('#modalAgregar').modal('show');
        },
        mostrarAgregar1:function(){
            this.mostrarCantidadDiputados();
             $('#modalAgregar').modal('hide');
            document.getElementById('idHeaderDep').innerText = this.usuarios[this.usuarioSelected].idMunicipio.idDepartamento.departamento;
            $('#modalAgregar1').modal('show');
        },
        
        //mostrarCantidad de diputados de dicho partido
        mostrarCantidadDiputados: function(){
            var contador=0;
            for (var i=0 in this.diputados){
                if(this.diputados[i].idPartido.idPartido == this.nuevoCandidato.idPartido.idPartido){
                    contador = contador + 1;
                }
            }
            console.log(contador);
            this.cantidadDiputadosDisponibles = this.usuarios[this.usuarioSelected].idMunicipio.idDepartamento.cantidadDiputados - contador;
            document.getElementById('cantidadDiputadosDep').innerText = 'No de Candidatos disponibles en este Partido: '+this.cantidadDiputadosDisponibles;    
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
        crear:function(){
            
            if(this.cantidadDiputadosDisponibles == 0 ){
                 this.mostrarAlerta("ERROR","Ya esta completo el No de Candidatos para dicho partido!");
            } else{
                
                this.nuevoCandidato.idUsuario.idUsuario=this.usuarios[this.usuarioSelected].idUsuario;
                console.log(this.nuevoCandidato.idUsuario.idUsuario);
                console.log(this.nuevoCandidato.votos);
                console.log(this.nuevoCandidato.idCargo.idCargo);
                console.log(this.nuevoCandidato.idPartido.idPartido);

                axios.post('http://localhost:8080/votosCandidatos/crearVotoscandidatos',this.nuevoCandidato)
                    .then(function (res) {
                        vuePresidente.nuevoCandidato.idPartido.idPartido=1;
                        vuePresidente.nuevoCandidato.idUsuario.idUsuario=1;
                        vuePresidente.cargarDatos();
                     console.log("creado");
                        
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    });
                $('#modalAgregar1').modal('hide');
               }
        },
        //Obtiene datos
        cargarDatos: function () {
          axios.get('http://localhost:8080/votosCandidatos/findDiputadosDepartamento/'+this.numeroDep).then((response) => {
              this.diputados = response.data;
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