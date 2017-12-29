require('request')
const request = require('request-promise-native')
let root = 'https://jsonplaceholder.typicode.com/users/'

function testAPI() {
    for(i=1; i<10; i++){
        APICall = root
        APICall = APICall+[i]
        request.get(APICall, function(err, res, body){
            if(err){
                console.log(err)
            }else {
                const user = JSON.parse(body)
                if (user.username == 'Bret'){

                }else {
                    const name = user.name
                    const username = user.username
                    const street = user.address.street
                    const city = user.address.city
                    console.log(`${name}\n${username}\n${street} ${city}\n`)
                }
            }
        })
    }
}

testAPI()