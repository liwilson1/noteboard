const express = require('express');
const mysql = require('mysql');

const router = express.Router();
const db = require('../../config/db');

// Get posts
router.get('/', (req, res) =>{
    db.query('SELECT * FROM noteboard', function (error, results, fields) {
        if(error) throw error;
        res.json(results)
    })
});
// Get specific post
router.get('/:id', (req,res) =>{
    var id = req.params.id
    db.query('SELECT * FROM noteboard WHERE id = ?', [id], function(error, results, fields){
        if(error) throw error;
        res.json(results);
    })
})
// Add Post
router.post('/', (req, res) =>{
    console.log(req.body);
    var sql = "INSERT INTO noteboard (title, body) " +
    "VALUES (?, ?)";
    db.query(sql, [req.body.title, req.body.body], function(error, results, fields){
        if (error) throw error;
        console.log(results.insertId);
    })
    
    res.status(201).send("Created");
})

// Delete Post
router.delete('/:id', (req,res) =>{
    var id = req.params.id
    db.query('DELETE FROM noteboard WHERE id = ?', [id], function(error, results, fields){
        if(error) throw error;
    })
    res.status(204).send("deleted sucessfully")
})
module.exports = router;