import emailjs from 'emailjs-com'

const EmailFunction = async(data:any) =>{

    let promise = emailjs.sendForm('service_dt7yhod', 'template_b5y8ybu', data, 'kOZ_8kOaOBGMBY63h')
    .then((result) => {
        if(result.status==200){
            return true
        }
        return false

    }, (error) => {
        console.log(error)
        return false
    });
    return promise
}
export default EmailFunction