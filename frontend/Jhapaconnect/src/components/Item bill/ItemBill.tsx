import React, { useEffect, useState } from 'react'
import "./itembill.css"
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { authToken } from '../../../root/pages/loginauth';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const ItemBill = () => {
    const [loader, setLoader] = useState(false);
    const [billdata,setBilldata] =useState([]);
    const [loading,setLoading] = useState(false)
    const [seller,setSeller] = useState([])
    const localStorageData = localStorage.getItem('data');


    const parsedData = JSON.parse(localStorageData);
  
    const userData = parsedData.data.user;
  
   
    const iid = useParams();
    const Id = iid.Id;
  

    useEffect(()=>{
        getItemDetails();
    },[])

    const getItemDetails = async ()=>{
        if(localStorage.getItem("jwtToken")){
            authToken(localStorage.getItem("jwtToken"))
            await axios.get(`http://localhost:8080/api/v1/auth/item/${Id}`).then((res)=>{
              console.log(res.data)
              setBilldata(res.data)
              setSeller(res.data.user)
              console.log(seller)
        })
        }
    }
    const { id, title, description, price, location, addedDate, category, imageName, user } = billdata;
   


    const downloadPDF = () =>{
      const capture = document.querySelector('.actual-receipt');
      setLoader(true);
      html2canvas(capture).then((canvas)=>{
        const imgData = canvas.toDataURL('img/png');
        const doc = new jsPDF('p', 'mm', 'a4');
        const componentWidth = doc.internal.pageSize.getWidth();
        const componentHeight = doc.internal.pageSize.getHeight();
        doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
        setLoader(false);
        doc.save('receipt.pdf');
      })
    }

  
    return (
      <div className="wrapper">
  
        <div className="receipt-box">
  
            <div className="actual-receipt">
  
              <div className="receipt-organization-logo">
                <img src="/assets/icons/connect.png"  />
              </div>
  
              <h5>People Connect</h5>
  
              <h6>
                ABC Street
                {' '}
                123
              </h6>
  
              <h6>
             
                75050
              </h6>
  
              <div className="phone-and-website">
                {/* <p>
                  {user.email &&
                  <a href={`mailto:${user.email}`}>
                    {user.email}
                  </a>
                  }
                </p> */}
                <p>01234567890</p>
             
                    
              </div>
  
              <div className="colored-row first">
                <span>Payment Method</span>
                <span>Card Number</span>
              </div>
  
              <div className="data-row">
                <span className="font-weight">CREDIT</span>
                <span>************4444</span>
              </div>
  
              <div className="colored-row">
                <span>Item</span>
                <span>Amount</span>
              </div>
  
              <div className="data-row">
                <span className="font-weight">{title}</span>
                <span>
                  $
                  {' '}
                  {price}
                </span>
              </div>

              
              <div className="colored-row">
                <span>Vendor Name</span>
              </div>

              <div className="data-row border-bottom">

                <span className="font-weight">
                  {seller.firstName} {seller.lastName}
                 </span>

                <span>
                  {' '}
                  {seller.email}
                </span>

              </div>

              <div className='data-row border-bottom'>
                <span>
                  <span className="font-weight">
                    Location
                    :
                  </span>
                  {' '}
                  {seller.location}
                </span>

                <span >
                    Phone no:
                    {' '}

                    {seller.phoneNo}

                  </span>
              </div>
  
              <div className="colored-row">
                <span>Transaction Details </span>
                <span />
              </div>
  
              <div className="data-row border-bottom">
                <span>
                  <span className="font-weight">
                    MID
                    :
                  </span>
                  {' '}
                  1234567
                </span>
                <span>
                  <span className="font-weight">
                    Sequence
                    {' '}
                    #:
                  </span>
                  {' '}
                  SSSSSSSS
                </span>
              </div>
  
              <div className="data-row border-bottom">
                <span>
                  <span className="font-weight">
                    Invoice
                    {' '}
                    #:
                  </span>
                  {' '}
                  AX1234ZVB5671234
                </span>
                <span>
                  <span className="font-weight">
                    Created
                    :
                  </span>
                  {' '}
                  2023-02-14 02:21:37
                </span>
              </div>
              <div className="data-row border-bottom">
                <span>
                  <span className="font-weight">
                    Authentication
                    {' '}
                    #:
                  </span>
                  {' '}
                  TEST
                </span>
                <span>
                  <span className="font-weight">
                    Batch
                    {' '}
                    #:
                  </span>
                  {' '}
                  1234
                </span>
              </div>
              <div className="data-row border-bottom">
                <span className="font-weight">
                  Transaction:
                  {' '}
                  APPROVED - 00
                </span>
                <span />
              </div>
              <div className="colored-row">
                <span>Thank You For Choosing us</span>
                <span />
              </div>
  
            </div>
            {/* end of actual receipt */}
  
            {/* receipt action */}
            <div className="receipt-actions-div">
              <div className="actions-right">
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
        
      </div>
    )
}

export default ItemBill
