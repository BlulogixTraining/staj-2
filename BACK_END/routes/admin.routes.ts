import { Router } from 'express';
import { getEmployees, createEmployee } from '../controllers/admin.controller';
import { authorize } from '../middleware/authorize';

const router = Router();

router.get("/get-employees", authorize(["admin"]), getEmployees);
router.post("/create-employee", authorize(["admin"]), createEmployee)

export default router;
