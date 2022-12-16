import React from 'react';
import styles from '../styles/Home.module.css'
const Start = ({onQuizStart}:any ) => {
  return(
    <div className="card">
      <div className="card-content">
        <div className="content">
          <h1>Encuesta del día</h1>
          <p>¡Gracias por participar!</p>
          <button className={styles.boton} onClick={onQuizStart}>Comenzar</button>
        </div>
      </div>
    </div>
  );
}

export default Start;