import { Col, Row, Image, Typography, Card, Divider, Space } from "antd"
import React from "react"
import { BiBrain } from "react-icons/bi"
import { HiOutlineChatAlt2 } from "react-icons/hi"
import { FiEdit, FiMap, FiShare, FiSliders, FiZap } from "react-icons/fi"
import { FaRegFileAudio } from "react-icons/fa"
import FeatureCard from "./feature-card"
import LanguageSelect from "../languages"

const { Title, Paragraph } = Typography

const Features = () => {
  return(
    <React.Fragment>
      <Title level={2}>Features</Title>
      <Row >
        <FeatureCard title="State of the art artifical intelligence" description="Leverages machine learning developed by Amazon" image={<BiBrain size={70}/>} />
        <FeatureCard title="Speaker identification" description="Automatically detects different speakers, with up to 10 speakers in one recording" image={<HiOutlineChatAlt2 size={70} />} />
        <FeatureCard title="Exports to text or html" description="Export transcript to text, html or use an interactive player" image={<FiShare size={70} />} />
        <FeatureCard title="Transcribe just what you need" description="Load the audio and select the section of audio you want transcribed" image={<FiSliders size={70}/>} />
        <FeatureCard title="Customizable and editable" description="Fully editable transcript with ability to correct or identify speakers by name" image={<FiEdit size={70}/>} />
        <FeatureCard title="Multiple language support" description={<div>Supports over 30 languages<br/><br/><LanguageSelect /></div>} image={<FiMap size={70}/>} />
        <FeatureCard title="Multiple audio and video support" description="Supports most audio and video formats with uploads up to 250 MB" image={<FaRegFileAudio size={70}/>} />
        <FeatureCard title="Live transcript synced with audio" description="Interactive player lets you start playing at different parts and follow along" image={<FiZap size={70}/>} />
      </Row> 
    </React.Fragment>
  )
}

export default Features
