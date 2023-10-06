import config from '@config'
import jwt from 'jsonwebtoken'

export const generateToken = (data: any) => {
    return jwt.sign(data, config.jwtSecret, {
        // algorithm: 'RS256'
        expiresIn: '1d'
    })
}