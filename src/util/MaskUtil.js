import VMasker from 'vanilla-masker'

export const mask = (field, value) => {
  if (field === 'phone') {
    return VMasker.toPattern(value, '(999) 999-9999') // TODO: Remove this fucking space.
  }
  if (field === 'zip') {
    return VMasker.toPattern(value, '99999')
  }
  if (field === 'birthday') {
    return VMasker.toPattern(value, '99-99-9999')
  }
  return value
}
