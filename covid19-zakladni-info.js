fetch('./variables.json')
    .then(response => response.json())
    .then(variables => {
        fetch(`https://onemocneni-aktualne.mzcr.cz/api/v3/zakladni-prehled?apiToken=${variables.apiToken}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
    })