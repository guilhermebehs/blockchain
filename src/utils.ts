import { createHash } from 'crypto'

export function hash(payload:string): string{
    return createHash('sha256').update(payload).digest('hex')
}