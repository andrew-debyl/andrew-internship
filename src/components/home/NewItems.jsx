import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";
import NftCard from "../NftCard";

const NewItems = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getData() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );

    setNfts(data);
  }

  useEffect(() => {
    getData();
    setLoading(false);
  }, [loading]);

  const options = {
    loop: true,
    margin: 10,
    items: 4,
    dots: false,
    nav: true,
    className: "owl-theme",
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {nfts.length > 0 ? (
            <OwlCarousel {...options}>
              {nfts.map((nft) => (
                <div key={nft.id}>
                  <NftCard
                    authorImage={nft.authorImage}
                    expiryDate={nft.expiryDate}
                    nftImage={nft.nftImage}
                    title={nft.title}
                    price={nft.price}
                    likes={nft.likes}
                    authorId = {nft.authorId}
                  />
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <OwlCarousel {...options}>
              {new Array(5).fill(0).map((_, index) => (
                <div key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <div
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <div
                          className="skeleton-box"
                          style={{ width: 50, height: 50, borderRadius: "50%" }}
                        />
                        <i className="fa fa-check"></i>
                      </div>
                    </div>
                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="skeleton-box"
                          style={{ width: "100%", height: 300 }}
                        />
                      </div>
                    </div>
                    <div className="nft__item_info">
                      <div>
                        <div
                          className="skeleton-box"
                          style={{ width: 180, height: 30 }}
                        ></div>
                      </div>
                      <div
                        className="skeleton-box"
                        style={{ width: 100, height: 20 }}
                      ></div>
                      <div className="nft__item_like">
                        <div
                          className="skeleton-box"
                          style={{ width: 30, height: 15 }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
