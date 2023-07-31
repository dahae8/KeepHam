import React, { useEffect } from "react";
import loadKakaoMapScript from "../kakaoMap";

declare global {
  interface Window {
    kakao: any;
  }
}

const MapComponent: React.FC = () => {
  useEffect(() => {
    const container = document.getElementById("map");
    loadKakaoMapScript(() => {
      if (window.kakao && window.kakao.maps) {
        console.log("여긴된다");
        const options = {
          center: new (window as any).kakao.maps.LatLng(37.5665, 126.978),
          level: 10,
        };
        console.log("로드되냐");
        new (window as any).kakao.maps.Map(container, options);
      } else {
        console.error("카카오 지도 API를 로드할 수 없습니다.");
      }
    });
  }, []);

  return <div id="map" style={{ width: "100px", height: "500px" }} />;
};

export default MapComponent;
