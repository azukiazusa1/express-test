import Express from 'express'
import usersController from '../controllers/usersController'

const router = Express.Router()

router.get('/:username', usersController.show)
router.post('/', usersController.create)

export default router
