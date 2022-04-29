import React, { useState, useEffect } from 'react';
import arriba from '../../public/img/arriba.png';
import abajo from '../../public/img/abajo.png';
import derecha from '../../public/img/derecha.png';
import izquierda from '../../public/img/izquierda.png';
import descanso from '../../public/img/descanso.png';
import gano from '../../public/img/gano.png';

function Jugador({ estado }) {
  const [animacion, setAnimacion] = useState(null);
  // logica para determinar la animacion del personaje
  useEffect(() => {
    if (estado === 'descanso') {
      setAnimacion(descanso);
    } else if (estado === 'arriba') {
      setAnimacion(arriba);
    } else if (estado === 'abajo') {
      setAnimacion(abajo);
    } else if (estado === 'derecha') {
      setAnimacion(derecha);
    } else if (estado === 'izquierda') {
      setAnimacion(izquierda);
    } else if (estado === 'gano') {
      setAnimacion(gano);
    }
  }, [estado]);

  // retornamos la animacion del jugador
  return (
    <div css={{
      backgroundImage: `url(${animacion})`,
      height: '40px',
      width: '40px',
      backgroundSize: 'cover',
    }}
    />
  );
}

export default Jugador;
