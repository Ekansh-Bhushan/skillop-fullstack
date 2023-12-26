function response_200(res, message, data) {
    return res.status(200).json({
        result: data,
        message,
    });
}

function response_201(res, message, data) {
    return res.status(201).json({
        result: data,
        message,
    });
}

function response_204(res, message) {
    return res.status(204).json({
        result: false,
        message,
    });
}

function response_400(res, message) {
    return res.status(400).json({
        result: false,
        error: message,
        message: message,
    });
}

function response_401(res, message) {
    return res.status(401).json({
        result: false,
        error: message,
        message: message,
    });
}

function response_403(res, message) {
    return res.status(403).json({
        result: false,
        error: message,
        message: message,
    });
}

function response_404(res, message) {
    return res.status(404).json({
        result: false,
        error: message,
        message: message,
    });
}

function response_500(res, log_message, err) {
    var message = err != null ? `${log_message}: ${err}` : log_message;

    console.debug(message);

    return res.status(500).json({
        result: false,
        error: `Something went wrong.\n${message}`,
        message: "Internal server error",
    });
}

module.exports = {
    response_200,
    response_201,
    response_204,
    response_400,
    response_401,
    response_403,
    response_404,
    response_500,
};
