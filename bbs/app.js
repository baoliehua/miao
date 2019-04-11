const express = require('express');

const app = express();

const port = 3001;

const users = [{
    id:42,
    name: 'damiao',
    password: '123456',
    email: 'damiao@damiao.io'
},{
    id:42,
    name: 'damiao',
    password: '123456',
    email: 'damiao@damiao.io'
},{
    id:42,
    name: 'damiao',
    password: '123456',
    email: 'damiao@damiao.io'
}];



const comments = [];

const posts = [{
    id: 1,
    owner: 42,
    title: 'hello',
    content: 'world',
    timestamp: Date.now()
},{
    id: 2,
    owner: 41,
    title: 'the quick',
    content: 'brown fox jumps over the lazy dog',
    timestamp: Date.now()
},{
    id: 3,
    owner: 41,
    title: 'lorem',
    content: 'ipsum',
    timestamp: Date.now()
}];

app.use(express.json());
app.use(express.urlencoded()); 



app.get('/', (req, res, next) => {
    res.send(`
        <!doctype html>
        <header>
            <a href="/login">登陆</a>
            <a href="/register">注册</a>
        </header>
        <ul>
            ${posts.map(post => {
                return `
                <li> <a href="/post/${post.id}">${post.title}</a></li>
                `
            }).join("")}
        </ul>
    `)
})

app.get('/post/:id', (req, res, next) => {
    var post = posts.find(it => it.id == req.params.id)
    res.send(`
        <!doctype html>
        <header>
            <a href="/login">登陆</a>
            <a href="/register">注册</a>
        </header>
        <div>
            <h1>${post.title}</h1>
            <article>${post.content}</article>
        </div>
    `)
})

app.route('/register').get((req, res, next) => {
    res.send(`
        <form action="/register" method= "post">
            <input type="text" name="name" />
            <input type="password" name="password" />
            <button>注册</button>
        </form>
    `)
})
.post((req, res, next) => {
    if(users.find(it => it.name == req.body.name) == null){
        var lastUser = users[users.length - 1].id
        req.body.id =  lastUser + 1;
        users.push(req.body);
        res.send('注册成功！');
    }else{
        res.send('用户名已被占用！');
    }
    
})

app.route('/login')
  .get((req, res, next) => {
    res.send(`
        <form action="/register" method= "post">
            <input type="text" name="name" />
            <input type="password" name="password" />
            <button>登陆</button>
        </form>
    `)
})
.post((req, res, next) => {
    var user = users.find(it =>it.name == req.body.name)
    if(user){
        if (user.password == req.body.password) {
            res.redirect('/');
            res.send('登陆成功');
        }  else{
            res.send('密码错误！');
        }
    }else{
        res.send('用户不存在');
    }
    
})



app.listen(port, () => {
    console.log("server listening on port",port);
})














