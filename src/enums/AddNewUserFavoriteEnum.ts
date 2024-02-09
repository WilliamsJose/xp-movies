export enum AddNewUserFavoriteEnum {
  Success = 'New favorite movie added!',
  InvalidParameters = 'Missing params userId, imdbId, categoriesIds or title.',
  UserNotFound = 'User not found on database',
  UserNotRegistered = 'User must be registered to add an favorite.',
  InvalidCategories = 'Invalid categories.'
}
