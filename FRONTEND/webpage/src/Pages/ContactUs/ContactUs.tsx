import Grid from "@mui/material/Grid";
import Wrapper from "@/Pages/ContactUs/styles.tsx";
function ContactUs() {
  return (
    <div className="container">
      <Wrapper>
        <Grid className="subject">Contact Us</Grid>
        <Grid container className="info">
          <Grid xs={12} sm={6} md={3} item>
            <Grid className="img">
              <img src="/images/contact_us_img_1.png" alt="" />
            </Grid>
            <Grid className="title">CALL</Grid>
            <Grid className="text">062-0000-0000</Grid>
          </Grid>
          <Grid xs={12} sm={6} md={3} item>
            <Grid className="img">
              <img src="/images/contact_us_img_2.png" alt="" />
            </Grid>
            <Grid className="title">E-MAIL</Grid>
            <Grid className="text">KeepHam@gmail.com</Grid>
          </Grid>
          <Grid xs={12} sm={6} md={3} item>
            <Grid className="img">
              <img src="/images/contact_us_img_3.png" alt="" />
            </Grid>
            <Grid className="title">FAX</Grid>
            <Grid className="text">062-0000-0000</Grid>
          </Grid>
          <Grid xs={12} sm={6} md={3} item>
            <Grid className="img">
              <img src="/images/contact_us_img_4.png" alt="" />
            </Grid>
            <Grid className="title">ADDRESS</Grid>
            <Grid className="text">
              광주광역시 광산구
              <br />
              하남산단 6번로 107
            </Grid>
          </Grid>
        </Grid>
      </Wrapper>
    </div>
  );
}

export default ContactUs;
