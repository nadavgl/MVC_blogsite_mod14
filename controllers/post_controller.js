// const router = require('express').Router();
const { Post } = require('../models');


module.exports = {
    async createPost (req, res){
        const formData = req.body
        console.log(formData)
        try {
            await Post.create({
                ...formData,
                userId: req.session.user_id
            })
            res.redirect('/dashboard')
        } catch (error) {
            console.log('add error', error);
            const errors = error.errors.map((errObj) => {
              return {
                message: errObj.message
              }
            })
            res.redirect('/add')
        }
    },
    async updatePost(req, res){
        await Post.update(
            req.body,
            {
                where:{
                    id: req.params.post_id
                },
                returning: true,
                plain: true
            }
        )
        res.redirect('/dashboard')
    },
    async deletePost(req, res){
        await Post.destroy({
            where: {
                id: req.params.post_id
            }
        })
        res.redirect('/dashboard')
    }
}