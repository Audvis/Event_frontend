import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { searchName, getEvents } from '../../actions/actions';


export function Search(props){
    const [input, setInput] = useState({
        name:''
    })
    const stateHome = useSelector(state => state.home)
    const get = props.getEvents
    useEffect(() => {
        props.getEvents()
      }, [get])
    const handleChange = (e) =>{
        setInput({...input,[e.target.name]:e.target.value})
    }
    const handleClick = (e) =>{
        e.preventDefault()
        let aux = stateHome.filter((e)=> e.name.toLowerCase().includes(input.name.toLowerCase()))
        if(aux.length === 0){
            aux = undefined
        }else{
            aux = aux
        }
        props.search(aux)
        setInput({name:''})
        // console.log(input.name,'input')
    }

    return (
        <from>
            <div>
            <input type='search' name='name' value={input.name} onChange={handleChange} placeholder='Buscar..' />
            <button className="regularBtn" type='submit' onClick={handleClick} >BUSCAR</button>
            </div>
        </from>
    )
}
function mapDispatchToProps(dispatch){
    return{
        search: (name) => dispatch(searchName(name)),
        getEvents: () => dispatch(getEvents())
    }
}
export default connect(null,mapDispatchToProps)(Search);