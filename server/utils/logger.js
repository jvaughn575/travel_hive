import winston from 'winston';

winston.configure({
    transports: [
        new (winston.transports.File) ({ filename: './server/utils/api.log'}),
        new (winston.transports.Console) (),
    ]
});

function logger (args, level){   
    winston[level](...args);

}

export default logger;



