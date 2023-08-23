import { useState } from 'react';

//------------------------------------------------------------------------------

const orders =[100, 200,300];

function App() {
  
  const [counter, setCounter] = useState(()=>{
  const total = orders.reduce((total, cur) =>total + cur)
  console.log(total);

  return total;
});

  const handleIncrease = () =>{
    //setCounter(counter + 1);
    setCounter(prevState => prevState + 1);
    
  }

//------------------------------------------------------------------------------

  const [info, setInfo] = useState({
    name: 'Name',
    age: 19,
    address:'Tay Ninh'

  });
  const handleUpdate = () =>{
    setInfo(prev => {
      //xu ly logic
      return{
              ...prev,
              bio: 'Yeu mau hong',
            }
      });
  }

//------------------------------------------------------------------------------
var gifts = [
  'RTX 3070',
  'i7-12700K',
  'Ryzen 5 5600X',
  'Z690',
  'RTX 3080Ti',
  'X399',
  'Ryzen 7 5700G'
]
const [gift, setGift] = useState()

function handleGift(){
  const index = Math.floor(Math.random()*gifts.length);
  return  setGift(gifts[index]);
}
//------------------------------------------------------------------------------
const [name, setName] = useState('')
const [email, setEmail] = useState('')


const handleSubmit = () =>{
  console.log({
    email,
    name
  })

}
//------------------------------------------------------------------------------
var courses =[
  {
    id: 1,
    name:'javascript',
    coin: 50
  },
  {
    id: 2,
    name:'python',
    coin: 20
  },
  {
    id: 3,
    name:'php',
    coin: 25
  },
  {
    id: 4,
    name:'java',
    coin: 50
  },
  {
    id: 5,
    name:'C++',
    coin: 20
  }
]
const [checked, setChecked] = useState(1)

const handleSubmitRadio = () =>{
  console.log({id: checked})
}
//------------------------------------------------------------------------------
const [checkedBox, setCheckedBox] = useState([])
const handleCheck = (id) =>{
  setCheckedBox(prev => {
    const isCheckedBox = checkedBox.includes(id);
    if (isCheckedBox){
      return checkedBox.filter(item => item !== id);
    } else {
      return [...prev, id]
    }
  })
}




const handleSubmitCheckbox = () =>{
  console.log({id: checkedBox})
}
//------------------------------------------------------------------------------
const [job, setjob] = useState('');
const [jobs, setjobs] = useState(()=>{
  const sotorageJobs = JSON.parse(localStorage.getItem('jobs'));
  return sotorageJobs ?? [];

});
console.log(job);
const handleSubmitAdd = () => {
  setjobs(prev =>{
    const newJobs = [...prev, job]
    const jsonJobs = JSON.stringify(newJobs)
    localStorage.setItem('jobs', jsonJobs)
    return newJobs
  })
  setjob('')
}



//------------------------------------------------------------------------------

  return (
    <div className="App">
      <h1>++</h1>
      <h1>{counter}</h1>
      <button onClick={handleIncrease}>Increase</button> <br/>
      <h1>Update</h1>
      <h1>{JSON.stringify(info)}</h1>
      <button onClick={handleUpdate}>Update</button><br/>

      <h1>Gift</h1>
      <h1>{gift||'Chua co thuong'}</h1>
      <button onClick={handleGift}>Lay thuong</button> <br />


      <div style={{padding:32}}>
        <h1>Ví dụ textBox</h1>
        <input
            value={email}
            placeholder='Nhập email...'
            onChange={e => setEmail(e.target.value)}
          /> <br/>
        <input
          value={name}
          placeholder='Nhập name...'
          onChange={e => setName(e.target.value)}
        />
        <button onClick={handleSubmit}>Register</button>
      </div>


      <div style={{padding:32}}>
        <h1>Ví dụ radioButton</h1>
        {
          courses.map(course =>(
            <div key={course.id}>
              <input 
                type='radio'
                checked = {checked === course.id}
                onChange={() => setChecked(course.id)}
              />
              {course.name}
            </div>
          )

          )
        }
        <button onClick={handleSubmitRadio}>Register</button>
      </div>



      <div style={{padding:32}}>
        <h1>Ví dụ CheckBox</h1>
        {
          courses.map(course =>(
            <div key={course.id}>
              <input 
                type='checkbox'
                checked = {checkedBox.includes(course.id)}
                onChange={() => handleCheck(course.id)}
              />
              {course.name}
            </div>
          )

          )
        }
        <button onClick={handleSubmitCheckbox}>Register</button>
      </div>



      <div style={{padding:32}}>
        <h1>Ví dụ Todolist with useState</h1>
        <input value={job} onChange={e =>setjob(e.target.value)}/>
        <button onClick={handleSubmitAdd}>Add</button>

        <ul>
          {
            jobs.map((job, index) => (
              <li key={index}>{job}</li>
          ))}
        </ul>
          
       
      </div>







    </div>
  );
}

export default App;
