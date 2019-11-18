/**
 * 处理图片上传前压缩
 */

export async function upload (files) {
    console.log()
    if (!files.length) return;
    let data = imgPreview(files[0])
    console.log(data)
    return 123
  }
function imgPreview (file) {
    // console.log(123)
    let Orientation;
    let data
    // 看支持不支持FileReader
    if (!file || !window.FileReader) return;
    
    if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader();
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = function () {
          let result = this.result;
          let img = new Image();
          img.src = result;
          //判断图片是否大于100K,是就直接上传，反之压缩图片
          if (this.result.length <= (100 * 1024 * 1024)) {
            //   debugger
            data = this.result;
            data = convertImgDataToBlob(data)
            console.log(data)
            return data
          }else {
            img.onload = function () {
                data = compress(img,Orientation)
                data = convertImgDataToBlob(data)
            }
          }
        } 
      }
    //   console.log(data, 456)
    }
// base64转二进制
function convertImgDataToBlob(base64Data) {
    var format = "image/jpeg"
    var base64 = base64Data;
    var code = window.atob(base64.split(",")[1]);      
    var aBuffer = new window.ArrayBuffer(code.length);
    var uBuffer = new window.Uint8Array(aBuffer);
    for (var i = 0; i < code.length; i++) {
        uBuffer[i] = code.charCodeAt(i) & 0xff;
    }
    var blob = null;
    try {
        blob = new Blob([uBuffer], {
            type: format
        });
    } catch (e) {
        window.BlobBuilder =
        window.BlobBuilder ||
        window.WebKitBlobBuilder ||
        window.MozBlobBuilder ||
        window.MSBlobBuilder;
        if (e.name == "TypeError" && window.BlobBuilder) {
            var bb = new window.BlobBuilder();
            bb.append(uBuffer.buffer);
            blob = bb.getBlob("image/jpeg");
        } else if (e.name == "InvalidStateError") {
            blob = new Blob([aBuffer], {
                type: format
            });
        } else {}
    }
    return blob;
}
  function compress(img,Orientation) {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext('2d');
      //瓦片canvas
    let tCanvas = document.createElement("canvas");
    let tctx = tCanvas.getContext("2d");
    let initSize = img.src.length;
    let width = img.width;
    let height = img.height;
    //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
    let ratio;
    if ((ratio = width * height / 4000000) > 1) {
      console.log("大于400万像素")
      ratio = Math.sqrt(ratio);
      width /= ratio;
      height /= ratio;
    } else {
      ratio = 1;
    }
    canvas.width = width;
    canvas.height = height;
//        铺底色
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //如果图片像素大于100万则使用瓦片绘制
    let count;
    if ((count = width * height / 1000000) > 1) {
      console.log("超过100W像素");
      count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
//            计算每块瓦片的宽和高
      let nw = ~~(width / count);
      let nh = ~~(height / count);
      tCanvas.width = nw;
      tCanvas.height = nh;
      for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
          tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
          ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
        }
      }
    } else {
      ctx.drawImage(img, 0, 0, width, height);
    }
    //进行最小压缩
    let ndata = canvas.toDataURL('image/jpeg', 0.1);
    console.log('压缩前：' + initSize);
    console.log('压缩后：' + ndata.length, ndata.size);
    console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
    tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
    return ndata;
  }
 

