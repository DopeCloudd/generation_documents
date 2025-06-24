export function numberToWordsFr(input: number | string): string {
  const ones = [
    "",
    "un",
    "deux",
    "trois",
    "quatre",
    "cinq",
    "six",
    "sept",
    "huit",
    "neuf",
    "dix",
    "onze",
    "douze",
    "treize",
    "quatorze",
    "quinze",
    "seize",
  ];

  const tens = [
    "",
    "",
    "vingt",
    "trente",
    "quarante",
    "cinquante",
    "soixante",
    "soixante",
    "quatre-vingt",
    "quatre-vingt",
  ];

  const n =
    typeof input === "string" ? parseInt(input.replace(/\s/g, ""), 10) : input;

  if (isNaN(n)) return "";

  if (n === 0) return "zéro";

  const convertBelow100 = (num: number): string => {
    if (num < 17) return ones[num];
    if (num < 20) return "dix-" + ones[num - 10];
    if (num < 70) {
      const unit = num % 10;
      const sep = unit === 1 && Math.floor(num / 10) !== 8 ? " et " : "-";
      return tens[Math.floor(num / 10)] + (unit ? sep + ones[unit] : "");
    }
    if (num < 80) return "soixante-" + convertBelow100(num - 60);
    return "quatre-vingt" + (num > 80 ? "-" + convertBelow100(num - 80) : "");
  };

  const convertBelow1000 = (num: number): string => {
    if (num < 100) return convertBelow100(num);
    const hundred = Math.floor(num / 100);
    const rest = num % 100;
    const cent = hundred > 1 ? ones[hundred] + " cent" : "cent";
    return cent + (rest ? " " + convertBelow100(rest) : hundred > 1 ? "s" : "");
  };

  let result = "";
  const thousands = Math.floor(n / 1000);
  const rest = n % 1000;

  if (thousands) {
    if (thousands === 1) result += "mille";
    else result += convertBelow1000(thousands) + " mille";
  }

  if (rest) {
    if (result) result += " ";
    result += convertBelow1000(rest);
  }

  return result.trim();
}
