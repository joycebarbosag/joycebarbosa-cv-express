import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const persons = await req.context.models.Person.findAll();
    return res.json(persons);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get("/:personId", async (req, res) => {
  try {
    const person = await req.context.models.Person.findById(req.params.personId);
    if (!person) return res.status(404).json({ error: "Person not found" });
    return res.json(person);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newPerson = await req.context.models.Person.createPerson(req.body);
    return res.status(201).json(newPerson);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.put("/:personId", async (req, res) => {
  try {
    const updatedPerson = await req.context.models.Person.updatePerson(
      req.params.personId,
      req.body
    );
    if (!updatedPerson) return res.status(404).json({ error: "Person not found" });
    return res.json(updatedPerson);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.delete("/:personId", async (req, res) => {
  try {
    const deletedPerson = await req.context.models.Person.deleteById(req.params.personId);
    if (!deletedPerson) return res.status(404).json({ error: "Person not found" });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;