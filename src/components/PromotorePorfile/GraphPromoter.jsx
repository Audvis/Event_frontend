import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import Loading from '../Loading/Loading'
import styles from './GraphPromoter.css'
import { getTickets } from '../../actions/actions'


function GraphPromoter({ events }) {
  const id = events.id
  const [render, setRender] = useState(false)
  const dispatch = useDispatch()
  const grafica = useSelector(state => state.grafica)
console.log('GRAFICAAAA: ',grafica)
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getTickets(id))
        setRender(true)
      } catch (error) {
        alert('Algo salio mal al cargar este evento.')
      }
    }
    fetchData()
  }, [id]);

  if (render) {
    let datoss = grafica.map((e) => e.totalVenta)
    let numeroPrecio = [];
    if (datoss.length > 0) {
      for (let index = 0; index < datoss.length; index++) {
        numeroPrecio.push(parseFloat(datoss[index]))
      }
    }
    let etiquetas = grafica.map((e) => e.nameEvent)

    if (numeroPrecio.length > 0) {
      let datas1 = numeroPrecio?.reduce((a) => a);
    }

    const datas = {
      labels: etiquetas,
      datasets: [
        {
          legend: {
            display: false
          },
          label: 'Ventas ',
          backgroundColor: '#194358',
          borderColor: '#00171f',
          borderWidth: 1,
          hoverBackgroundColor: '#00b4d8',
          hoverBorderColor: '#f1f1f1',
          data: numeroPrecio,
          maintainAspectRatio: false,
          fontColor: '#00b4d8',
        }
      ]
    };
    const options = {
      responsive:false,
      maintainAspectRatio: false,
    }
    return (
      <div className='graphpromoter'>
        <h2 className='prueba'>Ventas</h2>
          <Bar data={datas} options={options} width='1000px' height='400px' />
      </div>
    );
  }
  else {
    return (<Loading />)
  }
}
export default GraphPromoter;
