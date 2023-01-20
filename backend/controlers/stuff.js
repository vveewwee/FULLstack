// const Thing = require('../models/Thing');

// exports.createThing = (req, res, next) => {
//     //a new instance of our mongoose model
//     const thing = new Thing({
//         title: req.body.title,
//         description: req.body.descripton,
//         imageUrl : req.body.imageUrl,
//         price: req.body.price,
//         userId: req.body.userId
//     });
//     thing.save().then(
//         () => {
//         res.status(201).json({
//             message: 'Post saved successfully' });
//     }).catch(
//         (error) => {
//             res.status(400).json({ error });
//     });
//     // console.log(req.body);
//     // res.status(201).json({ message : 'Thing send succesfully'});
// };

// exports.getOneThing = (req,res,next)=>{
//     Thing.findOne({
//         _id: req.params.id
//     }).then(
//         (thing)=>{
//             res.status(200).json(thing);
//         }
//     ).catch(
//         (error)=>{
//             res.status(400).json({ error });
//     });
//     //req.params.id
// };

// exports.modifyThing = (req,res,next)=>{
//     const thing = new Thing({
//         _id: req.param.id,
//         title: req.body.title,
//         description: req.body.descripton,
//         imageUrl : req.body.imageUrl,
//         price: req.body.price,
//         userId: req.body.userId
//     });
//     Thing.updateOne({_id: req.body.id}, thing).then(
//         ()=>{
//             res.status(201).json({
//                 message: 'Thing updated successfully'
//             });
//         }
//     ).catch(
//         (error)=>{
//             res.status(400).json({ error });
//     });
// };

// exports.deleteThing = (req, res, next)=>{
//     Thing.deleteOne({
//         _id: req.params.id
//     }).then(()=>{
//         res.status(200).json({
//             message: 'Thing deleted'
//         });
//     }).catch((error)=>
//     res.status(400).json({ error }));
// };

// exports.getAllThings = (req,res, next)=>{
//     Thing.find().then(
//         (things) =>{
//             res.status(200).json(things);
//         }
//     ).catch((error)=>{
//         res.status(400).json({ error });
//     });
// };

    // exports.getAllThings = (req,res, next)=>{
    // const stuff = [
    //     {
    //         _id: 'oeihfzeoi',
    //         title: 'My first thing',
    //         description: 'All of the info about my first thing',
    //         imageUrl: 'https://thechive.com/wp-content/uploads/2019/12/person-hilariously-photoshops-animals-onto-random-things-xx-photos-8.jpg?quality=85&strip=info&w=600',
    //         price: 4900,
    //         userId: 'qsomihvqios',
    //       },
    //       {
    //         _id: 'oeihfzeomoihi',
    //         title: 'My second thing',
    //         description: 'All of the info about my second thing',
    //         imageUrl: 'https://cdn.ebaumsworld.com/mediaFiles/picture/1945966/81478673.jpg',
    //         price: 2900,
    //         userId: 'qsomihvqios',
    //       },
    // ];
    // res.status(200).json(stuff);
    //}



const Thing = require('../models/Thing');
const fs = require('fs');

exports.createThing = (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    req.body.thing = JSON.parse(req.body.thing);
  const thing = new Thing({
            _id: req.param.id,
            title: req.body.thing.title,
            description: req.body.thing.descripton,
            imageUrl : url + '/images/' + req.file.filename,
            price: req.body.thing.price,
            userId: req.body.thing.userId
    });
    console.log(thing.title);
  thing.save().then(() => res.status(201).json({ message: 'New Thing added!'})).catch(error => res.status(400).json({ error }));
};

exports.modifyThing = (req, res, next) => {
    let thing = new Thing({ _id: req.params._id });
    if (req.file){
        const url = req.protocol + '://' + req.get('host');
        req.body.thing = JSON.parse(req.body.thing);
        thing = {
            _id :req.params.id,
            title: req.body.thing.title,
            description: req.body.thing.descripton,
            imageUrl : url + '/images/' + req.file.filename,
            price: req.body.thing.price,
            userId: req.body.thing.userId
    };  
    } else{
        thing = {
            _id :req.params.id,
            title: req.body.title,
            description: req.body.descripton,
            imageUrl : req.body.imageUrl,
            price: req.body.price,
            userId: req.body.userId
        };
    }
    Thing.updateOne({ _id: req.params.id }, thing)
        .then(() => res.status(200).json({ message: 'Thing updated successfully !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
    .then(thing => {
        const filename = thing.imageUrl.split('/images')[1];
        fs.unlink('images/' + filename, ()=>{
            Thing.deleteOne({ _id: req.params.id }).then(
                () => res.status(200).json({ message: 'Object deleted!'}))
                  .catch(error => res.status(400).json({ error }));
              })
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getOneThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
};

exports.getAllThings = (req, res, next) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
};