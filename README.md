# Zip Bomb Detector

## Usage

```js
import { analyzeZip } from '@acodev/zip-bomb-detector';

(async () => {
  try {
    const result = await analyzeZip('./path/to/your.zip');
    console.log(result);
  } catch (error) {
    console.error('Error analyzing ZIP:', error);
  }
})();
```

## Output

```json
{
  "isBomb": true,
  "details": {
    "reason": "Too many entries",
    "entryCount": 15000
  }
}
```
