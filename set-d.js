// ===== Output helpers =====
const resultEl = document.getElementById("result");
const resultBox = document.getElementById("resultBox");

function printResult(text) {
  resultEl.textContent = String(text);
}

function clearOutput() { // Task 26
  printResult("");
}

// Task 30: double-click clears output area
if (resultBox) {
  resultBox.addEventListener("dblclick", () => clearOutput());
}

// ===== Utilities =====
function getStr() {
  return (document.getElementById("strInput")?.value ?? "").toString();
}
function getArrayItems() {
  const raw = (document.getElementById("arrayInput")?.value ?? "").toString();
  if (!raw.trim()) return [];
  return raw.split(",").map(s => s.trim());
}
function parseNumberSafe(x) {
  const n = Number(x);
  return Number.isFinite(n) ? n : null;
}

// ===== 1) Reverse words order =====
function t1_reverseWords() {
  const s = getStr().trim();
  if (!s) return printResult("Enter a sentence/string first.");
  const out = s.split(/\s+/).reverse().join(" ");
  printResult(out);
}

// ===== 2) Extract 1st, 3rd, 4th, last characters =====
function t2_extractChars() {
  const s = getStr();
  if (!s) return printResult("Enter a string first.");
  const first = s[0] ?? "";
  const third = s[2] ?? "";
  const fourth = s[3] ?? "";
  const last = s[s.length - 1] ?? "";
  printResult(`First: ${first}\nThird: ${third}\nFourth: ${fourth}\nLast: ${last}`);
}

// ===== 3) Find longest word =====
function t3_longestWord() {
  const s = getStr().trim();
  if (!s) return printResult("Enter a sentence first.");
  const words = s.split(/\s+/).filter(Boolean);
  let best = "";
  for (const w of words) if (w.length > best.length) best = w;
  printResult(best ? `Longest word: ${best} (${best.length})` : "No words found.");
}

// ===== 4) Toggle case =====
function t4_toggleCase() {
  const s = getStr();
  if (!s) return printResult("Enter a string first.");
  let out = "";
  for (const ch of s) {
    const up = ch.toUpperCase();
    const low = ch.toLowerCase();
    out += (ch === up) ? low : up;
  }
  printResult(out);
}

// ===== 5) Word count + space count =====
function t5_wordAndSpaceCount() {
  const s = getStr();
  if (!s) return printResult("Enter a string first.");
  const spaces = (s.match(/ /g) || []).length;
  const words = s.trim() ? s.trim().split(/\s+/).length : 0;
  printResult(`Words: ${words}\nSpaces: ${spaces}`);
}

// ===== 6) Trim extra spaces =====
function t6_trimExtraSpaces() {
  const s = getStr();
  if (!s) return printResult("Enter a string first.");
  const cleaned = s.trim().replace(/\s+/g, " ");
  printResult(cleaned);
}

// ===== 7) Fruits array show third element =====
function t7_fruitsThird() {
  const arr = getArrayItems();
  if (arr.length < 3) return printResult("Enter at least 3 items (comma-separated).");
  printResult(`Third element: ${arr[2]}`);
}

// ===== 8) Remove duplicates =====
function t8_removeDuplicates() {
  const arr = getArrayItems();
  if (arr.length === 0) return printResult("Enter some items first.");
  const unique = [...new Set(arr)];
  printResult(`Original: [${arr.join(", ")}]\nUnique: [${unique.join(", ")}]`);
}

// ===== 9) Last element popup =====
function t9_lastElementPopup() {
  const arr = getArrayItems();
  if (arr.length === 0) return alert("Array is empty. Enter items first.");
  alert(`Last element: ${arr[arr.length - 1]}`);
  printResult(`Popup shown: Last element = ${arr[arr.length - 1]}`);
}

// ===== 10) Find index of element (user input) =====
function t10_findIndexUserInput() {
  const arr = getArrayItems();
  if (arr.length === 0) return printResult("Enter some items first.");
  const target = prompt("Enter element to find index:");
  if (target === null) return printResult("Cancelled.");
  const idx = arr.indexOf(target.trim());
  printResult(idx >= 0 ? `Index of "${target.trim()}": ${idx}` : `"${target.trim()}" not found.`);
}

// ===== 11) map() double each element =====
function t11_mapDouble() {
  const arr = getArrayItems();
  if (arr.length === 0) return printResult("Enter numbers like 1,2,3");
  const nums = arr.map(parseNumberSafe);
  if (nums.some(n => n === null)) return printResult("Invalid number found. Enter ONLY numbers.");
  const doubled = nums.map(n => n * 2);
  printResult(`Original: [${nums.join(", ")}]\nDoubled: [${doubled.join(", ")}]`);
}

// ===== 12) map() convert strings to uppercase =====
function t12_mapUppercase() {
  const arr = getArrayItems();
  if (arr.length === 0) return printResult("Enter strings like a,b,c");
  const up = arr.map(s => s.toUpperCase());
  printResult(`Original: [${arr.join(", ")}]\nUppercase: [${up.join(", ")}]`);
}

// ===== 13) Splice: replace elements one by one =====
function t13_spliceReplaceOneByOne() {
  const arr = getArrayItems();
  if (arr.length === 0) return printResult("Enter some items first.");
  const copy = arr.slice();
  let log = `Start: [${copy.join(", ")}]\n`;
  for (let i = 0; i < copy.length; i++) {
    const old = copy[i];
    copy.splice(i, 1, `${old}_replaced`);
    log += `Replace index ${i}: [${copy.join(", ")}]\n`;
  }
  printResult(log.trim());
}

// ===== 14) Splice: delete elements one by one =====
function t14_spliceDeleteOneByOne() {
  const arr = getArrayItems();
  if (arr.length === 0) return printResult("Enter some items first.");
  const copy = arr.slice();
  let log = `Start: [${copy.join(", ")}]\n`;
  while (copy.length > 0) {
    copy.splice(0, 1);
    log += `Delete first: [${copy.join(", ")}]\n`;
  }
  printResult(log.trim());
}

// ===== 15) arithmetic based on choice =====
function t15_arithmeticChoice() {
  const a = parseNumberSafe(document.getElementById("numA")?.value);
  const b = parseNumberSafe(document.getElementById("numB")?.value);
  const op = document.getElementById("opChoice")?.value;

  if (a === null || b === null) return printResult("Enter Number A and Number B.");
  let res;
  if (op === "add") res = a + b;
  else if (op === "sub") res = a - b;
  else if (op === "mul") res = a * b;
  else if (op === "div") res = (b === 0) ? "Cannot divide by 0" : (a / b);
  else res = "Unknown operation";
  printResult(`A=${a}, B=${b}\nOperation=${op}\nResult=${res}`);
}

// ===== 16) swap two numbers =====
function t16_swapNumbers() {
  let a = parseNumberSafe(document.getElementById("numA")?.value);
  let b = parseNumberSafe(document.getElementById("numB")?.value);
  if (a === null || b === null) return printResult("Enter Number A and Number B.");
  const before = `Before: A=${a}, B=${b}`;
  [a, b] = [b, a];
  printResult(`${before}\nAfter:  A=${a}, B=${b}`);
}

// ===== 17) sum of digits =====
function t17_sumDigits() {
  const aRaw = (document.getElementById("numA")?.value ?? "").toString().trim();
  if (!aRaw) return printResult("Enter Number A.");
  const s = aRaw.replace(/^[-+]/, "");
  if (!/^\d+$/.test(s)) return printResult("Number A must be an integer.");
  let sum = 0;
  for (const ch of s) sum += ch.charCodeAt(0) - 48;
  printResult(`Sum of digits of ${aRaw} = ${sum}`);
}

// ===== 18) reverse a number =====
function t18_reverseNumber() {
  const aRaw = (document.getElementById("numA")?.value ?? "").toString().trim();
  if (!aRaw) return printResult("Enter Number A.");
  const sign = aRaw.startsWith("-") ? "-" : "";
  const s = aRaw.replace(/^[-+]/, "");
  if (!/^\d+$/.test(s)) return printResult("Number A must be an integer.");
  const rev = s.split("").reverse().join("").replace(/^0+/, "") || "0";
  printResult(`Reverse of ${aRaw} = ${sign}${rev}`);
}

// ===== 19) check leap year =====
function t19_checkLeapYear() {
  const y = parseNumberSafe(document.getElementById("numA")?.value);
  if (y === null) return printResult("Enter Number A as a year.");
  const year = Math.trunc(y);
  const leap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  printResult(`${year} is ${leap ? "" : "NOT "}a leap year.`);
}

// ===== 20) popup: allow only 10-digit input =====
function t20_allowOnly10DigitsPopup() {
  const input = prompt("Enter 10-digit number:");
  if (input === null) return printResult("Cancelled.");
  const s = input.trim();
  if (/^\d{10}$/.test(s)) {
    alert("Valid 10-digit input ✅");
    printResult(`Valid 10-digit input: ${s}`);
  } else {
    alert("Invalid ❌ Must be exactly 10 digits.");
    printResult(`Invalid input: "${s}"`);
  }
}

// ===== 21) popup: numeric/string input rule arithmetic =====
function t21_numericStringRulePopup() {
  const a = prompt("Enter first value (number or text):");
  if (a === null) return printResult("Cancelled.");
  const b = prompt("Enter second value (number or text):");
  if (b === null) return printResult("Cancelled.");

  const an = parseNumberSafe(a.trim());
  const bn = parseNumberSafe(b.trim());

  // rule: if both numbers -> add; otherwise concatenate
  if (an !== null && bn !== null) {
    const sum = an + bn;
    alert(`Both numeric. Sum = ${sum}`);
    printResult(`Numeric rule: ${an} + ${bn} = ${sum}`);
  } else {
    const concat = a + b;
    alert(`At least one is text. Concatenate = ${concat}`);
    printResult(`String rule: "${a}" + "${b}" = "${concat}"`);
  }
}

// ===== 22–25) Validate + signup submit/reset =====
function handleSignupSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("sName").value.trim();
  const ageRaw = document.getElementById("sAge").value.trim();
  const email = document.getElementById("sEmail").value.trim();
  const msg = document.getElementById("sMsg").value.trim();

  // 22: required field check
  if (!name || !email || !msg) {
    printResult("Validation error (Task 22): Name, Email, and Message are required.");
    return false;
  }

  // 23: age >= 18
  const age = parseNumberSafe(ageRaw);
  if (age === null || age < 18) {
    printResult("Validation error (Task 23): Age must be >= 18.");
    return false;
  }

  // 25: display submitted data + success message
  printResult(
    "✅ Submitted Successfully (Task 25)\n\n" +
    `Name: ${name}\nAge: ${age}\nEmail: ${email}\nMessage: ${msg}`
  );

  return false;
}

// 24: reset handled by HTML form reset button
// 26: clearOutput() already exists

// ===== 27) Create person object =====
function t27_createPersonObject() {
  const name = (document.getElementById("p1").value || "").trim();
  const age = parseNumberSafe(document.getElementById("pAge")?.value);
  if (!name || age === null) return printResult("Enter Person 1 name and an age.");
  const person = { name, age, createdAt: new Date().toLocaleString() };
  printResult(`Person object:\n${JSON.stringify(person, null, 2)}`);
}

// ===== 28) Store 3 persons in array and display =====
function t28_storeThreePersons() {
  const p1 = (document.getElementById("p1").value || "").trim();
  const p2 = (document.getElementById("p2").value || "").trim();
  const p3 = (document.getElementById("p3").value || "").trim();
  if (!p1 || !p2 || !p3) return printResult("Enter names for Person 1, 2, and 3.");
  const people = [{name:p1},{name:p2},{name:p3}];
  printResult(`People array:\n${JSON.stringify(people, null, 2)}`);
}

// ===== 29) Countdown timer with Start/Pause/Reset =====
let timerId = null;
let remaining = 0;

function timerStart() {
  const input = document.getElementById("timerSeconds")?.value;
  if (timerId !== null) return; // already running
  if (remaining <= 0) {
    const n = parseNumberSafe(input);
    if (n === null || n <= 0) return printResult("Enter timer seconds > 0.");
    remaining = Math.floor(n);
  }
  printResult(`Timer started. Remaining: ${remaining}s`);
  timerId = setInterval(() => {
    remaining--;
    if (remaining <= 0) {
      clearInterval(timerId);
      timerId = null;
      remaining = 0;
      printResult("⏰ Timer finished!");
      return;
    }
    printResult(`Remaining: ${remaining}s`);
  }, 1000);
}

function timerPause() {
  if (timerId === null) return printResult("Timer is not running.");
  clearInterval(timerId);
  timerId = null;
  printResult(`Timer paused. Remaining: ${remaining}s`);
}

function timerReset() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
  remaining = 0;
  printResult("Timer reset.");
}
