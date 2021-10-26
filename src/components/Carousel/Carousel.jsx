import React, { useEffect, useRef, useState } from "react";
import styles from './Carousel.module.css'
//import {ReactComponent as Left} from '../../Utilities/left.svg'
import left from '../../Utilities/left.svg'
//import {ReactComponent as Right} from '../../Utilities/right.svg'
import right from '../../Utilities/right.svg'
//import styled from 'styled-components';
import Slide from "./Slide";
import { API } from "../../actions/actions";
import axios from "axios";
import spinner from '../../Utilities/spinner.gif'
import {Link} from 'react-router-dom'
//import { useDispatch, useSelector } from "react-redux";




const Carousel = ()=>{
    const slideShow = useRef(null);
    const intervaloSlideShow = useRef(null);
    const [data, setData] = useState([])
    //const dispatch = useDispatch()
    //const detailsEvent = useSelector(state.detailsEvent)
    useEffect(()=>{
        const getEvents = async()=>{
            const data = await axios(`${API}main`) 
            console.log(data.data, 'soyyyy yoooo soyyy yooooo')
            setData(data.data)
        }
        getEvents()
    },[])
    const next = ()=>{
        if(slideShow.current?.children.length > 0){// comprobamos si el slide tiene elementos
            const firstElement = slideShow.current.children[0]// obtengo el primer elemento
            slideShow.current.style.transition = `800ms ease-out all`
            const sizeSlide = slideShow.current.children[0].offsetWidth;
            slideShow.current.style.transform = `translateX(-${sizeSlide}px)`

            const transi = ()=>{
                slideShow.current.style.transition='none';
                slideShow.current.style.transform=`translateX(0px)`;
                //primer elemento al final
                slideShow.current.appendChild(firstElement)
                slideShow.current.removeEventListener('transitionend', transi)
            }
            //eventlistener para cuando termine la animacion
            slideShow.current.addEventListener('transitionend', transi)
        } 
    }
    
    const previous = ()=>{
        if(slideShow.current?.children.length > 0){
            const endElement = slideShow.current.children[slideShow.current.children.length-1]
            slideShow.current.insertBefore(endElement, slideShow.current.firstChild)

            slideShow.current.style.transition='none';
            const sizeSlide = slideShow.current.children[0].offsetWidth;
            slideShow.current.style.transform = `translateX(-${sizeSlide}px)`;

            setTimeout(()=>{
                slideShow.current.style.transition = `800ms ease-out all`;
                slideShow.current.style.transform = `translateX(0)`;
            },30)
            
        }
    }


    useEffect(()=>{
        const remove = ()=>{
            intervaloSlideShow.current = setInterval(() => {
                next();
            }, 5000);
        }
        intervaloSlideShow.current = setInterval(() => {
            next();
        }, 5000);

        slideShow.current.addEventListener('mouseenter',()=>{
            clearInterval(intervaloSlideShow.current)
        });
        slideShow.current.addEventListener('mouseleave', remove); 
    },[])

    return(
 
        <div className={styles.contMain}>
            <div className={styles.contSlideShow} ref={slideShow}>
                
                {
                    data.length? (data.map(e=>
                        <Slide key={e.id} img={e.pictures[0]} name={e.name} id={e.id} />
                    )
                ) : (
                        <img className={styles.spinner} src={spinner} alt="Loading..." />
                )
                }
            </div>
            <div className={styles.control}>
                <button className={styles.left} onClick={previous}>
                    <img src={left} alt="" />
                </button>
                <button className={styles.right} onClick={next}>
                    <img src={right} alt="" />
                </button>
                
            </div>
        </div>
    )
}





export default Carousel