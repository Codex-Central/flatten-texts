# flatten-texts
Allows you to flatten an array of texts into a single array of texts.


## Installation

> `npm install @codexcentral/flatten-texts`

## Usage
### 1. Importing

```javascript
import { flattenText, IFlattenText } from '@codexcentral/flatten-texts';
```

### 2. Call the functions

#### Example 1
```javascript
interface CustomMessage {
  id: number;
  text: string;
}

const messageResponse: IFlattenText<CustomMessage[]> = {
  content: '[{"id": 1, "text": "Hola"}, {"id": 2, "text": "Mundo"}]',
};

const messages = flattenText<CustomMessage>(messageResponse);
console.log(messages); 

// Output
/*
[
  { text: { id: 1, text: 'Hola' } },
  { text: { id: 2, text: 'Mundo' } }
]
*/
```

#### Example 2
```javascript
const messageResponse = {
  content: "[\"Estoy aquí para ayudarte.\", \"¿Puedo hacer algo por ti?\"]"
};
const messages = flattenText(messageResponse);
console.log(messages); 

// Output
/*
[
  { text: 'Estoy aquí para ayudarte.' },
  { text: '¿Puedo hacer algo por ti?' }
]
*/
```

### Attributes...

| Attribute | Type | Mandatory |
| ------ | ------ | ------ |
|  content | `string` | true |


# Credits
These code was written by [Roberto Silva Z.](https://www.linkedin.com/in/robertosilvazuniga/)