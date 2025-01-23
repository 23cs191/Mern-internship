// const http = require('http');

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { "Content-Type": "text/html"});
//     res.end("Hello World");
// });

// server.listen(3000, () => {
//     console.log("Server running at http://127.0.0.1:3000");
// });

// const calculate=require("./calculator")
// console.log(calculate.add(20,20))


// console.log("hi")
// setTimeout(()=>{
// console.log("Inside")
// },5000)
// console.log("Hello")


// const fs=require('fs');
// fs.readFile('sample.txt',"utf8",(err,data)=>{
//     if(err){
//         console.error(err)
//         return
//     }
//     console.log(data)
// })


// FileSystem.writeFile("sample1.txt","Hello , World!",(err)=>{
//     if(err){
//         console.error(err);
//     }
// });

// FileSystem.readFile('sample.josn','utf8',(err,data)=>{
//     if(err){
//         console.error(err)
//         return
//     }
//     const json=JSON.parse(data)
//     console.log(json);
// })
// const newPerson={
//     "id":4,
//     name:"Ruban",
//     age:30,
//     city:'New York',
//     amount:5000
// }
// const fs=require('fs');
// fs.readFile('sample.json','utf8',(err,data)=>{
//     if(err){
//         console.error(err);
//         return
//     }   
//     const json=JSON.parse(data);
//     console.log(json);
//          json.push(newPerson);
//          console.log(json);
// })
const newPerson={
    name:"Ruban",
    age:30,
    city:'New York',
    amount:5000
}
const fs=require('fs');
fs.readFile('sample.json','utf8',(err,data)=>{
    if(err){
        console.error(err);
        return
    }   
    const json=JSON.parse(data);
         const newList=json.filter((data) => data.id!==3);
         fs.writeFile('sample.json',JSON.stringify(newList),(err)=>{
            if(err){
                console.error(err)
                return
            }
         })
})

