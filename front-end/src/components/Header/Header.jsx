import React, { useState } from 'react';
import logo from '../../assets/images/MedNet.svg';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAsideEvent } from '../../redux/slices/appSlice';
import { IconButton, Tooltip } from '@material-ui/core/';
import { Settings, Notifications, ExitToApp, HomeRounded } from '@material-ui/icons/';
import { HamburguerButton } from '../HamburguerButton/HamburguerButton'
import Asideoption from '../AsideOption/Asideoption';
import { useSelector } from 'react-redux';

import './header.scss';
import useLogout from '../../hooks/useLogout';

function Header() {
  const [logout] = useLogout();
  const history = useHistory();
  const { userInfo } = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();

  const [showNav, setShowNav] = useState(false);
  const [navTransition, setNavTransition] = useState(false);

  const userData = useSelector(state => state.appEvents.userData);
  const options = ['Perfil', 'Historia', 'Consulta'];

  const navigator = {
    home: '/dashboard',
    info: `/user/health-data/${userInfo.id}`
  }

  function handleNav(path) {
    dispatch(setAsideEvent(''));
    history.push(navigator[path]);
  }

  return (
    <header>
      <img src={logo} alt='Medtools' />
      <div>
        <IconButton>
          <Notifications style={{ fontSize: '25px' }} />
        </IconButton>
        <HamburguerButton animateNav={setNavTransition} showNav={showNav} setShowNav={setShowNav} />
        <nav className={`${!showNav && 'closed'} ${navTransition && 'transition'}`}>
          {/* <button onClick={()=>{setShowNav(false)}}>cerrar nav</button> */}
          <div className="Menu">
            {options.map(option =>
              <Asideoption
                name={option}
                key={option}
                linkId={userData.id}
                setShowNav={setShowNav}
              />)
            }
          </div>

          {/* <span onClick={(e) => handleNav(e)} id="info">MI INFORMACION MEDICA</span> */}
          <div className="NavFooter">
            <IconButton onClick={() => handleNav('home')}>
            <HomeRounded style={{ fontSize: '25px', margin: '0px' }} />
            </IconButton>
            <IconButton>
            <Settings style={{ fontSize: '25px', margin: '0px' }} />
            </IconButton>
            <Tooltip title='Salir'>
            <IconButton onClick={logout} >
              <ExitToApp style={{ fontSize: '25px' }} />
            </IconButton>
          </Tooltip>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header