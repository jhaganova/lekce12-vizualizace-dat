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
            let noveNakazeni =  parseInt(zakladniInfo.potvrzene_pripady_vcerejsi_den);
            document.getElementById('js-potvrzeni').innerText = noveNakazeni.toLocaleString('cs-CZ')
            
            let datumPotvrzenych = new Date(zakladniInfo.potvrzene_pripady_vcerejsi_den_datum);
            document.getElementById('js-potvrzeni-datum').innerText = datumPotvrzenych.toLocaleDateString('cs-CZ');

            //ockovani za predchozi mereny den
            document.getElementById('js-ockovani').innerText = parseInt(zakladniInfo.ockovane_osoby_vcerejsi_den).toLocaleString('cs-CZ')
            let datumOckovanych = new Date(zakladniInfo.ockovane_osoby_vcerejsi_den_datum);
            document.getElementById('js-ockovani-datum').innerText = datumOckovanych.toLocaleDateString('cs-CZ');
        
            // UKOL NA CVICENI
            // pridej do prehledu podil pribytku nakazenych ve vekove 
            // skupine 65+ za posledni mereny den z celkoveho pribytku
            // nakazenych za posledni mereny den
            let noveNakazeniNad65 = parseInt(zakladniInfo.potvrzene_pripady_65_vcerejsi_den);
            document.getElementById('js-potvrzeni-nad-65-let').innerText = noveNakazeniNad65;
            document.getElementById('js-potvrzeni-nad-65-let-podil').innerText = Math.round((noveNakazeniNad65 / noveNakazeni) * 100);
            
            // UKOL NA CVICENI
            // proved validaci, zda plati podminka 
            // celkem_potvrzeni = aktivni + vyleceni + umrti
            // vysledek validace vypis do konzole pomoci console.log()
            platnostUdaju();
            function platnostUdaju() {
                let potvrzenePripadyCelkem = parseInt(zakladniInfo.potvrzene_pripady_celkem);
                let aktivniPripady = parseInt(zakladniInfo.aktivni_pripady);
                let vyleceniCelkem = parseInt(zakladniInfo.vyleceni);
                let umrtiCelkem = parseInt(zakladniInfo.umrti);

                if (potvrzenePripadyCelkem == (aktivniPripady + vyleceniCelkem + umrtiCelkem)) {
                    console.log('Celkový počet případů odpovídá aktuálně nakaženým + vyléčeným + mrtvým případům.');
                } else {
                    console.log('Celkový počet případů NEODPOVÍDÁ aktuálně nakaženým + vyléčeným + mrtvým případům.');
                }
            }


            // BONUSOVY UKOL NA CVICENI
            // proved refactoring lokalizace datumu a cislnych hodnot
            // tak, ze vyvoris dve separatni funkce pro lokalizaci
        })
    })
    .catch(error => {
        console.error('Chyba aplikace (zakladni info): ', error);
    })