import { useState } from 'react'
import { useEffect } from 'react'
import Mensaje from './Mensaje'
import CerrarBtn from '../img/cerrar.svg'


const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {

    //state para validacion
    const [mensaje, setMensaje] = useState('')

    //states para el foumulario de agregar gastos

    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('')


    //Effect para lleanr el modal con los gastos a editar
    useEffect(()=>{
      if(Object.keys(gastoEditar).length > 0){
        setNombre(gastoEditar.nombre)
        setCantidad(gastoEditar.cantidad)
        setCategoria(gastoEditar.categoria)
        setId(gastoEditar.id)
        setFecha(gastoEditar.fecha)
       } 
    },[]);

  

const ocultarModal = (()=>{
    
    setAnimarModal(false)
    setGastoEditar(false)

    setTimeout(()=>{
        setModal(false)
    }, 500)
})

const handleSubmit = ((e)=>{
    e.preventDefault();

    if([nombre, cantidad, categoria].includes('')){
        setMensaje('Todos los campos son obligatorios')

        setTimeout(()=>{
            setMensaje('')
        },1000)
        return;
    }

    guardarGasto({nombre, cantidad, categoria, id, fecha})
})

  return (
    <div className="modal">
      <div className="cerrar-modal">
          <img src={CerrarBtn} 
          alt="cerrar modal"
          onClick={ocultarModal} 
          />
          </div>

        <form onSubmit={handleSubmit} className={`formulario ${animarModal ? "animar" : 'cerrar'}`}>
            <legend>{gastoEditar.nombre ? 'Editar gasto' :'Nuevo gasto'}</legend>

            {mensaje && <Mensaje tipo="error">{mensaje} </Mensaje>}

            <div className='campo'>
            <label htmlFor="nombre">Nombre gasto:</label>   
            <input type="text" id='nombre'  placeholder='Añade el nombre del gasto' value={nombre}
            onChange={e => setNombre(e.target.value)}/> 
            </div>

            <div className='campo'>
            <label htmlFor="cantidad">Cantidad:</label>   
            <input type="number" id='cantidad'  placeholder='Añade la cantidad del gasto' value={cantidad}
            onChange={e => setCantidad(Number(e.target.value))}
            /> 
            </div>

            <div className='campo'>
            <label htmlFor="categoria">Categoria:</label> 

            <select id="categoria" value={categoria} onChange={e => setCategoria(e.target.value)}>

              <option value="">-- Seleccione --</option>
              <option value="ahorro">Ahorro</option>
              <option value="comida">Comida</option>
              <option value="casa">Casa</option>
              <option value="gastos">Gastos Varios</option>
              <option value="ocio">Ocio</option>
              <option value="salud">Salud</option>
              <option value="suscripciones">Suscripciones</option>

            </select>  
            
            </div>

            <input type="submit" value={gastoEditar.nombre ? 'Guardar cambios' :'Añadir gasto '}  />

        </form>

    </div>
  )
}

export default Modal
