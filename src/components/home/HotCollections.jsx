import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const owlOptions = {
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      900: { items: 3 },
      1200: { items: 4 },
    },
  };

  async function fetchCollections() {
    console.log("Attempting to fetch collections..."); // DEBUG LOG
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      console.log("SUCCESS: Data fetched from API:", data); // DEBUG LOG
      setCollections(data);
    } catch (error) {
      console.error("ERROR: Failed to fetch collections:", error); // DEBUG LOG
    } finally {
      console.log("Setting loading to false."); // DEBUG LOG
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCollections();
  }, []);

  console.log("Component is rendering. Loading state:", loading, "Collections count:", collections.length); // DEBUG LOG

  // --- No changes to the return statement ---
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
          {loading ? (
            <OwlCarousel className="owl-theme" {...owlOptions}>
              {new Array(4).fill(0).map((_, index) => (
                <div key={index}>
                  <Skeleton width="100%" height="350px" />
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <OwlCarousel className="owl-theme" {...owlOptions}>
              {collections.map((collection) => (
                <div className="nft_coll" key={collection.id}>
                  <div className="nft_wrap">
                    <Link to={`/item-details/${collection.nftId}`}>
                      <img
                        src={collection.nftImage}
                        className="lazy img-fluid"
                        alt={collection.title}
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to={`/author/${collection.authorId}`}>
                      <img
                        className="lazy"
                        src={collection.authorImage}
                        alt={`${collection.title}'s author`}
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to={`/item-details/${collection.nftId}`}>
                      <h4>{collection.title}</h4>
                    </Link>
                    <span>ERC-{collection.code}</span>
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