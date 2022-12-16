import Head from 'next/head'
import Image from 'next/image'
import { useState,useEffect } from 'react'
import styles from '../styles/Home.module.css'
import Start from '../components/Start'
import quizData from '../data/survey.json';
import Question from '../components/Question'
import Finish from "../components/Finish";
import Login from '../components/Connect'
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from "ethers";
let interval:any;

export default function Home() {
  const [screen, setScreen] = useState(0);
  const [time,setTime]=useState(0);
  const [answers, setAnswers]:any = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [loginState,setLoginState]=useState("");
  const [address,setAddress]=useState('');
  const [balance,setBalance]=useState('');
  const [error,setError]=useState('');
  const [msgError,setMsgError]=useState(0)
  const [hash,setHash]=useState('')
  const login=async()=>{
    // provider es una clase que proporciona una abstracción para una conexión a la red Ethereum. 
    // Proporciona acceso de solo lectura a Blockchain y su estado.  
    const provider = await detectEthereumProvider();
    let meta =provider?.isMetaMask
    console.log('es meta : ' + meta);
    //Paso 1 acceso a cuenta ethereum
    if (provider) {
      const provider2 = new ethers.providers.Web3Provider(window.ethereum);
    //Mostramos en la app que se está conectando a la wallet 
      setLoginState("Conectandose a la billetera...");
      //hacemos el request para capturar las cuentas
        await provider2.send("eth_requestAccounts",[]);
        // clase que (generalmente) de alguna manera directa o 
        // indirectamente tiene acceso a una clave privada, que puede firmar mensajes y 
        // transacciones para autorizar a la red a cargar su cuenta ether para realizar operaciones.

        const signer = provider2.getSigner();
        const walletAddr = await signer.getAddress();
        let saldo =await provider2.getBalance("ricmoo.eth");
        let saldoMostrar = ethers.utils.formatEther(saldo)
        console.log(saldoMostrar);
        
        setBalance(saldoMostrar.toString());
        setAddress(walletAddr);
        setScreen(1)
        setLoginState("Conectado a la billetera");
     

      provider2.on("block", (blockNumber) => {//se ejecuta cada vez que cambia de block
        console.log(blockNumber);
        return;
    })
      
      
    } else {
      setLoginState('Please install MetaMask!');
    }
    
  }
  const sendMessage =(data:object[])=>{  
    const value = {
      from: {
          name: 'Account 1',
          wallet: '0x4df6F1aa462f2d0696AE7f1B1228D9d9dCFE23Bf'
      },
      to: {
          name: 'Account 2',
          wallet: '0x55E5B738A12BF449dB001B8Cec4C33DA1eFaBD69'
      },
      contents: data
  };
    const prov = new ethers.providers.Web3Provider(window.ethereum);
    const signer = prov.getSigner();    
    signer.signMessage(JSON.stringify(data)).then(signature=>{
      let str=''
      for (let i = 0; i < 16; i++) {
        str+=signature[i]
      }
      setHash(str)
    })
    .catch(error=>{
      setMsgError(1);
      setError('Fue rechazada la transacción');
    }) 
    
  }
  useEffect(() => {
    if(screen === 3) {
      clearInterval(interval);
      console.log('listo terminado la encuesta');
    }
    
  }, [screen]);
  const quizStartHandler=()=>{
    setScreen(2);
    interval  = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Survey</title>
        <meta name="description" content="encuesta" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}></h1>
        <img src="lenguajes.png" width={200} className={styles.img}/>
        <p>Saldo: {Number(balance).toFixed(6)}</p>
        {screen === 0 && <Login login={login}/>}
        
        <h2>{loginState}</h2>
        {msgError === 1 && <p>{error}</p>}
        {screen === 1 && <>
          <h2>Mi billetera: <code>{address}</code></h2>
          
          <Start onQuizStart={quizStartHandler} />
        </>}
        {screen === 2 && <>
        <Question 
        data={quizData.data[activeQuestion]}
        onAnswerUpdate={setAnswers}
        numberOfQuestions={quizData.data.length}
        activeQuestion={activeQuestion}
        onSetActiveQuestion={setActiveQuestion}
        onSetScreen={setScreen}
        time={time}
      />
      </> }
             
        <div className={styles.grid}>
          {screen === 3 &&
          <>
          <Finish
          results={answers}
          data={quizData.data}
          time={time}
          sendMessage={sendMessage}
          hash={hash}
          />
          </>}
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href=""
          target="_blank"
          rel=""
        >
          Powered by {''}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Mi Logo" width={100} height={22} />
          </span>
        </a>
      </footer>
    </div>
  )
}
