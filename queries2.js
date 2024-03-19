// Database > Database | Table > Collection | Row > Document | Column > Field | Table Join > Embedded Documents | Primary Key

// DATABASE

use mydb;                                    // Create Database
mydb.dropDatabase();                         // Drop Database
db;                                          // Currently Database
show dbs;                                    // Show databases

// TABLE

db.createCollection("users");                 // Create table
db.users.drop();                              // Drop table
show collections;                             // Show tables in the currently database

// INSERT

db.users.insertOne(                           // Insert One
    {
         nome: "Ronald",
         idade: 27,
         telefone: 333333333
    }
)

db.users.insertMany([                         // Insert Many
    {
        nome: "Lucia",
        idade: 54,
        telefone: 666666666666
    },
    {
        nome: "Cardoso",
        idade: 28,
        telefone: 5455555555,
    },
        {
        nome: "Luna",
        idade: 1,
        telefone: 1111111111
    },
    {
        nome: "Bruno",
        idade: 2,
        telefone: 2222222222,
    },
    {
        nome: "Paulo",
        idade: 73,
        telefone: 3333333333,
    }
])


// SELECT

db.users.find({});                                      // Select
db.users.find({}).pretty();                             // Select in a pretty formated way
db.users.findOne({});                                   // Select only one document | row
db.users.find({}, {nome: 1, idade: 1, _id: 0})          // Select nome, idade from users
db.users.find({}).limit(2);                             // select top 2 from users
db.users.find({}).sort({nome: -1});                     // -1: descending | 1: ascending

// REGEX
db.users.find({ nome: {$regex: "^J", $options: "i"} })  // ^ inicia com a letra J ; i case insensitive(lower and upper case)
db.users.find({ nome: {$regex: "A$", $options: "i"} })  // $ termina com a letra A ; i case insensitive(lower and upper case)
db.user.find({ nome: {$regex: ".*n.*", $option: "i"} }) // .* .* encontra valor no meio do texto

// WHERE
db.users.find({ idade: 27 });                                     // WHERE idade = 27
db.users.find({ idade: {$eq: 27} });                              // WHERE idade = 27
db.users.find({ idade: {$lte: 27} });                             // WHERE idade <= 27
db.users.find({ idade: {$lt: 27} });                              // WHERE idade < 27
db.users.find({ idade: {$gt: 27} });                              // WHERE idade > 27
db.users.find({ idade: {$gte: 27} });                             // WHERE idade >= 27
db.users.find({ idade: {$lte: 27} });                             // WHERE idade <= 27
db.users.find({ idade: {$ne: 27} });                              // WHERE idade <> 27
db.users.find({ idade: {$in: [ 27, 2 ]} });                       // WHERE idade IN (27, 2)
db.users.find({ idade: {$nin: [ 27, 2 ] } });                     // WHERE idade NOT IN (27, 2)
db.users.find({ idade: { $not: {$eq: 27}} });                     // WHERE idade <> 27
db.users.find( {idade: 27, nome: "Ronald"} );                     // WHERE idade = 27 AND nome = "Ronald"
db.users.find({ $and: [{idade: 27, nome:"Ronald"}] });            // WHERE idade = 27 AND nome = "Ronald"
db.users.find({ $or: [{idade: 27}, {nome: "Luna"}] });            // WHERE idade = 27 OR nome = "Luna"
db.users.find({ $nor: [{idade: 27}, {nome: "Luna"}] });           // WHERE nome <> 27 OR idade <> 54
db.users.find({ nome: "Ronald", $or: [{idade: {$in:[27,54]}}] })  // WHERE nome = Ronald AND (idade = 27 OR idade = 54)

// UPDATE
// update(): update the values 

db.users.updateOne(                                               // update and does not return the data
{ nome: "Bruno"},
{ $set: { idade: 35 } }
)

db.users.findOneAndUpdate(                                        // update and return the data
    { nome: "Bruno" },
    { $set: {idade: 30} }
)

db.users.updateMany(
    { nome: {$in: ["Paulo", "Luna", "Bruno"]} },
    { $set: { telefone: 123456, idade: 20 } }
)

// DELETE
db.users.deleteOne({ nome: "Luna" })
db.users.deleteMany({ nome: "Ronald" })

// RELATIOSHIP

// One to One

db.users.insertMany({
    dono: "Ronald",
    endereco: {
        rua: "SQL Street",
        bairro: "Microsoft"
    }
})

// One to Many
db.users.insertMany({
    dono: "Ronald",
    endereco: [
        { 
            rua: "Mongodb Street",
            bairro: "Mongodb"    
        },
        {
            rua: "Test Street",
            bairro: "Test Neighboor"
        },
        {
            rua: "Vassoura Street",
            bairro: "Vassoura Neighboor"
        }
    ]
})

// Many to Many
db.users.insertMany({
    usuarios: [
        { 
            id: 1,
            nome: "Ronald",
            acessos: [
                ObjectId("115674852"),
                ObjectId("6554842")
            ]
        },
        { 
            id: 2,
            nome: "Lucia",
            acessos: [
                ObjectId("115674852")
            ]
        }
        
    ],
    acessos: [
        { 
            id: 115674852,
            tipoAcesso: "usuario",
            usuarios: [
                ObjectId("1"),
                ObjectId("2"),
            ]    
        },
        {
            id: 6554842,
            tipoAcesso: "admin",
            usuarios: [
                ObjectId("1")
            ]
        }
    ]
})


// AGGREGATE
// Input >> $Match >> projection >> $group >> $sort >> output

db.universities.insertMany([
    {
      country : 'Spain',
      city : 'Salamanca',
      name : 'USAL',
      location : {
        type : 'Point',
        coordinates : [ -5.6722512,17, 40.9607792 ]
      },
      students : [
        { year : 2014, number : 24774 },
        { year : 2015, number : 23166 },
        { year : 2016, number : 21913 },
        { year : 2017, number : 21715 }
      ]
    },
    
    {
      country : 'Spain',
      city : 'Salamanca',
      name : 'UPSA',
      location : {
        type : 'Point',
        coordinates : [ -5.6691191,17, 40.9631732 ]
      },
      students : [
        { year : 2014, number : 4788 },
        { year : 2015, number : 4821 },
        { year : 2016, number : 6550 },
        { year : 2017, number : 6125 }
      ]
    }
])

db.courses.insertMany([
    
    {
      university : 'USAL',
      name : 'Computer Science',
      level : 'Excellent'
    },
    {
      university : 'USAL',
      name : 'Electronics',
      level : 'Intermediate'
    },
    {
      university : 'USAL',
      name : 'Communication',
      level : 'Excellent'
    }
])


db.universities.aggregate([                                        // $match: filter data
    { $match: { country: "Spain", city: "Salamanca" } }
]).pretty();

db.universities.aggregate([
    { $project: {country: 1, city: 1, name: 1, _id: 0} }           // $project: return specif columns
]).pretty()

db.universities.aggregate([                                        // $group: aggregation or summary
    {$group: { _id: "$name", qtd: { $sum: 1 }}}
])

db.universities.aggregate([                                        // INSERT INTO aggResult SELECT * FROM universities
    { $group: { _id: "$name", qtd: {$sum: 1} } },
    { $out: 'aggResult' }
])

db.aggResult.find({}).pretty()

db.universities.aggregate([                                        // $unwind: deconstructs the output by each element in the array
    { $match: { name: "USAL" } },
    { $unwind: "$students" }
]).pretty()

db.universities.aggregate([                                        // $sort: -1: descending | 1: ascending
    {$match: { name: "USAL" }},
    {$unwind: "$students" },
    {$project: {_id: 0, "students.year": 1, "students.number": 1 }},
    {$sort: {"students.number": -1}}
])

db.universities.aggregate([                                        // limit
    {$match: { name: "USAL" }},
    {$unwind: "$students" },
    {$project: {_id: 0, "students.year": 1, "students.number": 1}},
    {$sort: {"students.number": -1}},
    {$limit: 2}
]).pretty();

db.universities.aggregate([                                                            
    {$unwind: "$students" },
    {$match: {"students.year": 2014}},
    {$group: {
        _id: null, 
        somaNumber: {$sum: "$students.number"}
        }
    },
    {$project: {_id: 0, somaNumber: 1}},
])

db.universities.aggregate([                                        // $addFields
    { $match: {name: "USAL"} },
    { $addFields: {foundation_year: 1218}}
])

db.universities.aggregate([                                        // $count
    { $unwind: "$students" },
    { $count: 'total_documents' }
])

db.universities.aggregate([                                        // $lookup
    { $match: { name: "USAL" } },
    { $project: {_id: 0, name: 1} },
    { $lookup: {  
        from: "courses",
        localField: "name",
        foreignField: "university",
        as: "resultado"
    } }
]).pretty();


db.courses.aggregate([                                            // sort by count
    { $sortByCount: "$level" }
]).pretty()

db.universities.aggregate([                                        // facet
    { $match: { name: "USAL" } },
    { $lookup: {
        from: "courses",
        localField: "name",
        foreignField: "university",
        as: "courses"   
    }},
    { $facet: {
        "countingLevels": 
        [
            { $unwind: "$courses" },
            { $sortByCount: "$courses.level" }
        ],
        "yearWithLessStudents": 
        [
             { $unwind : '$students' },
             { $project : { _id : 0, students : 1 } },
             { $sort : { 'students.number' : 1 } },
             { $limit : 1 }
        ]
    } }
]).pretty()



// remove duplicate values

db.lists.aggregate([
    {   
        $group: {
        _id: { title: "$title" },
        dups: { $addToSet: "$_id" },
        count: { $sum: 1 }
    }},
    {
        $match: {
            count: {$gt: 1}
        }
    }
]).forEach(function(doc){
    doc.dups.shift();
    db.lists.deleteMany({ _id: {$in: doc.dups} })
})



