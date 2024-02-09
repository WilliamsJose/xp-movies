export enum FindAllUserFavoritesEnum {
  Success,
  InvalidParameters = 'Missing param: userId.',
  InvalidUser = 'User not found on database.'
}
