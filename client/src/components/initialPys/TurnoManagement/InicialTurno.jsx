import React, { useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Nav from "../../Layout/Nav"
import "./InicialTurno.scss"
import {obtenerTurnos, obtenerEspecialistas, obtenerPacientes, obtenerAgendas} from "../../../actions/index.js"
import Turnos from "./turnos.jsx";

function InicialTurno(){
    const dispatch = useDispatch();
    const [estado, setEStado]= useState("turnos")
    const turnos= useSelector( state => state.turnos)
    useEffect(()=> {
        dispatch(obtenerTurnos())
        dispatch(obtenerPacientes())
        dispatch(obtenerAgendas())
    }, [])
    
    return(
        <div class="container-turnospys">
            <Nav />
            {estado === "turnos" && !turnos[0]?
            <h1>No se han registrado turnos</h1>:turnos.map(t => {
                <Turnos 
                key={t.id} 
                id={t.id}
                pacienteId={t.pacienteId}
                agendaId={t.agendaId}
                modules={t.modules}
                hour={t.hour}
                status={t.status}
                />
            })}
        </div>
    )

}

export default InicialTurno;