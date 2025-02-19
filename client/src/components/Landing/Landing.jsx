/* eslint-disable */
import "./Landing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClinicMedical, faUserMd, faArrowLeft, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recuperarContraseña, rol } from "../../actions";
import axios from "axios";
import { especialistaDetallado, pacienteDetallado, obtenerPacientesRegistro } from "../../actions"
import { Redirect, Link } from "react-router-dom";
import swal from "sweetalert";


export default function Landing() {
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.rol);

  const mensaje = useSelector(state => state.modificado)

  const [error, setError] = useState(false)
  const [olvidado, setOlvidado] = useState(false)
  const [people, setPeople] = useState(false)


  useEffect(() => {

    let obtengoToken = localStorage.getItem('access-token')
    axios.get('/whoami', {
      headers: {
        authorization: obtengoToken
      }
    })
      .then(res => {
        console.log(res.data)
        if (res.data.rol) {
          dispatch(rol(res.data.rol))

          if (res.data.dni) {
            dispatch(pacienteDetallado(res.data.dni))
          }
          if (res.data.id) {
            dispatch(especialistaDetallado(res.data.especialistaId))
          }

        }
        else {
          return
        }
      })

  }, [])

  const [input, setInput] = useState({
    user: "",
    pass: "",
  });

  const [inputLost, setInputLost] = useState({
    value: '',
    error: false
  })

  const handleChange = (e) => {
    e.preventDefault();

    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    axios.post('/autenticar', {

      usuario: input.user,
      password: input.pass
    })
      .then(data => {

        if (data.data.token) {
          localStorage.setItem('access-token', data.data.token)

          dispatch(rol(data.data.persona.rol));

          if (data.data.persona.rol === '3') {
            dispatch(especialistaDetallado(data.data.persona.especialistaId));
          }
          else if (data.data.persona.rol === '4') {
            dispatch(pacienteDetallado(data.data.persona.dni));
          }
        }
        else {

          setError(data.data.mensaje)

        }
      })



    /* 
         dispatch(rol(input.user));  */


  };

  const handleChangePass = (e) => {
    e.preventDefault()

    if (olvidado === false) {
      setOlvidado(true)
    }
    else {

      setOlvidado(false)
    }

  }

  const handleInputLost = (e) => {



    if (e.target.value.includes(" ")) {
      setInputLost({ value: e.target.value, error: "No debe contener espacios" })
    }
    else if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(e.target.value)) {
      setInputLost({ value: e.target.value, error: "No es una direccion de correo valida" })
    }

    else {
      setInputLost({ value: e.target.value, error: false })
    }

  }

  const capitalFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const handleSubmitLost = async (e) => {
    e.preventDefault()

    dispatch(recuperarContraseña({
      email: inputLost.value,
      user: inputLost.value
    })).then(res => {

      if (res.payload.msg === 'se envio el email exitosamente') {
        swal({
          title: capitalFirstLetter(res.payload.msg),
          icon: 'success'
        })
        setOlvidado(false)
      }
      if (res.payload.msg === 'Los datos aportados no son correctos') {
        swal({
          title: capitalFirstLetter(res.payload.msg),
          icon: 'warning'
        })
      }

    })



  }

  const handlePeople = (e) => {
    e.preventDefault()
    if (people === false) {
      setPeople(true)
    }
    else {
      setPeople(false)

    }

  }

  return (
    <Fragment>
      {(roles === "1" || roles === "6") && <Redirect to="/patientPys" />}
      {(roles === "2" || roles === "7") && <Redirect to="/homeRRHH" />}
      {(roles === "3" || roles === "4") && <Redirect to="/homeUser" />}
      {roles === "5" && <Redirect to="/LandingAdmin" />}
      {roles === '' && <Redirect to='/' />}

      <div id="landing-container">



        <div id="landing-header">
          <div id="landing-title">
            <FontAwesomeIcon icon={faClinicMedical} className="icon-salud" />
            <span className="landing-title-text">GesSalud</span>
          </div>
        </div>

        <div id="landing-login">
          {!olvidado &&
            <form className="landing-form">
              <FontAwesomeIcon icon={faUserMd} className="icon-login" />
              <label htmlFor="" className="form-title">
                Iniciar Sesión
              </label>
              <div className="landing-form-inputs">
                <div className="label-input">
                  <label htmlFor="" className="label">
                    Usuario
                  </label>
                  <input
                    type="text"
                    name="user"
                    value={input.user}
                    className="input"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="label-input">
                  <label htmlFor="" className="label">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="pass"
                    value={input.pass}
                    className="input"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              {error && <span className='error'>{error}</span>}

              <div>
                <button className="boton-login" onClick={(e) => handleSubmit(e)}>
                  Ingresar
                </button>
              </div>

              <div className='registro'>
                <div>
                  <label className='olvidar' onClick={e => handleChangePass(e)}>¿Olvidaste tu contraseña?</label>
                </div>
                <div className='notengo'>
                  <span className='text'>¿No tienes cuenta?</span>
                  <Link to="/registrar" className='link' onClick={() => dispatch(obtenerPacientesRegistro())}>Registrarse</Link>
                </div>
              </div>
            </form>}


          {olvidado &&
            <form className="landing-form">
              <FontAwesomeIcon icon={faUserMd} className="icon-login" />
              <label htmlFor="" className="form-title">
                Ingrese su email
              </label>
              <div className="landing-form-inputs">
                <input
                  type="text"
                  name='lostpass'
                  className="inputlost"
                  value={inputLost.value}
                  onChange={e => handleInputLost(e)}
                />
              </div>
              {inputLost.error && <span className='error-mail'>{inputLost.error}</span>}
              <div>
                <button className="boton-login" onClick={(e) => handleSubmitLost(e)}>
                  Solicitar
                </button>
              </div>
              <div className='volver'>
                <label className='link' onClick={e => handleChangePass(e)}>
                  <FontAwesomeIcon icon={faArrowLeft} className='flecha' />
                  <span className='text'>Volver</span>
                </label>
              </div>
            </form>}


        </div>
        <div className='people'>
          {people &&
            <div className='participantes'>
              <div className='nombres'>
                <a href='https://www.linkedin.com/in/rodrigo-navarro-445131212/' target='_blank' className='link'><span>Rodrigo Navarro</span></a>
                <a href='https://www.linkedin.com/in/fernando-de-maio/' target='_blank' className='link'><span>Fernando De Maio</span></a>
                <a href='https://www.linkedin.com/in/nataramirez/' target='_blank' className='link'><span>Natalia Ramirez</span></a>
                <a href='https://www.linkedin.com/in/jeangq24/' target='_blank' className='link'><span>Jean Garzon</span></a>
                <a href='https://www.linkedin.com/in/guillermogonzalezvidal/' target='_blank' className='link'><span>Guillermo Gonzalez</span></a>
                <a href='https://www.linkedin.com/in/danielopzm/' target='_blank' className='link'><span>Johao Lopez</span></a>
                <a href='https://www.linkedin.com/in/marcelo-gonzalez-fullstackdev/' target='_blank' className='link'><span>Marcelo Gonzalez</span></a>
              </div>
            </div>
          }
          <button className='button' onClick={e => handlePeople(e)}><FontAwesomeIcon icon={faUsers} className='icon'></FontAwesomeIcon> Desarrolladores</button>
        </div>
      </div>
    </Fragment>
  );
}
