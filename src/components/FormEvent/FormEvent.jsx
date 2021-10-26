import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { API, changeModal, editEvent, postEvent } from '../../actions/actions.js';
import Croquis from '../Croquis/Croquis.jsx';
import styles from '../FormPromoter/Forms.module.css';
import SectorsForm from './SectorsForm.jsx';
import validate from './validate.js';

////////////////
// NO SE PUEDEN EDITAR LOS ESTILOS DE ESTE FORM.
////////////////

const regiones = {
    estados:['Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Coahuila', 'Colima', 'Chiapas', 'Chihuahua', 'Durango', 'Distrito Federal', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'México', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'],
    departamentos:['Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bolívar', 'Boyacá', 'Caldas', 'Caquetá', 'Casanare', 'Cauca', 'Cesar', 'Chocó', 'Córdoba', 'Cundinamarca', 'Guainía', 'Guaviare', 'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda', 'San Andrés y Providencia', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca', 'Vaupés', 'Vichada'],
    provincias:['Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucumán']
}


export function FormEvent(props) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState({});
    const [load, setLoad] = useState(false);
    const [sections,setSections] = useState({
        name:'',
        limit:'',
        price:'',
    });
    const [sectionsCroquis,setSectionsCroquis] = useState({
        nameC:'',
        limitC:'',
        priceC:'',
        filasC:'',
        columnasC:'',
    }); 
    const [dataCroquis, setDataCroquis] = useState({
        name:'',
        price:'',
        limit:'',
        filas:[]
    })   
    const [event, setEvent] = useState({
        name: '',//general
        description: '',//general
        starring: '',//general
        pictures: [],//general
        country: 'Argentina',//general
        divC:'provincias',//general
        region:'',//general
        city:'',//general
        address: '',//general
        start_date: '',//general
        //finish_date: '',//si es recurrente
        //isRecurrent:0,//general
        schedule: '',//general
        weekdays: '',//si es recurrente
        tags: '',//general
        age_rating: '',//general
        sectorize:'no sectorizar',//general
        sectores:[],//nombre,precio,limite por sector//si sectorize es sectorizar sin croquis
        sectoresCroquis:[],//nombre,precio,limite y croquis por sector//si sectorize es sectorizar con croquis
        price: '',// precio para eventos sin sectorización//si no sectorizr
        ticket_limit: '',//limite para eventos sin secorización//si no sectorizar
        promoter_id: props.promoterId,
    })



    const tags = ["Exteriores", "Interiores", "En vivo", "Recital", "Teatro", "Película", "Disco", "Deportes"]
  

    useEffect(()=>{
        if(props.modalForm?.data?.name){
            let divC=''
            if(props.modalForm.data.location.country === 'Argentina'){
                divC='provincias'
            }else if(props.modalForm.data.location.country === 'Colombia'){
                divC='departamentos'
            }else{
                divC='estados'
            }
            setEvent({
                name: props.modalForm.data.name,
                description: props.modalForm.data.description,
                starring: props.modalForm.data.starring,
                pictures: props.modalForm.data.pictures,
                country: props.modalForm.data.location.country,
                divC: divC,
                region:props.modalForm.data.location.province,
                city:props.modalForm.data.location.city,
                address: props.modalForm.data.address,
                start_date: props.modalForm.data.start_date,
                //finish_date: props.modalForm.data.finish_date,
                //isRecurrent:props.modalForm.data.isrecurrent,
                schedule: props.modalForm.data.schedule,
                weekdays: props.modalForm.data.weekdays,
                tags: props.modalForm.data.tags,
                age_rating: props.modalForm.data.age_rating,
                sectorize:'false',
                sectorsPrice:{},
                price: props.modalForm.data.price,
                ticket_limit: props.modalForm.data.ticket_limit,
                promoter_id: props.modalForm.data.promoter_id,
            });
            setErrors(validate({
                name: props.modalForm.data.name,
                description: props.modalForm.data.description,
                starring: props.modalForm.data.starring,
                pictures: props.modalForm.data.pictures,
                country: props.modalForm.data.location.country,
                divC: divC,
                region:props.modalForm.data.location.province,
                city:props.modalForm.data.location.city,
                address: props.modalForm.data.address,
                start_date: props.modalForm.data.start_date,
                //finish_date: props.modalForm.data.finish_date,
                //isRecurrent:props.modalForm.data.isrecurrent,
                schedule: props.modalForm.data.schedule,
                weekdays: props.modalForm.data.weekdays,
                tags: props.modalForm.data.tags,
                age_rating: props.modalForm.data.age_rating,
                sectorize:'false',
                sectorsPrice:{},
                price: props.modalForm.data.price,
                ticket_limit: props.modalForm.data.ticket_limit,
                promoter_id: props.modalForm.data.promoter_id,
            }));
        }else{
            setErrors(validate(event));
        }
        
    },[]);

    const click = async (e) => {
        const files = e.target.files
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'cloudinary_event')
        setLoad(true)
        const op = { method: 'POST', body: data }
        const res = await fetch(`https://api.cloudinary.com/v1_1/event-pf/image/upload`, op)
        const file = await res.json();
        setEvent({
            ...event,
            pictures:[file.secure_url, ...event.pictures]
        });
        setErrors(validate({
            ...event,
            pictures: [file.secure_url, ...event.pictures]
        }))
        setLoad(false)
    }

    const deletePictures = function (e) {
        e.preventDefault()
        setEvent({
            ...event,
            pictures: event.pictures.filter((i) => i !== e.target.value)
        });
        setErrors(validate({
            ...event,
            pictures: event.pictures.filter((i) => i !== e.target.value)
        }))
    }

    // const deleteHour = (hour)=>{
    //     setEvent({
    //         ...event,
    //         schedule: event.schedule.filter((h)=> h!== hour)
    //     })
    // }

    // const deleteDay = (day)=>{
    //     setEvent({
    //         ...event,
    //         weekdays: event.weekdays.filter((d)=> d!== day)
    //     })
    // }
    //Inicio secciones
    const handleChangeSection = (e)=>{
        setSections({
            ...sections,
            [e.target.name]:e.target.value
        })
    }
    
    const addSection = (e)=>{
        e.preventDefault()
        if(sections.name.length > 1 && sections.price.length > 1 && sections.limit.length > 1){
            setEvent({
                ...event,
                sectores:[...event.sectores,sections]
            })
            setSections({
                name:'',
                limit:'',
                price:''
            })
            setErrors(validate({
                ...event,
                sectores: [...event.sectores,sections]
            }))
        }else{
            props.changeModal('warning', `Revisa todos los campos del sector`)
        }
    }

    const onCloseSection = (e,name)=>{
        e.preventDefault()
        setEvent({
            ...event,
            sectores:event.sectores.filter(s=>s.name!==name)
        })
        setErrors(validate({
            ...event,
            sectores:event.sectores.filter(s=>s.name!==name)
        }))
    }

    const onCloseSectionCroquis = (e,name)=>{
        e.preventDefault()
        setEvent({
            ...event,
            sectoresCroquis:event.sectores.filter(s=>s.name!==name)
        })
        setErrors(validate({
            ...event,
            sectoresCroquis:event.sectores.filter(s=>s.name!==name)
        }))
    }

    const addCroquis = (e)=>{
        e.preventDefault()
        if(sectionsCroquis.nameC.length > 0 && sectionsCroquis.priceC.length > 0 && sectionsCroquis.filasC > 0 && sectionsCroquis.columnasC > 0){
            setEvent({
                ...event,
                sectoresCroquis:[...event.sectoresCroquis, dataCroquis]
            })
            setSectionsCroquis({
                nameC:'',
                limitC:'',
                priceC:'',
                filasC:'',
                columnasC:'',
            })
        }else{
            props.changeModal('warning', `Revisa todos los campos del sector`)
        }
    }

    const handleChangeCroquis = (e) =>{
        setSectionsCroquis({
            ...sectionsCroquis,
            [e.target.name]:e.target.value
        })
    }

    const deleteSilla = (fila, silla)=>{
        let nuevoArray = dataCroquis.filas;
        nuevoArray[fila-1][silla-1].estado = 'deshabilitado';
        console.log(nuevoArray)
        setDataCroquis({
            ...dataCroquis,
            limit:parseInt(dataCroquis.limit)-1,
            filas:nuevoArray
        })
    }
    const mostrarSilla = (fila, silla)=>{
        let nuevoArray = dataCroquis.filas;
        nuevoArray[fila-1][silla-1].estado = 'disponible';
        setDataCroquis({
            ...dataCroquis,
            limit:parseInt(dataCroquis.limit)+1,
            filas:nuevoArray
        })
    }

    useEffect(()=>{
        let arrayCroquis = []
        for(let i=1 ; i<=parseInt(sectionsCroquis.filasC); i++){
            arrayCroquis=[...arrayCroquis,[]]
            for(let j=1 ; j<=parseInt(sectionsCroquis.columnasC); j++){
                arrayCroquis[i-1]=[...arrayCroquis[i-1],{silla:j,estado:'disponible'}]
            }
        }
        setDataCroquis({
            name:sectionsCroquis.nameC,
            price:sectionsCroquis.priceC,
            limit:parseInt(sectionsCroquis.filasC)*parseInt(sectionsCroquis.columnasC),
            filas:arrayCroquis,
        })
    },[sectionsCroquis.filasC,sectionsCroquis.columnasC,sectionsCroquis.nameC,sectionsCroquis.priceC])
    //Fin secciones
    const handleClose = ()=>{
        dispatch(editEvent());
    }

    const handleEdit = async(e)=>{        
        e.preventDefault();
        let obj = validate(event)      
        if(Object.keys(obj).length !== 0) {
            props.changeModal('warning', `Revisa todos los campos`);
        } else {
            try{                
                const res = await axios.put(`${API}event/edit/${props.modalForm.data.id}`,{...event,locationId:props.modalForm.data.locationId,id:props.modalForm.data.id})               
                if(res.data.msg==='update'){
                   props.changeModal('correct', `Evento Actualizado`) 
                   history.push('/perfil')
                }                             
                else if(res.data.created){

                    props.changeModal('incorrect', `El Nombre del evento ya se encuentra registrado`)
                }
                props.editEvent(null)
            }catch(error){
               props.changeModal('incorrect', `Inténtalo de nuevo más tarde`)
               props.editEvent(null)
            }
        }
   }
    
    

    const handleSubmit= async(e)=>{
         e.preventDefault();
         let obj = validate(event)
       
         if(Object.keys(obj).length !== 0) {
             props.changeModal('warning', `Revisa todos los campos`);
         } else {
             try{
                 const res = await axios.post(`${API}/event`,event)
                 if(res.data.msg){
                    props.changeModal('incorrect', `Inténtalo de nuevo más tarde`) 
                 }
                 else if(res.data.created){
                    props.changeModal('correct', `¡Evento creado con éxito!`)
                     setEvent({
                        name: '',
                        description: '',
                        starring: '',
                        pictures: [],
                        country: 'Argentina',
                        divC:'provincias',
                        region:'',
                        city:'',
                        address: '',
                        start_date: '',
                        finish_date: '',
                        isRecurrent:'',
                        schedule: [],
                        weekdays: [],
                        tags: '',
                        age_rating: '',
                        sectorize:'false',
                        sectorsPrice:{},
                        price: '',
                        ticket_limit: '',
                    });
                    history.push('/perfil')
                 }else if(!res.data.created){

                     props.changeModal('incorrect', `El Nombre del evento ya se encuentra registrado`)
                 }
             }catch(error){
                props.changeModal('incorrect', `Inténtalo de nuevo más tarde`)
             }
         }
    }

    const inputChange = (e)=>{
        if(e.target.name === 'country'){
            e.target.value === 'Argentina' &&
            setEvent({...event,divC:'provincias',country:'Argentina'});

            e.target.value === 'Colombia' && 
            setEvent({...event,divC:'departamentos',country:'Colombia'});

            e.target.value === 'México' && 
            setEvent({...event,divC:'estados',country:'México'});
        // }else if(e.target.name === 'weekdays' ||e.target.name === 'schedule'){
        //     console.log(e)
        //     setEvent(
        //         {...event, [e.target.name]:[...event[e.target.name], e.target.value]
        //     }) 
        // }else if(e.target.name === 'isRecurrent'){
        //     setEvent(
        //         {...event, isRecurrent:parseInt(e.target.value)
        //     }) 
        }else if(e.target.name === 'sectorize'){
            setEvent({
                ...event,
                [e.target.name] : e.target.value,
                sectores:[],
                sectoresCroquis:[],
                price:'',
                limit:'',
            });  
        }
        else{
            setEvent({
                ...event,
                [e.target.name] : e.target.value
            });  
        }     
        setErrors(validate({
            ...event,
            [e.target.name]: e.target.value
        }))
    }
    let INDEX = 0;
    return (
        <div className={styles.contRend}>
            <form /* className={styles.form} */>  
            {props.modalForm.render?
            <h2 className="formTitle">Editar Evento</h2> : 
            <h2 className="formTitle">Nuevo Evento</h2>  }
            <div className={styles.contForm2}>
                <div className={styles.category}>
                    <div className={styles.row}>{/*NOMBRE DEL EVENTO*/}
                        <span>Nombre del Evento: </span>
                        <div className={styles.separator}></div>
                        <div className={styles.inputCheck}>
                            <input 
                                type="text"
                                value={event.name}
                                name='name'
                                onChange={inputChange}
                             />
                            <span className={styles.tick}>{!errors.name && '✓'}</span>
                        </div>
                    </div>                   
                    <div className={styles.row}>{/*DESCRIPCION DEL EVENTO*/}
                        <span>Descripción: </span>
                        <div className={styles.separator}></div>
                        <div className={styles.inputCheck}>
                            <textarea                              
                                value={event.description}
                                name='description'
                                onChange={inputChange}
                             />
                            <span className={styles.tick}>{!errors.description && '✓'}</span>
                        </div>
                    </div>
                    <div className={styles.row}>{/*PARTICIPANTES DEL EVENTO*/}
                        <span>Participantes: </span>
                        <div className={styles.separator}></div>
                        <div className={styles.inputCheck}>
                            <textarea
                                value={event.starring}
                                name='starring'
                                onChange={inputChange}
                             />
                            <span className={styles.tick}>{!errors.starring && '✓'}</span>
                        </div>
                    </div>
                    <div className={styles.row}>{/*IMAGENES DEL EVENTO*/}
                        <div className={styles.file}>
                        <label>Imágenes del Evento: </label>
                            <input
                                onChange={click}
                                type="file"
                                />
                            <span className={styles.tick}>{!errors.pictures && '✓'}</span>
                        </div>
                    </div>
                    <hr />
                    {event.pictures.length!==0 &&
                    <div className={styles.imagenes}>
                        {event.pictures && event.pictures.map((i) => 
                            <div className={styles.images}>
                                 <button className="regularBtn" key={INDEX++} value={i} onClick={deletePictures}>
                                    X
                                </button>
                                <img key={INDEX++} src={i} alt='foto' width='150px' height='100px' />
                            </div>
                        )}
                        {load === true ?
                        <span>cargando..</span>
                        : null}
                    </div> 
                    } 
                </div>
                {/*SECCION UBICACION*/}
                <div className={styles.category}>
                    <div className={styles.row}>{/*PAIS*/}
                        <span>Pais: </span>
                        <div className={styles.inputCheck}>
                            <select 
                                name="country"
                                value={event.country}
                                onChange={inputChange}                               
                            >
                                <option value="Argentina">Argentina</option>
                                <option value="Colombia">Colombia</option>
                                <option value="México">Mexico</option>
                            </select>
                            <span className={styles.tick}>{!errors.country && '✓'}</span>
                        </div>
                    </div>
                    <div className={styles.row}>{/*DEPARTAMENTO*/}
                        <span>{event.divC}: </span>
                        <div className={styles.inputCheck}>
                            <select
                                name='region'
                                value={event.region}
                                onChange={inputChange}
                            >   
                                <option value='' disabled>seleccione</option>
                                {regiones[event.divC].map((region,i)=>
                                    <option key={i} value={region}>{region}</option>
                                )}                                
                            </select>
                            <span className={styles.tick}>{!errors.region && '✓'}</span>
                        </div>
                    </div>
                    <div className={styles.row}>{/*CIUDAD*/}
                        <span>Ciudad: </span>
                        <div className={styles.inputCheck}>
                            <input 
                                id={styles.minWidth}
                                type="text"
                                name='city'
                                value={event.city}
                                onChange={inputChange}                                                              
                             />
                            <span className={styles.tick}>{!errors.city && '✓'}</span>
                        </div>
                    </div>
                    <div className={styles.row}>{/*ADDRESS*/}
                        <span>Dirección: </span>
                        <div className={styles.inputCheck}>
                            <input 
                                id={styles.minWidth}
                                type="text"
                                name='address'
                                value={event.address}
                                onChange={inputChange}
                                
                             />
                            <span className={styles.tick}>{!errors.address && '✓'}</span>
                        </div>                   
                    </div>
                </div>
                {/*SECCION INFORMACION EVENTO*/}
                <div className={styles.category}>
                    <div className={styles.row}>{/*FECHA INICIO*/}
                        <span>Fecha: </span>
                        <div className={styles.inputCheck}>
                            <input 
                                id={styles.minWidth}
                                type="date"
                                name='start_date'
                                value={event.start_date}
                                onChange={inputChange}                                
                             />
                            <span className={styles.tick}>{!errors.start_date && '✓'}</span>
                        </div>
                    </div>
                    {/* <div className={styles.row}>
                        <span>Recurrente: </span>
                        <div className={styles.inputCheckRec}>                           
                            <input 
                                checked={event.isRecurrent}
                                type="radio"
                                name='isRecurrent'
                                value={1}
                                onChange={inputChange}
                                
                            />Si <br />  
                            <input 
                                checked={!event.isRecurrent}
                                type="radio"
                                name='isRecurrent'
                                value={0}
                                onChange={inputChange}
                                
                            />No <br />                            
                            <span className={styles.tick}>{!errors.isRecurrent && '✓'}</span>
                        </div>
                    </div> */}
                    {/* {event.isRecurrent?
                        <div className={styles.row}>
                             <span>Fecha Final: </span>
                             <div className={styles.inputCheck}>
                                <input 
                                    id={styles.minWidth}
                                    type="date"
                                    name='finish_date'
                                    value={event.finish_date}
                                    onChange={inputChange}                                   
                                 />
                                <span className={styles.tick}>{!errors.finish_date && '✓'}</span>
                            </div>
                        </div>:null
                    } */}
                    {/* {event.isRecurrent && */}
                    {/* <> */}
                    <div className={styles.row}>{/*HORARIOS*/}
                        <span>Horario: </span>
                        <div className={styles.inputCheck}>                              
                            <input 
                                id={styles.minWidth}
                                type="time"
                                format = 'HH:mm'
                                name='schedule'
                                value={event.schedule}
                                onChange={inputChange}                                   
                             />

                            <span className={styles.tick}>{!errors.schedule && '✓'}</span>
                        </div> 
                    </div>  
                    {/* {event.schedule.length!==0 &&
                        <div className={styles.imagenes}>
                            {
                                event.schedule.map((hour,i)=>
                                    <div key={i} className={styles.etq} >
                                        <div className={styles.inf}>
                                            {hour}
                                        </div>
                                        <div className={styles.x} onClick={()=>deleteHour(hour)}>
                                        </div>
                                    </div>
                                )
                            }
                        </div>   
                    }                                     */}
                    {/* </>
                    } */}
                    {/* {event.isRecurrent?
                    <> */}
                    <div className={styles.row}>
                        <span>Dia: </span>
                        <div className={styles.inputCheck}>
                            <select
                                name='weekdays'
                                value={event.weekdays}
                                onChange={inputChange}                               
                            >
                                <option value='' disabled>seleccione</option>
                                <option value={'Lunes'}>Lunes</option>
                                <option value={'Martes'}>Martes</option>
                                <option value={'Miércoles'}>Miercoles</option>
                                <option value={'Jueves'}>Jueves</option>Martes
                                <option value={'Viernes'}>Viernes</option>
                                <option value={'Sábado'}>Sabado</option>
                                <option value={'Domingo'}>Domingo</option>
                            </select>
                            <span className={styles.tick}>{!errors.weekdays && '✓'}</span>
                        </div> 
                    </div>
                    {/* {event.weekdays.length!==0 &&
                        <div className={styles.imagenes}>
                            {
                                event.weekdays.map((day,i)=>
                                    <div className={styles.etq} key={i} >
                                        <div className={styles.inf}>
                                             {day}
                                        </div>
                                        <div  className={styles.x} key={i} onClick={()=>deleteDay(day)}>
                                        </div>
                                    </div>
                                )
                            }
                        </div> 
                    } 
                    </>:null
                    } */}
                    <div className={styles.row}>{/*TIPO DE EVENTO*/}
                        <span>Tipo de Evento: </span>
                        <div className={styles.inputCheck}>
                            <select
                                name='tags'
                                value={event.tags}
                                onChange={inputChange}
                                className={styles.pais}
                            >
                                <option value='' disabled>seleccione</option> 
                                {tags.map((tag,i)=>
                                    <option key={i} value={tag}>{tag}</option>
                                )}
                            </select>
                            <span className={styles.tick}>{!errors.tags && '✓'}</span>
                        </div>                   
                    </div>
                    <div className={styles.row}>{/*CLASIFICACION*/}
                        <span>Clasificación: </span>
                        <div className={styles.inputCheck}>
                            <select
                                name='age_rating'
                                value={event.age_rating}
                                onChange={inputChange}
                                className={styles.pais}
                            >
                                <option value='' disabled>seleccione</option>                              
                                <option value='0+'>0+</option>
                                <option value='7+'>7+</option> 
                                <option value='13+'>13+</option> 
                                <option value='18+'>18+</option>                                
                            </select>
                            <span className={styles.tick}>{!errors.age_rating && '✓'}</span>
                        </div>                   
                    </div>
                    {!props.modalForm.render?
                    
                    <>
                    <div className={styles.category}>
                    <div className={styles.row}>
                        <span>Sectorizar: </span>
                        <div className={styles.sectorizar}>
                            <label>
                            <input
                                checked={event.sectorize === 'no sectorizar'}
                                type="radio"
                                name='sectorize'
                                value='no sectorizar'
                                onChange={inputChange}
                                className={styles.pais}
                            />No sectorizar </label>
                            <label>
                            <input
                                checked={event.sectorize === 'sectorizar sin croquis'}
                                type="radio"
                                name='sectorize'
                                value='sectorizar sin croquis'
                                onChange={inputChange}
                                className={styles.pais}
                            />Sectorizar sin croquis </label>
                            <label>
                            <input
                                checked={event.sectorize === 'sectorizar con croquis'}
                                type="radio"
                                name='sectorize'
                                value='sectorizar con croquis'
                                onChange={inputChange}
                                className={styles.pais}
                            />Sectorizar con croquis </label>
                            <span className={styles.tick}></span>
                        </div>                   
                    </div>
                    </div>
                    {/* SECCIONAR SIN CROQUIS */}
                    {event.sectorize === 'sectorizar sin croquis' && 
                    <>
                        <div className={styles.row}>
                            <div className={styles.file}>
                                <input
                                    type='text'
                                    placeholder='Nombre sección'
                                    value={sections.name}
                                    onChange={handleChangeSection}
                                    name='name'
                                />
                                <input
                                    type='number'
                                    placeholder='Limite de entradas'
                                    value={sections.limit}
                                    onChange={handleChangeSection}
                                    name='limit'
                                />
                                <input
                                    type='number'
                                    placeholder='Precio Unitario'
                                    value={sections.price}
                                    onChange={handleChangeSection}
                                    name='price'
                                />
                            </div>
                             <button className="regularBtn"  className="regularBtn"  onClick={addSection}>Agregar Sección</button>
                        </div>
                        <div className={styles.categorysCont}>
                            <SectorsForm name='Sección' limit='Limite' price='Precio'/>
                            {event.sectores.map(s=>(<SectorsForm key={s.name} name={s.name} limit={s.limit} price={s.price} onCloseSection={onCloseSection}/>))}
                        </div>
                    </>
                    }

                    {/* SELECCIONAR CON CROQUIS */}
                    {event.sectorize === 'sectorizar con croquis' &&
                    <>
                        <div className={styles.row}>
                            <div className={styles.file}>                              
                                <input
                                    type='text'
                                    placeholder='Nombre sección'
                                    value={sectionsCroquis.nameC}
                                    onChange={handleChangeCroquis}
                                    name='nameC'
                                />                               
                                <input
                                    type='number'
                                    placeholder='Precio Unitario USD'
                                    value={sectionsCroquis.priceC}
                                    onChange={handleChangeCroquis}
                                    name='priceC'
                                />                                
                                <input
                                    type='number'
                                    placeholder='#Columnas'
                                    value={sectionsCroquis.columnasC}
                                    onChange={handleChangeCroquis}
                                    name='columnasC'
                                />                                                              
                                <input
                                    type='number'
                                    placeholder='#Filas'
                                    value={sectionsCroquis.filasC}
                                    onChange={handleChangeCroquis}
                                    name='filasC'
                                />                                                             
                            </div>
                             <button className="regularBtn"  className="regularBtn"  onClick={addCroquis}>Agregar Sección</button>
                        </div>
                        <div className={styles.contCroquis}>
                            <Croquis 
                                data={dataCroquis}
                                deleteSilla={deleteSilla}
                                mostrarSilla={mostrarSilla}
                            />
                        </div>
                        <div className={styles.categorysCont}>
                            <SectorsForm name='Sección' limit='Limite' price='Precio'/>
                            {event.sectoresCroquis.map(s=>(<SectorsForm key={s.name} name={s.name} limit={s.limit} price={s.price} onCloseSection={onCloseSectionCroquis}/>))}
                        </div>
                    </>
                    }

                    {event.sectorize === 'no sectorizar' &&
                    <>
                        <div className={styles.row}>{/*SI ANTESRIOR ES NO INGRESE PRECIO GENERAL*/}
                            <span>Precio General (USD): </span>
                            <div className={styles.inputCheck}>
                                <input 
                                    id={styles.minWidth}
                                    type="number"
                                    min='0'
                                    name='price'
                                    value={event.price}
                                    onChange={inputChange}
                                    placeholder='Precio'
                                 />
                                <span className={styles.tick}>{!errors.moneda && !errors.price &&'✓'}</span>
                            </div>                   
                        </div>
                        <div className={styles.row}>{/*LIMITE DE INGRESO*/}
                            <span>Plazas Disponibles: </span>
                            <div className={styles.inputCheck}>
                                <input 
                                    type="number"
                                    min='0'
                                    name='ticket_limit'
                                    value={event.ticket_limit}
                                    onChange={inputChange}
                                 />
                                <span className={styles.tick}>{!errors.ticket_limit && '✓'}</span>
                            </div>
                        </div>
                    </>
                    }
                    </>:null}
                </div>
                {props.modalForm.render?

                <>
                    <input className="regularBtn" type='submit' onClick={handleEdit} value='Editar'/>
                    <input className="regularBtn" type='submit' onClick={handleClose} value='Cancelar'/>
                </>
                :
                <button className="bigBtn" type='submit' onClick={handleSubmit}>Crear!</button> 

                 }
            </div>
            </form>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        postEvent: (event) => dispatch(postEvent(event)),
        changeModal:(type,msg)=>dispatch(changeModal(type,msg)),
        editEvent:(details)=>dispatch(editEvent(details)),
    }
}
function mapStateToProps(state){
    return {
        modalForm: state.modalForm,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FormEvent)