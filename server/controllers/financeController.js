import asyncHandler from "express-async-handler";
import Transaction from "../models/transactionModel.js";

// @desc    Get finance dashboard stats
// @route   GET /api/finance/dashboard
// @access  Private
const getFinanceStats = asyncHandler(async (req, res) => {
  const totalRevenue = await Transaction.aggregate([
    { $match: { type: "revenue" } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const totalExpenses = await Transaction.aggregate([
    { $match: { type: "expense" } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const totalSavings = await Transaction.aggregate([
    { $match: { type: "savings" } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const totalProfit = totalRevenue[0].total - totalExpenses[0].total;

  const recentTransactions = await Transaction.find({})
    .sort({ date: -1 })
    .limit(10);

  res.json({
    totals: {
      revenue: totalRevenue[0].total,
      expenses: totalExpenses[0].total,
      profit: totalProfit,
      savings: totalSavings[0].total,
    },
    recentTransactions,
    graphData: [
      { name: "Revenue", total: totalRevenue[0].total },
      { name: "Expenses", total: totalExpenses[0].total },
      { name: "Profit", total: totalProfit },
      { name: "Savings", total: totalSavings[0].total },
    ],
  });
});

export { getFinanceStats };
