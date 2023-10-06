import dotenv from 'dotenv'
import appConfig from './appConfig'

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || appConfig.stage.development;

const envFound = dotenv.config()
if (envFound.error) {
    // This error should crash whole process
    throw new Error("⚠️  The .env file not found!  ⚠️");
}

const {
    MONGODB_HOST,
    MONGODB_LOCAL_PORT,
    MONGODB_DATABASE,
} = process.env;

export default {
    /**
     * App configurations
     */
    app: appConfig,

    /**
     * NODE env stage
     */
    env: process.env.NODE_ENV,

    /**
     * App port
     */
    port: parseInt(process.env.NODE_LOCAL_PORT, 10),

    /**
     * That long string from mlab
     */
    databaseURL: `mongodb://${MONGODB_HOST}:${MONGODB_LOCAL_PORT}/${MONGODB_DATABASE}`,

    /**
     * JWT secret
     */
    jwtSecret: process.env.JWT_SECRET,
    jwtAlgorithm: process.env.JWT_ALGO,

    /**
     * Used by winston logger
     */
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },

    /**
     * API configs
     */
    api: {
        prefix: '/api',
    },
}