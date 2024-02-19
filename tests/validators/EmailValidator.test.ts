import { EmailValidator } from '../../src/validators/EmailValidator'

describe('EmailValidator', () => {
  it('should return true', () => {
    const valid = 'email.test@emai.com'
    expect(new EmailValidator().isValid(valid)).toBe(true)
  })

  it('should return false', () => {
    const valid = 'email.testemai.com'
    expect(new EmailValidator().isValid(valid)).toBe(false)
  })

  it('should return false', () => {
    const valid = 'email.testemai@.com'
    expect(new EmailValidator().isValid(valid)).toBe(false)
  })

  it('should return false', () => {
    const valid = '@.com'
    expect(new EmailValidator().isValid(valid)).toBe(false)
  })

  it('should return false', () => {
    const valid = 'email@'
    expect(new EmailValidator().isValid(valid)).toBe(false)
  })

  it('should return false', () => {
    const valid = '@example.com'
    expect(new EmailValidator().isValid(valid)).toBe(false)
  })

  it('should return true', () => {
    const valid = 'email.test@example.com!'
    expect(new EmailValidator().isValid(valid)).toBe(false)
  })

  it('should return false', () => {
    const valid = ''
    expect(new EmailValidator().isValid(valid)).toBe(false)
  })
})
