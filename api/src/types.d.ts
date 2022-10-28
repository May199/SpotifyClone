
type TSong = {
  id: number,
  title: string,
  path: string,
  author: string
}

type TNewPlaylistSong = {
  playlistId: number
  title: string,
  path: string,
  author: string
}

type TSongList = {
  playlistId: number,
  songList: Array<TSong>
}

type TPlaylist = {
  userId?: number,
  id: number,
  cover: string,
  playlistName: string
}

type TPlaylistUpdate = {
  cover?: string,
  playlistName?: string
}

type TNewUserPlaylist = {
  userId?: number,
  cover: string,
  playlistName: string
}

type TFAQItem = {
  title: string,
  content: string
}

type TFAQ = {
  title: string,
  perguntas: TFAQItem[]
}

type TUser = {
  id: number,
  email: string,
  password: string,
  name: string,
  birth: string,
  gender: string
}

type TUserUpdate = {
  email?: string,
  password?: string,
  name?: string,
  birth?: string,
  gender?: string
}

type TSetResponse = {
  message?: string,
  error?: string
  status: number
}