const { ApiError } = require('./Classes/ApiError');

const errorHandler = (err, req, res, next) => {
    //log the error if in prod
    if (process.env.NODE_ENV === 'development') {
        console.log('err: ', err, 'err class: ', err.toString());
    }
    if (err instanceof ApiError) {
        res.status(err.status).json(err);
        return;
    }
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
};

module.exports = {
    errorHandler,
};
