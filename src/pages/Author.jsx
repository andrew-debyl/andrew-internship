import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Author = () => {
  const { authorId } = useParams();
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);
  const [followWord, setFollowWord] = useState("Follow");

  async function getData() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
    );

    setNfts(data);
  }

  useEffect(() => {
    getData();
    setLoading(false);
  }, [loading]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function followButton() {
    if (following === false) {
      nfts.followers++;
      setFollowing(true);
      setFollowWord("Unfollow");
    } else {
      nfts.followers--;
      setFollowing(false);
      setFollowWord("Follow");
    }
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            {nfts.length !== 0 ? (
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={nfts.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {nfts.authorName}
                            <span className="profile_username">
                              @{nfts.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {nfts.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {nfts.followers} followers
                        </div>
                        <Link
                          to="#"
                          className="btn-main"
                          onClick={() => followButton()}
                        >
                          {followWord}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems authorImage={nfts.authorImage} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <div className="skeleton-box" style={{width: 150, height: 150, borderRadius: '50%'}}/>

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4 style={{display:'flex', flexDirection:'column'}}>
                            <div className="skeleton-box" style={{width:200, marginBottom:12}}>
                            </div>
                            <div className="skeleton-box" style={{width:100, marginBottom:12}}>
                            </div>
                            <div className="skeleton-box" style={{width:250}}>
                            </div>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="skeleton-box" style={{width:150, height:40}}>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems authorImage={null} />
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

export default Author;
