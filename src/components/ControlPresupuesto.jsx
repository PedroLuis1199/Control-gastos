import { useState } from 'react'
import { useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({presupuesto, gastos, setGastos, setPresupuesto, setIsValidPresupuesto}) => {

    const [porcentaje, setPorcentaje] = useState(0)//state para grafica
    const [disponible, setDisponible] = useState(0)//states para calcualr presupuesto
    const [gastado, setGastado] = useState(0)




    //este effect es para saca el total gastado
    useEffect(()=>{
    const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0 );
    const totalDisponible = presupuesto - totalGastado;

    //Calcular porcentaje gastado
    const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);

    setDisponible(totalDisponible)//esta linea muestra en el span de disponible lo que se esta disponible
    setGastado(totalGastado)// esta linea muestra en el span de gastado lo que se ha gastado

    setTimeout(()=>{
    setPorcentaje(nuevoPorcentaje)
    }, 1500)

    },[gastos])

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
         })
    }

   const handleResetApp = ()=>{
    const resultado = confirm('¿Desea reinicair presupuesto y gastos?');

    if(resultado){
    setGastos([])
    setPresupuesto(0)
    setIsValidPresupuesto(false)
    }


   }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>

       <div>
        <CircularProgressbar
        styles= {buildStyles({
            pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
            textColor:porcentaje > 100 ? '#DC2626' : '#3B82F6'
       
        })}
        value={porcentaje}
        text={`${porcentaje}% Gastado`}
        />
       </div>

       <div className='contenido-presupuesto'>

           <button className='reset-app ' type='button' onClick={handleResetApp}>
               Resetear aplicacion
           </button>
           <p>
               <span>Presopuesto:</span> {formatearCantidad(presupuesto)}
           </p>

           <p className={`${disponible < 0 ? 'negativo' : ''}`}>
               <span>Disponible:</span> {formatearCantidad(disponible)}
           </p>

           <p>
               <span>Gastado:</span> {formatearCantidad(gastado)}
           </p>
       </div>


    </div>
  )
}

export default ControlPresupuesto
