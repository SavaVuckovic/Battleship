export function nameIsValid (name){
  if (name.length === 0) {
    return 'Name cannot be empty';
  } else if (name.length > 56) {
    return 'Name cannot be longer than 56 characters';
  } else {
    return 'Valid';
  }
}