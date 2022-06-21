const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

let coaches = [];

let maxPages = 7;
const buildCoaches = (i) => {
    return new Promise( (resolve, reject) => {
        axios.get('https://www.rvusa.com/rv-guide/specs-guide-search?type_id=' + i)
        .then((response) => {
            const $ = cheerio.load(response.data);

            // create array of separate coaches as they appear in HTML
            let coachesHtml = []
            $('div.spec-search').each((_index, el) => {
                coachesHtml.push($(el));
            })

            // map through coachesHtml and create new coach() with info
                // push to coaches array
            coachesHtml.map((x) => {
                const html = cheerio.load(x.html());

                // find model
                const model = html('h2').text();

                // find class
                const cClass = html('p.spec-search-link-list strong.spec-search-found').text();
                

                // Year drill down
                let plans = [];
                html('.spec-border-line').each((_idx, el) => {
                    plans.push(html(el));
                })
                plans.map((j) => {
                    const yrHtml = cheerio.load(j.html());

                    // year
                    const year = yrHtml('.col-sm-2').text().slice(0, -2); // removes colon
                    
                    // floorplan drill down
                    let fPlans = [];
                    yrHtml('.trim-link-list').each((_idx, el) => {
                        fPlans.push(yrHtml(el));
                    })
                    fPlans.map((i) => {
                        const fHtml = cheerio.load(i.html());
                        fHtml('strong.spec-search-found').each((_idx, el) => {
                            const floorplan = fHtml(el).text();
                            
                            // create coach and push to coaches array
                            //let newCoach = new coach(cClass, year, model, floorplan);
                            coaches.push({
                                "class": cClass, 
                                "year": year, 
                                "model": model,
                                "floorplan": floorplan
                            });
                        });
                    })
                })
            })


        })
        .catch((err) => {
            console.log(err);
        })
        .then( () => resolve())

    })
       
}
async function buildDoc() {
    for (let i = 0; i < maxPages + 1; i++) {
        await buildCoaches(i);
    }
    fs.appendFile("./coaches.json", JSON.stringify(coaches, null, 4), err => {
        if (err) {
            console.log(err);
            }
        });
    console.log('done!');
}

buildDoc();
