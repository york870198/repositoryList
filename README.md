# Repository List

https://york870198.github.io/repositoryList/

這是一個實驗性的網頁，用於測試 github Rest API 的串接與 parallax scrolling。

## 此專案使用的工具
- [React](https://zh-hant.reactjs.org)
- [styled-components](https://styled-components.com)
- [react-markdown](https://github.com/remarkjs/react-markdown)
- [React Transition Group](https://reactcommunity.org/react-transition-group/)
- [webpack](https://webpack.js.org)

## 實作重點
- Parallax scrolling
  網頁的背景不隨畫面捲動而移動，並且會在捲動至不同的 repo 時換成不同的背景。

- [github Rest API](https://docs.github.com/en/rest)
  串接 API 已取得公開的 repositories。

  由於沒有另外做後端伺服器、在純前端網頁上放 Auth token 並不安全，

  所以本網頁是以無登入身分的狀態向 API 發請求，因此每小時請求次數的限制不多。
  
  如果除了一開始的 title 外、你往下捲動只看到一個 repo 頁面的話，表示請求次數到達上限了，次數會在一小時之後重置。

- 動畫觸發
  在捲動到特定的位置時會觸發淡入的動畫效果。

## 使用資源
  用於背景的圖片來自於 [Unsplash](https://unsplash.com)、透過 [Unspalsh Developers](https://unsplash.com/developers) API 取得。

  https://unsplash.com/photos/ZjZBL8V1nMM

  https://unsplash.com/photos/8dMvxXQKZag

  https://unsplash.com/photos/fr2--0bD6JU

  https://unsplash.com/photos/TPB-0YtXHlY

  本網頁基於 [Unsplash License](https://unsplash.com/license) 進行合法的使用。
