import { useState } from "react";

const S3 = require("aws-sdk/clients/s3");

export const Awsupload = async (file, key,progress) => {

  const s3 = new S3({
    accessKeyId: "AKIA3TFHQ6HB4QQSIZDI",
    secretAccessKey: "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",
    region: "us-east-2",
  });
  var response=""
  var name1=key.split(".")
  var dir=name1[0].split("_")
  const target = { Bucket: "jewelify", Key: `${dir[0]}/${key}`, Body: file,ContentType: 'image/jpeg'};
  await new Promise(async (resolve, reject) => {
    await s3
    .upload(target)
    .on("httpUploadProgress", (evt) => {
      console.log(Math.round((evt.loaded / evt.total) * 100));
      progress(Math.round((evt.loaded / evt.total) * 100))
      if(Math.round((evt.loaded / evt.total) * 100)==100){
      
      }
    })
    .send((err,data) => {
      if (err){
        console.log(err);
        reject()}
      console.log(data)
      response=data;
      resolve()
    })
  })
    
    return response
};
