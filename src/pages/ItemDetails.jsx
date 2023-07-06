import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { nftId } = useParams();
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getData() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
    );

    setNfts(data);
  }

  useEffect(() => {
    getData();
    setLoading(false);
  }, [loading]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            {nfts.length === undefined ? (
              <div className="row">
                <div className="col-md-6 text-center">
                  <img
                    src={nfts.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>
                      {nfts.title} #{nfts.tag}
                    </h2>

                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {nfts.views}
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {nfts.likes}
                      </div>
                    </div>
                    <p>{nfts.description}</p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${nfts.ownerId}`}>
                              <img
                                className="lazy"
                                src={nfts.ownerImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${nfts.ownerId}`}>{nfts.ownerName}</Link>
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${nfts.creatorId}`}>
                              <img
                                className="lazy"
                                src={nfts.creatorImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${nfts.creatorId}`}>{nfts.creatorName}</Link>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{nfts.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-md-6 text-center">
                  <div
                    className="skeleton-box"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2
                      className="skeleton-box"
                      style={{ width: 300, height: 40 }}
                    ></h2>
                    <div className="item_info_counts">
                      <div
                        className="skeleton-box"
                        style={{ width: 80, height: 30 }}
                      ></div>
                      <div
                        className="skeleton-box"
                        style={{ width: 80, height: 30 }}
                      ></div>
                    </div>
                    <div
                      className="skeleton-box"
                      style={{ width: "100%", height: 80 }}
                    ></div>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <div>
                              <div
                                className="skeleton-box"
                                style={{
                                  width: 50,
                                  height: 50,
                                  borderRadius: "50%",
                                }}
                              />
                            </div>
                          </div>
                          <div className="author_list_info">
                            <div
                              className="skeleton-box"
                              style={{ width: 125, height: 20 }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <div>
                              <div
                                className="skeleton-box"
                                style={{
                                  width: 50,
                                  height: 50,
                                  borderRadius: "50%",
                                }}
                              />
                            </div>
                          </div>
                          <div className="author_list_info">
                            <div
                              className="skeleton-box"
                              style={{ width: 125, height: 20 }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <div
                          className="skeleton-box"
                          style={{ width: 75, height: 20 }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
