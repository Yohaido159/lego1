import React, { useState, useEffect, useReducer } from "react";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCartItems } from "../../redux/cart/cart.actions";

import "./MainPage.styles.scss";

import Item1 from "../../after/4.png";
import Item2 from "../../after/3.png";
import Item3 from "../../after/5.png";

import Big from "../../after/1.png";
import Small from "../../after/2.png";

import ModalBuy from "../ModalBuy/ModalBuy";

const cartObj = {
  itemPrice: null,
  itemName: null,
};

const MainPage = (props) => {
  const reducer = (state, new_state) => ({ ...state, ...new_state });
  const [cart, setCart] = useReducer(reducer, {
    ...cartObj,
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCart({ [name]: value });
  };
  useEffect(() => {
    console.log(cart);
    dispatch(setCartItems(cart));
  }, [cart]);
  return (
    <div dir="rtl" className="main">
      <section className="hero">
        <div className="hero__img"></div>
        <div className="hero__content">
          <h1 className="hero__title">הצעצוע המושלם לילדך</h1>
          <h3 className="hero__subtitle">משחק מגנטים יחודי המאפשר לילדך חווית בניה כיפית ויצירתית באופן מיוחד</h3>
          <a href="#buy" className="btn btn-outline-secondary btn-block mt-auto text-main">
            קנה עכשיו
          </a>
        </div>
      </section>
      <section className="services">
        <div className="container">
          <div className="row mt-120">
            <div className="col d-flex justify-content-center mb-85">
              <h2>
                ברוכים הבאים לצעצועים של <br />
                <span className="lirstoys">Lirstoys</span>
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mbr-40">
              <div className="item d-flex flex-column align-items-center ">
                <div className="mb-40 item__img">
                  <img className="item__img--3" src={Item3} alt="" />
                </div>
                <div className="item__text--3 ">
                  <p className="p-red">
                    הצעצועים הטובים ביותר של <span className="lirstoys"> Lirstoys </span> מעוררים את דמיונכם של ילדכם,
                    מעודדים מיומנויות חשיבה ומטפחים יצירתיות.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mbr-40">
              <div className="item d-flex flex-column align-items-center ">
                <div className="mb-40 item__img item--2">
                  <img className="item__img--2" src={Item2} alt="" />
                </div>
                <div className="item__text--1 ">
                  <p className="p-red p-invert">
                    באמצעות המגנטים האיכותיים של <span className="lirstoys lirstoys-invert"> Lirstoys </span> ילדכם יוכל
                    לפרוח ולהנות ע”י בניה מהמגנטים מגדלים, מטוסים וחיות, הכל באופן בטוח ביותר בלי חלקים קטנים שעלולים
                    להיות מסוכנים.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 ">
              <div className="item d-flex flex-column align-items-center ">
                <div className="mb-40 item__img">
                  <img className="item__img--1" src={Item1} alt="" />
                </div>
                <div className="item__text--1 ">
                  <p className="p-red">
                    המגנטים האיכותיים של <span className="lirstoys">Lirstoys</span> מגיעים בשני גדלים, יש חבילה של 30
                    חלקים ויש חבילה של 72 חלקים, ביחרו את החבילה הטובה ביותר עבורכם.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-images ">
        <h2 className="pb-85 pt-85 mb-0">מבחר דוגמאות לאפשרויות יצירה</h2>
        <div className="container ">
          <div className="row">
            <div className="image-gallery mbr-85">
              <div className="img-c">
                <div className="img-1 img"></div>
              </div>
              <div className="img-c">
                <div className="img-2 img"></div>
              </div>
              <div className="img-c img-c-3">
                <div className="img-3 img"></div>
              </div>
              <div className="img-c">
                <div className="img-4 img"></div>
              </div>
              <div className="img-c">
                <div className="img-5 img"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-buy">
        <div className="container">
          <div className="row d-flex flex-column align-items-center">
            <h2 className="pt-85 pb-20">אחרי שראיתם את המשחק- אז למה אתם מחכים??</h2>
            <h3 className="pb-20">קנו עכשיו את החבילה שלכם במחיר מיוחד לזמן מוגבל!</h3>
          </div>
          <div className="container ">
            <div className="row justify-content-center">
              <div className="col-md-6 mbr-40 " id="buy">
                <div className="card d-flex flex-column mt-auto align-items-center">
                  <h5 className="pt-28 pb-15 mb-0">72 חלקים</h5>
                  <h6 className="h6-white">רק ב 90 ש"ח</h6>
                  <div className="img_container">
                    <img src={Big} alt="big" />
                  </div>
                  <button
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary btn-block mt-auto text-main"
                    onClick={() => setCart({ itemName: "לגו 72 חלקים", itemPrice: 90 })}
                    data-toggle="modal"
                    data-target="#loginModal"
                  >
                    קנה עכשיו
                  </button>
                </div>
              </div>
              <div className="col-md-6 mbr-40">
                <div className="card d-flex flex-column mt-auto align-items-center">
                  <h5 className="pt-28 pb-15 mb-0">30 חלקים</h5>
                  <h6 className="h6-white">רק ב 60 ש"ח</h6>
                  <div className="img_container">
                    <img src={Small} alt="Small" />
                  </div>

                  <button
                    data-toggle="modal"
                    data-target="#loginModal"
                    className="btn btn-outline-primary btn-block mt-auto text-main"
                    onClick={() => setCart({ itemName: "לגו 30 חלקים", itemPrice: 60 })}
                  >
                    קנה עכשיו
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ModalBuy />
    </div>
  );
};

export default MainPage;
