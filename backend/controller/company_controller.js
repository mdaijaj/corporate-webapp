
const CompanyDetail = require('../models/company_model')


exports.createCompanyDetails = async (req, res) => {
    const {
      companyNumber,
      companyTIN,
      companyType,
      contactPersonName,
      contactPersonMobileNumber,
      contactPersonEmail,
      designation,
      status
    } = req.body;
  
    console.log(req.body)
    try {
      const UserdetailData = await CompanyDetail.create({
        companyNumber,
        companyTIN,
        companyType,
        contactPersonName,
        contactPersonMobileNumber,
        contactPersonEmail,
        designation,
        status
      })
      return res.status(200).send({
        message: "create successfully!", data: UserdetailData
      })
    }
    catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the UserdetailData."
      });
    }
}


exports.editCompanyDetails = async (req, res) => {
    try {
  
      const companyData = await CompanyDetail.find({ _id: req.params.id });
      // await uderdata.save({validateBeforeSave: false});
      if (companyData) {
        const updateData = await CompanyDetail.findByIdAndUpdate({ _id: req.params.id }, {
          $set: req.body
        })
        console.log("updateData", updateData)
        return res.send({ status: "update data successfully! ", "result": updateData })
      }
    }
    catch (err) {
      console.log(err.message)
    }
  }


  exports.getCompanyDetails = async (req, res) => {
    try {
      console.log(req.params.id)
      const restData = await CompanyDetail.findById({
        _id: req.params.id, status: true
      })
      console.log("restData", restData)
      if (!restData || restData == undefined) {
        return res.send("not found restaurant")
      }
      return res.status(200).send({
        message: "user resitered save data",
        data: restData
      })
    }
    catch (err) {
      console.log(err.message)
    }
  }
