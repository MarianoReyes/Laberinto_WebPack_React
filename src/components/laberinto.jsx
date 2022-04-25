import {useEffect, useState, useCallback} from 'react'
import Jugador from './jugador.jsx'
import pared from '../../public/img/pared.png'
import columna from '../../public/img/columna.png'
import trofeo from '../../public/img/trofeo.png'
import audio from '../../public/audio/cancion.mp3'

const Laberinto = ({setGano}) => {

    const sound = new Audio(audio)
    const [laberinto, setLaberinto] = useState([])
    const [estadojug, setEstadoP] = useState('descanso')
    const [altura, setAltura] = useState(4)
    const [ancho, setAncho] = useState(4)
    let victoria = false

    //funcion encarga de realizar el fetch del laberinto con parametros incluidos
    const fetchLaberinto = async () => {
        
        let fet = "https://maze.juanelcaballo.club/?type=json&w="+ancho+"&h="+altura
        
        const response = await fetch(fet)
            .then((response) => { return response.json() }
            ).then((responseInJSON) => { return responseInJSON })

        setLaberinto([...response])
    
    }


    //movimiento del jugador
    const getlistener = useCallback ((event) => {

        if(victoria==false){  
            const tecla = event.key;
            setLaberinto((oldState)=>{

                let posY = oldState.findIndex((row) => row.indexOf('p') > -1)
                let posX = oldState[posY].indexOf('p')

                const newLaberinto = [...oldState]

                switch (tecla) {
                    case "ArrowUp":
                    case "w":
                        setEstadoP('arriba')
                        if(newLaberinto[posY-1][posX] === ' '){
                            newLaberinto[posY][posX] = " "
                            newLaberinto[posY-1][posX] = 'p'
                            posY = posY-1
                            return newLaberinto
                        }else if(newLaberinto[posY-1][posX] === 'g'){
                            newLaberinto[posY][posX] = " "
                            newLaberinto[posY-1][posX] = 'p'
                            posY = posY-1
                            setEstadoP('gano')
                            victoria = true
                            setTimeout(() => {sound.pause(); setGano(true)}, 2000)                           
                        }
                        break;
                    case "ArrowDown":
                    case "s":
                        setEstadoP('abajo')
                        if(newLaberinto[posY+1][posX] === ' '){
                            newLaberinto[posY][posX] = " "
                            newLaberinto[posY+1][posX] = 'p'
                            posY = posY+1
                            return newLaberinto
                        }else if(newLaberinto[posY+1][posX] === 'g'){
                            newLaberinto[posY][posX] = " "
                            newLaberinto[posY+1][posX] = 'p'
                            posY = posY+1
                            setEstadoP('gano')
                            victoria = true
                            setTimeout(() => {sound.pause(); setGano(true);}, 2000)                           
                        }
                        break;
                    case "ArrowLeft":
                    case "a":
                        setEstadoP('izquierda')
                        if(newLaberinto[posY][posX-1] === ' '){
                            newLaberinto[posY][posX] = " "
                            newLaberinto[posY][posX-1] = 'p'
                            posX = posX-1
                            return newLaberinto
                            
                        }else if(newLaberinto[posY][posX-1] === 'g'){
                            newLaberinto[posY][posX] = " "
                            newLaberinto[posY][posX-1] = 'p'
                            posX = posX-1
                            setEstadoP('gano')
                            victoria = true
                            setTimeout(() => {sound.pause(); setGano(true)}, 2000)                            
                        }                       
                        break;
                    case "ArrowRight":
                    case "d":
                        setEstadoP('derecha')
                        if(newLaberinto[posY][posX+1] === ' '){
                            newLaberinto[posY][posX] = " "
                            newLaberinto[posY][posX+1] = 'p'
                            posX = posX+1
                            return newLaberinto
                        }else if(newLaberinto[posY][posX+1] === 'g'){
                            newLaberinto[posY][posX] = " "
                            newLaberinto[posY][posX+1] = 'p'
                            posX = posX+1
                            setEstadoP('gano')
                            victoria = true
                            setTimeout(() => {sound.pause(); setGano(true)}, 2000)                  
                        }
                        break;                 
                }
                return newLaberinto
            })
        }
        
    }, [])

    //inicio del laberinto
    useEffect( () => {
        fetchLaberinto()
        document.addEventListener("keydown",  getlistener) 
        sound.play()
        sound.loop = true
        sound.volume = 0.2
    }, [])

    //pagina de laberinto
    return (
        <div css = {{
            width: '100%',
            height: '100%',
            backgroundColor: '#0BCD45',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            }}>
            
            <div css ={{ color: 'white', textAlign: 'center', width: '100%', display:'flex', flexGrow: '1',}}>
                <div css ={{ color: 'white', textAlign: 'center', width: '100%', }}>
                    <h1 css={{fontFamily: 'cursive'}}>Maze of Zelda</h1>
                </div>

                <div css = {{display: 'flex', flexDirection: 'column', justifyContent: 'center',}}>
                    <h6 css={{fontFamily: 'cursive',margin:'0px'}}>Tamaño del Laberinto</h6>
                    <input css={{color:'#fff', margin: '5px', backgroundColor: '#0BE345', border: '0px', borderRadius: '5px'}} placeholder={'Altura'} onChange={(e) => setAltura(e.target.value)} value={altura}></input>
                    <input css={{color:'#fff', margin: '5px', backgroundColor: '#0BE345', border: '0px', borderRadius: '5px'}} placeholder={'Ancho'} onChange={(e) => setAncho(e.target.value)} value={ancho}></input>
                    <button css ={{backgroundColor:'#0BCD45',color:'#fff',padding:'5px 10px',borderRadius:'10px',border:'2px solid white'}} onClick={()=>{ fetchLaberinto()}}>Actualizar</button>
                    
                </div>
            </div>
            
            <div css ={{
                display: 'inline-block',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent:'center',
                width: '90vw',
                height: 'auto',
                backgroundColor: '#0BE345',
                padding: '20px',
                overflowY: 'scroll',
                overflowX: 'hidden',
                flexGrow: '4',
                margin: '20px 0'
            }}>
                
            {
                //construccion del laberinto con imagenes en lugar de simbolos, al igual que la meta y el jugador
                laberinto.map((row, fila) => {
                        
                    return (
                        <div css= {{display: 'flex',flexDirection: 'row',justifyContent: 'center'}} key={fila}>
                        {
                            row.map((element, col) => {


                                if(element === '-' || element === '|' ){
                                    
                                    return (
                                        <div css = {{backgroundImage: `url(${pared})`, height: '40px', width: '40px', backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}} key={col}/>
                                    )
                                    
                                }if(element === '+'){
                                    
                                    return (
                                        <div css = {{backgroundImage: `url(${columna})`, height: '40px', width: '40px', backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}} key={col}/>
                                    )
                                    
                                }if(element === 'p'){
                                    
                                    return (
                                        <Jugador estado={estadojug} key={'jugador'}/>
                                    )
                                }if(element === 'g'){
                                    
                                    return (
                                        <div css = {{backgroundImage: `url(${trofeo})`, height: '40px', width: '40px', backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}} key={col}/>
                                    )
                                }
                                else{
                                    return (
                                        <div css = {{ height: '40px', width: '40px', border: '10px'}} key={col}/>
                                    )
                                }
                                
                            })
                        }
                        </div>
                        
                    )
                    
                })

            }

            </div>

            
            
        </div>
    )
}

export default Laberinto