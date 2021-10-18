/* eslint-disable */
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Nav from "../../../Layout/Nav.jsx";
import './patientCardDetails.scss';


const PatientCardDetails = () => {
    const capitalFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    const patientDetails = useSelector(state => state.pacienteDetallado);
    const { id, medication, disease, persona, historiaClinica, diagnosticos, emergencyContact } = patientDetails[0];
    return (
        <div id="patientDetails-container">
            <Nav />
            <div className='boton-regresar'>
                <Link to="/patientPys" className='boton'>Volver</Link>
                <Link to="/patientEdit" className='boton'>Modificar</Link>
            </div>
            <div className='lista-detalles'>

                <div className='detalles'>
                    <div className='encabezado'>
                        <span className='nombre-apellido'>{capitalFirstLetter(persona.name) + ' ' + capitalFirstLetter(persona.lastName)}</span>
                    </div>
                    <div className='data'>
                        <span className='data-info'>Dni: <b className='data-detail'>{persona.dni}</b></span>
                        <span className='data-info'>Email: <b className='data-detail'> {persona.email}</b></span>
                        <span className='data-info'>Celular: <b className='data-detail'> {persona.phone}</b></span>
                        <span className='data-info'>Direccion: <b className='data-detail'>{persona.adress}</b></span>
                        <span className='data-info'>Birth: <b className='data-detail'>{persona.birth}</b></span>
                    </div>
                    <div className='data'>
                        <span className='data-info'>Historia clinica: <b className='data-detail'>{historiaClinica.creationDate}</b></span>
                        <span className='data-info'>Medicacion: <b className='data-detail'>{medication}</b></span>
                        <span className='data-info'>Contacto de emergencia: <b className='data-detail'> {emergencyContact}</b></span>
                        <span className='data-info'>Enfermedades: <b className='data-detail'>{disease}</b></span>
                    </div>
                </div>
               
            </div>
            
        </div>

    )
}

export default PatientCardDetails