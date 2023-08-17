
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
                  navigate('/Home/AboutMe');
                  window.scrollTo(0, 0);
                }}
              >
                Keep함이란
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
            <li>Gwangju SSAFY Campus | CEO : Lee Sung Yeon</li>
            <li>
            광주광역시 광산구 하남산단 6번로 107
            </li>
            <li>Tel 02-0000-0000 | Fax 02-0000-0000</li>
          </ul>
          <p>Copyright by Multicampus Co., Ltd. All rights reserved.</p>
        </Grid>
        <Grid item sm={12} md={4} className="right-box">
          <Grid className="text-box">
            <h2>For Help</h2>
            <h3>KeepHam@gmail.com</h3>
            <h4>Contact Out Customer Support Team</h4>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  )
  
}

export default Footer;



