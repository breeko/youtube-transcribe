import { Alert, Col, Divider, Row, Typography } from "antd"
import React from "react"
import AppLayout from "../../src/AppLayout"
import LanguageSelect from "../../src/components/languages"
import ExampleCard from "../../src/components/examples/example-card"

const { Title } = Typography

const Examples = () => {

  const english = [
    {
      path: "73b6f121-14e5-42e1-abd7-9eb61d719c42",
      name: "Steve Jobs and Bill Gates Interview (2007)",
      image: "/images/examples/gates-jobs.jpg",
    },
    {
      path: "c5bc32e3-610e-4587-95bf-2fbfd10909b2",
      name: "Elon Musk: Neuralink, AI, Autopilot, and the Pale Blue Dot | Lex Fridman Podcast #49",
      image: "/images/examples/musk-fridman-2.jpg",
    },
    {
      path: "aa5432d1-5069-498f-ba7e-7706d4a25e41",
      name: "Free Climber Emily Harrington Talks About Alex Honnold",
      image: "/images/examples/free-climber.jpg",
    },
    {
      path: "783ca873-1f49-4895-a450-3f575fee9bb5",
      name: "Nassim Nicholas Taleb on the Pandemic",
      image: "/images/examples/taleb-pandemic.jpg",
    },
  ]
  const nonEnglish = [
    {
      path: "b72d0952-4744-4ff1-bdfa-005569ea75e1",
      name: "WIKITONGUES: Fabia speaking Swiss German",
      image: "/images/examples/swiss-german.jpg",
    },
    {
      path: "31e6062c-5177-4135-a601-6915fb31b349",
      name: "WIKITONGUES: Pascal speaking German",
      image: "/images/examples/german.jpg",
    },
    {
      path: "fd8967c9-218a-4055-b280-b3c978ec4406",
      name: "WIKITONGUES: Sai speaking Tamil",
      image: "/images/examples/tamil.jpg",
    },
    {
      path: "1ee59d5e-16a0-4e3e-bf80-5ba656da9d3d",
      name: "WIKITONGUES: Manjusha speaking Telugu",
      image: "/images/examples/telugu.jpg",
    },
    {
      path: "470fdde7-1b55-4b2a-8fbf-218381a18034",
      name: "WIKITONGUES: Freddie speaking Portuguese",
      image: "/images/examples/portuguese.jpg",
    },
    {
      path: "d3c16ea3-52f3-4089-8f36-91f7ac87c072",
      name: "WIKITONGUES: Krishna speaking Hindi",
      image: "/images/examples/hindi.jpg",
    },
    {
      path: "07f63f46-04f5-4db3-8ecb-2901a6c68c69",
      name: "WIKITONGUES: Matt speaking Hebrew",
      image: "/images/examples/hebrew.jpg",
    },
    {
      path: "2a83f91a-06f0-41d1-a190-45f702c39fb6",
      name: "WIKITONGUES: Camille speaking French",
      image: "/images/examples/french.jpg",
    },
    {
      path: "d4ff898e-e72e-4fcc-b26b-3335e5983592",
      name: "WIKITONGUES: Azariah speaking Spanish",
      image: "/images/examples/spanish.jpg",      
    },
    {
      name: "WIKITONGUES: Andrey speaking Russian",
      path: "775c1db4-9748-4c9d-b847-4ba30b3107de",
      image: "/images/examples/russian.jpg",
    },
    {
      name: "WIKITONGUES: David speaking Syrian Arabic",
      path: "b20446dd-dcd6-4441-8030-d37090680432",
      image: "/images/examples/arabic.jpg",
    },
    {
      name: "WIKITONGUES: Wanyu speaking Mandarin",
      path: "21be94a6-45a3-4198-aea7-b2de7eaed42d",
      image: "/images/examples/mandarin.jpg",
    },
    {
      name: "WIKITONGUES: Suseong speaking Korean",
      path: "c4642385-b8c9-4b14-9cec-41181c92e7be",
      image: "/images/examples/korean.jpg",
    },
    {
      name: "WIKITONGUES: Sebastiano speaking Italian",
      path: "451913e1-050c-40e9-bbce-b07a4f664cc2",
      image: "/images/examples/italian.jpg",
    },
    {
      name: "WIKITONGUES: Ela speaking Turkish",
      path: "75fdeb4c-3137-4f8f-b15e-847ed809bbaa",
      image: "/images/examples/turkish.jpg",
    },
    {
      name: "WIKITONGUES: Daniel speaking Farsi",
      path: "d0b17dde-5c0b-4ead-9e3b-4d7485916625",
      image: "/images/examples/farsi.jpg",
    },
    
  ]
  return(
    <AppLayout>
      <div className="main-page">
        <Title>Examples</Title>
        <Row>
          <Col xs={24} sm={24} md={24}>
            <Title level={4}>Languages Supported</Title>
            <LanguageSelect />
          </Col>
        </Row>
        <Divider />
        <Alert
          message="All transcripts are unedited and exactly as they would when transcribed with default settings. Only speaker names were provided"
          type="info"
        />
        <Title level={2} className="padded">English</Title>
        <Row className="padded" gutter={[32, 32]} justify="space-around">
            {english.map(({path, name, image}) => {
              return(
                <Col xs={24} sm={12} md={8} lg={6} key={path}>
                  <ExampleCard title={name} path={`/transcripts/${path}`} image={image} />
                </Col>
              )
            })}
          </Row>
          <Divider/>
          <Title level={2} className="padded">Non-English</Title>
          <br/>
          <Row className="padded" gutter={[32, 32]} justify="space-around">
            {nonEnglish.map(({path, name, image}) => {
              return(
                <Col xs={24} sm={12} md={8} lg={6} key={path}>
                  <ExampleCard title={name} path={`/transcripts/${path}`} image={image} />
                </Col>
              )
            })}
        </Row>
      </div>

    </AppLayout>
  )
}

export default Examples
