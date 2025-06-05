import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const addresses = await req.context.models.Address.findAllAddresses();
  return res.send(addresses);
});

router.get("/:id", async (req, res) => {
  const address = await req.context.models.Address.findById(req.params.id);
  if (!address) return res.status(404).send({ error: "Address not found" });
  return res.send(address);
});

router.post("/", async (req, res) => {
  try {
    const address = await req.context.models.Address.create(req.body);
    return res.status(201).send(address);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

router.put("/:id/street", async (req, res) => {
  const address = await req.context.models.Address.updateStreet(req.params.id, req.body.street);
  if (!address) return res.status(404).send({ error: "Address not found" });
  return res.send(address);
});

router.put("/:id/houseNumber", async (req, res) => {
  const address = await req.context.models.Address.updateHouseNumber(req.params.id, req.body.houseNumber);
  if (!address) return res.status(404).send({ error: "Address not found" });
  return res.send(address);
});

router.put("/:id/city", async (req, res) => {
  const address = await req.context.models.Address.updateCity(req.params.id, req.body.city);
  if (!address) return res.status(404).send({ error: "Address not found" });
  return res.send(address);
});

router.put("/:id/state", async (req, res) => {
  const address = await req.context.models.Address.updateState(req.params.id, req.body.state);
  if (!address) return res.status(404).send({ error: "Address not found" });
  return res.send(address);
});

router.put("/:id/country", async (req, res) => {
  const address = await req.context.models.Address.updateCountry(req.params.id, req.body.country);
  if (!address) return res.status(404).send({ error: "Address not found" });
  return res.send(address);
});

router.delete("/:id", async (req, res) => {
  const deleted = await req.context.models.Address.destroy({ where: { id: req.params.id } });
  if (!deleted) return res.status(404).send({ error: "Address not found" });
  return res.send({ success: true });
});

export default router;