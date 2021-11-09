import { getPostBySlug, getAllPosts } from "../../helper/strapiApi";
import { formatImgUrl,capatalize } from "../../helper/helperFunctions";
import { useRouter } from 'next/router'
import Image from "next/image";
import { useState, useRef, useEffect, useContext } from "react";
import classes from "../../components/posts/post.module.css";
import { AuthContext } from '../../context/authContext'


const PostDetail = ({ post }) => {

  const { user, setUser } = useContext(AuthContext)
  const router = useRouter()
  const { query } = useRouter()




  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  })

  const titleRef = useRef();
  const descRef = useRef();

  const [edit, setEdit] = useState(false);
  const [error, setError] = useState()


  useEffect(() => {
    if (edit) {
      titleRef.current.focus();
    }
  }, [edit]);





  const deleteHandler = async () => {
    try {
      const req = await fetch(`http://localhost:1337/posts/${post.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.jwt}`,
        },
      });
      const res = await req.json();
    
      router.push('/')
    } catch (error) {
 
    }
  };

  const editToggleHandler = () => {
    setEdit(!edit);
  };
  const editHandler = async (e) => {
    e.preventDefault();

    const title = titleRef.current.value;
    const desc = descRef.current.value;
 
    try {
      const req = await fetch(`http://localhost:1337/posts/${post.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.jwt}`,
        },
        body: JSON.stringify({
          title: title,
          description: desc,
        }),
      });

      if (!req.ok) {
        throw new Error("Something went wrong");

      }
      const res = await req.json();
      
    


      router.push(`/posts`);

    } catch (error) {
      
    }
  };

  const likeHandler = async () => {

    try {
      const req = await fetch(`http://localhost:1337/likes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.jwt}`,
        },
        body: JSON.stringify({
          post: parseInt(post.id),
        }),
      });

      const res = await req.json();
    
      if (res.error) {
        setError({message: res.message, status: res.statusCode})
      }
   
    } catch (error) {
   
    }
  }

  const unlikeHandler = async () => {
   
    try {
      const req = await fetch(`http://localhost:1337/likes/${post.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.jwt}`,
        },
        body: JSON.stringify({
          post: parseInt(post.id)
        }),
      });
      if (res.error) {
        setError({message: res.message, status: res.statusCode})
      }
      const res = await req.json();
    
    } catch (error) {

    }
  }

  return (
    <div className={classes.container}>
      <div className="">
        <div className="">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <h1 className="card-title">{post.title}</h1>
                  <p className="card-text">{post.description}</p>
                  { post.author && <p className="card-text">{post.author.username}</p>}
                  <p className="card-text">Likes {post.likes}</p>
                  <Image
                    src={formatImgUrl(post.image[0].url)}
                    width={200}
                    height={200}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {error && <p>{`Error: ${capatalize(error.message)}`} {`Error status: ${error.status}`}</p>}
        {user && <> <button type="button" onClick={likeHandler}>
          Like
        </button>
          <button type="button" onClick={unlikeHandler}>
            Unlike
          </button>
        </>}

        {user && user.jwt &&
          <>
            <div>
              <button type="button" onClick={deleteHandler}>
                Delete
              </button>
            </div>
            <div>
              <button type="button" onClick={editToggleHandler}>
                Edit
              </button>

            </div>
          </>
        }

        <div className={classes.edit}>
          {edit &&
            <form onSubmit={editHandler} className={classes.editForm}>
              <input type="text" name="title" ref={titleRef} placeholder="edit title" />
              <input type="text" name="description" ref={descRef} placeholder="edit desc" />
              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
          }
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async (ctx) => {
  const posts = await getAllPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  let post = []

   try {
    post = await getPostBySlug(params.slug);
 } catch (error) {
  
    }

  return {
    props: { post:  await getPostBySlug(params.slug)}, revalidate: 10,
  };
};
export default PostDetail;
