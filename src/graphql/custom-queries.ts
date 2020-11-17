export const getMediaFull = /* GraphQL */ `
  query GetMediaFull($id: ID!) {
    getMedia(id: $id) {
      id
      name
      image
      createdAt
      updatedAt
      videos {
        items {
          id
          name
          length
          published
          image
          speakers {
            name
            speaker
            style
          }
          videoPath
          transcript
          createdAt
          updatedAt
        }
      }
    }
  }
`
