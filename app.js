const { v4: uuidv4 } = require("uuid");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json()); // used to paarse the data

mongoose.connect("mongodb+srv://vishnumohans2023cse:vishnu@cluster0.kgc4t.mongodb.net/expense").then(() => {
  console.log("connected to Mongodb");
});
const expenseSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
});
const Expense = mongoose.model("Expense", expenseSchema);

app.get("/api/expenses", async (req, res) => {
  try {
    const expenses = await Expense.find();
    if (!expenses) {
      res.status(404).send({ message: "No expenses found" });
    }
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});
app.get("/api/expenses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findOne({ id });
    if (!expense) {
      res.status(404).json({ message: "Not found" });
      return;
    } else {
      res.status(200).json(expense);
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.post("/api/expenses", async (req, res) => {
  const { title, amount } = req.body;
  if (!title || !amount) {
    res.status(400).json({ message: "Title and amount are required" });
    return;
  }
  const newExpense = new Expense({
    id: uuidv4(),
    title, // title:title is equal to title
    amount,
  });
  const savedExpense = await newExpense.save();
  res.status(201).json(savedExpense);
  res.end();
});

app.delete("/api/expenses/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedExpense = await Expense.findOneAndDelete({ id });
    if (!deletedExpense) {
      res.status(400).json({ message: "Expense not found" });
      return;
    } else {
      res.status(200).json({ message: "Deleted Successfully" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.put("/api/expenses/:id", async (req, res) => {
  const { id } = req.params;
  const { title, amount } = req.body;
  try {
    const updatedExpense = await Expense.findOneAndUpdate(
      { id },
      { title, amount }
    );
    if (!updatedExpense) {
      res.status(400).json({ message: "Expense not found" });
      return;
    }
    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});
app.listen(3000, () => {
  console.log("Server is running");
});