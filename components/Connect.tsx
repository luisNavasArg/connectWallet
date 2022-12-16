import styles from '../styles/Home.module.css'
export default function Connect({login}:any) {
    return (
        <div>
            <button onClick={login} className={styles.boton} >Conectar la billetera</button>
        </div>
    )
}