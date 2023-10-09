import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 py-7 px-8 text-center">
      <h1 className="text-4xl font-bold text-white">
        Charley Wolf&apos;s Loan Calculator
      </h1>
      <a
        href="https://github.com/charleywolf/loan-calculator"
        className="text-blue-400 hover:text-blue-600 hover:underline mt-2 flex justify-center items-center"
      >
        View the Source Code on GitHub
        <ChevronDoubleRightIcon className="h-3 w-3" />
      </a>
    </nav>
  );
}
