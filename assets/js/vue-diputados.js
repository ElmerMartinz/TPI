var vuePresidentes= new Vue({
    el: "#AdminDiputados",
    data:{
        textoBusqueda:"",
        diputadoSelected: 0,
        diputados:[   
 {
    "idDiputado": 1,
    "nombre": "D1",
    "apellido": "H.",
    "sexo":"m",
    "partido":{
        idPartido:1,
        nombre:"ARENA",
    },
    "fechaNac":"2008/11/28",
    "dui":00000001,
  },
{
    "idDiputado": 2,
    "nombre": "D2",
    "apellido": "H.",
    "sexo":"f",
    "partido":{
        idPartido:2,
        nombre:"CD",
    },
    "fechaNac":"2008/11/28",
    "dui":00000002,
  },
{
    "idDiputado": 3,
    "nombre": "D3",
    "apellido": "H.",
    "sexo":"m",
    "partido":{
        idPartido:3,
        nombre:"FMLN",
    },
    "fechaNac":"2008/11/28",
    "dui":00000001,
  },
{
    "idDiputado": 4,
    "nombre": "D4N",
    "apellido": "H.",
    "sexo":"f",
    "partido":{
        idPartido:4,
        nombre:"GANA",
    },
    "fechaNac":"2008/11/28",
    "dui":00000002,
  },
{
    "idiputado": 5,
    "nombre": "D5",
    "apellido": "H.",
    "sexo":"m",
    "partido":{
        idPartido:5,
        nombre:"NI",
    },
    "fechaNac":"2008/11/28",
    "dui":00000001,
  },
{
    "idDiputado": 6,
    "nombre": "Nayib",
    "apellido": "H.",
    "sexo":"f",
    "partido":{
        idPartido:6,
        nombre:"PCN",
    },
    "fechaNac":"2008/11/28",
    "dui":00000002,
  },
        ],
    },
    methods:{
        //METODO PARA BUSCAR USUARIOS DENTRO DE LA TABLA 
        buscar:function(x){
            
            if(this.textoBusqueda=="")
                return true;
                    
            var cad=this.diputados[x].nombre + 
                this.diputados[x].apellido +
                this.diputados[x].dui +
                this.diputados[x].partido.nombre;
            cad=cad.toUpperCase();
            
            if(cad.indexOf(this.textoBusqueda.toUpperCase())>=0)
                        return true;
            else
                return false;  
        },
        
        //METODO PARA MOSTRAR EL MODAL AGREGAR
        mostrarAgregar:function(){
            $('#modalAgregar').modal('show');
        },
        //METODO PARA MOSTRAR EL MODAL MODIFICAR
        mostrarModificar:function(){
            $('#modalModificar').modal('show');
        },
        //METODO PARA MOSTRAR EL MODAL ELIMINAR
        mostrarEliminar:function(){
            $('#modalEliminar').modal('show');
        },
    },

});