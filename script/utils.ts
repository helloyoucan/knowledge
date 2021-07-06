/**
 * 利用洗牌算法对数组进行随机打乱
 * @param list
 * @returns
 */
export function shuffle2Array(list: Array<any>): Array<any> {
  const _list = [...list];
  /**
   * 洗牌算法
   */
  for (let i = list.length - 1; i > 0; i--) {
    let rand = Math.round(Math.random() * i);
    let temp = _list[i];
    _list[i] = _list[rand];
    _list[rand] = temp;
  }
  for (let i = list.length - 1; i > 0; i--) {
    let rand = Math.round(Math.random() * i);
    let temp = _list[i];
    _list[i] = _list[rand];
    _list[rand] = temp;
  }
  return _list;
}

export function json2URL(json: object) {
  const blobTmp = new Blob([JSON.stringify(json)], {
    type: "application/json",
  });
  return URL.createObjectURL(blobTmp);
}
/**
 * 产生id
 */
export function createId() {
  return Date.now() + Math.floor(Math.random() * 10000).toString();
}

/**
 * 从File对象读取加载，返回Base64
 * @param img
 * @param callback
 */
function file2Base64(img): Promise<string> {
  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.addEventListener('load', () => resolve(reader.result as string));
    reader.readAsDataURL(img);
  });
}
/**
 * 从File对象读取加载，返回Buffer
 * @param img
 * @param callback
 */
function file2ArrayBuffer(file): Promise<ArrayBuffer> {
  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.addEventListener('load', () => resolve(reader.result as ArrayBuffer));
    reader.readAsArrayBuffer(file);
  });
}
/**
	从阿里云的oss对象连接下载
*/
function downloadFileByOssURL(url,fileName) {
  fetch(url)
    .then(res => res.blob())
    .then(myBlob => {
      const objectURL = URL.createObjectURL(myBlob);
      const a = document.createElement("a");
      a.href = objectURL;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(objectURL);
    })
}

/** 将text中的html字符转义， 仅转义  ', ", <, > 四个字符
* @param  { String } str 需要转义的字符串
* @returns { String }     转义后的字符串
*/
export function deHTML (str) {
  return str ? str.replace(/[<">']/g, (a) => {
    return {
      '<': '&lt;',
      '"': '&quot;',
      '>': '&gt;',
      "'": '&#39;'
    }[a]
  }) : ''
}
/**
 * 将转义字符转换成正常字符
 * @param {String}} str 字符串
 */
export function enHTML (str) {
  let dom = document.createElement('p')
  dom.innerHTML = str
  const s = dom.innerText
  dom = null
  return s
}

/**
 * 获取视频第一帧
 */
export function getCoverFromVideoFile (path, width = 1920, height = 1080) {
  const tempId = Date.now()
  const video = document.createElement('video')
  video.src = 'file://' + path
  video.id = tempId
  video.style.position = 'fixed'
  video.style.visibility = 'hidden'
  video.style.top = 0
  video.style.zIndex = -1
  document.body.append(video)
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    video.addEventListener('loadeddata', function (e) {
      setTimeout(() => {
        canvas.width = this.videoWidth
        canvas.height = this.videoHeight
        ctx.drawImage(this, 0, 0, this.videoWidth, this.videoHeight)
        resolve(canvas.toDataURL('image/jpeg'))
        const idObject = document.getElementById(tempId)
        if (idObject != null) {
          idObject.parentNode.removeChild(idObject)
        }
      }, 1000)
    })
  })
}

/**
 * 将base64转换为文件
 * @param {String} dataurl base64的字符串
 * @param {String} filename 文件名
 * @returns {file}
 */
export function dataURLtoFile (dataurl, filename) {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}


export function copyText(text){
    const input = document.createElement('input')
    input.value = text
    document.body.appendChild(input)
    input.select();
    document.execCommand("copy");
    input.remove()
}