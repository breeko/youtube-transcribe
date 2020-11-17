/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listMedias = /* GraphQL */ `
  query ListMedias(
    $filter: ModelMediaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMedias(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMedia = /* GraphQL */ `
  query GetMedia($id: ID!) {
    getMedia(id: $id) {
      id
      name
      image
      createdAt
      updatedAt
      videos {
        nextToken
      }
    }
  }
`;
export const getVideo = /* GraphQL */ `
  query GetVideo($id: ID!) {
    getVideo(id: $id) {
      id
      name
      image
      speakers {
        speaker
        name
        style
      }
      videoPath
      transcript
      published
      length
      description
      createdAt
      updatedAt
      media {
        id
        name
        image
        createdAt
        updatedAt
      }
    }
  }
`;
export const listVideos = /* GraphQL */ `
  query ListVideos(
    $filter: ModelVideoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVideos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        image
        videoPath
        transcript
        published
        length
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
