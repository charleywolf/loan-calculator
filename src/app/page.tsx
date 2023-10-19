"use client";

import { SetStateAction, useState } from "react";

import Amortization from "@/components/amortization/Amortization";
import ErrorDisplay from "@/components/error/ErrorDisplay";
import LoanInput from "@/components/inputs/Input";
import LoanInputDate from "@/components/inputs/DateInput";
import LoanInputMoney from "@/components/inputs/MoneyInput";
import useErrors from "@/contexts/useErrors";

export default function Home() {
  // Define state variables and event handlers for each input field
  const [firstPaymentDate, setFirstPaymentDate] = useState<Date>(new Date());
  const [startingBalance, setStartingBalance] = useState<string>("");
  const [additionalMonthlyPayment, setAdditionalMonthlyPayment] =
    useState<string>("");
  const [annualInterestRate, setAnnualInterestRate] = useState<string>("");
  const [totalYears, setTotalYears] = useState<number | undefined>(undefined);
  const [periodsPerYear, setPeriodsPerYear] = useState<number | undefined>(
    undefined,
  );

  // Errors
  const { setErrors, errors } = useErrors();

  const dollarOnlyChange = (
    inputValue: string,
    setValue: React.Dispatch<SetStateAction<string>>,
    max: number,
    maxDesc: string,
  ) => {
    // Remove commas and other non-numeric characters from the input
    const cleanedValue = inputValue.replace(/[^\d.]/g, "");

    // Convert the cleaned input to a number
    const numericValue = parseFloat(cleanedValue);

    if (inputValue === "") {
      setValue("");
    } else if (
      !isNaN(numericValue) &&
      numericValue > 0 &&
      numericValue <= max
    ) {
      // Reformat the numericValue as a dollar value with commas
      const formattedValue = numericValue.toLocaleString("en-US");
      setValue(formattedValue);
    } else if (numericValue > max) {
      setErrors([
        ...errors,
        {
          title: "Invalid Input",
          description: maxDesc,
        },
      ]);
    }
  };

  // checks for a positive integer
  const positiveIntegerOnlyChange = (
    setValue: React.Dispatch<SetStateAction<number | undefined>>,
    inputValue: string,
    max?: number,
  ) => {
    const numericValue = parseFloat(inputValue);

    if (inputValue === "") {
      setValue(undefined);
    } else if (
      !isNaN(numericValue) &&
      numericValue > 0 &&
      numericValue <= (max ?? Infinity)
    ) {
      setValue(numericValue);
    } else if (!(numericValue <= (max ?? Infinity))) {
      setErrors([
        ...errors,
        {
          title: "Invalid Input",
          description:
            max === 24
              ? "Periods per year cannot exceed 24."
              : "Total years cannot exceed 30 years.",
        },
      ]);
    }
  };

  const percentageOnlyChange = (inputValue: string) => {
    const cleanedValue = inputValue.replace(/[^\d.]/g, "");
    const numericValue = parseFloat(cleanedValue) / 100;

    if (cleanedValue === "") {
      setAnnualInterestRate("");
    } else if (
      numericValue &&
      !isNaN(numericValue) &&
      numericValue > 0 &&
      numericValue <= 1
    ) {
      setAnnualInterestRate(cleanedValue);
    } else if (numericValue && !(numericValue <= 1)) {
      setErrors([
        ...errors,
        {
          title: "Invalid Input",
          description: "Annual interest rate cannot exceed 100%.",
        },
      ]);
    }
  };

  return (
    <main className="flex md:flex-row flex-col justify-start p-12">
      <ErrorDisplay />
      <div className="flex items-center md:items-start flex-col md:w-1/3 md:mr-10">
        <LoanInputDate
          title="First Payment Date"
          id="firstPaymentDate"
          selected={firstPaymentDate}
          onChange={(newDate) => setFirstPaymentDate(newDate)}
          infoText="Enter the date of the first payment."
        />
        <LoanInput
          title="Total Number of Years"
          id="totalYears"
          placeholder="5"
          value={totalYears === undefined ? "" : totalYears.toString()}
          onChange={(e) =>
            positiveIntegerOnlyChange(setTotalYears, e.target.value, 30)
          }
          infoText="Enter the total number of payment periods."
        />
        <LoanInput
          title="Payment Periods per Year"
          id="periodsPerYear"
          placeholder="3"
          value={periodsPerYear === undefined ? "" : periodsPerYear.toString()}
          onChange={(e) =>
            positiveIntegerOnlyChange(setPeriodsPerYear, e.target.value, 24)
          }
          infoText="Enter the number of payment periods per year."
        />

        <LoanInputMoney
          placeholder="40,000"
          title="Starting Balance"
          id="startingBalance"
          value={startingBalance}
          onChange={(e) =>
            dollarOnlyChange(
              e.target.value,
              setStartingBalance,
              500000000,
              "Starting balance of the loan cannot exceed $500 million.",
            )
          }
          infoText="Enter the initial balance amount."
        />
        <LoanInputMoney
          placeholder="1,000"
          title="Additional Monthly Payment"
          id="additionalMonthlyPayment"
          value={additionalMonthlyPayment}
          onChange={(e) =>
            dollarOnlyChange(
              e.target.value,
              setAdditionalMonthlyPayment,
              10000,
              "An additional monthly payment cannot exceed $10,000.",
            )
          }
          infoText="Enter an additional monthly payment amount."
        />
        <LoanInput
          title="Annual Interest Rate"
          placeholder="6.5"
          endingText="%"
          id="annualInterestRate"
          className="text-right"
          value={annualInterestRate}
          onChange={(e) => percentageOnlyChange(e.target.value)}
          infoText="Enter the annual interest rate in percentage."
        />
      </div>
      {periodsPerYear &&
        totalYears &&
        startingBalance !== "" &&
        annualInterestRate !== "" && (
          <div className="flex flex-col w-full md:w-2/3">
            <Amortization
              additionalMonthlyPayment={parseFloat(
                additionalMonthlyPayment.replace(/[^\d.]/g, ""),
              )}
              periodsPerYear={periodsPerYear}
              startingBalance={parseFloat(
                startingBalance.replace(/[^\d.]/g, ""),
              )}
              annualInterestRate={parseFloat(annualInterestRate) / 100}
              totalYears={totalYears}
              firstPaymentDate={firstPaymentDate}
            />
          </div>
        )}
    </main>
  );
}
