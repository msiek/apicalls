function wafflehouse(lat, long, cb){
    const fourSqURL = `${baseFourSqURL}/search?ll=${lat},${long}&client_id=${clientID}&client_secret=${clientSecret}&v=${version}&query=${location}&limit=${limit}`
}
request.get(fourSqURL, function(err, res, body){
    if(err){
        console.log(err)
    }else {
        const wf = JSON.parse(body)
        for(i=0;i<limit; i++){
            const distance = wf.response.venues[i].location.distance/1609.344
            const name = wf.response.venues[i].name
            const addr = wf.response.venues[i].location.address
            const phone = wf.response.venues[i].contact.formattedPhone
            if(addr != addr){
                if(name == where){
                    model = {
                        Name: name,
                        Address: addr,
                        Phone: phone,
                        Distance: distance.toFixed(2)
                    }
                    results.push(model)
                    cb(results)
                }
            }else{

            }
        }
    }
})