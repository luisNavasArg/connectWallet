import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/Home.module.css'
const Question = ({data, onAnswerUpdate, numberOfQuestions, activeQuestion, onSetActiveQuestion, onSetScreen,time }:any) => {
  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');
  const radiosWrapper:any = useRef();
  useEffect(() => {
    const findCheckedInput = radiosWrapper.current.querySelector('input:checked');    
    if(findCheckedInput) {
      findCheckedInput.checked = false;
    }
  }, [data]);

  const changeHandler = (e:any) => {    
    setSelected(e.target.value);
    if(error) {
      setError('');
    }
  }
  const nextClickHandler = (e:any) => {
    if(selected === '') {
      onAnswerUpdate((prevState: any) => [...prevState, { q: null, a: null }]);
    setSelected('');
      return;
    }
    onAnswerUpdate((prevState: any) => [...prevState, { q: data.question, a: selected }]);
    setSelected('');
    if(activeQuestion < numberOfQuestions - 1) {

      onSetActiveQuestion(activeQuestion + 1);
    }else {
      onSetScreen(3);
    }
  }
  return(
    <div className="card">
      <div className="card-content">
        <div className="content">
        
        <img src={data.image} width={150} />
          <h5 className={styles.question}>{data.question}</h5>
          <p>Tiempo para responder: {data.lifetimeSeconds}</p>
          <p>Tiempo transcurrido: {time}</p>
          <div className="control" ref={radiosWrapper}>
             {data.options.map((option:any,i:number)=>{
              return <label className={styles.check} key={i}>
                <input  type={'radio'} name={'answer'} value={option.text} onChange={changeHandler}/>
                {option.text}
              </label>
             })}
          </div>
          {error && <div className="has-text-danger">{error}</div>}
          <button className={styles.boton} onClick={nextClickHandler}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default Question;