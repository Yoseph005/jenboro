import clsx from "clsx";
import moment from "moment";
import React from "react";
import { FaMoneyBillWave, FaChartLine, FaPiggyBank } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { Chart } from "../components/Chart";
import Loading from "../components/Loader";
import { useGetFinanceStatsQuery } from "../redux/slices/api/financeApiSlice";
import { BGS, getInitials } from "../utils";

const FinanceTable = ({ transactions }) => {
  const TableHeader = () => (
    <thead className='border-b border-gray-300 '>
      <tr className='text-black text-left'>
        <th className='py-2'>Transaction ID</th>
        <th className='py-2'>Amount</th>
        <th className='py-2'>Date</th>
        <th className='py-2 hidden md:block'>Description</th>
      </tr>
    </thead>
  );

  const TableRow = ({ transaction }) => (
    <tr className='border-b border-gray-300 text-gray-600 hover:bg-gray-300/10'>
      <td className='py-2'>{transaction.id}</td>
      <td className='py-2'>{transaction.amount}</td>
      <td className='py-2'>{moment(transaction.date).format("LL")}</td>
      <td className='py-2 hidden md:block'>{transaction.description}</td>
    </tr>
  );

  return (
    <div className='w-full bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded'>
      <table className='w-full'>
        <TableHeader />
        <tbody>
          {transactions?.map((transaction, id) => (
            <TableRow key={id} transaction={transaction} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const FinanceDashboard = () => {
  const { data, isLoading } = useGetFinanceStatsQuery();

  if (isLoading)
    return (
      <div className='py-10'>
        <Loading />
      </div>
    );

  const totals = data?.totals || {};
  const recentTransactions = data?.recentTransactions || [];

  const stats = [
    {
      _id: "1",
      label: "TOTAL REVENUE",
      total: totals.revenue || 0,
      icon: <FaMoneyBillWave />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "TOTAL EXPENSES",
      total: totals.expenses || 0,
      icon: <MdAttachMoney />,
      bg: "bg-[#e11d48]",
    },
    {
      _id: "3",
      label: "NET PROFIT",
      total: totals.profit || 0,
      icon: <FaChartLine />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "4",
      label: "SAVINGS",
      total: totals.savings || 0,
      icon: <FaPiggyBank />,
      bg: "bg-[#f59e0b]",
    },
  ];

  const Card = ({ label, count, bg, icon }) => {
    return (
      <div className='w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between'>
        <div className='h-full flex flex-1 flex-col justify-between'>
          <p className='text-base text-gray-600'>{label}</p>
          <span className='text-2xl font-semibold'>{count}</span>
          <span className='text-sm text-gray-400'>{"Last month"}</span>
        </div>
        <div
          className={clsx(
            "w-10 h-10 rounded-full flex items-center justify-center text-white",
            bg
          )}
        >
          {icon}
        </div>
      </div>
    );
  };

  return (
    <div className='h-full py-4'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
        {stats.map(({ icon, bg, label, total }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>

      <div className='w-full bg-white my-16 p-4 rounded shadow-sm'>
        <h4 className='text-xl text-gray-600 font-semibold'>
          Financial Overview
        </h4>
        <Chart data={data?.graphData} />
      </div>

      <div className='w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8'>
        <FinanceTable transactions={recentTransactions} />
      </div>
    </div>
  );
};

export default FinanceDashboard;
