# Cyx

- khaki provides a simple way to validate a Nigerian Mobile Number, identify it's ISP and strip off it's International code prefix.

+ A tiny oracle for Nigerian numbers

## How do i install it?

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):1

```javascript
npm install --save khaki
```

## How do i use it?

- Invite Khaki to the party

```js
const oracle = require('khaki');
import 
```

- Purge the Mobile Number of +234 | 234, if invalid, it throws.

```js
oracle.getStrippedNumber('+2349066003847');
//=> 09066003847
```

Detects the Mobile Number ISP, then returns an object of the ISP and matched prefix.
If none, both are null.
if invalid, it throws.

```js
oracle.getMobileProvider('+2349066003847');
//=> { provider: 'MTN', prefix: '0906' }

// ISP Provider List: 
// MTN, GLOBACOM, AIRTEL, 9MOBILE, 
// MULTILINKS, SMILE, STARCOMMS, NTEL, ZOOM
```

Checks if Mobile Number is a valid Nigerian Number.

```js
oracle.isValid('+2349066003847');
//=> true

oracle.isValid('+23490660*03847');
//=> false
```

***

### Who wrote it?

**Joshua Omobola**

* [github/kohasummons](https://github.com/kohasummons)
* [twitter/kohasummons](https://twitter.com/kohasummons)

### What license is it released under?

Copyright © 2021, [Joshua Omobola](https://github.com/kohasummons).
Released under the [MIT License](LICENSE).

***
