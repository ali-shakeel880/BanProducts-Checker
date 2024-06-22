import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import Token from '../model/token.js'
import User from '../model/user.js';

dotenv.config();

export const singupUser = async (request, response) => {
    try {
        // const salt = await bcrypt.genSalt();
        // const hashedPassword = await bcrypt.hash(request.body.password, salt);
        const hashedPassword = await bcrypt.hash(request.body.password, 10);

        const user = { username: request.body.username, name: request.body.name, password: hashedPassword }

        const newUser = new User(user);
        await newUser.save();

        return response.status(200).json({ msg: 'Signup successfull' });
    } catch (error) {
        return response.status(500).json({ msg: 'Error while signing up user' });
    }
}


export const loginUser = async (request, response) => {
    let user = await User.findOne({ username: request.body.username });
    if (!user) {
        return response.status(400).json({ msg: 'Username does not match' });
    }

    try {
        let match = await bcrypt.compare(request.body.password, user.password);
        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m'});
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
            
            const newToken = new Token({ token: refreshToken });
            await newToken.save();
        
            response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken,name: user.name, username: user.username });
        
        } else {
            response.status(400).json({ msg: 'Password does not match' })
        }
    } catch (error) {
        response.status(500).json({ msg: 'error while login the user' })
    }
}


export const getUsers=async(req,res)=>{

    try{

let users;
users=await User.find({});
if(users.length===0){
    return res.status(404).json({msg:"No user Registered  In data Base"})
  }
    return res.status(200).json(users)
  }catch(error){
    return res.status(500).json({msg:"Internal Server Error"})
  }
    }

    export const deleteUser= async (req, res) => {
        console.log("uuser id",req.params.id)
        const userId = req.params.id;
      
        try {
          // Find the product by ID and delete it
          const deletedUser = await User.findByIdAndDelete(userId);
      
          if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          res.json({ message: 'User deleted successfully' });
        } catch (error) {
          res.status(500).json({ message: 'Error deleting User', error });
        }
      }
      export const updateUser = async (req, res) => {
        const  id  = req.params.id;
        const { name, username, password } = req.body;
    
        try {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            user.name = name || user.name;
            user.username = username || user.username;
    
            if (password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);
            }
    
            const updatedUser = await user.save();
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: 'Error updating user', error });
        }
    };

export const logoutUser = async (request, response) => {
    const token = request.body.token;
    await Token.deleteOne({ token: token });

    response.status(204).json({ msg: 'logout successfull' });
}