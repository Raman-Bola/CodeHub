const mongoose=require('mongoose');

const Dsa= require('./models/dsa')
const Dev=require('./models/dev')

mongoose.connect('mongodb://localhost:27017/CodeHub')
    .then(()=>{
        console.log("Mongo Connection Open!");
    })
    .catch(err =>{
        console.log("Unable to Connect with Mongoose");
        console.log(err);
    })


// const p= new Dsa({
//     title: 'Decode String',
//     topics: ['String'],
//     description: 'Medium',
// })

// p.save()
//     .then(p=>{ console.log(p)})
//     .catch(e=>{console.log(e)});

Dsa.deleteMany({})
  .then()
  .catch(e=> console.log(e));
Dev.deleteMany({})
  .then()
  .catch(e=> console.log(e));



//   const seedDsa = [
//   {
//     title: "TrappingRainwater",
//     topics: ["Array","Stack"],
//     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. A earum excepturi sint recusandae! Neque rerum ratione, eveniet est odit aliquid dolorum non. Iure est sint, deleniti rem qui illum sequi?",
//     link:"https://leetcode.com/problems/trapping-rain-water/",
//     author:"6379be121f16bf3825f82611"
//   },
//   {
//     title: "Container With Most Water",
//     topics: ["Array"],
//     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. A earum excepturi sint recusandae! Neque rerum ratione, eveniet est odit aliquid dolorum non. Iure est sint, deleniti rem qui illum sequi?",
//     link:"https://leetcode.com/problems/container-with-most-water/",
//      author:"6379be121f16bf3825f82611"
//   },
//   {
//     title: "Decode String",
//     topics: ["String"],
//     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. A earum excepturi sint recusandae! Neque rerum ratione, eveniet est odit aliquid dolorum non. Iure est sint, deleniti rem qui illum sequi?",
//     link:"https://leetcode.com/problems/decode-string/",
//      author:"6379be121f16bf3825f82611"
//   },
//   {
//     title: "Next Greater Element",
//     topics: ["Stack"],
//     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. A earum excepturi sint recusandae! Neque rerum ratione, eveniet est odit aliquid dolorum non. Iure est sint, deleniti rem qui illum sequi?",
//      author:"6379be121f16bf3825f82611"
//   },
//   {
//     title: "Inorder Traversal",
//     topics: ["Tree"],
//     description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. A earum excepturi sint recusandae! Neque rerum ratione, eveniet est odit aliquid dolorum non. Iure est sint, deleniti rem qui illum sequi?",
//      author:"6379be121f16bf3825f82611"
//   },
//   {
//     title: "Cycle Detection",
//     topics: ["Graph"],
//     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. A earum excepturi sint recusandae! Neque rerum ratione, eveniet est odit aliquid dolorum non. Iure est sint, deleniti rem qui illum sequi?",
//     author:"6379be121f16bf3825f82611"
//   },
//   {
//     title: "Decode Ways",
//     topics: ["String","Graph"],
//     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. A earum excepturi sint recusandae! Neque rerum ratione, eveniet est odit aliquid dolorum non. Iure est sint, deleniti rem qui illum sequi?",
//     link:"https://leetcode.com/problems/decode-ways/",
//     author:"6379be121f16bf3825f82611"
//   }
// ];

// // const seedDsa = [
// //   {
// //     title: "TrappingRainwater",
// //     topics: "Array",
// //     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. A earum excepturi sint recusandae! Neque rerum ratione, eveniet est odit aliquid dolorum non. Iure est sint, deleniti rem qui illum sequi?",
// //   },
// //   {
// //     title: "Container With Most Water",
// //     topics: "Array",
// //     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. A earum excepturi sint recusandae! Neque rerum ratione, eveniet est odit aliquid dolorum non. Iure est sint, deleniti rem qui illum sequi?",
// //   },
// //   {
// //     title: "Decode String",
// //     topics: "String",
// //     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. A earum excepturi sint recusandae! Neque rerum ratione, eveniet est odit aliquid dolorum non. Iure est sint, deleniti rem qui illum sequi?",
// //   },
// //   {
// //     title: "Next Greater Element",
// //     topics: "Stack",
// //     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. A earum excepturi sint recusandae! Neque rerum ratione, eveniet est odit aliquid dolorum non. Iure est sint, deleniti rem qui illum sequi?",
  
// //   },
// //   {
// //     title: "Inorder Traversal",
// //     topics: "Tree",
// //     description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. A earum excepturi sint recusandae! Neque rerum ratione, eveniet est odit aliquid dolorum non. Iure est sint, deleniti rem qui illum sequi?",
  
// //   },
// //   {
// //     title: "Cycle Detection",
// //     topics: "Graph",
// //     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. A earum excepturi sint recusandae! Neque rerum ratione, eveniet est odit aliquid dolorum non. Iure est sint, deleniti rem qui illum sequi?",
  
// //   },
// // ];

// Dsa.insertMany(seedDsa)
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err=> {
//     console.log(err);
//   });
