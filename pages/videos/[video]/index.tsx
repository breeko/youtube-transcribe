import _ from "lodash"
import React from "react"
import AppLayout from "../../../src/AppLayout"
import VideoPageInner from "../../../src/components/video"
import PlayerContainer from "../../../src/containers/player-container"

const VideoPage: React.FunctionComponent = () => {

  return(
    <AppLayout hideFooter={true} hideHeader={true}>
      <PlayerContainer.Provider initialState={undefined}>
        <VideoPageInner />
      </PlayerContainer.Provider>
    </AppLayout>
  )
}

export default React.memo(VideoPage, (a, b) => _.isEqual(a, b))
