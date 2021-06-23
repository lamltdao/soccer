import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);


export const toHash = async (password: string) => {
  try {
    const salt = randomBytes(8).toString('hex');
    const buffer = (await scryptAsync(password, salt, 64)) as Buffer;
  
    return `${buffer.toString('hex')}.${salt}`;
  }
  catch {

  }
}

export const compare = async (storedPassword: string, suppliedPassword: string) => {
  try {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buffer = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
    return buffer.toString('hex') === hashedPassword;
  }
  catch {

  }
}
