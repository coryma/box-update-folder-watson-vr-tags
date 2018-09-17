# box-update-folder-watson-vr-tags
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](http://opensource.org/licenses/MIT  "Feel free to contribute.")

介紹如何使用 Watson Visual Recognition 針對在 Box 中特定的資料夾中的檔案，進行影像特徵分類，將分類的結果以標籤形式加入檔案中

### 準備工作

必須要有以下環境
- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [Box Developer Account](https://developer.box.com/)
	* 若還沒有 Box 帳號，可點選"[Get Started](https://account.box.com/signup/n/developer)"註冊一個開發者帳戶
- [IBM Cloud CLI](https://console.bluemix.net/docs/cli/index.html#overview)

  

### 執行應用程式

##### 步驟 1. 建立 Visual Recognition 服務
1. 打開 IBM Cloud 型錄中的 [Visual Recognition](https://console.bluemix.net/catalog/services/visual-recognition) 
    * 登入你的 IBM Cloud 帳戶.
2. 點選畫面下方 **建立**
3. 點選 **顯示認證** 以獲取API金鑰內容.
    * 複製並保存 `API金鑰` 值.
    * 複製並保存 `URL` 值.

##### 步驟 2. 建立一個 Box 應用程式

1. 登入 [Box Developer Console](https://developer.box.com)
* 點選 **Console**
2. 選擇 **建立新應用程式**
* 選擇 **自訂應用程式** 並點選 **下一步**
* 選擇 **OAuth 2.0 搭配 JWT (伺服器認證)**  並點選 **下一步**
* 設定應用程式名 "Box Watson VR - YOUR NAME"
*  *應用程式名不可跟Box其中的應用程式名重複*
* 按下 **建立應用程式** 接下來點選 **檢視您的應用程式**
3. 於畫面左邊選項，點選 **一般**
* 將 `使用者 ID` 及 `企業 ID` 值複製及記錄下來
4. 於 **應用程式存取權限** 選擇 **企業**
5. 移至畫面下方之 **新增與管理公開金鑰** 點選 **產生公開/私密金鑰組**
* 保管好系統產生出之 json 檔
  
##### 步驟 3. 安裝


```

$ git clone https://github.com/coryma/box-update-folder-watson-vr-tags.git # or fork and clone your own

$ cd box-update-folder-watson-vr-tags

$ npm install

```

##### 步驟 4. 設定相關參數

1. 將 endpoint.template.json 改名為 endpoint.json
2. 打開 endpoint.json
* 將 [步驟 2](%E6%AD%A5%E9%A9%9F-2-%E5%BB%BA%E7%AB%8B%E4%B8%80%E5%80%8B-box-%E6%87%89%E7%94%A8%E7%A8%8B%E5%BC%8F)中所產生的 json 檔中的 "boxAppSettings" 內容，複製到 endpoint.json 中
* 將 [步驟 2](%E6%AD%A5%E9%A9%9F-2-%E5%BB%BA%E7%AB%8B%E4%B8%80%E5%80%8B-box-%E6%87%89%E7%94%A8%E7%A8%8B%E5%BC%8F) 中所記錄的 `使用者 ID` 及 `企業 ID` 填入 `enterpriseID` 及 `userID` 中
3. 將 folder ID 填入 `folderID`
> **Note**: folder ID 可以從資料夾在 box 的 url 中獲取
4. 將 [步驟 1](#步驟-1.-建立-Visual-Recognition-服務) 中所記錄的 Watson Visual Recognition `API金鑰` 值 複製至 `api_key` 中

##### 步驟 5. 執行

$ npm install

```bash

babel-node index.js

```
