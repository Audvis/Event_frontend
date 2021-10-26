export default function validate(form) {
   
    let error = {};
    if(form.name.length < 3) error.name = true;
    if(form.description.length < 40) error.description = true;
    if(form.starring.length < 3) error.starring = true;
    if(form.pictures.length < 1) error.pictures = true;
    if(!form.country) error.country = true;
    if(!form.region) error.region = true;
    if(form.city.length < 3) error.city = true;
    if(!(/[A-Za-zÑñ.-]/.test(form.address) &&
        /\d/.test(form.address) &&
        /[' ']/.test(form.address)
        )) error.address = true
    if(!form.start_date) error.start_date = true;
    //SI ES RECURRENTE
    if(form.weekdays.length < 1) error.weekdays=true;  
    if(form.sectorize === 'no sectorizar'){
        if(!form.price) error.price=true;
        if(!form.ticket_limit) error.ticket_limit=true;
    }else if(form.sectorize === 'sectorizar sin croquis'){
        if(form.sectores.length < 1) error.sectores=true
    }else if(form.sectorize === 'sectorizar con croquis'){
        if(form.sectoresCroquis.length < 1) error.sectoresCroquis=true
    }
    if(form.schedule.length < 1) error.schedule=true;   
    if(!form.tags) error.tags=true;
    if(!form.age_rating) error.age_rating=true;


    return error;
};