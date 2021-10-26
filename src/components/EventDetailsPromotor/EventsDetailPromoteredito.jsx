import {useState, useEffect} from 'react'
import  {useDispatch , useSelector} from 'react-redux'
import {getEventDetail} from '../../actions/actions'

//dafne: es para poder editar los eventos  

function EditDetail (){
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getEventDetail())
    }, [dispatch])
    console.log('soy get',getEventDetail)
    const detailsEvent=useSelector(state => state.detailsEvent)

    console.log('soy detalle',detailsEvent)
    useEffect(()=>{
        dispatch()
    })

    const handleEdit = (e) =>{
        e.prevent.default();
        // const newName= detailsEvent.name;
        // const  newDescription = detailsEvent.description;
        // const  newStarring =detailsEvent.starring
        // const newImg =detailsEvent.img ;
        // const newLocation = detailsEvent.location;
        // const newStart_date = detailsEvent.start_date;
        // const  newFinish_date= detailsEvent.finish_date;
        // const  newSchedule = detailsEvent.schedule;
        // const newWeekdays = detailsEvent.weekdays;
        // const newTags = detailsEvent.tags;
        // const newAge_rating = detailsEvent.age_rating;
        // const newprice = detailsEvent.price;
        // const newLimit = detailsEvent.limit

    }
   
    const data ={
        newName,
        newDescription,
        newImg,
        newLocation,
        newStart_date,
        newFinish_date,
        newSchedule,
        newTags,
        newAge_rating,
        newPrice,
        newLimit,
        newStarring,
        newWeekdays,
    }


    return(
        <>
        <diV>
            

        </diV>
        </>
    )
 
}
export default EditDetail