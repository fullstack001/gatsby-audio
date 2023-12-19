import React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
// import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { MdPlayArrow } from 'react-icons/md';
import { FaSitemap } from "react-icons/fa";
import Comp1 from "../components/alafasy/index1"
const alafasys = () => {

    return (
        <Layout>
            <Seo title="alafasy" />
            <div className="main">
                <div className="text-center blue-bg ">
                    <h2 className="alafasy-title">Mishari Rashid al-`Afasy</h2>
                    <div className="description">
                        <Link to="https://quranicaudio.com/" target="_blank" className="btn btn-secondary lbtn">
                            <MdPlayArrow /><span>Shuffle play</span>
                        </Link>
                        <Link to="https://quranicaudio.com/" target="_blank" className="btn btn-secondary lbtn">
                            <FaSitemap /><span>Other recitations</span></Link>
                    </div>
                </div>
                <div className="container">
                    <Comp1 />
                </div>
            </div>
        </Layout >
    )
}

export default alafasys

