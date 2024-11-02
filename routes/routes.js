const router = express.Router();
const { registerUser, getUserId} = require("../controllers/userController.js");


router.post('/register',registerUser);

module.exports = router;