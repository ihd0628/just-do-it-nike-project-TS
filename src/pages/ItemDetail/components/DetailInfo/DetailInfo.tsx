import React, { useState } from 'react';
import { IP_CONFIG } from '../../../../config';
import {
  ALREADY_EXIST_MESSAGE,
  OVERFLOW_HIDDEN,
  TOKEN,
} from '../../constantData/itemDetailConstant';
import { Product } from '../../types/ItemDetailTypes';
import Counter from './components/Counter/Counter';
import Review from './components/Review/Review';
import ShoesColor from './components/ShoesColor/ShoesColor';
import ShoesSize from './components/ShoesSize/ShoesSize';

interface PropsTypes {
  product: Product;
  accessToken: string;
  isWished: boolean;
  productId: string;
  setIsWished: React.Dispatch<React.SetStateAction<boolean>>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function DetailInfo({
  product,
  accessToken,
  isWished,
  setIsWished,
  productId,
  setModal,
}: PropsTypes) {
  const [reviewOpen, setReviewOpen] = useState(false);
  const [shooseSize, setShooseSize] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [quantity, setquantity] = useState(1);
  const [productOptionId, setProductOptionId] = useState(0);

  const openReview = () => {
    setReviewOpen(prev => !prev);
  };

  const wishSubmit = () => {
    fetch(`${IP_CONFIG}/wishlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: accessToken || '',
      },
      body: JSON.stringify({
        productId,
      }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.message === ALREADY_EXIST_MESSAGE) {
          alert('이미 wishList에 있는 항목입니다.');
        } else {
          setIsWished(prev => !prev);
        }
      });
  };

  const onDecrease = () => {
    setquantity(prevquantity => prevquantity - 1);
  };

  const orderSubmit = () => {
    fetch(`${IP_CONFIG}/orders`, {
      method: 'POST',
      headers: {
        authorization: localStorage?.getItem(TOKEN) || '',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        productOptionId,
        quantity,
      }),
    })
      .then(response => response.json())
      .then(result => alert(result.message));
  };

  const onIncrease = () => {
    let selectdSizesStock = 0;

    product?.productOptions.forEach(item => {
      if (Number(item.size) === Number(shooseSize)) {
        selectdSizesStock = item.stock;
        setProductOptionId(item.productOptionId);
      }
    });

    if (quantity < selectdSizesStock) {
      setquantity(prevquantity => prevquantity + 1);
    } else {
      alert('최대 구매 수량은 5개 입니다.');
    }
  };

  const openModal = () => {
    if (accessToken === null) {
      alert('로그인하세요');
    } else if (selectedId === '') {
      alert('size를 선택하세요');
    } else {
      setModal(prev => !prev);
      document.body.style.overflow = OVERFLOW_HIDDEN;
      window.scroll(0, 165);
      fetch(`${IP_CONFIG}/carts`, {
        method: 'POST',
        headers: {
          authorization: accessToken,
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          productOptionId: selectedId,
          quantity,
        }),
      }).then(response => response.json());
    }
  };

  return (
    <div className="detailInfo">
      <div className="detailOption">
        <div
          className={`detailName ${
            product?.discountPrice === null ? 'price0' : ''
          }`}
        >
          <div className="namePrice">
            <div>{product?.brandName}</div>
            <div className="discounted">
              {Number(product?.retailPrice).toLocaleString()}원
            </div>
          </div>
          <div>
            <div className="discountPrice">
              {Number(product?.discountPrice).toLocaleString()}원
            </div>
          </div>
          <div className="discountPercent">
            {Math.floor(
              (1 -
                Number(product?.discountPrice) / Number(product?.retailPrice)) *
                100
            )}
            % off
          </div>
          <div className="shoesName">{product?.productName}</div>
        </div>
        <div>
          <ShoesColor getThumbnail={product?.getThumbnail} />
        </div>

        <div className="shoesSizes">
          <div className="sizetype">
            <div className="sizeSelect">사이즈 선택</div>
            <div className="sizeGuide">
              <a href="#!">
                <button type="button">사이즈 가이드</button>
              </a>
            </div>
          </div>
          <ShoesSize
            footSize={product?.productOptions || []}
            setShooseSize={setShooseSize}
            setSelectedId={setSelectedId}
            setProductOptionId={setProductOptionId}
            product={product}
          />
        </div>
        <p>
          <button type="button" className="itemNotify">
            NOTIFY ME 입고 알림 신청
          </button>
        </p>
        <div className="itemCount">
          <span>수량</span>
          <span>
            <Counter
              quantity={quantity}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
            />
          </span>
        </div>
        <div className="itemPurchaseWrap">
          <button type="button" className="itemPurchase" onClick={orderSubmit}>
            바로구매
          </button>
          <div className="itemBasketWish">
            <button type="button" onClick={openModal} className="btn-modal">
              장바구니
            </button>

            <button type="button" className="itemWish" onClick={wishSubmit}>
              <div className="text">위시리스트</div>
              {accessToken && (
                <div className="heart">
                  {product.isWished || isWished ? '♥️' : '♡'}
                </div>
              )}
            </button>
          </div>
        </div>
        <div className="itemPickUp">
          <div className="itemService">
            매장 픽업 서비스가 한시적으로 중단됩니다.
          </div>
          <div>
            <button type="button" className="focus">
              자세히 보기
            </button>
          </div>
        </div>
        <div className="shoesInfo">
          <p className="shoesDescription">{product?.description}</p>
          <div className="shoesStyle">
            <div>현재 컬러 : {product?.color}</div>
            <div>스타일 : {product?.styleCode}</div>
          </div>
          <div>
            <button type="button" className="shoesMoreInfo">
              더 보기
            </button>
          </div>
        </div>
        <div className="itemSide">
          고객안내
          <img src="/image/open.png" alt="open" className="open" />
        </div>
        <div className="itemSideReview">
          <div className="review">
            리뷰
            <button type="button" onClick={openReview}>
              <img src="/image/open.png" alt="open" className="open" />
            </button>
          </div>
          <div className="reviewContents">
            {reviewOpen && (
              <Review review={product?.review} styleCode={product?.styleCode} />
            )}
          </div>
        </div>

        <div className="itemSide">
          <div>배송</div>
          <div className="itemdetailRight">
            <div className="itemShip">일반배송/오늘도착</div>

            <img src="/image/open.png" alt="open" className="open" />
          </div>
        </div>
        <div className="itemSide">
          <span>반품/AS</span>
          <div className="itemdetailRight">
            <span className="itemShip">온라인 접수/매장 접수</span>
            <img src="/image/open.png" alt="open" className="open" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailInfo;
