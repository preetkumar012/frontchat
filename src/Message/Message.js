import React,{useState, useEffect} from 'react'
import "./message.css"

const Message = ({user,message, classs, classes}) => {
    const [date, setDate]=useState(new Date());

    useEffect(()=>{
        var timer= setInterval(() =>setDate(new Date()), 1000);
        return function cleanup(){
            clearInterval(timer);
        }
    })
    if(user){
        return (
            <>
            <div className=  {`messageBox ${classs}`}>{`${user}:${message}`} </div>
            <div className={`${classes}`} >
             <img src='./Images/us.jpg' alt='logo' style={{"width":"50px", "height":"50px", "borderRadius":"50%", "marginTop":"1rem"}}/>
         
            </div>
         
        
            </>
          )

    }
    else{
        return (
            <>
             <div className={`messageBox ${classs} `}>{`you: ${message}`} </div>
            {/* <img src='./Images/us.jpg' alt='logo' className='message-section'/> */}
             <div className={`${classes}`}>
             <img src='./Images/us.jpg' alt='logo' style={{"width":"50px", "height":"50px", "borderRadius":"50%", "marginTop":"1rem"}}/>
             <br/>
             <br/>
             <p className='date-time-style'> <b>{date.toLocaleDateString()} </b><br/><b className='text-danger'>{date.toLocaleTimeString()}</b></p>
             </div>
            
            </>
           
          )
    }
 
}

export default Message;