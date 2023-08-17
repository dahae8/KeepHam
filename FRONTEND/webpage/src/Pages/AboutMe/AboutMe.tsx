import Grid from "@mui/material/Grid";
import Wrapper from "@/Pages/AboutMe/styles.tsx";

function AboutMe() {
  return (
    <div className="container">
      <Wrapper>
        <Grid className="about-me">
          <h2>ABOUT US</h2>
          <Grid className="picture"></Grid>
          <h3>아이오티-실버타운</h3>
          <h2>Keep함이란?</h2>
          <Grid container className="license">
            <Grid item xs={12} md={4}>
              <Grid className="license-img">
                <img src="/images/about_me_img_3.png" alt="license_img" />
              </Grid>
              <h2>인원모집</h2>
              <p>같이 주문할 사람을 찾아다닐 필요가 없습니다.</p>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid className="license-img">
                <img src="/images/about_me_img_4.png" alt="license_img" />
              </Grid>
              <h2>메뉴취합</h2>
              <p>한 명, 한 명 선택한 메뉴를 확인할 필요가 없습니다.</p>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid className="license-img">
                <img src="/images/about_me_img_5.png" alt="license_img" />
              </Grid>
              <h2>편한 정산</h2>
              <p>수령을 확인하면 즉시 정산할 수 있습니다.</p>
            </Grid>
          </Grid>
        </Grid>
      </Wrapper>
    </div>
  );
}

export default AboutMe;
