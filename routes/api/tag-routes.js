const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// GET all tags
router.get("/", async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one tag by ID
router.get("/:id", async (req, res) => {
  try {
    const tag = await Tag.findOne({
      where: { id: req.params.id },
      include: [{ model: Product, through: ProductTag }],
    });

    if (!tag) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }

    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST create a new tag
router.post("/", async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(200).json(tag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT update a tag's name by ID
router.put("/:id", async (req, res) => {
  try {
    const [updated] = await Tag.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updated) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }

    const updatedTag = await Tag.findOne({ where: { id: req.params.id } });
    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a tag by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Tag.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }

    res.status(200).json({ message: "Tag deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
