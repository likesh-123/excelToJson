const multer = require('multer');
const xlsx = require("xlsx");
const User = require("../Model/model")

let filename;
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "uploads")
        },
        filename: (req, file, cb) => {
            filename = file.fieldname + "_" + Date.now() + ".xlsx"
            cb(null, filename);
        }
    })
}).single("user");


const createNewRecord = async (req, res, data) => {
    let errorData = [], correctData = [];
    const arr = JSON.parse(JSON.stringify(data).replace(/\s(?=\w+":)/g, "_"));

    for (let i = 0; i < arr.length; i++) {
        try {
            const newUser = await User.create(arr[i]);
            correctData.push(newUser);
        }
        catch (err) {
            let newObj = { ...arr[i], Error: err.message };
            errorData.push(newObj);
        }
    }

    // writing error in the worksheet
    const newWb = xlsx.utils.book_new();
    const newWs = xlsx.utils.json_to_sheet(errorData);
    xlsx.utils.book_append_sheet(newWb, newWs, "Error Data");
    xlsx.writeFile(newWb, `uploads/Error_${filename}`);

    res.status(200).json({
        status: "success",
        size: data.length,
        data: { correctData, errorData }
    });
}

const createRecordAndExport = (req, res) => {
    const wb = xlsx.readFile(`uploads/${filename}`);
    const ws = wb.Sheets["Sheet1"];
    let data = xlsx.utils.sheet_to_json(ws);
    // data = JSON.parse(JSON.stringify(data).replace(/\s(?=\w+":)/g, "_"));
    // console.log(data);
    createNewRecord(req, res, data)
}

module.exports = {upload, createRecordAndExport};