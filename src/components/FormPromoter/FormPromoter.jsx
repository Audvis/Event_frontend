import { useEffect, useState } from "react";
import axios from 'axios';
import styles from './Forms.module.css';
import validate from './validate.js';
import {connect} from 'react-redux';
import {API, changeModal} from '../../actions/actions';

function FormPromoter({changeModal}) {
    const [error, setError] = useState({});
    const [condition, setCondition] = useState({//este estado valida
        divCountry:'Provincia',// como esta dividido el pais ?
        idNumber:'CUIT',// qu tipo de identificacion maneja el pais
    });
    const [form, setForm] = useState({
        promoter_name:'',//leo:nombre y apellido del Promoter//
        promoter_lastName:'',
        // bio:'',//
        phone:'',//leo:numero de telefono del Promoter//
        email:'',//leo:email del Promoter//
        password:'',//leo: contraseña//
        repeat:'', //repetir contraseña//
        address:'',//dereccion del negocio//
        legal_name:'',//nombre legal//
        tax_id:'',//numero tributario//
        business_type:'',//typo de negocio//
        business_name:'',//
        country:'Argentina',//pais
        state:'',//estado,provincia o departamento
        city:'',//ciudad o municipio
        picture: undefined,
    });

    const businessTypes = [
        'Cine',
        'Bar',
        'Parque de diversiones',
        'Teatro',
        'Espacio público',
        'Salón de Conferencias',
        'Estadio',
        'Otros'
    ];

    useEffect(()=>{
        setError(validate(form))
    },[form])

    const namesInputs = (e)=>{//asignar caracteristicas por pais
        setForm({...form, country:e.target.value});
        if(e.target.value==='Argentina') {
            setCondition({ ...condition, divCountry:'Provincia', idNumber:'CUIT',});
        }
        else if (e.target.value==='Colombia'){
            setCondition({...condition, divCountry:'Departamento', idNumber:'NIT'});
        }
        else {
            setCondition({...condition, divCountry:'Estado', idNumber:'RFC'});
        }
        handleChange(e)
    }

    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        setError(validate({
            ...form,
            [e.target.name]: e.target.value
        }))
    }

    const changePicture = async (e) => {
        const file = e.target.files[0]
        const data = new FormData();
        data.append('file', file)
        data.append('upload_preset', 'cloudinary_event')
        const op = {method : 'POST', body : data}
        const res = await fetch(`https://api.cloudinary.com/v1_1/event-pf/image/upload`, op)
        const fileUp = await res.json();
        setForm({
            ...form,
            picture:fileUp.secure_url
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let obj = validate(form)

        if(Object.keys(obj).length !== 0) {
            changeModal('warning', `Revisa todos los campos`);
        } else {
            console.log('entreeeeeeeeeeeeeeeeeeeeeeeeee')
            try{              
                const res = await axios.post(`${API}promoter`,form)
                console.log('respuesta del backkkkkkkkk',res.data)
                if(res.data.msg){
                    changeModal('incorrect', `Intentalo de nuevo más tarde`)
                }
                else if(res.data.created){
                    changeModal('correct', `Promotor creado con éxito. \n Bienvenido a eVent, ${form.promoter_name}!`)
                    setForm({
                        promoter_name:'',
                        promoter_lastName:'',
                        bio:'',
                        phone:'',
                        email:'',
                        password:'',
                        repeat:'',
                        address:'',
                        legal_name:'',
                        tax_id:'',
                        business_type:'',
                        business_name:'',
                        country: form.country,
                        state:'',
                        city:'',
                });
                }else if(!res.data.created){
                    changeModal('warning', `Revisa los datos 'Nombre del negocio', 'Telefono', 'Correo' o '${condition.idNumber}' ya se encuentran registrados.`)
                }
            }catch(error){
                changeModal('incorrect', `Intentalo de nuevo más tarde`)
            }
        }
    }

    return (
            <form onSubmit={handleSubmit}>
                <div className={styles.contRend}>
                        <span className="formTitle">
                            {!form.country ? "Selecciona un país" : "Completa el formulario"}
                        </span>
                    <div className={styles.countrySelect}>
                        <select
                            name="country"
                            value={form.country}
                            onChange={namesInputs}
                        >
                            {/* <option value="" disabled>País</option> */}
                            <option value="Argentina" selected='select'>Argentina</option>
                            <option value="Colombia">Colombia</option>
                            <option value="Mexico">México</option>
                        </select>
                        {!error.country &&
                            <span className={styles.tick}> ✓ </span>
                        }
                    </div>
                    {/* {form.country && */}
                        <div className={styles.contForm2}>
                             {/*Ubicacion*/}
                            <div className={styles.category}>
                                <div className={styles.row}>
                                    <span>{condition.divCountry}: </span>
                                    <div className={styles.inputCheck}>
                                        <input
                                            type="text"
                                            name='state'
                                            value={form.state}
                                            onChange={handleChange}
                                            className={!form.state && styles.errorState}
                                        />
                                        <span className={styles.tick}>{!error.state && '✓' }</span>
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <span>Ciudad/Municipio: </span>
                                    <div className={styles.inputCheck}>
                                        <input
                                            type="text"
                                            name='city'
                                            onChange={handleChange}
                                            value={form.city}
                                            className={!form.city && styles.errorState}
                                        />
                                        <span className={styles.tick}>{ !error.city && '✓'}  </span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.category}>
                                <div className={styles.file}>
                                        <span>Foto de Perfil: </span>
                                        <div className={styles.inputCheck}>
                                            <input
                                            type="file" onChange={changePicture}
                                            />
                                            <span className={styles.tick}>{form.picture && '✓' }</span>
                                        </div>
                                    </div>
                                </div>
                             {/*Informacion empresarial*/}
                            <div className={styles.category}>
                                <div className={styles.row}>
                                    <span >Tipo de Negocio: </span>
                                    <div className={styles.inputCheck}>
                                        <select
                                            name="business_type"
                                            value={form.business_type}
                                            onChange={handleChange}
                                            className={form.business_type}
                                        >
                                            <option value="" disabled>Selecciona:</option>
                                            {businessTypes.map((el) => <option value={el}>{el}</option>)}
                                        </select>
                                        <span className={styles.tick}>{!error.business_type && '✓' }</span>
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <span>Nombre del negocio: </span>
                                    <div className={styles.separator}></div>
                                    <div className={styles.inputCheck}>
                                        <input
                                            type="text"
                                            name='business_name'
                                            value={form.business_name}
                                            onChange={handleChange}
                                            className={!form.business_name && styles.errorState}
                                        />
                                        <span className={styles.tick}>{!error.business_name && '✓' }</span>
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <span>Razón social: </span>
                                    <div className={styles.inputCheck}>
                                        <input
                                            type="text"
                                            name='legal_name'
                                            onChange={handleChange}
                                            value={form.legal_name}
                                        />
                                        <span className={styles.tick}>{!error.legal_name && '✓' }</span>
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <span >{condition.idNumber}: </span>
                                    <div className={styles.inputCheck}>
                                        <input
                                            name='tax_id'
                                            type="text"
                                            value={form.tax_id}
                                            onChange={handleChange}
                                        />
                                        <span className={styles.tick}>{!error.tax_id && '✓' }</span>
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <span>Dirección: </span>
                                    <div className={styles.inputCheck}>
                                        <input
                                            type="text"
                                            name='address'
                                            onChange={handleChange}
                                            value={form.address}
                                        />
                                        <span className={styles.tick}>{!error.address && '✓' }</span>
                                    </div>
                                </div>
                            </div>
                              {/*Contacto*/}
                            <div className={styles.category}>
                                <div className={styles.row}>
                                    <span>Nombre: </span>
                                    <div className={styles.inputCheck}>
                                        <input
                                            type="text"
                                            name='promoter_name'
                                            onChange={handleChange}
                                            value={form.promoter_name}
                                        />
                                        <span className={styles.tick}>{!error.promoter_name && '✓'} </span>
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <span>Apellido: </span>
                                    <div className={styles.inputCheck}>
                                        <input
                                            type="text"
                                            name='promoter_lastName'
                                            onChange={handleChange}
                                            value={form.promoter_lastName}
                                        />
                                        <span className={styles.tick}>{!error.promoter_lastName && '✓' }</span>
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <span>Teléfono: </span>
                                    <div className={styles.inputCheck}>
                                        <input
                                            type="text"
                                            name='phone'
                                            onChange={handleChange}
                                            value={form.phone}
                                        />
                                        <span className={styles.tick}>{!error.phone && '✓' }</span>
                                    </div>
                                </div>
                            </div>
                              {/*datos login*/}
                            <div className={styles.category}>
                                <div className={styles.row}>
                                    <span >Email: </span>
                                    <div className={styles.inputCheck}>
                                        <input
                                            type='email'
                                            name='email'
                                            placeholder='usuario@dominio.abc'
                                            onChange={handleChange}
                                            value={form.email}
                                        />
                                        <span className={styles.tick}> {!error.email && '✓'} </span>
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <span >Contraseña: </span>
                                    <div className={styles.inputCheck}>
                                        <input
                                            type="password"
                                            name='password'
                                            placeholder='¡Si no tilda, no es segura!'
                                            onChange={handleChange}
                                            value={form.password}
                                        />
                                        <span className={styles.tick}>{!error.password && '✓'} </span>
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <span >Repetir contraseña: </span>
                                    <div className={styles.inputCheck}>
                                        <input
                                            type="password"
                                            name='repeat'
                                            onChange={handleChange}
                                            value={form.repeat}
                                        />
                                        <span className={styles.tick}>{!error.repeat && '✓'} </span>
                                    </div>
                                </div>
                        </div>

                            <button className="bigBtn" type="submit">
                            ¡Registrarme!
                            </button>
                        </div>
                    </div>
            </form>
       )
}

function mapStateToProps(state){
    return { modal: state.modal }
}
export default connect(null,{changeModal})(FormPromoter);