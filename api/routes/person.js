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

router.put("/:personId/skills", async (req, res) => {
  try {
    const updatedPerson = await req.context.models.Person.updateSkills(
      req.params.personId,
      req.body.skills
    );
    if (!updatedPerson) return res.status(404).json({ error: "Person not found" });
    return res.json(updatedPerson);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.put("/:personId/currentJob", async (req, res) => {
  try {
    const updatedPerson = await req.context.models.Person.updateCurrentJob(
      req.params.personId,
      req.body.currentJob
    );
    if (!updatedPerson) return res.status(404).json({ error: "Person not found" });
    return res.json(updatedPerson);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.put("/:personId/desiredJob", async (req, res) => {
  try {
    const updatedPerson = await req.context.models.Person.updateDesiredJob(
      req.params.personId,
      req.body.desiredJob
    );
    if (!updatedPerson) return res.status(404).json({ error: "Person not found" });
    return res.json(updatedPerson);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.put("/:personId/description", async (req, res) => {
  try {
    const updatedPerson = await req.context.models.Person.updateDescription(
      req.params.personId,
      req.body.description
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