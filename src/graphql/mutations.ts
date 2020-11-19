/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMedia = /* GraphQL */ `
  mutation CreateMedia(
    $input: CreateMediaInput!
    $condition: ModelMediaConditionInput
  ) {
    createMedia(input: $input, condition: $condition) {
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
export const updateMedia = /* GraphQL */ `
  mutation UpdateMedia(
    $input: UpdateMediaInput!
    $condition: ModelMediaConditionInput
  ) {
    updateMedia(input: $input, condition: $condition) {
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
export const deleteMedia = /* GraphQL */ `
  mutation DeleteMedia(
    $input: DeleteMediaInput!
    $condition: ModelMediaConditionInput
  ) {
    deleteMedia(input: $input, condition: $condition) {
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
export const createVideo = /* GraphQL */ `
  mutation CreateVideo(
    $input: CreateVideoInput!
    $condition: ModelVideoConditionInput
  ) {
    createVideo(input: $input, condition: $condition) {
      id
      name
      image
      videoPath
      transcript
      created
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
      editors {
        nextToken
      }
    }
  }
`;
export const updateVideo = /* GraphQL */ `
  mutation UpdateVideo(
    $input: UpdateVideoInput!
    $condition: ModelVideoConditionInput
  ) {
    updateVideo(input: $input, condition: $condition) {
      id
      name
      image
      videoPath
      transcript
      created
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
      editors {
        nextToken
      }
    }
  }
`;
export const deleteVideo = /* GraphQL */ `
  mutation DeleteVideo(
    $input: DeleteVideoInput!
    $condition: ModelVideoConditionInput
  ) {
    deleteVideo(input: $input, condition: $condition) {
      id
      name
      image
      videoPath
      transcript
      created
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
      editors {
        nextToken
      }
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      email
      credits
      createdAt
      updatedAt
      videos {
        nextToken
      }
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      email
      credits
      createdAt
      updatedAt
      videos {
        nextToken
      }
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      email
      credits
      createdAt
      updatedAt
      videos {
        nextToken
      }
    }
  }
`;
export const createVideoEditor = /* GraphQL */ `
  mutation CreateVideoEditor(
    $input: CreateVideoEditorInput!
    $condition: ModelVideoEditorConditionInput
  ) {
    createVideoEditor(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
      video {
        id
        name
        image
        videoPath
        transcript
        created
        published
        length
        description
        createdAt
        updatedAt
      }
      editor {
        id
        email
        credits
        createdAt
        updatedAt
      }
    }
  }
`;
export const updateVideoEditor = /* GraphQL */ `
  mutation UpdateVideoEditor(
    $input: UpdateVideoEditorInput!
    $condition: ModelVideoEditorConditionInput
  ) {
    updateVideoEditor(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
      video {
        id
        name
        image
        videoPath
        transcript
        created
        published
        length
        description
        createdAt
        updatedAt
      }
      editor {
        id
        email
        credits
        createdAt
        updatedAt
      }
    }
  }
`;
export const deleteVideoEditor = /* GraphQL */ `
  mutation DeleteVideoEditor(
    $input: DeleteVideoEditorInput!
    $condition: ModelVideoEditorConditionInput
  ) {
    deleteVideoEditor(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
      video {
        id
        name
        image
        videoPath
        transcript
        created
        published
        length
        description
        createdAt
        updatedAt
      }
      editor {
        id
        email
        credits
        createdAt
        updatedAt
      }
    }
  }
`;
