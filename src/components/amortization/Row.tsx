import { formatDate } from "@/utils/helper";

export interface RowProps {
  paymentDate: Date;
  payment: number;
  principal: number;
  interest: number;
  totalInterest: number;
  balance: number;
}

export default function Row({
  paymentDate,
  payment,
  principal,
  interest,
  totalInterest,
  balance,
}: RowProps) {
  return (
    <tr>
      {/* Payment Date */}
      <td className="px-6 py-4 whitespace-nowrap">{formatDate(paymentDate)}</td>

      {/* Payment */}
      <td className="px-6 py-4 whitespace-nowrap">
        {payment.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </td>

      {/* Principal */}
      <td className="px-6 py-4 whitespace-nowrap">
        {principal.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </td>

      {/* Interest */}
      <td className="px-6 py-4 whitespace-nowrap">
        {interest.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </td>

      {/* Total Interest */}
      <td className="px-6 py-4 whitespace-nowrap">
        {totalInterest.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </td>

      {/* Balance */}
      <td className="px-6 py-4 whitespace-nowrap">
        {balance.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </td>
    </tr>
  );
}
