const mongoose = require("mongoose");

const noticeSchema = mongoose.Schema(
    {
        author_name:{type:String, required:true},
        notice_title:{type:String,required:true},
        notice_desc:{type:String,required:true},
        on:{type:Date,required:true}
    }
)

const Notice = mongoose.model("notice", noticeSchema);

module.exports = {
  Notice,
};
