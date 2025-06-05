import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const contacts = await req.context.models.Contact.findAllContacts();
  return res.send(contacts);
});

router.get("/:id", async (req, res) => {
  const contact = await req.context.models.Contact.findById(req.params.id);
  if (!contact) return res.status(404).send({ error: "Contact not found" });
  return res.send(contact);
});

router.post("/", async (req, res) => {
  try {
    const contact = await req.context.models.Contact.create(req.body);
    return res.status(201).send(contact);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

router.put("/:id/email", async (req, res) => {
  const contact = await req.context.models.Contact.updateEmail(req.params.id, req.body.email);
  if (!contact) return res.status(404).send({ error: "Contact not found" });
  return res.send(contact);
});

router.put("/:id/phone", async (req, res) => {
  const contact = await req.context.models.Contact.updatePhone(req.params.id, req.body.phone);
  if (!contact) return res.status(404).send({ error: "Contact not found" });
  return res.send(contact);
});

router.delete("/:id", async (req, res) => {
  const deleted = await req.context.models.Contact.destroy({ where: { id: req.params.id } });
  if (!deleted) return res.status(404).send({ error: "Contact not found" });
  return res.send({ success: true });
});

export default router;
