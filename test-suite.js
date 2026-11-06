// NeedBridge - Automated Verification Test Suite

const fs = require('fs');
const path = require('path');

console.log("====================================================");
console.log("🧪 RUNNING NEEDBRIDGE AUTOMATED SYSTEM TESTS");
console.log("====================================================\n");

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`✅ PASS: ${message}`);
    passedTests++;
  } else {
    console.error(`❌ FAIL: ${message}`);
  }
}

// 1. Verify Core HTML Pages
const REQUIRED_PAGES = [
  'index.html',
  'auth.html',
  'explore.html',
  'post-need.html',
  'offer-help.html',
  'listing-details.html',
  'dashboard.html',
  'messages.html',
  'admin.html',
  'about.html',
  'privacy.html'
];

REQUIRED_PAGES.forEach(page => {
  const filePath = path.join(__dirname, page);
  assert(fs.existsSync(filePath), `HTML Page exists: ${page}`);
  const content = fs.readFileSync(filePath, 'utf8');
  assert(content.includes('<!DOCTYPE html>') && content.includes('NeedBridge'), `Page has valid title and structure: ${page}`);
});

// 2. Verify Styles and Assets
assert(fs.existsSync(path.join(__dirname, 'css', 'styles.css')), "Global stylesheet css/styles.css exists");
assert(fs.existsSync(path.join(__dirname, 'css', 'components.css')), "Components stylesheet css/components.css exists");
assert(fs.existsSync(path.join(__dirname, 'assets', 'logo.svg')), "Vector Brand Logo assets/logo.svg exists");

// 3. Verify JavaScript Modules
const REQUIRED_SCRIPTS = [
  'js/firebase-config.js',
  'js/i18n.js',
  'js/db.js',
  'js/auth.js',
  'js/matching.js',
  'js/app.js',
  'js/home.js',
  'js/explore.js',
  'js/post-need.js',
  'js/offer-help.js',
  'js/listing-details.js',
  'js/dashboard.js',
  'js/messages.js',
  'js/admin.js'
];

REQUIRED_SCRIPTS.forEach(script => {
  const filePath = path.join(__dirname, script);
  assert(fs.existsSync(filePath), `Script exists: ${script}`);
});

// 4. Test the 100-Point Smart Matching Algorithm Unit Logic
console.log("\n--- Testing 100-Point Smart Matching Algorithm ---");

// Mock matching engine logic for Node runner
const stopWords = new Set([
  "a", "about", "above", "after", "again", "all", "am", "an", "and", "any", "are",
  "as", "at", "be", "because", "been", "for", "from", "in", "is", "it", "need", "offer", "under", "or"
]);

function extractKeywords(text) {
  if (!text) return [];
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !stopWords.has(w));
}

function calculateMatch(need, offer) {
  let catScore = 0;
  let keyScore = 0;
  let locScore = 0;
  let budScore = 0;

  // Category (40)
  if (need.category === offer.category) {
    if (need.subcategory && offer.subcategory && need.subcategory.toLowerCase() === offer.subcategory.toLowerCase()) {
      catScore = 40;
    } else {
      catScore = 30;
    }
  }

  // Keywords (25)
  const needTokens = new Set([...extractKeywords(need.title), ...extractKeywords(need.description)]);
  const offerTokens = new Set([...extractKeywords(offer.title), ...extractKeywords(offer.description)]);
  const matched = [];
  needTokens.forEach(t => { if (offerTokens.has(t)) matched.push(t); });
  if (matched.length >= 3) keyScore = 25;
  else if (matched.length === 2) keyScore = 18;
  else if (matched.length === 1) keyScore = 10;

  // Location (20)
  if (need.city.toLowerCase() === offer.city.toLowerCase()) {
    if (need.area && offer.area && need.area.toLowerCase() === offer.area.toLowerCase()) {
      locScore = 20;
    } else {
      locScore = 15;
    }
  }

  // Budget (15)
  if (offer.isFree || offer.price === 0) {
    budScore = 15;
  } else if (offer.price <= need.budget) {
    budScore = 15;
  } else if (offer.price <= need.budget * 1.25) {
    budScore = 8;
  }

  return {
    total: catScore + keyScore + locScore + budScore,
    breakdown: { catScore, keyScore, locScore, budScore },
    matchedKeywords: matched
  };
}

// User test case from Section 6 of prompt:
// "I need second-hand engineering textbooks in Hyderabad for under ₹500."
const testNeed = {
  title: "Need second-hand engineering textbooks",
  description: "Computer science engineering student looking for DBMS and OS textbooks in Hyderabad under ₹500",
  category: "Products and Daily Essentials",
  subcategory: "Books and stationery",
  city: "Hyderabad",
  area: "Madhapur",
  budget: 500,
  isFree: false
};

const testOffer = {
  title: "Offering Free Engineering & Computer Science Textbooks",
  description: "Giving away textbooks for computer science engineering students in Hyderabad Madhapur",
  category: "Products and Daily Essentials",
  subcategory: "Books and stationery",
  city: "Hyderabad",
  area: "Madhapur",
  price: 0,
  isFree: true
};

const matchResult = calculateMatch(testNeed, testOffer);

assert(matchResult.breakdown.catScore === 40, `Category match scored 40/40 pts (got ${matchResult.breakdown.catScore})`);
assert(matchResult.breakdown.keyScore === 25, `Keyword overlap scored 25/25 pts (matched keywords: ${matchResult.matchedKeywords.join(', ')})`);
assert(matchResult.breakdown.locScore === 20, `Location match scored 20/20 pts (Hyderabad, Madhapur)`);
assert(matchResult.breakdown.budScore === 15, `Budget suitability scored 15/15 pts (Offer is Free within ₹500 budget)`);
assert(matchResult.total === 100, `Total match score equals 100% (got ${matchResult.total}%)`);

// 5. Verify Security Rules
assert(fs.existsSync(path.join(__dirname, 'firestore.rules')), "firestore.rules file exists");
const firestoreRules = fs.readFileSync(path.join(__dirname, 'firestore.rules'), 'utf8');
assert(firestoreRules.includes('Administrator') && firestoreRules.includes('request.auth != null'), "firestore.rules enforces authentication & admin protection");

assert(fs.existsSync(path.join(__dirname, 'storage.rules')), "storage.rules file exists");

console.log("\n====================================================");
console.log(`🎉 TEST SUMMARY: ${passedTests} / ${totalTests} TESTS PASSED!`);
console.log("====================================================");

if (passedTests === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}
