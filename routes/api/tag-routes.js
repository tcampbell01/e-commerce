const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {

  Tag.findAll({
    include: [
      {
        model: Tag,
        attributes: ['id', 'tag_name']

      },
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  // find all tags
  // be sure to include its associated Product data
});

 // find a single tag by its `id`
  // be sure to include its associated Product data
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['tag_id']
      }
    ]
    
  })
  .then(tagData => {
    if (!tagData) {
      res.status(404).json({message: 'No tag with that with that id!'});
      return;

    }
    res.json(tagData);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

  // create a new tag
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});
 // update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }) .then(tagData => {
      if (!tagData) {
        res.status(404).json({message: 'No tag with that id found'});
        return;
      }
      res.json(tagData);
    })
  .catch (err => {
    res.status(500).json(err);
  });
});
 // delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(tagData => {
    if (!tagData) {
      res.status(404).json({message: 'There is nothing to delete with that id'});
      return;
    }
    res.json(tagData);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

module.exports = router;