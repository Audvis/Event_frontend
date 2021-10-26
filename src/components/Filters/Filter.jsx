import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { removeTypes, addTypes, orderAscPrice, orderDescPrice, filterCountry, filterProvince, filterTags, filterAgeRating, filterWeekdays, getEvents, removeFilters } from '../../actions/actions';
import styles from './Filter.module.css';

//tags -- age_rating

export function Filters(props) {
    // console.log(props)
    const stateFilters = useSelector(state => state.eventsHome)
    const stateHome = useSelector(state => state.home)
    const stateTypesFilters = useSelector(state => state.typesFilters)

    const tags = ["Exteriores", "Interiores", "En vivo", "Recital", "Teatro", "Película", "Disco", "Deportes"]
    const age_rating = ["0+", "7+", "13+", "18+"]
    // const weekdays = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    const countrys = ['México', 'Colombia', 'Argentina']
    const ESTADOS = ['Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Coahuila', 'Colima', 'Chiapas', 'Chihuahua', 'Durango', 'Distrito Federal', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'México', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas']
    const DEPARTAMENTOS = ['Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bolívar', 'Boyacá', 'Caldas', 'Caquetá', 'Casanare', 'Cauca', 'Cesar', 'Chocó', 'Córdoba', 'Cundinamarca', 'Guainía', 'Guaviare', 'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda', 'San Andrés y Providencia', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca', 'Vaupés', 'Vichada']
    const PROVINCIAS = ['Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucumán']

    const [typesFilters, setTypesFilter] = useState([])
    const [country, setCountry] = useState()
    const get = props.getEvents
    let result;
    useEffect(() => {
        props.getEvents()
    }, [get])

    useEffect(() => {
        if (typesFilters) props.addTypes(typesFilters)
    }, [typesFilters])

    const handleChange = (e) => {
        let val = e.target.value;
        if (e.target.name === 'tags') {
            if (stateFilters.length === 0) {
                result = stateHome.filter((e) => e.tags === val)
                props.filterTags(result)
            } else {
                result = stateFilters.filter((e) => e.tags === val)
                props.filterTags(result)
            }
            if (typesFilters.length === 0) {
                setTypesFilter(['Tipos de eventos'])
            } else if (!typesFilters.includes('Tipos de eventos')) {
                setTypesFilter([...typesFilters, 'Tipos de eventos'])
            }
        }
        if (e.target.name === 'age_rating') {
            if (stateFilters.length === 0) {
                result = stateHome.filter((e) => e.age_rating === val)
                props.filterAgeRating(result)
            } else {
                result = stateFilters.filter((e) => e.age_rating === val)
                props.filterAgeRating(result)
            }
            if (typesFilters.length === 0) {
                setTypesFilter(['Clasificación'])
            } else if (!typesFilters.includes('Clasificación')) {
                setTypesFilter([...typesFilters, 'Clasificación'])
            }
        }
        if (e.target.name === 'country') {
            setCountry(val)
            if (stateFilters.length === 0) {
                result = stateHome.filter((e) => e.location.country === val)
                props.filterCountry(result)
            } else {
                result = stateFilters.filter((e) => e.location.country === val)
                props.filterCountry(result)
            }
            if (typesFilters.length === 0 ) {
                setTypesFilter(['País'])
            } else if (!typesFilters.includes('País')) {
                setTypesFilter([...typesFilters, 'País'])
            }
        }
        if (e.target.name === 'province') {
            if (stateFilters.length === 0) {
                result = stateHome.filter((e) => e.location.province === val)
                props.filterProvince(result)
            } else {
                result = stateFilters.filter((e) => e.location.province === val)
                props.filterProvince(result)
            }
            if (typesFilters.length === 0) {
                if (country === 'Argentina' && typesFilters.length === 0) {
                    setTypesFilter(['Provincias'])
                } else if (country === 'México' && typesFilters.length === 0) {
                    setTypesFilter(['Estados'])
                } else if (country === 'Colombia' && typesFilters.length === 0) {
                    setTypesFilter(['Departamentos'])
                }
            } else {
                let filters = [];
                if (country === 'Argentina' && !typesFilters.includes('Provincias')) {
                    if (typesFilters.includes('Estados')) {
                        filters = typesFilters.filter((e) => e !== 'Estados')
                        filters.push('Provincias')
                        setTypesFilter(filters)
                    } else if (typesFilters.includes('Departamentos')) {
                        filters = typesFilters.filter((e) => e !== 'Departamentos')
                        filters.push('Provincias')
                        setTypesFilter(filters)
                    } else {
                        setTypesFilter([...typesFilters, 'Provincias'])
                        console.log('typesFilters', typesFilters)
                    }
                } else if (country === 'México' && !typesFilters.includes('Estados')) {
                    if (typesFilters.includes('Provincias')) {
                        filters = typesFilters.filter((e) => e !== 'Provincias')
                        filters.push('Estados')
                        setTypesFilter(filters)
                    } else if (typesFilters.includes('Departamentos')) {
                        filters = typesFilters.filter((e) => e !== 'Departamentos')
                        filters.push('Estados')
                        setTypesFilter(filters)
                    } else {
                        setTypesFilter([...typesFilters, 'Estados'])
                        console.log('typesFilters', typesFilters)
                    }
                } else if (country === 'Colombia' && !typesFilters.includes('Departamentos')) {
                    if (typesFilters.includes('Provincias')) {
                        filters = typesFilters.filter((e) => e !== 'Provincias')
                        filters.push('Departamentos')
                        setTypesFilter(filters)
                    } else if (typesFilters.includes('Estados')) {
                        filters = typesFilters.filter((e) => e !== 'Estados')
                        filters.push('Departamentos')
                        setTypesFilter(filters)
                    } else {
                        setTypesFilter([...typesFilters, 'Departamentos'])
                        console.log('typesFilters', typesFilters)
                    }
                }
            }
        }
    }

    const all = (e) => {
        props.removeFilters()
        props.removeTypes()
        setTypesFilter([])
    }
    return (
        <div className={styles.divFilters}>
            <h5 style={{ marginBlockEnd: '0', cursor: 'pointer', textDecoration: 'underline', color: '#f5af00' }} onClick={all}>Eliminar Filtros</h5>
            <h5 className={styles.h5Filters} style={{ marginBlockEnd: '0' }}>Tipos de eventos:</h5>

            {tags.map((e, i) => {
                return <button className="regularBtn" key={i} name='tags' value={e} onClick={handleChange}>{e}</button>
            })}
            <h5 className={styles.h5Filters} style={{ marginBlockEnd: '0' }}>Clasificación:</h5>

            {age_rating.map((e, i) => {
                return <button className="regularBtn" key={i} name='age_rating' value={e} onClick={handleChange}>{e}</button>
            })}

            <h5 className={styles.h5Filters} style={{ marginBlockEnd: '0' }}>País:</h5>

            {countrys.map((e, i) => {
                return <button className="regularBtn" key={i} name='country' value={e} onClick={handleChange}>{e}</button>
            })}
            {country === 'Argentina' ?
                <><h5 className={styles.h5Filters} style={{ marginBlockEnd: '0' }}>Provincia:</h5>

                    {PROVINCIAS.map((e, i) => {
                        return <button className="regularBtn" key={i} name='province' value={e} onClick={handleChange}>{e}</button>
                    })}</>
                : country === 'México' ?
                    <><h5 className={styles.h5Filters} style={{ marginBlockEnd: '0' }}>Estado:</h5>

                        {ESTADOS.map((e, i) => {
                            return <button className="regularBtn" key={i} name='province' value={e} onClick={handleChange}>{e}</button>
                        })}</>
                    : country === 'Colombia' ?
                        <><h5 className={styles.h5Filters} style={{ marginBlockEnd: '0' }}>Departamento:</h5>
                            {DEPARTAMENTOS.map((e, i) => {
                                return <button className="regularBtn" key={i} name='province' value={e} onClick={handleChange}>{e}</button>
                            })}</>
                        : null
            }
        </div>
    )
}
export default connect(null, { removeTypes, addTypes, orderAscPrice, orderDescPrice, filterCountry, filterProvince, filterTags, filterAgeRating, getEvents, filterWeekdays, removeFilters })(Filters)