import { useEffect } from "react";
import loadKakaoMapScript from "./KakaoMap.tsx";

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
        console.log("KakaoMap SDK has been loaded successfully.");
        const options = {
          center: new (window as any).kakao.maps.LatLng(37.5665, 126.978),
          level: 10,
        };
        new (window as any).kakao.maps.Map(container, options);
      } else {
        console.error("Failed to load KakaoMap SDK.");
      }
    });
  }, []);

  return <div id="map" style={{ width: "500px", height: "300px" }} />;
};

export default MapComponent;
