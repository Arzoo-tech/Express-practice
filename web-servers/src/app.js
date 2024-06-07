const express =require('express');
const path =require('path');
const hbs=require('hbs')
const app= express();

const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//wE want to serve this file on our webpage
app.use(express.static(publicDirectoryPath))

// app.set('views', path.join(__dirname, '../views'));
// console.log(publicDirectoryPath)

app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath)

//.listen starts up a server and listens to a given port
//it executes the callback function once the server is up and running
app.listen(3000,()=>{
    console.log('Server is up and running')
})
//web servers never stop listening until we stop it

//app.get --what resources to send at a given url

app.get('',(req,res)=>{
   
    res.render('index',
    {
        title:'Weather app',
        name:'arzoo'
    })
})

app.get('/about',(req,res)=>{

res.render('about',
{
    title:'About me',
    name:'arzoo'
})

})

app.get('/weather',(req,res)=>{

if(!req.query.address)
{
    return res.send({error:'Address not provided'})
}

res.send(
    {
        forecast:'this is forecast',
        address:req.query.address
    }
)})


app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help page',
        message:'help info'
    })
})


app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'404 Error',
        message:'Help article not found'
    })
})


app.get('*',(req,res)=>{
    res.render('error',{
        title:'404 Error',
        message:'Page not found'
    })
})
