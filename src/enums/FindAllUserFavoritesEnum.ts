export enum FindAllUserFavoritesEnum {
  Success,
  InvalidParameters = 'You must provide an userId',
  InvalidUser = 'User not found on database'
}
