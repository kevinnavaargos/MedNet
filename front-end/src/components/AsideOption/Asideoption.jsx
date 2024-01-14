import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { SvgIcon } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { LocalHospital, LocalHospitalOutlined, DashboardOutlined, Dashboard, Description, DescriptionOutlined } from '@material-ui/icons';

function ProfileIcon(){
  return(
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  )
}

function HistoryIcon(){
  return(
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
    </svg>
  )
}

function ConsultIcon(){
  return(
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  )
}



function Asideoption({ name, linkId,setShowNav }) {
  const location = useLocation();
  const history = useHistory();
  const asideEvent = useSelector(state => state.appEvents.asideEvents)

  function handleAsideEvent() {
    setShowNav && setShowNav(false)
    history.push(linkObj[name]);
  }

  const icons = {
    Perfil: asideEvent === name ? ProfileIcon : ProfileIcon,
    Historia: asideEvent === name ? HistoryIcon : HistoryIcon,
    Consulta: asideEvent === name ? ConsultIcon : ConsultIcon,
  }

  const linkObj = {
    Perfil: `/dashboard/profile/`,
    Historia: `/dashboard/health-data/`,
    Consulta: `/dashboard/consult/`,
    Configuracion: `/dashboard/config/`
  }


  return (
      <span
        className={`${linkObj[name] === location.pathname ? 'selected':''} aside-option`}
        onClick={(e) => handleAsideEvent(e)}>
        <SvgIcon component={icons[name]} />
        {name}
      </span>
  )
}

export default Asideoption
