/**
 * khaki
 *
 * @copyright 2021 Omobola Joshua <omobolathejoshua@gmail.com>
 * @license MIT
 * @version 0.1.0
 */
//private matters.
const store = [
  //TODO: Add Provider's brand logo.
  {
    provider: "AIRTEL",
    prefix: ["0701", "0708", "0802", "0808", "0812", "0901", "0902", "0907"],
  },
  {
    provider: "SMILE",
    prefix: ["0702"],
  },
  {
    provider: "MULTILINKS",
    prefix: ["07027", "0709"],
  },
  {
    provider: "STARCOMMS",
    prefix: ["07028", "07029", "0819"],
  },
  {
    provider: "MTN",
    prefix: [
      "07025",
      "0903",
      "0906",
      "0816",
      "0708",
      "07026",
      "0703",
      "0704",
      "0706",
      "0803",
      "0806",
      "0810",
      "0813",
      "0814",
    ],
  },
  {
    provider: "NTEL",
    prefix: ["0804"],
  },
  {
    provider: "9MOBILE",
    prefix: ["0817", "0818", "0908", "0809", "0817", "0818", "0909", "0908"],
  },
  {
    provider: "ZOOM",
    prefix: ["0707"],
  },
  {
    provider: "GLOBACOM",
    prefix: [
      "0905",
      "0815",
      "0811",
      "0705",
      "0805",
      "0807",
      "08011",
      "0815",
      "0905",
    ],
  },
];

// let mobile_number;
let stripped_mobile_number;

// Regex pattern to match +234, 234 in the mobile number.
let stripper = /^\+?234-?/;

// getter
let _getStrippedNumber = function () {
  return stripped_mobile_number;
};

//setter
let _setStrippedNumber = function (number) {
  stripped_mobile_number = number;
};

//Internal Validator - handles error
function tester(phoneNumber) {
  let number = phoneNumber.toString().trim();
  let isInternational = stripper.test(number);

  if (!/^0/.test(number) && !isInternational) {
    throw new Error("A Nigerian Number should start with 0 or +234. Fix it");
  }

  if (isInternational && !/^\+?\d+$/.test(number)) {
    if (/\+/.test(number) && number.indexOf("+") !== 0) {
      throw new Error(
        "Move the '+' to the start of the number, maybe then you might be saved."
      );
    }
    throw new Error(
      "Contains Invalid Character or an extra '+' that is not positioned at the start of the number"
    );
  }

  let newNumber = number.replace(stripper, "0");

  if (!/^\d+$/.test(newNumber)) {
    throw new Error("Invalid Input: Invalid Character Present");
  }

  if (newNumber.length !== 11) {
    throw new Error("Invalid Input: A valid Nigerian number is 11 digits long. ");
  }

  return true;
}

//public affairs.

// This here, purges the mobile number free of
// the international code identifier (+234, 234, ...varients)

/**
 * Removes `+234`, `234` from nigerian mobile number
 *
 * Examples:
 *
 *     khaki.strip('2347012345678'); //07012345678
 *     khaki.strip('+2347012345678'); //07012345678
 *
 * @method strip
 * @param {string|number} number Nigerian Mobile Number
 * @returns {string} A Nigerian number without +234 | 234
 * @public
 */

function getStrippedNumber(number) {
  let newNumber = number.toString().trim();
  // validate(newNumber);

  if (stripper.test(newNumber)) {
    newNumber = newNumber.replace(stripper, "0");
  }

  _setStrippedNumber(newNumber);
  tester(newNumber);

  return _getStrippedNumber();
}



/**
 * Detects a  Nigerian mobile number ISP.
 *
 * @method test
 * @param {string|number} number      Nigerian Mobile Number
 * @returns {object} An object with the {provider} and {prefix}.
 * @public
 */

// Detects the network of the mobile number using regexpattern...
function getMobileProvider(number) {
  let newNumber = number.toString().trim();
  //Clean up the number
  newNumber = getStrippedNumber(newNumber);

  //Pass the number through fire.
  tester(newNumber);

  //Test engine
  for (let i = store.length; i; i--) {
    // creates a pattern for every prefix array in the store
    const pattern = new RegExp("^(?:" + store[i - 1].prefix.join("|") + ")"); // /^(?:0701|0708|0802|0808|0812|0901|0902|0907)/

    if (pattern.test(stripped_mobile_number)) {
      return {
        provider: store[i - 1].provider,
        prefix: stripped_mobile_number.match(pattern)[0],
      };
    }
  }

  return {
    provider: null,
    prefix: null,
  };
}



/**
 * Checks the validity of a nigerian mobile number.
 *
 * @@method validate
 * @param {string|number} phoneNumber     Nigerian Mobile Number
 * @returns {Boolean} is the number a valid nigerian number?
 * @public
 */

function isValid(phoneNumber) {
  let number = phoneNumber.toString().trim();
  let isInternational = stripper.test(number);

  if (!/^0/.test(number) && !isInternational) {
    // throw new Error("Nigerian Numbers start with 0 or +234. Fix it");
    return false;
  }

  if (isInternational && !/^\+?\d+$/.test(number)) {
    if (/\+/.test(number) && number.indexOf("+") !== 0) {
      // throw new Error(
      //   "Move the '+' to the start of the number, maybe then you might be saved."
      // );
      return false;
    }
    // throw new Error("Contains Unwanted Character or an extra '+' that is not positioned at the start of the number");
    return false;
  }

  let newNumber = number.replace(stripper, "0");

  if (!/^\d+$/.test(newNumber)) {
    // throw new Error('Invalid Character Present')
    return false;
  }

  if (newNumber.length !== 11) {
    // throw new Error("Last I checked, Nigerian numbers could still afford to be 11 digits, and not more either.");
    return false;
  }

  return true;
}

//expose the helpers!
export { getStrippedNumber, getMobileProvider , isValid };
