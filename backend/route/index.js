const express= require('express')
const router=express()
const userController= require('../controller/index')
const companyController= require('../controller/company_controller')

//routes for Dish crude
router.post('/api/createuserdetails', userController.createUserDetails)
router.post('/api/signin', userController.signin)
router.get('/api/getuserList', userController.getUserList)
router.get('/api/getUserDetails/:id', userController.getUserDetails)
router.put('/api/editUserDetails/:id', userController.editUserDetails)
router.get('/api/deleteUserDetails/:id', userController.deleteUser)
router.get("/pagination", userController.paginationData)



//company details:-
router.post('/api/createCompanyDetails', companyController.createCompanyDetails)
router.put('/api/editCompanyDetails/:id', companyController.editCompanyDetails)
router.get('/api/getCompanyDetails/:id', companyController.getCompanyDetails)


module.exports = router;