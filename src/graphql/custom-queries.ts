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

export const getUserFull = /* GraphQL */ `
  query GetUserFull($id: ID!) {
    getUser(id: $id) {
      id
      email
      credits
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
