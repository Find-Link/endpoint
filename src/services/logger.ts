import winston from 'winston';

const {
  timestamp, combine, json, errors,
} = winston.format;

const logger = winston.createLogger({
  format: combine(
    errors({ stack: true }),
    timestamp(),
    json(),
  ),
  transports: [
    new winston.transports.File({
      filename: 'logging.log',
      maxsize: 2000000,
      maxFiles: 4,
    }),
  ],
});

export default logger;
