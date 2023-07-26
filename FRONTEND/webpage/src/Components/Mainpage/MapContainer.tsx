import React, { useEffect } from "react";
import loadKakaoMapScript from "../kakaoMap";

const MapComponent: React.FC = () => {
  useEffect(() => {
    loadKakaoMapScript(() => {
      if (window.kakao && window.kakao.maps) {
        const container = document.getElementById("map");
        const options = {
          center: new (window as any).kakao.maps.LatLng(37.5665, 126.978),
          level: 10,
        };
        new (window as any).kakao.maps.Map(container, options);
      } else {
        console.error("카카오 지도 API를 로드할 수 없습니다.");
      }
    });
  }, []);

  return <div id="map" style={{ width: "100%", height: "500px" }} />;
};

export default MapComponent;
