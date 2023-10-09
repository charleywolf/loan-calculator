/**
 * Format a date to a string in the format of MM/DD/YYYY
 * @param {Date} date
 * @returns {string}
 */
export function formatDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Add 1 because months are zero-based
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

/**
 * Calculate the monthly payment for a loan
 * @param {number} startingBalance Starting balance of the loan
 * @param {number} perPeriodInterestRate Per period interest rate of the loan
 * @param {number} totalPeriods Number of payment periods for the loan
 * @returns {number}
 */
export function calculatePMT(
  startingBalance: number,
  perPeriodInterestRate: number,
  totalPeriods: number,
): number {
  // Calculate monthly payment using the formula
  const monthlyPayment =
    (startingBalance *
      (perPeriodInterestRate *
        Math.pow(1 + perPeriodInterestRate, totalPeriods))) /
    (Math.pow(1 + perPeriodInterestRate, totalPeriods) - 1);

  return monthlyPayment;
}

/**
 * Adds the specified number of months to the given date
 * @param {Date} date - Starting date
 * @param {number} monthsToAdd - Months to add to the date
 * @returns {Date} - Returns new date
 */
export function addMonthsToDate(date: Date, monthsToAdd: number): Date {
  // Copy the input date to avoid mutating it
  const newDate = new Date(date);

  // Get the current month and year
  let currentMonth = newDate.getMonth();
  let currentYear = newDate.getFullYear();

  // Calculate the new month and year
  let newMonth = currentMonth + monthsToAdd;

  // Adjust the year if the new month exceeds December
  if (newMonth > 11) {
    const yearsToAdd = Math.floor(newMonth / 12);
    newMonth %= 12;
    currentYear += yearsToAdd;
  }

  // Set the new month and year
  newDate.setMonth(newMonth);
  newDate.setFullYear(currentYear);

  return newDate;
}

/**
 * Handles scrolling to an element on the page to make it cleaner/smooth
 * @param {React.MouseEvent<HTMLAnchorElement, MouseEvent>} e
 */
export function handleScroll(
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
) {
  // first prevent the default behavior
  e.preventDefault();
  // get the href and remove everything before the hash (#)
  const href = e.currentTarget.href;
  const targetId = href.replace(/.*#/, ""); // Remove the unnecessary backslash before #
  // get the element by id and use scrollIntoView
  const elem = document.getElementById(targetId);
  elem?.scrollIntoView({
    behavior: "smooth",
  });
}
