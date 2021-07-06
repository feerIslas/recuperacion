// Importando el router
import { Router } from 'express';

// Importando el controlador
import usersController from '@server/controllers/usersController';

// Creando la instancia del router
const router = new Router();

/* GET users listing. */
router.get('/', usersController.index);

export default router;
