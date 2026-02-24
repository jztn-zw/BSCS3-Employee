//SQL
const connection = require('../config/db');

//Get all users
exports.getAllUsers=(req,res)=>{
    connection.query('SELECT * FROM userdata', (err,rows,fields)=>{
        if(err) throw err;
            res.json(rows);
    });
};

//Search a user by ID
exports.getUsersById=(req,res)=>{
    const id=req.params.id;
    connection.query('SELECT * FROM userdata WHERE id=? OR email=?',[id,id],(err,rows,fields)=>{
        if(err) throw err;
        if(rows.length>0)
            res.json(rows);
        else
            res.status(404).json({message: 'User not found'});
    });
};

//Create a new user
//CRUD - Create
exports.createUser=(req,res)=>{
    const {fname,lname,email,gender,ip_address,course}=req.body;
    connection.query('INSERT INTO userdata (first_name, last_name, email, gender, ip_address, course) VALUES (?,?,?,?,?,?)',[fname,lname,email,gender,ip_address,course],(err,results)=>{
        if(err) throw err;
            res.json({message: 'User created succesfully', userId:results.insertId});
    });
};

exports.updateUser=(req,res)=>{
    const {id,fname,lname,email,gender,}=req.body;
    connection.query('UPDATE userdata SET first_name=?, last_name=?, email=?, gender=? WHERE id=?',[fname,lname,email,gender,id],(err,results)=>{
        if(err) throw err;
        if(results.affectedRows > 0)
            res.json({message:`User updated succesfully`});
        else
            res.status(404).json({message:'User not found'});
    }); 
}

exports.deleteUser=(req,res)=>{
    const id=req.body.id;
    connection.query('DELETE FROM userdata WHERE id=?',[id],(err,results)=>{
        if(err) throw err;
        if(results.affectedRows > 0)
            res.json({message:`User deleted succesfully`});
        else
            res.status(404).json({message:'User not found'});
    }); 
}