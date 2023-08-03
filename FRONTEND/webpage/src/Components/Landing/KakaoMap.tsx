const loadKakaoMapScript = (callback: () => void) => {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=d0845b17f7524197f834876a2b8d46da&autoload=false`;
  script.onload = callback;
  document.head.appendChild(script);
};

export default loadKakaoMapScript;
