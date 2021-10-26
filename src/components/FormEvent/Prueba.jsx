import React, { useState } from 'react'

 function Prueba(){
    // console.log('soy PRUEBA')
    const [img, setImg] = useState([]);
    const [load, setLoad] = useState(false)
    // const cloud_name = 'event-pf';
    // const upload_preset = 'cloudinary_event';
    const click = async(e)=>{
        const  files  = e.target.files
        const data = new FormData();
        data.append('file',files[0]);
        data.append('upload_preset','cloudinary_event')
        setLoad(true)
        const op = { method:'POST',body:data}
        //https://api.cloudinary.com/v1_1/event-pf/image/upload
        const res = await fetch(`https://api.cloudinary.com/v1_1/event-pf/image/upload`, op)
        const file = await res.json();
        console.log('soy file',file)
        setImg([...img,file.secure_url])
        console.log(file.secure_url,'img',img)
    }
    // console.log(img,'img')
    return(
        <div>
        <input type="file" className="app_uploadInput" onChange={click} />
        <br/>
        {img && img.map((i)=>{
            return <img src={i} alt='foto' width='150px'/>
        })}
 {/* <img src={img} className="app_uploadedImg" alt="" /> */}
 {/* <button className="app_uploadButton" >Upload</button> */}
        </div>
    )
}
export default Prueba