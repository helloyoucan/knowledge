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