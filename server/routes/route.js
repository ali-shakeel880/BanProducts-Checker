import express from 'express';

import {addAllProducts,getProductByName,addProduct, updateProduct, deleteProduct, getAllProducts, getProductById} from '../controller/products-controller.js'
import { createPost, updatePost, deletePost, getPost, getAllPosts } from '../controller/post-controller.js';
import { uploadImage, getImage } from '../controller/image-controller.js';
import { newComment, getComments, deleteComment } from '../controller/comment-controller.js';
import { loginUser, singupUser, logoutUser, getUsers, deleteUser, updateUser } from '../controller/user-controller.js';
import { authenticateToken, createNewToken } from '../controller/jwt-controller.js';

import upload from '../utils/upload.js';
import  {contact } from '../controller/contact-controller.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', singupUser);
router.post('/logout', logoutUser);
router.post('/updateuser/:id',updateUser)
router.delete('/deleteuser/:id',deleteUser);
router.get('/getusers',getUsers)

router.post('/addproduct',addProduct);
router.post('/updateproduct/:id',updateProduct);
router.post('/deleteproduct/:id',deleteProduct);
router.get('/getproducts',getAllProducts)
router.get('/products/:id',getProductById)
router.post('/token', createNewToken);

router.post('/contact',contact)

router.post('/create', authenticateToken, createPost);
router.put('/update/:id', authenticateToken, updatePost);
router.delete('/delete/:id', authenticateToken, deletePost);

router.get('/post/:id', authenticateToken, getPost);
router.get('/posts', authenticateToken, getAllPosts);

router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);

router.post('/comment/new', authenticateToken, newComment);
router.get('/comments/:id', authenticateToken, getComments);
router.delete('/comment/delete/:id', authenticateToken, deleteComment);

router.post("/addAllProducts",addAllProducts);
router.get("/getProductByName/:name",getProductByName);

export default router;