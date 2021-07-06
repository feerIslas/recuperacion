// Importando Router
import { Router } from 'express';

// Importando al controlador homeController
import homeController from '@server/controllers/homeController';

// Creando la instancia de un router
const router = new Router();

// GET '/'
router.get(['/', '/index'], homeController.index);

// GET '/PrimerEjercicio'
router.get('/PrimerEjercicio', homeController.PrimerEjercicio);

// GET '/SegundoEjercicio'
router.get('/SegundoEjercicio', homeController.SegundoEjercicio);

// GET '/about'
router.get('/about', homeController.about);

// Exportando el router que maneja las subrutas
// para el controlador home
export default router;
