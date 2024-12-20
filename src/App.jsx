import { useState } from 'react'
import { useEffect } from 'react';
import Header from './components/Header'
import Filtros from './components/Filtros';
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import { generarId } from './helpers';
import IconoNuevoGasto from './img/nuevo-gasto.svg'



function App() {

  //state para gastos
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [gastoEditar, setGastoEditar] = useState({})//state para pasar la info al modal y poder editat

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  
  

  //useeffect escuchando cambios que sucedan con el state gastoEditar
  useEffect(()=>{
    if(Object.keys(gastoEditar).length > 0){
      setModal(true)

    setTimeout(()=>{
      setAnimarModal(true)
    }, 500);
    }
  }, [gastoEditar]);


    //LocalStorage para cuando cambie presupuesto
      useEffect(()=>{
        localStorage.setItem('presupuesto', presupuesto ?? 0);
        }, [presupuesto])

    //LocalStorage para gastos  

    useEffect(()=>{
      localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
      }, [gastos])
      

    // useEffect para que escuche los cambios que pasan en filtros

    useEffect(()=>{
    if(filtro){
      //Filtrar por categoria
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro);
      setGastosFiltrados(gastosFiltrados)
    }
    }, [filtro])

      //Este para presupuesto pero que se ejecute una unia vez cuando se cargue la aplicaciob
      useEffect(() => {
      const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    
      if(presupuestoLS > 0 ) {
        setIsValidPresupuesto(true)
      }
      }, []);


  //Gasto Nuevo------------------------------

  const handleNuevoGasto = (() =>{
    setModal(true)
  
    setGastoEditar({})//esta linea es para limpiar el formualrio despues de editar un gasto

    setTimeout(()=>{
      setAnimarModal(true)
    }, 500);
  })

//Guardar gasto------------------------------

  const guardarGasto = gasto=>{
  if(gasto.id){
    //actualizar
    const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
    setGastos(gastosActualizados)
    setGastoEditar({})

  }else{
    //nuevo gasto
    gasto.id = generarId();
    gasto.fecha = Date.now();
     setGastos([...gastos, gasto])
  }
     setAnimarModal(false)//cerrar el modal despues de agregar el gasto
     setTimeout(()=>{
         setModal(false)
     }, 500)
  }

  //Eliminar gasto

  const eliminarGasto = id=>{
    const gastosActualizados = gastos.filter(gasto =>gasto.id !== id);
    setGastos(gastosActualizados)
  }

  return (
 
   <div className={modal ? 'fijar' : ''}>
    <Header
    gastos = {gastos}
    setGastos = {setGastos}
    presupuesto = {presupuesto}
    setPresupuesto = {setPresupuesto}
    isValidPresupuesto = {isValidPresupuesto}
    setIsValidPresupuesto = {setIsValidPresupuesto}
    
    />

    {isValidPresupuesto && (
      <>
      <main>
       <Filtros 
       filtro = {filtro}
       setFiltro = {setFiltro}
       /> 
        <ListadoGastos
        gastos = {gastos}
        setGastoEditar = {setGastoEditar}
        eliminarGasto = {eliminarGasto}
        filtro={filtro}
        gastosFiltrados={gastosFiltrados}
        />  
        </main>
        <div className='nuevo-gasto'>
        <img src={IconoNuevoGasto} 
        alt="icono nuevo gasto" 
        title='Agregar gasto'
        onClick={handleNuevoGasto}/>
        </div>

      </>
    ) 
    
    }

    {modal && 
    <Modal
    setModal = {setModal}
    animarModal = {animarModal}
    setAnimarModal = {setAnimarModal}
    guardarGasto = {guardarGasto}
    gastoEditar = {gastoEditar}
    setGastoEditar = {setGastoEditar}
    /> }

   </div>

  )
}

export default App
