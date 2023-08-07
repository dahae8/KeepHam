import React from 'react';
import Grid from '@mui/material/Grid'
import { useNavigate } from 'react-router-dom';
import Wrapper from './styles.tsx';



function Footer() {
  const navigate = useNavigate()

  return (
    <Wrapper>
      <Grid container className="footer">
        <Grid item sm={12} md={8} className="left-box">
          <ul className="page">
            <li>
              <span
                onClick={() => {
                  navigate('/Home/Terms');
                  window.scrollTo(0, 0);
                }}
              >
                Privacy Policy
              </span>
            </li>
            <li>
              <span
                onClick={() => {
                  navigate('/Home/AboutMe');
                  window.scrollTo(0, 0);
                }}
              >
                Developer Introduction
              </span>
            </li>
            <li>
              <span
                onClick={() => {
                  navigate('/Home/ContactUs');
                  window.scrollTo(0, 0);
                }}
              >
                Contact Us
              </span>
            </li>
          </ul>
          <ul className="info">
            <li>Samsung Multi Campus | CEO : Young Sang Kim</li>
            <li>
              212 Tehran-Ro, Gangnam-Gu, Seoul (Yeoksam-Dong 718-5 Address)
            </li>
            <li>Tel 02-2222-5566 | Fax 02-2233-6655</li>
          </ul>
          <p>Copyright by Multicampus Co., Ltd. All rights reserved.</p>
        </Grid>
        <Grid item sm={12} md={4} className="right-box">
          <Grid className="text-box">
            <h2>For Help</h2>
            <h3>help@samsungsupport.com</h3>
            <h4>Contact Out Customer Support Team</h4>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  )
  
}

export default Footer;



