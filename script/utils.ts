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
function imageFile2Base64(img): Promise<string | ArrayBuffer | null> {
  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.addEventListener('load', () => resolve(reader.result));
    reader.readAsDataURL(img);
  });
}