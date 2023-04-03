import { UserEntity } from "@core/data/entities"

export type BasicJwt = {
  exp: number
  iat: number
  iss: string
  sub: string
  email?: string
  avatar?: string
  name?: string
}


export function convertToUser(jwt: BasicJwt): UserEntity {
  return {
    email: jwt.email || jwt.sub,
    name: jwt.name,
    avatar: jwt.avatar
  } as UserEntity
}