import React from 'react';
import { IoIosPeople } from "react-icons/io";
import { AiOutlineCalendar } from "react-icons/ai";
import { FiAward } from "react-icons/fi";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const DashBoard = () => {
  const Bardata = [
    { name: 'Jan', uv: 44, pv: 400 },
    { name: 'Feb', uv: 30, pv: 300 },
    { name: 'Mar', uv: 50, pv: 500 },
    { name: 'Apr', uv: 45, pv: 450 },
  ];

  return (
    <div className='w-full px-3 pt-20 pb-10 h-full dark:bg-gray-800'>
      <h1 className='font-bold text-3xl mb-8 dark:text-white'>Dashboard</h1>

      {/* Top Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-5'>
        {/* Total Users */}
        <div className='bg-blue-50 rounded-2xl shadow-lg p-4 dark:bg-blue-900/20'>
          <div className='flex justify-between items-center mb-4'>
            <span className='text-2xl text-green-700 rounded-full bg-green-100 h-10 w-10 flex items-center justify-center'>
              <IoIosPeople />
            </span>
            <span className='text-green-700 font-semibold'>+12.5%</span>
          </div>
          <div className='flex justify-between items-center'>
            <span className='text-sm font-medium text-gray-500 mb-1'>Total Users</span>
            <span className='text-2xl font-bold text-blue-800 dark:text-blue-300'>93</span>
          </div>
        </div>

        {/* Active Properties */}
        <div className='bg-purple-50 rounded-2xl shadow-lg p-4 dark:bg-green-900/20 '>
          <div className='flex justify-between items-center mb-4'>
            <span className='text-2xl text-red-700 rounded-full bg-red-100 h-10 w-10 flex items-center justify-center'>
              <AiOutlineCalendar />
            </span>
            <span className='text-red-700 font-semibold'>-3.2%</span>
          </div>
          <div className='flex justify-between items-center'>
            <span className='text-sm font-medium text-gray-500 mb-1'>Active Properties</span>
            <span className='text-2xl font-bold text-purple-800 dark:text-green-300'>154</span>
          </div>
        </div>

        {/* Active Locations */}
        <div className='bg-green-50 rounded-2xl shadow-lg p-4 dark:bg-purple-900/20'>
          <div className='flex justify-between items-center mb-4'>
            <span className='text-2xl text-green-700 rounded-full bg-green-100 h-10 w-10 flex items-center justify-center'>
              <FiAward />
            </span>
            <span className='text-green-700 font-semibold'>+8.7%</span>
          </div>
          <div className='flex justify-between items-center'>
            <span className='text-sm font-medium text-gray-500 mb-1'>Active Locations</span>
            <span className='text-2xl font-bold text-green-800 dark:text-blue-300'>12</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className='flex flex-col lg:flex-row justify-between gap-6 mt-10 w-full'>
        {/* Line Chart */}
        <div className='flex-1 bg-white rounded-2xl shadow-lg p-5 dark:bg-green-900/20 h-[400px]'>
          <h3 className='text-xl font-medium mb-4 dark:text-gray-200 text-gray-800'>Registered Property</h3>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart data={Bardata}>
              <Line type="monotone" dataKey="uv" stroke="#8884d8" strokeWidth={3} />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className='flex-1 bg-white rounded-2xl shadow-lg p-5 dark:bg-green-600/20 h-[400px]'>
          <h3 className='text-xl font-medium mb-4 dark:text-gray-200 text-gray-800'>Property</h3>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={Bardata}>
              <XAxis dataKey="name" scale="point" padding={{ left: 50, right: 30 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="pv" fill="#84d88b" background={{ fill: "#eee" }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
