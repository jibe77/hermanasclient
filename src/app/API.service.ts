/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "zen-observable-ts";

export interface SubscriptionResponse<T> {
  value: GraphQLResult<T>;
}

export type CreateUserParamInput = {
  id?: string | null;
  key: string;
  value: string;
};

export type ModelUserParamConditionInput = {
  key?: ModelStringInput | null;
  value?: ModelStringInput | null;
  and?: Array<ModelUserParamConditionInput | null> | null;
  or?: Array<ModelUserParamConditionInput | null> | null;
  not?: ModelUserParamConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
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
  _null = "_null"
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type UpdateUserParamInput = {
  id: string;
  key?: string | null;
  value?: string | null;
};

export type DeleteUserParamInput = {
  id?: string | null;
};

export type ModelUserParamFilterInput = {
  id?: ModelIDInput | null;
  key?: ModelStringInput | null;
  value?: ModelStringInput | null;
  and?: Array<ModelUserParamFilterInput | null> | null;
  or?: Array<ModelUserParamFilterInput | null> | null;
  not?: ModelUserParamFilterInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type CreateUserParamMutation = {
  __typename: "UserParam";
  id: string;
  key: string;
  value: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateUserParamMutation = {
  __typename: "UserParam";
  id: string;
  key: string;
  value: string;
  createdAt: string;
  updatedAt: string;
};

export type DeleteUserParamMutation = {
  __typename: "UserParam";
  id: string;
  key: string;
  value: string;
  createdAt: string;
  updatedAt: string;
};

export type GetUserParamQuery = {
  __typename: "UserParam";
  id: string;
  key: string;
  value: string;
  createdAt: string;
  updatedAt: string;
};

export type ListUserParamsQuery = {
  __typename: "ModelUserParamConnection";
  items: Array<{
    __typename: "UserParam";
    id: string;
    key: string;
    value: string;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  nextToken: string | null;
};

export type OnCreateUserParamSubscription = {
  __typename: "UserParam";
  id: string;
  key: string;
  value: string;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateUserParamSubscription = {
  __typename: "UserParam";
  id: string;
  key: string;
  value: string;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteUserParamSubscription = {
  __typename: "UserParam";
  id: string;
  key: string;
  value: string;
  createdAt: string;
  updatedAt: string;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreateUserParam(
    input: CreateUserParamInput,
    condition?: ModelUserParamConditionInput
  ): Promise<CreateUserParamMutation> {
    const statement = `mutation CreateUserParam($input: CreateUserParamInput!, $condition: ModelUserParamConditionInput) {
        createUserParam(input: $input, condition: $condition) {
          __typename
          id
          key
          value
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateUserParamMutation>response.data.createUserParam;
  }
  async UpdateUserParam(
    input: UpdateUserParamInput,
    condition?: ModelUserParamConditionInput
  ): Promise<UpdateUserParamMutation> {
    const statement = `mutation UpdateUserParam($input: UpdateUserParamInput!, $condition: ModelUserParamConditionInput) {
        updateUserParam(input: $input, condition: $condition) {
          __typename
          id
          key
          value
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateUserParamMutation>response.data.updateUserParam;
  }
  async DeleteUserParam(
    input: DeleteUserParamInput,
    condition?: ModelUserParamConditionInput
  ): Promise<DeleteUserParamMutation> {
    const statement = `mutation DeleteUserParam($input: DeleteUserParamInput!, $condition: ModelUserParamConditionInput) {
        deleteUserParam(input: $input, condition: $condition) {
          __typename
          id
          key
          value
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteUserParamMutation>response.data.deleteUserParam;
  }
  async GetUserParam(id: string): Promise<GetUserParamQuery> {
    const statement = `query GetUserParam($id: ID!) {
        getUserParam(id: $id) {
          __typename
          id
          key
          value
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetUserParamQuery>response.data.getUserParam;
  }
  async ListUserParams(
    filter?: ModelUserParamFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListUserParamsQuery> {
    const statement = `query ListUserParams($filter: ModelUserParamFilterInput, $limit: Int, $nextToken: String) {
        listUserParams(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            key
            value
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListUserParamsQuery>response.data.listUserParams;
  }
  OnCreateUserParamListener: Observable<
    SubscriptionResponse<OnCreateUserParamSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateUserParam {
        onCreateUserParam {
          __typename
          id
          key
          value
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnCreateUserParamSubscription>>;

  OnUpdateUserParamListener: Observable<
    SubscriptionResponse<OnUpdateUserParamSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateUserParam {
        onUpdateUserParam {
          __typename
          id
          key
          value
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnUpdateUserParamSubscription>>;

  OnDeleteUserParamListener: Observable<
    SubscriptionResponse<OnDeleteUserParamSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteUserParam {
        onDeleteUserParam {
          __typename
          id
          key
          value
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeleteUserParamSubscription>>;
}
