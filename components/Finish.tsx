import React, { useEffect, useState } from 'react';

import { formatTime,getAverage } from '../utils';
import styles from '../styles/Home.module.css'
const Finish = ({hash,sendMessage, results, data,time }:any) => {
  const [average, setAverage]:any = useState({});
  const[btn,setBtn]=useState(true);
  const send=()=>{
    sendMessage(average)
    setBtn(false)
  }
  useEffect(() => {
    setAverage(getAverage(results));
  }, []);
  return(
    <div className="card">
      <div className="card-content">
        <div className="content">
          <div >
            <div className={styles.checked}><strong>Javascript</strong> {(average.jS*100/data.length).toFixed(2)} %</div>
            <div className={styles.checked}><strong>Java</strong> {(average.jv*100/data.length).toFixed(2)} %</div>
            <div className={styles.checked}><strong>C#</strong> {(average.jS*100/data.length).toFixed(2)} %</div>
            <div className={styles.checked}><strong>null</strong> {(average.nll*100/data.length).toFixed(2)} % </div>
            <ul>{results.map((r:any,i:number)=><li key={i.toString()}>{r.a}</li>)}</ul>  
            </div>
        </div>
        <p className={styles.time}>Tu tiempo total fue de: {formatTime(time)}</p>
        {btn?<button className={styles.boton} onClick={send}>Enviar resultados</button>:
        <>
        <p>Enviado con exito! </p><p>tu hash: {hash}</p></>

        }
      </div>
    </div>
  );
}

export default Finish;