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

// Update post
router.put('/:id', (req, res) =>{
    var id = req.params.id
    var title = req.body.title
    var body = req.body.body
    var sql = "UPDATE noteboard SET title = ?, body = ? WHERE id = ?"
    db.query(sql, [title, body, id], function(error, results, fields){
        if(error) throw error;
        console.log("hello")
    })
    res.status(200).send("Updated Note!")
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