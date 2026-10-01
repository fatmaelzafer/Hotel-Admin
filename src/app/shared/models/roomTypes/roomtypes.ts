
export type Types = Roomtypes[]

export interface Roomtypes {
  _id: string
  name: string
  roomAdvantages: RoomAdvantages
  id: string
}

export interface RoomAdvantages {
  beds: string
  view: string
  area: string
  breakfast: string
  livingRoom: string
  _id: string
  id: string
}
