import React from 'react';
import { IP_CONFIG } from '../../../../../config';
import './ModalContentBox.scss';

interface PropsTypes {
  cartId: number;
  product: string;
  getThumbnail: string;
  shooseSize: string;
  quantity: number;
  retailPrice: string;
  styleCode: string;
  discountPrice: string;
}

function ModalContentBox({
  cartId,
  product,
  getThumbnail,
  shooseSize,
  quantity,
  retailPrice,
  styleCode,
  discountPrice,
}: PropsTypes) {
  const deleteShoesItem = (event: any) => {
    const eventElement = event.nativeEvent.path[5];
    eventElement.innerHTML = '';
    // const deleteCartId = event.target.title;
    fetch(`${IP_CONFIG}/carts/${cartId}`, {
      method: 'DELETE',
      headers: {
        authorization: localStorage.getItem('token') || '',
      },
    }).then(response => response.json());
  };

  return (
    <div>
      <ul className="modalContentBox">
        <div>
          <img src={getThumbnail} className="modalImg" alt="나이키" />
        </div>
        <div className="modalInfo">
          <div className="modal">
            <p className="productName">{product}</p>
            <button type="button">
              <img
                role="presentation"
                src="/image/x.png"
                className="modalDelete"
                alt="삭제"
                title={String(cartId)}
                onClick={deleteShoesItem}
              />
            </button>
          </div>
          <div>스타일 : {styleCode}</div>
          <div>사이즈 : {shooseSize}</div>
          <div>수량: {quantity}</div>
          <div
            className={`modalDetailName ${
              discountPrice === null ? 'price0' : ''
            }`}
          >
            <div>
              <div className="retailPriceBox">
                {Number(retailPrice).toLocaleString()}원
              </div>
              <div className="modalDiscountRatio">
                {Math.floor(
                  (1 - Number(discountPrice) / Number(retailPrice)) * 100
                )}
                % off
              </div>
            </div>
            <div className="modalDiscountPrice">
              {' '}
              {Number(discountPrice).toLocaleString()}원
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
}

export default ModalContentBox;
