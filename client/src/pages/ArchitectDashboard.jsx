import clsx from "clsx";
import moment from "moment";
import React from "react";
import { FaDraftingCompass, FaTasks } from "react-icons/fa";
import { MdArchitecture } from "react-icons/md";
import { Chart } from "../components/Chart";
import Loading from "../components/Loader";
import { useGetArchitectStatsQuery } from "../redux/slices/api/architectApiSlice";
import { BGS, getInitials } from "../utils";

const TaskTable = ({ tasks }) => {
  const TableHeader = () => (
    <thead className='border-b border-gray-300 '>
      <tr className='text-black text-left'>
        <th className='py-2'>Task Title</th>
        <th className='py-2'>Status</th>
        <th className='py-2'>Team</th>
        <th className='py-2 hidden md:block'>Created At</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className='border-b border-gray-300 text-gray-600 hover:bg-gray-300/10'>
      <td className='py-2'>
        <div className='flex items-center gap-2'>
          <div className={clsx("w-4 h-4 rounded-full", task.status)} />
          <p className='text-base text-black'>{task.title}</p>
        </div>
      </td>
      <td className='py-2'>
        <span className='capitalize'>{task.status}</span>
      </td>
      <td className='py-2'>
        <div className='flex'>
          {task.team.map((m, index) => (
            <div
              key={index}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                BGS[index % BGS.length]
              )}
            >
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td>
      <td className='py-2 hidden md:block'>
        <span className='text-base text-gray-600'>
          {moment(task?.date).fromNow()}
        </span>
      </td>
    </tr>
  );

  return (
    <div className='w-full bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded'>
      <table className='w-full'>
        <TableHeader />
        <tbody>
          {tasks?.map((task, id) => (
            <TableRow key={id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ArchitectDashboard = () => {
  const { data, isLoading } = useGetArchitectStatsQuery();

  if (isLoading)
    return (
      <div className='py-10'>
        <Loading />
      </div>
    );

  const totals = data?.totals || {};
  const recentTasks = data?.recentTasks || [];

  const stats = [
    {
      _id: "1",
      label: "TOTAL PROJECTS",
      total: totals.projects || 0,
      icon: <FaDraftingCompass />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "COMPLETED TASKS",
      total: totals.completedTasks || 0,
      icon: <FaTasks />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "ONGOING TASKS",
      total: totals.ongoingTasks || 0,
      icon: <MdArchitecture />,
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
          Project Overview
        </h4>
        <Chart data={data?.graphData} />
      </div>

      <div className='w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8'>
        <TaskTable tasks={recentTasks} />
      </div>
    </div>
  );
};

export default ArchitectDashboard;
