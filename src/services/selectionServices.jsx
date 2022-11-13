//  import projectAPI from "../config/api";

// export async function getTargets() {
//   const response = await projectAPI.get('/api/tickets/target');
//   console.log(response)
//   return response.data;
// }

 export async function getTargets(){
    const targets = [
        {name:"Free"},
        {name:"Pro"},
        {name:"Teams"},
        {name:"Education"},
        {name:"All"},
        {name:"Others"},
    ]

    return targets;
 }


// export async function getImpacts() {
//   const response = await projectAPI.get('/api/tickets/impact');
//   return response.data;
// }
export async function getImpacts(){
    const impacts = [
        {name:"Small"},
        {name:"Medium"},
        {name:"Large"},
        {name:"Xlarge"},
    ]

    return impacts;
}

// export async function getConfidences() {
//   const response = await projectAPI.get('/api/tickets/confidence');
//   return response.data;
// }

export async function getConfidences(){
    const confidences = [
        {name:"Small"},
        {name:"Medium"},
        {name:"Large"},
        {name:"Xlarge"},
    ]

    return confidences;
}

// export async function getEfforts() {
//   const response = await projectAPI.get('/api/tickets/effort');
//   return response.data;
// }

export async function getEfforts(){
    const efforts = [
        {name:"Small"},
        {name:"Medium"},
        {name:"Large"},
        {name:"Xlarge"},
    ]

    return efforts;
}