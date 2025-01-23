const express = require("express");
const mongoose = require("mongoose");
const { v4 } = require("uuid");

const app = express();
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/expenses").then(() => {
  console.log("connected to MongoDB");
});
const expensesSchema = new mongoose.Schema({
  id: { type: String, require: true, unique: true },
  title: { type: String, require: true },
  amount: { type: String, require: true }
});
const Expenses = mongoose.model("Expense", expensesSchema);

app.get("/api/expenses", async (req, res) => {
  try {
    const expenses = await Expenses.find();
    if (!expenses) {
      return res.status(404).send({ message: "No expenses found" });
    }
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error: error.message });
  }
});

app.get("/api/expenses/:id", async (req, res) => {
  const { id } = req.params;
  const expenses = await Expenses.findOne({ id });
  if (!expenses) {
    return res.status(404).send({ message: "No expenses found" });
  }
  res.status(200).json(expenses);
});

app.post("/api/expenses", async (req, res) => {
  console.log(req.body);
  const { title, amount } = req.body;
  if (!title || !amount) {
    return res.status(400).json({ message: "please provide both title and amount" });
  }
  const newExpense = new Expenses({
    id: v4(),
    title,
    amount
  });
  const savedExpense = await newExpense.save();
  res.status(201).json(savedExpense);
});

app.delete("/api/expenses/:id", async (req, res) => {
  const { id } = req.params;
  const expenses = await Expenses.findOneAndDelete({ id });
  if (!expenses) {
    return res.status(404).json({ message: "not found" });
  }
  res.status(200).json({ message: "Deleted successfully" });
});

app.put("/api/expenses/:id", async (req, res) => {
  const { id } = req.params;
  const { title, amount } = req.body;

  try {
    const updatedExpense = await Expenses.findOneAndUpdate(
      { id },
      { title, amount },
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).send({ message: "Expense not found" });
    }

    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error: error.message });
  }
});

app.listen(4000, () => {
  console.log("Server is running on http://127.0.0.1:4000");
});