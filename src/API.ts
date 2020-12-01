/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateMediaInput = {
  id?: string | null,
  name: string,
  image: string,
};

export type ModelMediaConditionInput = {
  name?: ModelStringInput | null,
  image?: ModelStringInput | null,
  and?: Array< ModelMediaConditionInput | null > | null,
  or?: Array< ModelMediaConditionInput | null > | null,
  not?: ModelMediaConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UpdateMediaInput = {
  id: string,
  name?: string | null,
  image?: string | null,
};

export type DeleteMediaInput = {
  id?: string | null,
};

export type CreateVideoInput = {
  id?: string | null,
  name: string,
  image?: string | null,
  videoPath?: string | null,
  audioPath?: string | null,
  transcript: string,
  created?: string | null,
  published: string,
  length: number,
  description?: string | null,
  videoMediaId?: string | null,
  videoOwnerId?: string | null,
};

export type ModelVideoConditionInput = {
  name?: ModelStringInput | null,
  image?: ModelStringInput | null,
  videoPath?: ModelStringInput | null,
  audioPath?: ModelStringInput | null,
  transcript?: ModelStringInput | null,
  created?: ModelStringInput | null,
  published?: ModelStringInput | null,
  length?: ModelIntInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelVideoConditionInput | null > | null,
  or?: Array< ModelVideoConditionInput | null > | null,
  not?: ModelVideoConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateVideoInput = {
  id: string,
  name?: string | null,
  image?: string | null,
  videoPath?: string | null,
  audioPath?: string | null,
  transcript?: string | null,
  created?: string | null,
  published?: string | null,
  length?: number | null,
  description?: string | null,
  videoMediaId?: string | null,
  videoOwnerId?: string | null,
};

export type DeleteVideoInput = {
  id?: string | null,
};

export type CreateUserInput = {
  id?: string | null,
  email: string,
  credits: number,
};

export type ModelUserConditionInput = {
  email?: ModelStringInput | null,
  credits?: ModelFloatInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateUserInput = {
  id: string,
  email?: string | null,
  credits?: number | null,
};

export type DeleteUserInput = {
  id?: string | null,
};

export type ModelMediaFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  image?: ModelStringInput | null,
  and?: Array< ModelMediaFilterInput | null > | null,
  or?: Array< ModelMediaFilterInput | null > | null,
  not?: ModelMediaFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelVideoFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  image?: ModelStringInput | null,
  videoPath?: ModelStringInput | null,
  audioPath?: ModelStringInput | null,
  transcript?: ModelStringInput | null,
  created?: ModelStringInput | null,
  published?: ModelStringInput | null,
  length?: ModelIntInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelVideoFilterInput | null > | null,
  or?: Array< ModelVideoFilterInput | null > | null,
  not?: ModelVideoFilterInput | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  email?: ModelStringInput | null,
  credits?: ModelFloatInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type GetMediaFullQueryVariables = {
  id: string,
};

export type GetMediaFullQuery = {
  getMedia:  {
    __typename: "Media",
    id: string,
    name: string,
    image: string,
    createdAt: string,
    updatedAt: string,
    videos:  {
      __typename: "ModelVideoConnection",
      items:  Array< {
        __typename: "Video",
        id: string,
        name: string,
        length: number,
        published: string,
        image: string | null,
        videoPath: string | null,
        transcript: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
    } | null,
  } | null,
};

export type GetUserFullQueryVariables = {
  id: string,
};

export type GetUserFullQuery = {
  getUser:  {
    __typename: "User",
    id: string,
    email: string,
    credits: number,
    createdAt: string,
    updatedAt: string,
    videos:  {
      __typename: "ModelVideoConnection",
      items:  Array< {
        __typename: "Video",
        id: string,
        name: string,
        length: number,
        published: string,
        image: string | null,
        videoPath: string | null,
        transcript: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
    } | null,
  } | null,
};

export type CreateMediaMutationVariables = {
  input: CreateMediaInput,
  condition?: ModelMediaConditionInput | null,
};

export type CreateMediaMutation = {
  createMedia:  {
    __typename: "Media",
    id: string,
    name: string,
    image: string,
    createdAt: string,
    updatedAt: string,
    videos:  {
      __typename: "ModelVideoConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdateMediaMutationVariables = {
  input: UpdateMediaInput,
  condition?: ModelMediaConditionInput | null,
};

export type UpdateMediaMutation = {
  updateMedia:  {
    __typename: "Media",
    id: string,
    name: string,
    image: string,
    createdAt: string,
    updatedAt: string,
    videos:  {
      __typename: "ModelVideoConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeleteMediaMutationVariables = {
  input: DeleteMediaInput,
  condition?: ModelMediaConditionInput | null,
};

export type DeleteMediaMutation = {
  deleteMedia:  {
    __typename: "Media",
    id: string,
    name: string,
    image: string,
    createdAt: string,
    updatedAt: string,
    videos:  {
      __typename: "ModelVideoConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreateVideoMutationVariables = {
  input: CreateVideoInput,
  condition?: ModelVideoConditionInput | null,
};

export type CreateVideoMutation = {
  createVideo:  {
    __typename: "Video",
    id: string,
    name: string,
    image: string | null,
    videoPath: string | null,
    audioPath: string | null,
    transcript: string,
    created: string | null,
    published: string,
    length: number,
    description: string | null,
    createdAt: string,
    updatedAt: string,
    media:  {
      __typename: "Media",
      id: string,
      name: string,
      image: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    owner:  {
      __typename: "User",
      id: string,
      email: string,
      credits: number,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type UpdateVideoMutationVariables = {
  input: UpdateVideoInput,
  condition?: ModelVideoConditionInput | null,
};

export type UpdateVideoMutation = {
  updateVideo:  {
    __typename: "Video",
    id: string,
    name: string,
    image: string | null,
    videoPath: string | null,
    audioPath: string | null,
    transcript: string,
    created: string | null,
    published: string,
    length: number,
    description: string | null,
    createdAt: string,
    updatedAt: string,
    media:  {
      __typename: "Media",
      id: string,
      name: string,
      image: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    owner:  {
      __typename: "User",
      id: string,
      email: string,
      credits: number,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type DeleteVideoMutationVariables = {
  input: DeleteVideoInput,
  condition?: ModelVideoConditionInput | null,
};

export type DeleteVideoMutation = {
  deleteVideo:  {
    __typename: "Video",
    id: string,
    name: string,
    image: string | null,
    videoPath: string | null,
    audioPath: string | null,
    transcript: string,
    created: string | null,
    published: string,
    length: number,
    description: string | null,
    createdAt: string,
    updatedAt: string,
    media:  {
      __typename: "Media",
      id: string,
      name: string,
      image: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    owner:  {
      __typename: "User",
      id: string,
      email: string,
      credits: number,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser:  {
    __typename: "User",
    id: string,
    email: string,
    credits: number,
    createdAt: string,
    updatedAt: string,
    videos:  {
      __typename: "ModelVideoConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser:  {
    __typename: "User",
    id: string,
    email: string,
    credits: number,
    createdAt: string,
    updatedAt: string,
    videos:  {
      __typename: "ModelVideoConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser:  {
    __typename: "User",
    id: string,
    email: string,
    credits: number,
    createdAt: string,
    updatedAt: string,
    videos:  {
      __typename: "ModelVideoConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type ListMediasQueryVariables = {
  filter?: ModelMediaFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMediasQuery = {
  listMedias:  {
    __typename: "ModelMediaConnection",
    items:  Array< {
      __typename: "Media",
      id: string,
      name: string,
      image: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetMediaQueryVariables = {
  id: string,
};

export type GetMediaQuery = {
  getMedia:  {
    __typename: "Media",
    id: string,
    name: string,
    image: string,
    createdAt: string,
    updatedAt: string,
    videos:  {
      __typename: "ModelVideoConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type GetVideoQueryVariables = {
  id: string,
};

export type GetVideoQuery = {
  getVideo:  {
    __typename: "Video",
    id: string,
    name: string,
    image: string | null,
    videoPath: string | null,
    audioPath: string | null,
    transcript: string,
    created: string | null,
    published: string,
    length: number,
    description: string | null,
    createdAt: string,
    updatedAt: string,
    media:  {
      __typename: "Media",
      id: string,
      name: string,
      image: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    owner:  {
      __typename: "User",
      id: string,
      email: string,
      credits: number,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type ListVideosQueryVariables = {
  filter?: ModelVideoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListVideosQuery = {
  listVideos:  {
    __typename: "ModelVideoConnection",
    items:  Array< {
      __typename: "Video",
      id: string,
      name: string,
      image: string | null,
      videoPath: string | null,
      audioPath: string | null,
      transcript: string,
      created: string | null,
      published: string,
      length: number,
      description: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      email: string,
      credits: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    id: string,
    email: string,
    credits: number,
    createdAt: string,
    updatedAt: string,
    videos:  {
      __typename: "ModelVideoConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnCreateMediaSubscription = {
  onCreateMedia:  {
    __typename: "Media",
    id: string,
    name: string,
    image: string,
    createdAt: string,
    updatedAt: string,
    videos:  {
      __typename: "ModelVideoConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdateMediaSubscription = {
  onUpdateMedia:  {
    __typename: "Media",
    id: string,
    name: string,
    image: string,
    createdAt: string,
    updatedAt: string,
    videos:  {
      __typename: "ModelVideoConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteMediaSubscription = {
  onDeleteMedia:  {
    __typename: "Media",
    id: string,
    name: string,
    image: string,
    createdAt: string,
    updatedAt: string,
    videos:  {
      __typename: "ModelVideoConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnCreateVideoSubscription = {
  onCreateVideo:  {
    __typename: "Video",
    id: string,
    name: string,
    image: string | null,
    videoPath: string | null,
    audioPath: string | null,
    transcript: string,
    created: string | null,
    published: string,
    length: number,
    description: string | null,
    createdAt: string,
    updatedAt: string,
    media:  {
      __typename: "Media",
      id: string,
      name: string,
      image: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    owner:  {
      __typename: "User",
      id: string,
      email: string,
      credits: number,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnUpdateVideoSubscription = {
  onUpdateVideo:  {
    __typename: "Video",
    id: string,
    name: string,
    image: string | null,
    videoPath: string | null,
    audioPath: string | null,
    transcript: string,
    created: string | null,
    published: string,
    length: number,
    description: string | null,
    createdAt: string,
    updatedAt: string,
    media:  {
      __typename: "Media",
      id: string,
      name: string,
      image: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    owner:  {
      __typename: "User",
      id: string,
      email: string,
      credits: number,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnDeleteVideoSubscription = {
  onDeleteVideo:  {
    __typename: "Video",
    id: string,
    name: string,
    image: string | null,
    videoPath: string | null,
    audioPath: string | null,
    transcript: string,
    created: string | null,
    published: string,
    length: number,
    description: string | null,
    createdAt: string,
    updatedAt: string,
    media:  {
      __typename: "Media",
      id: string,
      name: string,
      image: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    owner:  {
      __typename: "User",
      id: string,
      email: string,
      credits: number,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser:  {
    __typename: "User",
    id: string,
    email: string,
    credits: number,
    createdAt: string,
    updatedAt: string,
    videos:  {
      __typename: "ModelVideoConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser:  {
    __typename: "User",
    id: string,
    email: string,
    credits: number,
    createdAt: string,
    updatedAt: string,
    videos:  {
      __typename: "ModelVideoConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser:  {
    __typename: "User",
    id: string,
    email: string,
    credits: number,
    createdAt: string,
    updatedAt: string,
    videos:  {
      __typename: "ModelVideoConnection",
      nextToken: string | null,
    } | null,
  } | null,
};
