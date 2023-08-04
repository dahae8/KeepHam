/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

function KakaoMap() {
  const mapRef = useRef<any>(null);

  async function loadMapApi() {
    const mapApiPromise = new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=&autoload=false";
      document.head.appendChild(script);
      script.onload = () => {
        resolve("카카오맵 로드 완료!");
      };
    });

    const result = await mapApiPromise;

    alert(result);

    window.kakao.maps.load(() => {
      if (mapRef.current) {
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 10,
        };

        mapRef.current = new window.kakao.maps.Map(mapRef.current, options);
        // setMap(new window.kakao.maps.Map(mapRef.current, options));
      }
    });

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch("이태원 맛집", placesSearchCB);
  }

  function placesSearchCB(data: any, status: any) {
    console.log("test");

    if (status === window.kakao.maps.services.Status.OK) {
      for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
      }
    }
  }

  // useEffect(() => {

  // }, []);

  loadMapApi();

  return (
    <>
      <div ref={mapRef} className="w-[500px] h-[500px]"></div>
    </>
  );
}

export default KakaoMap;
