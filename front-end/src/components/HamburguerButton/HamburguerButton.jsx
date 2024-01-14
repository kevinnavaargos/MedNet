import { useState } from "react";
import './HamburguerButton.scss';

// type buttonTypes = {
//   showNav:boolean;
//   setShowNav:(value: boolean | ((prevVar: boolean) => boolean)) => void;
// }
function HamburguerButton({animateNav,showNav,setShowNav}){

  const [noAnimation,setNoAnimation] = useState(false);

  const changeButtonState = () =>{
    animateNav(true)
    setNoAnimation(true)
    setShowNav(!showNav);
  }

  return(
    <button onClick={changeButtonState} type="button" tabIndex={0} className="button-hamburguer flex lg:hidden" aria-label="open menu">
        <span className={`line-1 ${noAnimation ? '' : 'no-animation'} animated ${showNav && 'animation-1'}`}></span>
        <span className={`line-2 ${noAnimation ? '' : 'no-animation'} animated ${showNav && 'animation-2'}`}></span>
        <span className={`line-3 ${noAnimation ? '' : 'no-animation'} animated ${showNav && 'animation-3'}`}></span>
    </button>
  )
}

export {HamburguerButton};
