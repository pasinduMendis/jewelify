import axios from "axios";
import FormData from "form-data"

 const Test= ()=>{
   
/* const pdf=require('../public/pdf/testPdf.pdf')
   
        const form = new FormData();
form.append('file', pdf, {
    filepath: '/public/pdf/testPdf.pdf',
    contentType: 'application/pdf',
}); */
const sendMail=async ()=>{

    const pdf2base64 = require('pdf-to-base64');
    pdf2base64("https://jewelify.s3.us-east-2.amazonaws.com/testPdf.pdf")
        .then(
            async (response) => {
                
    const params = {
        service_id: "service_td1ge5n",
        template_id: "template_uqt2oha",
        accessToken: "-L4-14eRhemMRgdavcaLG",
        user_id: "AfVOYQ8ZwAoTPryZa",
        template_params: {
          pdfName: "aaa",
          mypdf:response
        },
        
      };
      await axios.post("https://api.emailjs.com/api/v1.0/email/send", params).then(
        (response) => {
          if(response.data=="SUCCESS! OK"){
            
          }
          console.log("SUCCESS!", response.data,);
        },
        (err) => {
          console.log("FAILED...", err);
        }
      );
            }
        )
        .catch(
            (error) => {
                console.log(error); //Exepection error....
            }
        )

      }

      return <>
      <button className='btn btn-primary btn-lg' onClick={()=>sendMail()}>send email</button>
      </>
}
export default Test