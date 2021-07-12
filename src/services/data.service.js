const domain = "https://oyku-perf-api.herokuapp.com/api/analytics";

export const dataService = {
    getByMin,
    getByDate
};

function getByMin(minute) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        //body: JSON.stringify({ minute })
    };

    return fetch(domain + `/getByMin/` + minute, requestOptions)
        .then(handleResponse)
        .then(
            data => { 
                return data;
            }
        );
}

function getByDate(start,end) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ start, end })
    };

    return fetch(domain + `/getByDate/`, requestOptions)
        .then(handleResponse)
        .then(
            data => { 
                return data;
            }
        );
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        
        if (!response.ok) {
            if (response.status === 401) {
                console.log("401");
            }

            console.log("handleResponse", data);

            const error = (data && (data.detail || data.errors)) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}