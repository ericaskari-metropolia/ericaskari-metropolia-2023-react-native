import { Context } from 'react';
import { NavigationProp } from '@react-navigation/native';

interface IUserModel {
    email: string;
    full_name: string;
    is_admin: unknown;
    time_created: string;
    user_id: number;
    username: string;
}
interface IMedia {
    file_id: number;
    filename: string;
    filesize: number;
    title: string;
    description: string;
    user_id: number;
    media_type: string;
    mime_type: string;
    time_added: string;
}
type IAccessToken = string;
type IExpirationDate = string;
type INeedsUpdate = boolean;
export type IMediaList = IMedia[];
type ISetUserModel = (userModel: IUserModel) => void;
type ISetAccessToken = (accessToken: IAccessToken) => void;
type ISetExpirationDate = (date: string) => void;
type ISetNeedsUpdate = (needsUpdateNewValue: boolean) => void;

export type IMainContext = {
    userProfile: IUserModel | null;
    accessToken: IAccessToken | null;
    expirationDate: IExpirationDate | null;
    setUserProfile: ISetUserModel;
    setAccessToken: ISetAccessToken;
    setExpirationDate: ISetExpirationDate;
    needsUpdate: INeedsUpdate;
    setNeedsUpdate: ISetNeedsUpdate;
};

export type AppContext = Context<IMainContext>;
export type ListComponent = (props: {
    items: IMediaList;
    navigation: NavigationProp<any>;
}) => JSX.Element;

export type ListItemComponent = (props: {
    item: IMedia;
    navigation: NavigationProp<any>;
}) => JSX.Element;
