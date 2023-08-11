import React, { useState } from 'react';
import Bootpay from '@bootpay/client-js';
import './Point.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Point() {

  const navigate = useNavigate();
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  const handlePayClick = async () => {
    if (!selectedPrice) {
      alert("충전 금액을 선택하세요.");
      return;
    }

    try {
      const response = await Bootpay.requestPayment({
        application_id: "64d0a56900be04001c699403",
        price: Number(selectedPrice),
        order_name: "테스트결제",
        order_id: "TEST_ORDER_ID",
        extra: {
          open_type: "iframe",
        },
      });

      
      const AccessToken = localStorage.getItem("AccessToken");
      console.log('AccessToken', AccessToken)

      const fetchPayment = async () => {
        try {
          const url = import.meta.env.VITE_URL_ADDRESS + "/api/payment/charge";
          const response2 = await axios.post(url,
            {
              price: response.data.price,
              receiptId: response.data.receipt_id,
            },
            {
              headers:{
              Authorization: `Bearer ` + AccessToken}
            },
          );
          console.log('response2.date.body', response2.data.body);
    
          console.log('response2', response2);
    
        } catch (error) {
          console.log(error);
        }
      };

      switch (response.event) {
        case "issued":
          // 가상계좌 입금 완료 처리
          break;
        case "done":
          console.log(response);
          fetchPayment();
          
          alert("결제가 완료되었습니다.")
          navigate('/Home/UserInfo')
          
          // 결제 완료 처리
          break;
        case "confirm": //payload.extra.separately_confirmed = true; 일 경우 승인 전 해당 이벤트가 호출됨
          console.log(response.receipt_id);
          /**
           * 1. 클라이언트 승인을 하고자 할때
           * // validationQuantityFromServer(); //예시) 재고확인과 같은 내부 로직을 처리하기 한다.
           */
          const confirmedData = await Bootpay.confirm(); //결제를 승인한다
          if (confirmedData.event === "done") {
            //결제 성공
          }

          /**
           * 2. 서버 승인을 하고자 할때
           * // requestServerConfirm(); //예시) 서버 승인을 할 수 있도록  API를 호출한다. 서버에서는 재고확인과 로직 검증 후 서버승인을 요청한다.
           * Bootpay.destroy(); //결제창을 닫는다.
           */
          break;
        default:
            break;
      }
    } catch (e) {
        // // 결제 진행중 오류 발생
        // // e.error_code - 부트페이 오류 코드
        // // e.pg_error_code - PG 오류 코드
        // // e.message - 오류 내용
        // console.log(e.message);
        // switch (e.event) {
        //   case "cancel":
        //     // 사용자가 결제창을 닫을때 호출
        //     console.log(e.message);
        //     break;
        //   case "error":
        //     // 결제 승인 중 오류 발생시 호출
        //     console.log(e.error_code);
        //     break;
        //   default:
        //     break;
        // }
      }
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPrice(event.target.value);
  };

  return (
    <div className="container">
      <div>
        <h2 style={{ fontWeight: 'bold' }}>포인트 충전</h2>
        <div className="select">
          <input type="radio" name="cp_item" id="5000" value="5000" onChange={handlePriceChange} />
          <label htmlFor="5000"><span>5,000원</span></label>
          <input type="radio" name="cp_item" id="10000" value="10000" onChange={handlePriceChange} />
          <label htmlFor="10000"><span>10,000원</span></label>
          <input type="radio" name="cp_item" id="15000" value="15000" onChange={handlePriceChange} />
          <label htmlFor="15000"><span>15,000원</span></label>
          <br></br>
          <input type="radio" name="cp_item" id="20000" value="20000" onChange={handlePriceChange} />
          <label htmlFor="20000"><span>20,000원</span></label>
          <input type="radio" name="cp_item" id="25000" value="25000" onChange={handlePriceChange} />
          <label htmlFor="25000"><span>25,000원</span></label>
          <input type="radio" name="cp_item" id="30000" value="30000" onChange={handlePriceChange} />
          <label htmlFor="30000"><span>30,000원</span></label>
          <br></br>
          <input type="radio" name="cp_item" id="35000" value="35000" onChange={handlePriceChange} />
          <label htmlFor="35000"><span>35,000원</span></label>
          <input type="radio" name="cp_item" id="40000" value="40000" onChange={handlePriceChange} />
          <label htmlFor="40000"><span>40,000원</span></label>
          <input type="radio" name="cp_item" id="50000" value="50000" onChange={handlePriceChange} />
          <label htmlFor="50000"><span>50,000원</span></label>
          {/* 나머지 입력란도 동일하게 처리 */}
        </div>
        <p style={{ color: 'blue', marginTop: '30px' }}>최소 충전금액은 5,000원이며<br />최대 충전금액은 50,000원 입니다.</p>
        <br />
        <button type="button" className="btn btn-lg btn-block btn-primary" id="payButton" onClick={handlePayClick}>충전하기</button>
      </div>
    </div>
  );
}

export default Point;
