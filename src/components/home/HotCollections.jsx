import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HotCollections = () => {
  const [nfts, setNFTS] = useState([]);
  const [loading, setLoading] = useState(true)

  async function getInfo() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setNFTS(data);
  }

  useEffect(() => {
    getInfo();
    setLoading(false)
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
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {nfts.length > 0 ? (
            <OwlCarousel {...options}>
              {nfts.map((nft) => (
                <div key={nft.id}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${nft.nftId}`}>
                        <img
                          src={nft.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${nft.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={nft.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i> 
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{nft.title}</h4>
                      </Link>
                      <span>ERC-{nft.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <OwlCarousel {...options}>
              {new Array(5).fill(0).map((_, index) => (
                <div key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <div>
                        <div
                          className="skeleton-box"
                          style={{ width: "100%", height: 200 }}
                        />
                      </div>
                    </div>
                    <div className="nft_coll_pp">
                      <div>
                        <div
                          className="skeleton-box"
                          style={{ width: 50, height: 50, borderRadius: "50%" }}
                        />
                      </div>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info" style={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center'}}>
                      <h4
                        className="skeleton-box"
                        style={{ width: 100, height: 20, marginBottom:10}}
                      ></h4>
                      <div
                        className="skeleton-box"
                        style={{ width: 60, height: 20 }}
                      ></div>
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

export default HotCollections;
