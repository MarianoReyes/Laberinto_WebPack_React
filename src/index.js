import React from 'react'
import Laberinto from './components/laberinto.jsx'
import Title from '../public/img/start.png'
import victoria from '../public/img/victoria.png'

import { useState } from 'react'
import {createRoot} from 'react-dom/client'


const App = () => {

    const [jugar, setJugar] = useState(false)
    const [gano, setGano] = useState(false)

    return (
        <div css = {{
            width: '100vw',
            height: '100vh',

        }}>
            {
                //se revisan condiciones si se gano, si se empieza a jugar o volver al inicio
                gano ? 
                <div css = {{
                    width: '100%%',
                    height: '100%',
                    backgroundColor: '#0BE345',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems:'center'
                    }}>
                    <img css={{width:'300px', marginBottom:'20px'}} src={victoria}/>
                    <button css ={{backgroundColor:'#0BCD45',color:'#fff',padding:'5px 10px',borderRadius:'10px',border:'2px solid white'}} onClick={()=>{ setGano(!gano); setJugar(!jugar)}}>Regresar al Inicio</button>
                </div>
                :
                jugar ?
                <div css={{
                    height: '100vh',
                    width: '100vw'
                }}>
                    <Laberinto setGano={setGano} gano={gano}/>
                </div>
                :
                <div css = {{
                    width: '100%%',
                    height: '100%',
                    backgroundColor: '#0BE345',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems:'center'
                    }}>
                    <a onClick={()=>{ setJugar(!jugar)}}><img css={{width:'300px'}} src={Title}/></a>
                </div>
                
            }
            
            
        </div>
    )
}


const container = document.getElementById('app');
const root = createRoot(container)
root.render(<App tab="home" />)