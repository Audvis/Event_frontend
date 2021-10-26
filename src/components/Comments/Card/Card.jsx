import axios from 'axios'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { API } from '../../../actions/actions'
import './Card.css'

export default function Card({ name, rating, review }) {
    const [deleted, setDeleted] = useState(false)

    const userInfo = useSelector(state => state.userState)
    const params = useParams()

    const { id } = params

// dispatch(changemodal(warning, ))

    const deleteComment = async () => {
        try {
            const comments = await axios.get(`${API}event/${id}`)
            let arr = comments.data.consult.comments
            let arr2 = arr.filter(el => el.userId === userInfo.id)
            await axios({
                method: 'DELETE',
                url: `${API}comment/delete`,
                data: {
                commentId: arr2[0].id
                }
            })            
            setDeleted(true)
        } catch (error) {
            console.log('bark bark bark', error)
        }
    }

    return (
        <div className='comment-card'>
            {
                deleted ? (
                    <>
                        <div className='comment-top-half'>                        
                        </div>
                        <div className='comment-bottom-half'>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Este comentario fue eliminado.</p>
                        </div>
                    </>
                ) : (
                    <>
            <div className='comment-top-half'>
                <span>{name}</span>
                &nbsp;
                <span className='stars'>{rating}</span>
                {
                    userInfo.fullName === name ? (
                        <span className='deleteComment' onClick={() => deleteComment()}>Eliminar</span>
                    ) : (
                        <span></span>
                    )
                }
            </div>
            <div className='comment-bottom-half'>
                <p>{review}</p>
            </div>
                    </>
                )
            }
        </div>
    )
}
