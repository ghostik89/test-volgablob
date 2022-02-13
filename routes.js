const {Router} = require('express')
const router = Router()
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    host: 'localhost:9200',
});

router.get('/all', async (req, res) => {
    try{
        const data = await client.search({
            index: 'comments'})
        return res.status(200).json(data.hits.hits)
    }catch (e){
        return res.status(500).json({message: e})
    }
})

router.get('/:id', async (req, res) => {
    try{
        const data = await client.get({
            index: 'comments',
            id: req.params.id
        })
        return res.status(200).json(data)
    }catch (e){
        return res.status(500).json({message: e})
    }
})

module.exports = router