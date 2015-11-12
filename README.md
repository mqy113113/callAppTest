# scheme test

默认不自动执行，加参数auto后会执行相应的方法，如

1. localhost/scheme/index.html
2. localhost/scheme/index.html?auto=1

### 参数含义

 - auto=1: 模拟a链接点击
 - auto=2: location.href
 - auto=3: window.oepn
 - auto=4: iframe

### 参考资料

 - [Android Intents with Chrome](https://developer.chrome.com/multidevice/android/intents)
 - [Intent scheme URL attack](http://drops.wooyun.org/papers/2893)
