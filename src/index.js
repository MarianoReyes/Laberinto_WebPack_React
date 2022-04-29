import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Laberinto from './components/laberinto.jsx';
import Title from '../public/img/start.png';
import victoria from '../public/img/victoria.png';

function App() {
  const [jugar, setJugar] = useState(false);
  const [gano, setGano] = useState(false);

  return (
    <div css={{
      width: '100vw',
      height: '100vh',

    }}
    >
      {
    // se revisan condiciones si se gano, si se empieza a jugar o volver al inicio
    gano
      ? (
        <div css={{
          width: '100%%',
          height: '100%',
          backgroundColor: '#0BE345',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <img alt="" css={{ width: '300px', marginBottom: '20px' }} src={victoria} />
          <button
            css={{
              backgroundColor: '#0BCD45', color: '#fff', padding: '5px 10px', borderRadius: '10px', border: '2px solid white',
            }}
            onClick={() => { setGano(!gano); setJugar(!jugar); }}
          >
            Regresar al Inicio
          </button>
        </div>
      )
      : jugar
        ? (
          <div css={{
            height: '100vh',
            width: '100vw',
          }}
          >
            <Laberinto setGano={setGano} gano={gano} />
          </div>
        )
        : (
          <div css={{
            width: '100%%',
            height: '100%',
            backgroundColor: '#0BE345',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
            <button onClick={() => { setJugar(!jugar); }} css={{ backgroundColor: 'transparent', border: 'none' }} aria-label="Save"><img alt="" css={{ width: '300px' }} src={Title} /></button>
          </div>
        )
    }

    </div>
  );
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App tab="home" />);
