const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    //from the columns that we want.
    include: [
      {
        model: Product,
        through: ProductTag,
        as: 'product_tag_id',
        attributes: [`id`,`product_name`, `price`, `stock`, `category_id`],
      }
    ]
  })
  .then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    //the columns we want
    include: [
      {
        model: Product,
        through: ProductTag,
        as: 'product_tag_id',
        attributes: [`id`,`product_name`, `price`, `stock`, `category_id`],
      }
    ],
    where:{
      id: req.params.id
    }
  })
  .then(tagData => {
    if (!tagData){
      res.status(404).json({message:'Nothin was found!'});
      return;
    }
    res.json(tagData);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.category_name
  })
  .then(tagData => res.json(tagData))
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id
    }
  })
  .then(tagData => {
    if (tagData){
      res.status(404).json({message:'Nothin was found!'});
      return;
    }
    res.json(tagData);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where:{
      id:req.params.id
    }
  })
  .then(tagData => {
    if (tagData[0]){
      res.status(404).json({message:'Nothin was found!'});
      return;
    }
    res.json(tagData);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
