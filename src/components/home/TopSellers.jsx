import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const TopSellers = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getData() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );

    setNfts(data);
  }

  useEffect(() => {
    getData();
    setLoading(false);
  }, [loading]);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2
                data-aos="fade"
                data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-once="true"
              >
                Top Sellers
              </h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div
            className="col-md-12"
            data-aos="fade"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-once="true"
          >
            {nfts.length > 0 ? (
              <ol className="author_list">
                {nfts.map((nft) => (
                  <li key={nft.id}>
                    <div className="author_list_pp">
                      <Link to={`/author/${nft.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={nft.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${nft.authorId}`}>
                        {nft.authorName}
                      </Link>
                      <span>{nft.price} ETH</span>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <ol className="author_list">
                {new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <div>
                        <div
                          className="skeleton-box"
                          style={{ width: 50, height: 50, borderRadius: "50%" }}
                        />
                        <i className="fa fa-check"></i>
                      </div>
                    </div>
                    <div
                      className="author_list_info"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <div
                        className="skeleton-box"
                        style={{ width: 100, height: 20, marginBottom: 10 }}
                      ></div>
                      <div
                        className="skeleton-box"
                        style={{ width: 40, height: 20 }}
                      ></div>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
