import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NftCard from "../NftCard";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const ExploreItems = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tempNfts, setTempNfts] = useState([]);
  const [sliceNum, setSliceNum] = useState(12);
  const [apiSortValue, setApiSortValue] = useState("");

  async function getData() {
    if (apiSortValue) {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${apiSortValue}`
      );

      setTempNfts(data);
      setNfts(data.slice(0, 8));
      setSliceNum(12);
    } else {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
      );

      setTempNfts(data);
      setNfts(data.slice(0, 8));
      setSliceNum(12);
    }
  }

  useEffect(() => {
    getData();
    setLoading(false);
  }, [loading, apiSortValue]);

  function sliceArr() {
    setSliceNum(sliceNum + 4);

    setNfts(tempNfts.slice(0, sliceNum));
  }

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(event) => setApiSortValue(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {nfts.length > 0 ? (
        <>
          {nfts.map((nft) => (
            <div
              key={nft.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
              data-aos="fade"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
              data-aos-once="true"
            >
              <NftCard
                authorImage={nft.authorImage}
                expiryDate={nft.expiryDate}
                nftImage={nft.nftImage}
                title={nft.title}
                price={nft.price}
                likes={nft.likes}
                authorId={nft.authorId}
                nftId={nft.nftId}
              />
            </div>
          ))}
        </>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
              data-aos="fade"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
              data-aos-once="true"
            >
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
        </div>
      )}

      <div
        className="col-md-12 text-center"
        data-aos="fade"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-once="true"
      >
        <Link
          to=""
          id="loadmore"
          className="btn-main lead"
          onClick={() => sliceArr()}
        >
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
