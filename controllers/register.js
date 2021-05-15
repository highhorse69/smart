const handleRegister=(req,res,db,bcrypt)=>{

    const{email,name,password} = req.body;
    if(!email|| !name || !password){
     return res.status(400).json('incoorect submission');
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx=>{
        trx.insert({
            hash:hash,
            email:email
        })
        .into('login')
        .returning('email')
        .then(LoginEmail=>{
            return trx('users')
           .returning('*')
           .insert({
           email:LoginEmail[0],
           name:name,
           joined:new Date()
    })
           .then(user =>{
            res.json(user[0]);

    }) 

        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err=>res.status(400).json('HOCUS POCUS'))


}

module.exports={
  handleRegister:handleRegister
};