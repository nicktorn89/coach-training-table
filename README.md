# Coach Training Table

## Starting

This table created with intention to help share training schedule for coaches.

For starting use you need to register on [Contentful](https://www.contentful.com/) and provide your spaceId and accessToken in file keys.json that should be inside folder src/components/modules/keys.json.

```javascript
{
  "space": "yourspaceid",
  "accessToken": "youraccesstoken"
}
```

After this you need to create two content types in Contentful. First is Description. Here coach can tell about himself (or herself). 

![alt text](https://i.imgur.com/wbU9R5a.png)

<details>
  <summary>Answer example:</summary>

```javascript
{
  "name": "Description",
  "description": "Description of coach",
  "displayField": "title",
  "fields": [
    {
      "id": "photo",
      "name": "photo",
      "type": "Link",
      "localized": false,
      "required": false,
      "validations": [],
      "disabled": false,
      "omitted": false,
      "linkType": "Asset"
    },
    {
      "id": "title",
      "name": "title",
      "type": "Symbol",
      "localized": false,
      "required": true,
      "validations": [],
      "disabled": false,
      "omitted": false
    },
    {
      "id": "subtitle",
      "name": "subtitle",
      "type": "Symbol",
      "localized": false,
      "required": false,
      "validations": [],
      "disabled": false,
      "omitted": false
    }
  ],
  "sys": { ... }
}
```
</details>

The second one type is Training, it's all data about training. Here also you can add images and rich text as description. This content will be showable on click type of training or learn more button.

![alt text](https://i.imgur.com/dyFyn78.png)

<details>
  <summary>Answer example:</summary>

```javascript
{
  "name": "Training",
  "description": "This is training",
  "displayField": "dayOfWeek",
  "fields": [
    {
      "id": "dayOfWeek",
      "name": "dayOfWeek",
      "type": "Symbol",
      "localized": false,
      "required": false,
      "validations": [],
      "disabled": false,
      "omitted": false
    },
    {
      "id": "time",
      "name": "time",
      "type": "Symbol",
      "localized": false,
      "required": false,
      "validations": [],
      "disabled": false,
      "omitted": false
    },
    {
      "id": "typeOfTraining",
      "name": "typeOfTraining",
      "type": "Symbol",
      "localized": false,
      "required": false,
      "validations": [],
      "disabled": false,
      "omitted": false
    },
    {
      "id": "placeForTraining",
      "name": "placeForTraining",
      "type": "Symbol",
      "localized": false,
      "required": false,
      "validations": [],
      "disabled": false,
      "omitted": false
    },
    {
      "id": "id",
      "name": "id",
      "type": "Integer",
      "localized": false,
      "required": true,
      "validations": [
        {
          "unique": true
        }
      ],
      "disabled": false,
      "omitted": false
    },
    {
      "id": "trainingDescription",
      "name": "trainingDescription",
      "type": "RichText",
      "localized": false,
      "required": false,
      "validations": [
        {
          "nodes": {}
        },
        {
          "enabledMarks": [
            "bold",
            "italic",
            "underline"
          ],
          "message": "Only bold, italic, and underline marks are allowed"
        },
        {
          "enabledNodeTypes": [
            "heading-1",
            "heading-2",
            "heading-3",
            "heading-4",
            "heading-5",
            "heading-6",
            "ordered-list",
            "unordered-list",
            "hr",
            "blockquote",
            "hyperlink"
          ],
          "message": "Only heading 1, heading 2, heading 3, heading 4, heading 5, heading 6, ordered list, unordered list, horizontal rule, quote, and link to Url nodes are allowed"
        }
      ],
      "disabled": false,
      "omitted": false
    },
    {
      "id": "examples",
      "name": "examples",
      "type": "Array",
      "localized": false,
      "required": false,
      "validations": [],
      "disabled": false,
      "omitted": false,
      "items": {
        "type": "Link",
        "validations": [],
        "linkType": "Asset"
      }
    }
  ],
  "sys": {
    "space": {
      "sys": {
        "type": "Link",
        "linkType": "Space",
        "id": "3ao4fq1ng3wu"
      }
    },
    "id": "training",
    "type": "ContentType",
    "createdAt": "2019-10-24T18:57:15.200Z",
    "updatedAt": "2019-10-25T19:55:29.136Z",
    "environment": {
      "sys": {
        "id": "master",
        "type": "Link",
        "linkType": "Environment"
      }
    },
    "publishedVersion": 7,
    "publishedAt": "2019-10-25T19:55:29.136Z",
    "firstPublishedAt": "2019-10-24T18:57:15.924Z",
    "createdBy": {
      "sys": {
        "type": "Link",
        "linkType": "User",
        "id": "3mSnNQqxFLgUXD2v9zdUFX"
      }
    },
    "updatedBy": {
      "sys": {
        "type": "Link",
        "linkType": "User",
        "id": "3mSnNQqxFLgUXD2v9zdUFX"
      }
    },
    "publishedCounter": 4,
    "version": 8,
    "publishedBy": {
      "sys": {
        "type": "Link",
        "linkType": "User",
        "id": "3mSnNQqxFLgUXD2v9zdUFX"
      }
    }
  }
}
```
</details>

After this just fill data for these types and your site would be done

## Run project

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# test the production build locally
npm run serve
```
