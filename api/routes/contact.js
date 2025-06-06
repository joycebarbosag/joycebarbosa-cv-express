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

export default router;
