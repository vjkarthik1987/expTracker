const express        = require('express');
const app            = express();
const path           = require('path');
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const PORT           = 3000 || process.env;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

const categories   = require('./models/category');
const modes        = require('./models/mode')
const ExpenseItem  = require('./models/expenseItem');

app.get('/', async (req, res) => {
    const expenseItems = await ExpenseItem.find();
    res.render('home', {expenseItems: expenseItems});
})

app.get('/item', (req, res) => {
    res.render('addItem', {categories: categories, modes: modes});
})

app.get('/allItems', async (req, res) => {
    const expenseItems = await ExpenseItem.find();
    res.render('allItems', {expenseItems: expenseItems});
})

app.post('/item', async (req, res) => {
    const {name, price, date, category, mode, shop, details} = req.body;
    await ExpenseItem.create({
        name: name,
        price: parseFloat(price),
        date: new Date(date),
        category: category,
        mode: mode,
        shop: shop,
        details: details,
    })
    res.redirect("/");
})

app.get('/item/:id', async (req, res) => {
    const {id} = req.params;
    const foundItem = await ExpenseItem.findById(id).exec();
    res.render('getItem', {expenseItem: foundItem});
})

app.get('/item/:id/edit', async (req, res) => {
    const {id} = req.params;
    const foundItem = await ExpenseItem.findById(id).exec();
    res.render('editItem', {expenseItem: foundItem, categories: categories, modes: modes});
})

app.patch('/item/:id/edit', async (req, res) => {
    const {id} = req.params;
    const {name, price, date, category, mode, shop, details} = req.body;
    const foundItem = await ExpenseItem.findByIdAndUpdate(id, {
        name: name,
        price: parseFloat(price),
        date: new Date(date),
        category: category,
        mode: mode,
        shop: shop,
        details: details,
    }).exec();
    res.redirect('/');
})


app.delete('/item/:id/delete', async (req, res) => {
    const {id} = req.params;
    await ExpenseItem.findByIdAndDelete(id).exec();
    res.redirect('/');
})

app.listen(PORT, () => {
    console.log("Server started");
})