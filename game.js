const express=require("express");
const app=express();

const users = [{
    name: "john",
    kidneys : [{
        healthy: false
    }]
}];

app.use(express.json());

///GET request........to fetch nos. of kidneys
app.get("/",function(req,res){
    const johnkidneys = users[0].kidneys;
    const totalkidneys=johnkidneys.length;

    let Noofhealthykidneys=0;
    for(let i=0;i<totalkidneys;i++){
        if(johnkidneys[i].healthy == true){
            Noofhealthykidneys += 1;
        }
    }

    const Noofunhealthykidneys=totalkidneys-Noofhealthykidneys;
    res.json({
        totalkidneys,
        Noofhealthykidneys,
        Noofunhealthykidneys
    })
})




//POST request......to add healthy or an unhealthy kidney
app.post("/",function(req,res){
    // a body is created to pass the input i.e the new kidney to be inserted is healthy or unhealthy
    const ishealthy=req.body.ishealthy;
    users[0].kidneys.push({
        healthy: ishealthy 
    })
    res.json({
        msg: "Done!!"
    })
})




// PUT Request....replace a unhealthy kidney by healthy kidney
app.put("/",function(req,res){
    for(let i=0;i<users[0].kidneys.length;i++){
        users[0].kidneys[i].healthy=true;
    }
    res.json({
        mssg: "Done"
    })
})




//DELETE Request.....removing all the unhealthy kidneys
app.delete("/",function(req,res){

    //delete unhealthy kidney only if there is atleast one unhealty kidney 
    //to check this we have created an function which checks weather at least onekidney is unhealthy or not
    if(isthereatleastoneunhealthykidney()){
        //create a new array and only store all the healthy kidneys
        const newkidneys = [];
        for(let i=0;i<users[0].kidneys.length;i++){
            if(users[0].kidneys[i].healthy){
                newkidneys.push({
                    healthy:true
                })
            }
        }
        
        users[0].kidneys = newkidneys
        res.json({
            mssg:"Done"
        })
    }
    //or else return 411 error message
    else{  
        res.status(411).json({
            mssg:"you dont have any bad kidney ! so you cant delete any kidney!!"
        })
    }

    //check weather they have atleast one unhealthy kidney
        function isthereatleastoneunhealthykidney(){
            let atleastoneunhealtykidney=false; //initially kept false
            for(let i=0;i<users[0].kidneys.length;i++){ //iterate through status of kidneys in users[0]
                if(!users[0].kidneys[i].healthy){  //if we get healthy status as false
                    atleastoneunhealtykidney=true; //means we got an unhealthy kidney
                }
            }
            return atleastoneunhealtykidney; //return whatever the status.   unhealthy->true  healthy->false
        }

})

app.listen(3000);