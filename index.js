import VisualRecognitionV3 from 'watson-developer-cloud/visual-recognition/v3'
import BoxSDK from 'box-node-sdk'
import endpoint from './endpoint.json'
import sortBy from 'sort-by'

const boxConfig = endpoint.boxConfig
const watsonConfig = endpoint.watsonConfig

//Initialize Box  SDK
const sdk = BoxSDK.getPreconfiguredInstance(boxConfig)
sdk.configure({ iterators: true })

// Get an app user client
const client = sdk.getAppAuthClient('user', boxConfig.userID)

//Initialize Watson Visual Recognition SDK
const visualRecognition = new VisualRecognitionV3({
    version: watsonConfig.api_version,
    iam_apikey: watsonConfig.api_key,
    headers: {
        'Accept-Language': watsonConfig.language
    }
});

const main = async () => {

    let items = await client.folders.getItems(boxConfig.folderID)

    for (const item of items.buffer) {
        const fileID = item.id

        const params = {
            images_file: await client.files.getReadStream(fileID),
            threshold: watsonConfig.threshold,
            owners: watsonConfig.api_owner
        }

        visualRecognition.classify(params, (err, res) => {
            if (!err) {
                console.log(res.images[0].classifiers[0])
                var watsonTags = res.images[0].classifiers[0].classes.sort(sortBy('-score')).slice(0, 5).map((item) => {
                    return `${item.class} `
                })
                client.files.update(fileID, { "tags": watsonTags })
            }
        })
    }
}

main()



