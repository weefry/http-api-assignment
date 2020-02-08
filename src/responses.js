// this sends back both stringified JSON and stringified XML
const respond = (request, response, statusCode, content, contentType) => {
    response.writeHead(statusCode, {
        'Content-Type': contentType,
    });
    response.write(content);
    response.end();
};

// TEST THIS WHEN GETTING XML WORKING
// const makeXML = (data, id) => {
//    let responseXML = '<response>';
//    responseXML = `${responseXML} <message>${data}</message>`;
//    let responseXML = `${responseXML} <id>${id}</id>`;
//    responseXML = `${responseXML} </response>`;
//    return respond(request, response, 404, responseXML, 'text/xml');
// }

// function to show not found error
const notFound = (request, response, acceptedTypes) => {
    // error message with a description and consistent error id
    const data = {
        message: 'The page you are looking for was not found.',
        id: 'notFound',
    };

    if (acceptedTypes[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${data.message}</message>`;
        responseXML = `${responseXML} <id>${data.id}</id>`;
        responseXML = `${responseXML} </response>`;
        return respond(request, response, 404, responseXML, 'text/xml');
    }

    const dataString = JSON.stringify(data);
    return respond(request, response, 404, dataString, 'application/json');
};

const success = (request, response, acceptedTypes) => {
    const data = {
        message: 'This is a successful response',
    };

    if (acceptedTypes[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${data.message}</message>`;
        responseXML = `${responseXML} </response>`;
        return respond(request, response, 200, responseXML, 'text/xml');
    }
    const dataString = JSON.stringify(data);
    return respond(request, response, 200, dataString, 'application/json');
};

const badRequest = (request, response, acceptedTypes, params) => {
    const data = {
        message: 'This request has the required parameters',
    };

    if (!params.valid || params.valid !== 'true') {
        if (acceptedTypes[0] === 'text/xml') {
            data.message = 'Missing valid query parameter set to true';
            data.id = 'badRequest';
            let responseXML = '<response>';
            responseXML = `${responseXML} <message>${data.message}</message>`;
            responseXML = `${responseXML} <id>${data.id}</id>`;
            responseXML = `${responseXML} </response>`;
            return respond(request, response, 400, responseXML, 'text/xml');
        }
        data.message = 'Missing valid query parameter set to true';
        data.id = 'badRequest';
        const dataString = JSON.stringify(data);
        return respond(request, response, 400, dataString, 'application/json');
    }

    if (acceptedTypes[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${data.message}</message>`;
        responseXML = `${responseXML} <id>${data.id}</id>`;
        responseXML = `${responseXML} </response>`;
        return respond(request, response, 200, responseXML, 'text/xml');
    }
    const dataString = JSON.stringify(data);
    return respond(request, response, 200, dataString, 'application/json');
};

const unauthorized = (request, response, acceptedTypes, params) => {
    const data = {
        message: 'This request is logged in',
    };

    if (!params.loggedIn || params.loggedIn !== 'yes') {
        if (acceptedTypes[0] === 'text/xml') {
            data.message = 'Missing logged in query parameter set to yes';
            data.id = 'badLogin';
            let responseXML = '<response>';
            responseXML = `${responseXML} <message>${data.message}</message>`;
            responseXML = `${responseXML} <id>${data.id}</id>`;
            responseXML = `${responseXML} </response>`;
            return respond(request, response, 401, responseXML, 'text/xml');
        }
        data.message = 'Missing logged in query parameter set to yes';
        data.id = 'badLogin';
        const dataString = JSON.stringify(data);
        return respond(request, response, 401, dataString, 'application/json');
    }

    if (acceptedTypes[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${data.message}</message>`;
        responseXML = `${responseXML} <id>${data.id}</id>`;
        responseXML = `${responseXML} </response>`;
        return respond(request, response, 200, responseXML, 'text/xml');
    }
    const dataString = JSON.stringify(data);
    return respond(request, response, 200, dataString, 'application/json');
};

const forbidden = (request, response, acceptedTypes) => {
    const data = {
        message: 'This is a forbidden page',
        id: 'forbidden',
    };

    if (acceptedTypes[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${data.message}</message>`;
        responseXML = `${responseXML} <id>${data.id}</id>`;
        responseXML = `${responseXML} </response>`;
        return respond(request, response, 403, responseXML, 'text/xml');
    }

    const dataString = JSON.stringify(data);
    return respond(request, response, 403, dataString, 'application/json');
};

const internal = (request, response, acceptedTypes) => {
    const data = {
        message: 'Internal server error',
        id: 'internal',
    };

    if (acceptedTypes[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${data.message}</message>`;
        responseXML = `${responseXML} <id>${data.id}</id>`;
        responseXML = `${responseXML} </response>`;
        return respond(request, response, 500, responseXML, 'text/xml');
    }

    const dataString = JSON.stringify(data);
    return respond(request, response, 500, dataString, 'application/json');
};

const notImplemented = (request, response, acceptedTypes) => {
    const data = {
        message: 'This page is not implemented',
        id: 'notImplemented',
    };

    if (acceptedTypes[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${data.message}</message>`;
        responseXML = `${responseXML} <id>${data.id}</id>`;
        responseXML = `${responseXML} </response>`;
        return respond(request, response, 501, responseXML, 'text/xml');
    }

    const dataString = JSON.stringify(data);
    return respond(request, response, 501, dataString, 'application/json');
};

module.exports = {
    notFound,
    success,
    badRequest,
    unauthorized,
    forbidden,
    internal,
    notImplemented,
};
