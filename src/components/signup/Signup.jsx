import React, { useContext, useEffect, useState } from 'react'
import './Signup.css'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap'
import { firebaseContext } from '../../contexts/FirebaseContext'
import {LocationDetails} from '../../utilities/categoryUrls'
import { getAuth, RecaptchaVerifier, GoogleAuthProvider, FacebookAuthProvider, signInWithPhoneNumber, signInWithPopup } from "firebase/auth";
import axios from 'axios'
function Signup() {

  const [phone, setPhone] = useState('');
  const [countryCode,setCountryCode] = useState('');
  const [phoneErr, setPhoneErr] = useState('')
  const [otpBox, setOtpBox] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpErr, setOtpErr] = useState('')
  const { firebase } = useContext(firebaseContext);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(()=>{
    axios.get(LocationDetails).then((countryDetails)=>{
      setCountryCode(countryDetails.data.country_calling_code)
    }).catch((error)=>{
      console.log(error);
    })
  },[])

  //Function to generate recaptcha
  const generateRecaptcha = () => {
    console.log('recaptcha');
    window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
      'size': 'invisible'
    }, auth);
  }

  //function to get otp
  const getOtp = () => {
    let phoneNumber = countryCode + phone;
    console.log(phoneNumber);
    if (phone.length < 10 || phone.length > 12) {
      setPhoneErr('Enter a valid mobile number.')
    }
    else {

      setPhoneErr('')
      let appVerifier = window.recaptchaVerifier;
      generateRecaptcha();
      document.getElementById('button-addon2').click();
      signInWithPhoneNumber(auth, phoneNumber, appVerifier).then((result) => {
        //otp will be send to the entered phone number
        setOtpBox(true);
        window.confirmResult = result;
      }).catch((error)=>{

        console.error('error ===== '+error.message);
      })

    }

  }

  //function to verify otp 
  const submitOtp = () => { 
    if(otp.length !== 6){
      setOtpErr('Enter a valid OTP.')
    }
    else{

      setOtpErr('')
      let confirmationResult = window.confirmResult
      confirmationResult.confirm(otp).then((result)=>{
        //if entered correct otp - navigated to home
        navigate('/')
      }).catch((error)=>{
        setOtpErr('Enter a valid OTP.')
      })

    }
  }

  //function for google authentication
  const googleLogin = () => {
    const google_provider = new GoogleAuthProvider();

    signInWithPopup(auth, google_provider).then((result) => {
      navigate('/')

    }).catch((error) => {

      console.log(error);

    })
  }

  //function for facebook authentication
  const facebookLogin = () => {
    const facebook_provider = new FacebookAuthProvider();

    signInWithPopup(auth, facebook_provider).then((result) => {
      navigate('/')

    }).catch((error) => {

      console.log(error);

    })
  }

  return (
    <div className='signup'>
      <Container className='signup-content'>
        <h1 className='title'>Unlimited movies, TV shows and more.</h1>
        <div className="support-text">Watch anywhere at anytime.</div>
        <div className="signup-form p-4 text-center">

          <Row className='mb-3'>
            <Col xs={12}>
              {otpBox ? 
              <InputGroup className="mb-3">
                <Form.Control type='text' placeholder="Enter OTP" onChange={(e) => setOtp(e.target.value)} aria-label="Recipient's username" aria-describedby="basic-addon2" />
                <Button variant='danger' className='signup-btn' id="button-addon2" onClick={submitOtp}>Verify OTP</Button><br />
                <span class='error'>{otpErr}</span>
              </InputGroup> 
              : 
              <InputGroup className="mb-3">
                <InputGroup.Text>{countryCode}</InputGroup.Text>
                <Form.Control type='tel' placeholder="Mobile Number..." onChange={(e) => setPhone(e.target.value)} aria-label="Recipient's username" aria-describedby="basic-addon2" />
                <Button variant='danger' className='signup-btn' id="button-addon2" onClick={getOtp}>Get Started</Button><br />
                <span class='error'>{phoneErr}</span>
              </InputGroup>}
            </Col>
          </Row>



          <Row className='mb-4'><Col xs={12}><h6 style={{ 'color': '#rgb(122 138 141)' }}>OR</h6></Col></Row>
          <button type="button" class="signup-with-btn google mb-3" onClick={googleLogin}>Sign In with Google</button>
          <button type="button" class="signup-with-btn facebook mb-3" onClick={facebookLogin}>Sign In with Facebook</button>
          <Row>
            <Col xs={12} className='mb-2'></Col>
          </Row>

        </div>
      </Container>
      <div id='sign-in-button'></div>
    </div>
  )
}

export default Signup
