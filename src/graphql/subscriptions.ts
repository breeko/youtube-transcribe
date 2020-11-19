/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMedia = /* GraphQL */ `
  subscription OnCreateMedia {
    onCreateMedia {
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
export const onUpdateMedia = /* GraphQL */ `
  subscription OnUpdateMedia {
    onUpdateMedia {
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
export const onDeleteMedia = /* GraphQL */ `
  subscription OnDeleteMedia {
    onDeleteMedia {
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
export const onCreateVideo = /* GraphQL */ `
  subscription OnCreateVideo {
    onCreateVideo {
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
export const onUpdateVideo = /* GraphQL */ `
  subscription OnUpdateVideo {
    onUpdateVideo {
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
export const onDeleteVideo = /* GraphQL */ `
  subscription OnDeleteVideo {
    onDeleteVideo {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateVideoEditor = /* GraphQL */ `
  subscription OnCreateVideoEditor {
    onCreateVideoEditor {
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
export const onUpdateVideoEditor = /* GraphQL */ `
  subscription OnUpdateVideoEditor {
    onUpdateVideoEditor {
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
export const onDeleteVideoEditor = /* GraphQL */ `
  subscription OnDeleteVideoEditor {
    onDeleteVideoEditor {
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
