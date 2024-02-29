import React, { useEffect, useState } from 'react'
import "./event-ticket.css"
import html2canvas from 'html2canvas';
import { useParams } from 'react-router-dom';
import "./event-ticket.css"
import jsPDF from 'jspdf';
import { authToken } from '../../root/pages/loginauth';
import axios from 'axios';
const EventTicket = () => {

    const eid = useParams();
    const id =eid.Id;
    const localStorageData = localStorage.getItem('data');
    const parsedData = JSON.parse(localStorageData);
    const userData = parsedData.data.user;
    const userId = userData.id;
    const firstName = userData.firstName;
    const lastName = userData.lastName;
    const email = userData.email;
    const phoneNo = userData.phoneNo;

    const [ eventdata,setEventdata] = useState([]);

    const [loader, setLoader] = useState(false);

    const getEventdata = async () => {
        if (localStorage.getItem("jwtToken")) {
          authToken(localStorage.getItem("jwtToken"))
          const data = await axios.get(`http://localhost:8080/api/v1/auth/event/${id}`).then((res) => {
            setEventdata(res.data)
            console.log(res.data)
          })
        }
    
      }
    useEffect(()=>{
        getEventdata()
    },[])

    const downloadPDF = () =>{
        const capture = document.querySelector('.ticket-container');
        setLoader(true);
        html2canvas(capture).then((canvas)=>{
          const imgData = canvas.toDataURL('img/png');
          const doc = new jsPDF('p', 'mm', 'a4');
          const componentWidth = doc.internal.pageSize.getWidth();
          const componentHeight = doc.internal.pageSize.getHeight();
          doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
          setLoader(false);
          doc.save('event.pdf');
        })
      }
  return (
    <div className='event-ticket'>
        <div className='ticket-container'>
            <div className='ticket-upper'>
                <div className='company-section'>
                    <img src="/assets/icons/connect.png" width={35} height={35}/>
                    <span className='company-name'>People Connect</span>
                    <span className='company-address'>ABC street,123</span>

                </div>
                <div className='sucess-image'>
                    <img src="/assets/icons/sucess.png" width={30} height={30}/>
                </div>
                <div className='message-text'>
                    <span className='message-1'>
                        Congratulations!, You have sucessfully booked a ticket
                    </span>
                    <span className='message-2'>
                        Please carry this ticket while going to the event
                    </span>

                </div>

            </div>

            <div className='ticket-body'>
                <div className='id-section'>
                    <div>
                        <div>Ticket ID</div>
                    </div>

                    <div className='ticket-eventname'>
                        <span>Event Name</span>
                        <span className='name'>{eventdata.title}</span>

                    </div>
                </div>
                <div className='ticket-section'>
                    <div className='ticket-eventdate'>
                        <span>Date</span>
                        <span className='date'>{eventdata.startDate}- {eventdata.endDate}</span>
                    </div>

                    <div className='ticket-eventlocation'>
                        <span>Location</span>
                        <span className='location'>{eventdata.location}</span>
                    </div>
                </div>

                <hr/>

                <div className='ticket-user-detail'>
                    <span>Event attende details</span>
                    <div className='details'>
                        <div>
                            <span>{firstName} {lastName}</span>
                            <span>{phoneNo}</span>
                            <span>{email}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div>
            <button
                  className="receipt-modal-download-button"
                  onClick={downloadPDF}
                  disabled={!(loader===false)}
                >
                  {loader?(
                    <span>Downloading</span>
                  ):(
                    <span>Download</span>
                  )}
  
                </button> 
            </div>

        </div>
      
    </div>
  )
}

export default EventTicket
