#### 判断是否移动端

```javascript
 if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {}
```

#### 判断移动手机版本

```javascript
let userAgent = navigator.userAgent;
        let index = userAgent.indexOf("Android");
        if (index >= 0) {//android
            let version = parseFloat(userAgent.slice(index + 8));
            if (version < 4.3) {
                console.log(version);
            }
        } else {//ios
            let version = (userAgent).match(/OS (\d+)_(\d+)_?(\d+)?/);
            console.log(version)
            version = parseInt(version[1], 10);
            if (version <= 7) {
                console.log(version);
            }
        }
```

#### 移动端避免touchmove事件影响touchend

```javascript
stopTouchendPropagationAfterScroll();
function stopTouchendPropagationAfterScroll() {
    var flag = false;
    window.addEventListener('touchmove', function (ev) {
        flag || (flag = true, window.addEventListener('touchend', stopTouchendPropagation, true));
    }, false);
    function stopTouchendPropagation(ev) {
        ev.stopPropagation();
        setTimeout(function () {
            window.removeEventListener('touchend', stopTouchendPropagation, true);
            flag = false;
        }, 50);
    }
}
```

