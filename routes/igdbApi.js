const igdb = require('igdb-api-node').default;

const client = igdb(process.env.igdbKey);

function gameData(game) {
    
    console.log(game);

    client.games({
        search: game
    },[
        'name',
        'release_dates.date',
        'rating',
        'hypes',
        'cover'
    ]
    ).then(res => {
        console.log(res.body);
    });

};
module.exports = gameData;