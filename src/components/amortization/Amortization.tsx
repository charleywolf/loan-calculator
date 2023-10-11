import Row, { RowProps } from "./Row";
import { addMonthsToDate, calculatePMT, handleScroll } from "@/utils/helper";

import { ChevronDoubleDownIcon } from "@heroicons/react/24/outline";

export default function Amortization({
  firstPaymentDate,
  startingBalance,
  annualInterestRate,
  totalPeriods,
  periodsPerYear,
}: {
  firstPaymentDate: Date;
  startingBalance: number;
  annualInterestRate: number;
  totalPeriods: number;
  periodsPerYear: number;
}) {
  const perPeriodInterestRate = annualInterestRate / periodsPerYear;
  const monthlyPayment = calculatePMT(
    startingBalance,
    perPeriodInterestRate,
    totalPeriods,
  );

  let firstRowInterest = perPeriodInterestRate * startingBalance;
  let firstRow: RowProps = {
    paymentDate: firstPaymentDate,
    payment: monthlyPayment,
    interest: firstRowInterest,
    totalInterest: perPeriodInterestRate * startingBalance,
    principal: monthlyPayment - firstRowInterest,
    balance: startingBalance - (monthlyPayment - firstRowInterest),
  };

  const rows: RowProps[] = [firstRow];
  const monthsBetweenPeriods = 12 / periodsPerYear;

  let balance = firstRow.balance;
  let paymentDate = firstRow.paymentDate;
  let totalInterest = firstRow.totalInterest;
  let interest = firstRow.interest;
  let principal = firstRow.principal;
  // const payment = monthlyPayment;

  while (true) {
    if (balance < 0.005) {
      break;
    }

    paymentDate = addMonthsToDate(paymentDate, monthsBetweenPeriods); // updates date
    interest = perPeriodInterestRate * balance; // interest is interest rate * prev balance
    totalInterest += interest; // total interest is prev total interest + interest
    principal = monthlyPayment - interest; // principal is payment - interest
    balance -= principal; // balance is prev balance - principal

    rows.push({
      paymentDate,
      payment: monthlyPayment,
      interest,
      totalInterest,
      principal,
      balance,
    });
  }

  const totalInterestPaid = rows[rows.length - 1].totalInterest;
  const totalCost = startingBalance + totalInterestPaid;

  return (
    <>
      <div className="mb-8 flex flex-col">
        <div className="md:flex-row mt-5 md:mt-0 space-y-5 md:space-y-0 md:flex md:space-x-10 mb-8 text-center md:justify-center">
          <div className="flex flex-col md:items-center">
            <div className="text-lg font-semibold text-blue-600">
              Total Interest Paid
            </div>
            <div className="text-2xl font-bold text-blue-800">
              {totalInterestPaid.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </div>
          </div>

          <div className="flex flex-col md:items-center">
            <div className="text-lg font-semibold text-green-600">
              Total Cost of the Loan
            </div>
            <div className="text-2xl font-bold text-green-800">
              {totalCost.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </div>
          </div>

          <div className="flex flex-col md:items-center">
            <div className="text-lg font-semibold text-purple-600">
              Monthly Payment
            </div>
            <div className="text-2xl font-bold text-purple-800">
              {monthlyPayment.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </div>
          </div>
        </div>
        <a
          href="#amortization-schedule"
          className="flex flex-row space-x-3 justify-center"
          onClick={handleScroll}
        >
          <h1 className="text-xl font-bold">Amortization Schedule</h1>
          <ChevronDoubleDownIcon className="h-6 w-6" aria-hidden="true" />
        </a>
      </div>

      <div className="overflow-x-auto">
        <table
          id="amortization-schedule"
          className="min-w-full divide-y divide-gray-200"
        >
          <thead className="bg-gray-100">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Payment Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Payment
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Principal
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Interest
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total Interest
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Balance
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-50 divide-y divide-gray-200">
            {rows.map((row) => (
              <Row
                key={row.balance}
                interest={row.interest}
                paymentDate={row.paymentDate}
                payment={row.payment}
                balance={row.balance}
                principal={row.principal}
                totalInterest={row.totalInterest}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
