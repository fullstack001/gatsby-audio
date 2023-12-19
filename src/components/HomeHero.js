import React, { useState } from "react";
import ReactModal from "react-modal";
import HomeHeroSubscription from "./HomeHeroSubscription";
import SocialLinks from "./SocialLinks";
import { graphql, useStaticQuery } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HomeHero = () => {
  const { site } = useStaticQuery(graphql`
    query coverImage {
      site {
        siteMetadata {
          title
          cover
        }
      }
    }
  `);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="home-cover-area">
      <div className="container">
        <div
          className={`row home-cover-wrap${
            site.siteMetadata.cover && site.siteMetadata.cover !== ""
              ? " has-cover-image"
              : ""
          }`}
        >
          {site.siteMetadata.cover && site.siteMetadata.cover !== "" && (
            <div className="col-lg-5">
              <div className="cover-img-container">
                <div className="cover-img-wrap">
                  <StaticImage
                    src="../assets/images/cover.jpg"
                    alt={`${site.siteMetadata.title} Cover`}
                    width={400}
                    height={400}
                    style={{ position: "absolute", borderRadius: "50%" }}
                    placeholder="blurred"
                  />
                  <div className="play-button-overlay">
                    <button onClick={openModal}>
                      <FontAwesomeIcon icon={faPlay} />
                    </button>
                  </div>
                  <div className="dot-parent dot-1">
                    <div className="dot"></div>
                  </div>
                  <div className="dot-parent dot-2">
                    <div className="dot"></div>
                  </div>
                  <div className="dot-parent dot-3">
                    <div className="dot"></div>
                  </div>
                  <div className="dot-parent dot-4">
                    <div className="dot"></div>
                  </div>
                  <div className="dot-parent dot-5">
                    <div className="dot"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="col-lg-7">
            <div className="home-cover-content-wrap">
              <h1 className="heading-large">Qur'an & Nasheed Videos</h1>
              <div className="intro-description">
                Enlighten your soul with the divine words, guided by the Qur'an's
                wisdom and embraced by the melodies of nasheed videos.
              </div>
              <HomeHeroSubscription />
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>

      <ReactModal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  contentLabel="YouTube Video Modal"
  className="youtube-modal"
>
  <div className="modal-content">
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/aXSw3QV9ByE?autoplay=1"
      title="YouTube Video"
      frameBorder="0"
      allowFullScreen
    ></iframe>
  </div>
</ReactModal>
    </section>
  );
};

export default HomeHero;
