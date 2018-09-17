import VisualRecognitionV3 from 'watson-developer-cloud/visual-recognition/v3'
import BoxSDK from 'box-node-sdk'
import endpoint  from './endpoint.json'
import sortBy from 'sort-by'

const boxConfig = endpoint.boxConfig
const watsonConfig = endpoint.watsonConfig

//Initialize Box  SDK
const boxSDK = BoxSDK.getPreconfiguredInstance(boxConfig)
boxSDK.configure({ iterators: true });

// The Box Folder ID which will be tagged 
const folderID = boxConfig.folderID

// Get an app user client
const boxClient = boxSDK.getAppAuthClient('user', boxConfig.userID)

//Initialize Watson Visual Recognition SDK
var visualRecognition = new VisualRecognitionV3({
    version: watsonConfig.api_version,
    iam_apikey: watsonConfig.api_key,
    headers: {
        'Accept-Language': watsonConfig.language
    }
});

//Fetach the file items in the folder
boxClient.folders.getItems(folderID, null, (err, items) => {
    for (const item of items.buffer) {
        let fileID = item.id
       
        //Read file stream
        boxClient.files.getReadStream(fileID, null, (err, stream) => {
         
            const params = {
                images_file: stream,
                threshold: watsonConfig.threshold,
                owners: watsonConfig.api_owner
            }
      
            visualRecognition.classify(params, (err, res) => {
                console.log(res.images[0].classifiers[0])
                if (err) {
                    console.error("visualRecognition.classify Error!", err)
                } else {
                    var watsonTags = res.images[0].classifiers[0].classes.sort(sortBy('-score')).slice(0, 5).map((item, index, array) => {
                        return `${item.class} `
                    })
                    boxClient.files.update(fileID, { "tags": watsonTags })
                }
            })
        })
    }
})

