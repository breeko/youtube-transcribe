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
          videoPath
          transcript
          createdAt
          updatedAt
        }
      }
    }
  }
`
