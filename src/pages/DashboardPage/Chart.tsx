import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', inventory: 4000, orders: 2400 },
  { name: 'Feb', inventory: 3000, orders: 1398 },
  { name: 'Mar', inventory: 2000, orders: 9800 },
  { name: 'Apr', inventory: 2780, orders: 3908 },
  { name: 'May', inventory: 1890, orders: 4800 },
  { name: 'Jun', inventory: 2390, orders: 3800 },
  { name: 'Jul', inventory: 3490, orders: 4300 },
];

const Chart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="inventory" stroke="#8884d8" />
        <Line type="monotone" dataKey="orders" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
