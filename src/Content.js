import React from "react";
import { useEffect, useState} from "react";

function Content(){

    //1. useEffect(callback);
    //- Gọi callback sau khi compinent re-render
    //- Gọi callback sau khi compinent vào DOM
    //2. useEffect(callback, []);
    //- Chỉ gọi callback 1 lần sau khi component mounted
    //3. useEffect(callback, [deps]);
    //- Chỉ gọi callback khi deps thay đổi
    //----------------------------------------------------------------
    //1. Callback luôn được gọi sau khi component mounted
    //2.Cleanup function luôn được gọi trước khi component unmounted
    //3.Cleanup function luôn được gọi trước khi callback được gọi (trừ phần được mounter)
    const tabs =['posts', 'comments', 'albums', 'photos', 'todos', 'users']
    const lessions =[
        {
            id: 1,
            name: 'lession1'
        },
        {
            id: 2,
            name: 'lession2'
        },
        {
            id: 3,
            name: 'lession3'
        },
        {
            id: 4,
            name: 'lession4'
        },
        ]

    const [title, setTitle] = useState('');
    const [posts, setPosts] = useState([]);
    const [type, setType] = useState('posts');
    const [showGotoTop, setShowGotoTop] = useState('false');
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [countDown, setCountDown] = useState(180);
    const [avatar, setAvatar] = useState('false');
    const [lessionID, setLessionID] = useState(1);


    useEffect(() => {
        document.title = title;
    });

    
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(posts => {
            setPosts(posts);  
        })
        // document.title = title;
    }, []);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/${type}`)
        .then(res => res.json())
        .then(posts => {
            setPosts(posts);  
        })
    }, [type]);

    useEffect(() => {

        const handleScroll = () =>{
            // if (window.scrollY >= 200){
            //     setShowGotoTop(true)
            // }else {
            //     setShowGotoTop(false)
            // }
            setShowGotoTop(window.scrollY >= 200)
        }
        window.addEventListener('scroll', handleScroll);
        //clearup function
        return() => {
            window.removeEventListener('scroll', handleScroll);
        }

    },[])

    useEffect(() => {
        const handlResize = () =>{
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        }
        window.addEventListener('resize',handlResize)
    }, [])

    useEffect(() => {
        const timeID = setInterval(() =>{
            setCountDown(prevState => prevState - 1)
        }, 1000)
        return () => clearInterval(timeID)
    },[])

    useEffect(() => {

        return () => {
            avatar && URL.revokeObjectURL(avatar.preview)
        }


    },[avatar])

    const handlePreviewAvatar = (e) =>{
        const file = e.target.files[0];
    
        file.preview = URL.createObjectURL(file);
        setAvatar(file)
        e.target.value = null;
    }

    useEffect(() => {
        const handleComment = ({detail}) => {
            console.log(detail);
        }
        window.addEventListener(`lesson-${lessionID}`, handleComment)

        return () => {
            window.removeEventListener(`lesson-${lessionID}`, handleComment)
        }
    },[lessionID])

    return (
       <div style={{padding:32}}>
            {lessions.map((lession) => (
                <button 
                    key = {lession.id}
                    style={{
                        color: lessionID === lession.id ?
                        'red' : 
                        '#333'
                    }}
                    onClick = {() => setLessionID(lession.id)}
                >
                    {lession.name}
                </button>
            ))}
            <br/>
            <input
                type="file"
                onChange={handlePreviewAvatar}
            />
            {avatar && (
                <img src ={avatar.preview} width="80%" alt="err"/>
            )}
            <h1>{"width: " + width}</h1>
            <h1>{"height: " + height}</h1>
            <h1>{"countDown: " + (countDown > 0 ? countDown : "Het gio")}</h1>
            
            {tabs.map(tab => (
                <button 
                    key={tab}
                    style={type === tab ? {
                        color: '#fff',
                        backgroundColor: '#333'
                    } : {}}
                    onClick={() => setType(tab)}
                >
                    {tab}
                </button>
                

            ))}
            <input
                value={title}
                placeholder="Change document title"
                onChange={e => setTitle(e.target.value)}
            />
            {/* {console.log('Render')} */}

       
            <ul>
                {posts.map(post => (  
                        <li key={post.id}>{post.title || post.name}</li>
                    ))}
            </ul>
            {showGotoTop && (
                <button
                    style={{
                        position: 'fixed',
                        right: 20,
                        bottom: 20,
                    }}
                >
                    Go to top
                </button>
            )}
       </div>
     
    )
}
export default Content;