export default function validate(form) {
    let pass = {};
    //console.log(form);
    if (!(/^\S+@\S+\.[a-z]+$/.test(form.email))) pass.email = true
    //console.log(form.country);

    if(form.country === 'Argentina') {
        //console.log('................',form.tax_id);
        if(!(/^([0-9]{2}-[0-9]{8}-[0-9])$|^([0-9]{11})$/.test(form.tax_id)))  pass.tax_id = true;
    }else if(form.country === 'Colombia') {
        if(!(/^([0-9]{9}-[0-9]{1})$|^([0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{1})$/.test(form.tax_id))) pass.tax_id = true;
    }else if(form.country === 'Mexico') {
        if(!(/^[A-ZÑ&]{3,4}\d{6}(?:[A-Z\d]{3})?$/.test(form.tax_id))) pass.tax_id = true;
    }

    if(form.country.length < 3) pass.country = true;

    if(form.state.length < 3) pass.state = true;

    if(form.city.length < 3) pass.city = true;

    if(form.business_type < 3) pass.business_type = true;

    if(form.business_name.length < 3) pass.business_name = true;

    if(form.legal_name.length  < 3) pass.legal_name = true;

    if(form.promoter_name.length  < 2) pass.promoter_name = true;

    if(form.promoter_lastName.length  < 2) pass.promoter_lastName = true;

    if(!(/[A-Za-zÑñ.-]/.test(form.address) &&
        /\d/.test(form.address) &&
        /[' ']/.test(form.address)
        )) pass.address = true

    if (!(/['+']*[0-9]{7,}/.test(form.phone))) pass.phone = true;


    if(!(/[A-Za-zÑñ.-]/.test(form.password) &&
        /\d/.test(form.password) &&
        form.password.length >= 6
        )) pass.password = true;

    if(!(form.repeat.length >= 6 && form.repeat === form.password)) pass.repeat = true;

    return pass;
};