import { useEffect, useRef } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

function KakaoMap() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);

  async function loadMapApi() {
    const mapApiPromise = new Promise((resolve) => {
      const script = document.createElement("script");
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=ae6ec333dd28b629021d3a3d4e122d34&autoload=false";
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
  }

  useEffect(() => {
    loadMapApi();
  }, []);

  return (
    <>
      <div ref={mapRef} className="w-[500px] h-[500px]"></div>
    </>
  );
}

export default KakaoMap;
