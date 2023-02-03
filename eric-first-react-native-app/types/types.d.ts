import { Context } from 'react';

interface IUserModel {
    email: string;
    full_name: string;
    is_admin: unknown;
    time_created: string;
    user_id: number;
    username: string;
}

type IAccessToken = string;
type ISetUserModel = (userModel: IUserModel) => void;
type ISetAccessToken = (accessToken: IAccessToken) => void;

export type IMainContext = [
    IUserModel | null,
    IAccessToken | null,
    ISetUserModel,
    ISetAccessToken
];

export type AppContext = Context<IMainContext>;
