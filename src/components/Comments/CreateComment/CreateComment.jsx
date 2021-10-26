import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux'
import success from '../../../Utilities/successGif.gif'
import error from '../../../Utilities/error.png'
import style from './CreateComment.module.css'

//Diego: Componente de creacion de comentarios.
export default function CreateComment() {
    const userInfo = useSelector(state => state.userState)
    const location = useLocation()

    const [editing, setEditing] = useState(true)
    const [commentedBefore, setCommentedBefore] = useState(false)
    const [canComment, setCanComment] = useState(true)
    const [minimumRequired, setMinimumRequired] = useState(false)
    const [input, setInput] = useState({
        review: '',
        rating: '',
        user_id: '',
        event_id: location.state.id,
        checkbox: false,
    })

    useEffect(() => {
        setInput({
            ...input,
            user_id: userInfo.id
        });
        // Diego: Funcion para revisar que el usuario no haya comentado anteriormente el mismo evento.
        const fetchUserComments = async (userId) => {
            let userCheck;
            let response;
            try {
                response = await axios.get(`https://event-henryapp-backend.herokuapp.com/api/user/${userId}`)
                userCheck = response.data.comments.filter(comment => comment.eventId === location.state.id)
            } catch (e) {
                console.log(e)
                return
            }
            console.log(userCheck, 'usercheck')
            if (userCheck.length) setCommentedBefore(true)
        }
        fetchUserComments(userInfo.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[userInfo])

    // useEffect(() => {
    //     if (performance.navigation.type == performance.navigation.TYPE_RELOAD) return (
    //         alert('Algo salio mal.'),
    //         window.location = `/eventDetailsUsuario/${input.event_id}`
    //     )
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[])

    useEffect(() => {
        if (commentedBefore === true) setCanComment(false)
    },[commentedBefore])

    // Diego: Handler para la longitud minima del comentario
    useEffect(() => {
        setMinimumRequired(input.review.length >= 39 && input.review.length <= 300 ? true : false)
    },[input.review.length])


    function handleChange(e){
        if (e.target.name === 'checkbox') {
            setInput({
                ...input,
                checkbox: !input.checkbox
                });
        }
        else {
            setInput({
                ...input,
                [e.target.name]: e.target.value
                });
        
        }
    }


    async function handleSubmit(e){
        e.preventDefault();
        const { review, rating, user_id, event_id, checkbox } = input
        if (!rating || !review) return alert('Todos los campos son requeridos.')
        else if (review.length < 40 || review.length > 300) return alert('El comentario debe tener entre 40 y 300 caracteres.')
        else if (!checkbox) return alert('Es necesario que confirmes que tu comentario sigue nuestras normas.')
            else {
                axios.post('https://event-henryapp-backend.herokuapp.com/api/comment', {
                    review,
                    rating,
                    user_id,
                    event_id
                })
                setEditing(false)           
            }
    }
    return (       
        <div className={style.newCommentWrapper}>
            {
                !canComment ? (
                    <div className={style.newCommentSuccess}>
                        <img className={style.newCommentSuccessImg}src={error} alt="Error." />
                        <p>No puedes comentar dos veces en el mismo evento.</p> 
                        <Link to={`/eventDetailsUsuario/${input.event_id}`}>
                            <button className={style.newCommentButton}>Listo</button>
                        </Link>
                    </div>
                ) : (
                    editing ? (
                        <div className={style.newComment}>
                            <h2 className={style.newCommentTitle}>Agregar Comentario:</h2>
                            <form className={style.newCommentForm} onSubmit={e => handleSubmit(e)}>
                                <p>¡Cuéntanos cómo te fue en <b>{location.state.eventName.trim()}</b>!</p>
                                <div className={style.inputGrid}>
                                <label className={style.gridItem}> Calificacion*: </label>
                                <input className={style.gridItem} name='rating' type="number" min='1' max='5' placeholder='1-5' onChange={e => handleChange(e)}/>
                                <label className={style.gridItem}> Comentario*: </label>
                                <input className={style.gridItem} name='review' placeholder='Mínimo 40 caracteres, máximo 300.' onChange={e => handleChange(e)}/>
                                </div>
                                <p className={style.charactersRequired}> 
                                    {
                                        !minimumRequired ? (                                  
                                            <span className={style.notMinimumRequired}>
                                                {input.review.length}
                                            </span>
                                        ) : (
                                            <span className={style.minimumRequired}>
                                                {input.review.length}
                                            </span>
                                        )
                                    }
                                    /300
                                </p>
                                <br />
                                <div className={style.confirmation}>
                                    <label className={style.newCommentConfirmation}>
                                    <input type="checkbox" name='checkbox' className={style.newCommentCheckbox} onChange={e => handleChange(e)}/>
                                    Confirmo que mi comentario respeta las normas del sitio.
                                    </label>
                                </div>
                                <br />
                                <button type='submit' className={style.newCommentButton}>Enviar</button>                            
                            </form>
                        </div>
                    ) : (
                        <div className={style.newCommentSuccess}>
                            <img className={style.newCommentSuccessImg}src={success} alt="Fue un éxito." />
                            <p>Gracias por compartir tu opinión!</p> 
                            <Link to={`/eventDetailsUsuario/${input.event_id}`}>
                                <button className={style.newCommentButton}>Listo</button>
                            </Link>
                        </div>
                    )
                )
            }
        </div>
    )
}

