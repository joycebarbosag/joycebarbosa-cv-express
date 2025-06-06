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

export default router;