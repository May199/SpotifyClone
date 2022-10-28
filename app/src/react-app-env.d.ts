/// <reference  types="react-scripts" />

import { AxiosError } from "axios";

export interface TSong {
  id: number;
  title: string;
  path: string;
  author: string;
}

export interface TSongList {
  playlistId: number;
  songList: Array<TSong>;
}

export interface TPlaylist {
  userId?: number;
  id: number;
  cover: string;
  playlistName: string;
}

export type TPlaylistSongList = TPlaylist[];

export interface TFormData {
  email: string;
  confirmEmail: string;
  password: string;
  name: string;
  birth: string;
  gender: string;
}

export interface TFAQItem {
  title: string;
  content: string;
}

export interface TFAQ {
  title: string;
  perguntas: TFAQItem[];
}

export interface TLoginResponse {
  userURL: string;
  user: {
    name: string;
    id: number;
  };
}

export interface TSession extends TLoginResponse {
  authenticated: boolean;
}

export interface TLoginData {
  email: string;
  password: string;
}

export type THandleError = (err: Error | AxiosError) => void;

