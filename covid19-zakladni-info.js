fetch('./variables.json')
    .then(response => response.json())
    .then(variables => {
        fetch(`https://onemocneni-aktualne.mzcr.cz/api/v3/zakladni-prehled?apiToken=${variables.apiToken}`)
        .then(response => response.json())
        .then(data => {
            // preulozeni dat do promenne a vypsani do konzole
            let zakladniInfo = data['hydra:member'][0];
            console.log(zakladniInfo);

            //datum upravy
            let datumUpravy = new Date(zakladniInfo.datum);
            document.getElementById('js-modifikovano').innerText = datumUpravy.toLocaleDateString('cs-CZ');

            //aktualne hospitalizovani
            document.getElementById('js-hospitalizovani').innerText = parseInt(zakladniInfo.aktualne_hospitalizovani).toLocaleString('cs-CZ');

            //pribytek za predchozi mereny den
            document.getElementById('js-potvrzeni').innerText = parseInt(zakladniInfo.potvrzene_pripady_vcerejsi_den).toLocaleString('cs-CZ')
            let datumPotvrzenych = new Date(zakladniInfo.potvrzene_pripady_vcerejsi_den_datum);
            document.getElementById('js-potvrzeni-datum').innerText = datumPotvrzenych.toLocaleDateString('cs-CZ');

            //ockovani za predchozi mereny den
            document.getElementById('js-ockovani').innerText = parseInt(zakladniInfo.ockovane_osoby_vcerejsi_den).toLocaleString('cs-CZ')
            let datumOckovanych = new Date(zakladniInfo.ockovane_osoby_vcerejsi_den_datum);
            document.getElementById('js-ockovani-datum').innerText = datumOckovanych.toLocaleDateString('cs-CZ');
        })
    })