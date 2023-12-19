import React from "react"
import { Link } from "gatsby"
import Layout1 from "../components/Layout1"
import Seo from "../components/Seo"
// import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { MdPlayArrow } from 'react-icons/md';
import { FaSitemap } from "react-icons/fa";
import Comp from "../components/sudais/index"
const alafasys = () => {

    return (
        <Layout1>
            <Seo title="sudais" />
            <div className="main">
                <div className="text-center blue-bg ">
                    <h2 className="alafasy-title">Abdur-Rahman as-Sudais</h2>
                    <div className="description">
                        <Link to="https://quranicaudio.com/" target="_blank" className="btn btn-secondary lbtn">
                            <MdPlayArrow /><span>Shuffle play</span>
                        </Link>
                        <Link to="https://quranicaudio.com/" target="_blank" className="btn btn-secondary lbtn">
                            <FaSitemap /><span>Other recitations</span></Link>
                    </div>
                </div>
                <div className="container">
                    <Comp />
                </div>
            </div>
        </Layout1 >
    )
}

export default alafasys

