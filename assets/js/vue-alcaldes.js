var vueAlcaldes= new Vue({
    el: "#AdminAlcaldes",
    data:{
        textoBusqueda:"",
        alcaldeSelected: 0,
        alcaldes:[   
 {
    "idAlcalde": 1,
    "nombre": "Shafick",
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
    "idAlcalde": 2,
    "nombre": "Nidia",
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
    "idAlcalde": 3,
    "nombre": "S",
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
    "idAlcalde": 4,
    "nombre": "N",
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
    "idAlcalde": 5,
    "nombre": "K",
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
    "idAlcalde": 6,
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
                    
            var cad=this.alcaldes[x].nombre + 
                this.alcaldes[x].apellido +
                this.alcaldes[x].dui +
                this.alcaldes[x].partido.nombre;
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