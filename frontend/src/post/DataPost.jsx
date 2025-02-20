import React, { useState } from "react";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import { isAuthenticated } from "../auth";
import { remove } from "../user/apiUser";
import axios from "axios";


function DataPost({ post }) {

    const [hidden ,setHidden] = useState(false)


    const handelEditPost = () => { }
    const handelDelPost =  async () => { 
       const resdel = await  axios.delete(`${process.env.REACT_APP_API_URL}/post/${post.id}`,{headers: {Authorization: `Bearer ${isAuthenticated().token}`,}})
        if(resdel.status === 200){
            window.location.reload()
        }
    
    }

    const checkAuth = () => {
        if (post.member.id === isAuthenticated().id) {
            return true
        }
        return false
    }



    return (
        <div className="bg-white shadow rounded-md dark:bg-gray-900 -mx-2 lg:mx-0">
            <div className="flex justify-between w-full items-center">
                <div className="flex justify-between items-center px-4 py-3">
                    <div className="flex flex-1 items-center space-x-4">
                        <Link to={`user/${post.member.id}`}>
                            <div className="bg-gradient-to-tr from-yellow-600 to-pink-600 p-0.5 rounded-full">
                                <img
                                    src={`${post.member.avatar}`}
                                    onError={(i) => (i.target.src = `https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=1000w`)}
                                    alt="avatar"
                                    className="bg-gray-200 border border-white rounded-full w-10 h-10"
                                />
                            </div>
                        </Link>
                        <span className="block capitalize font-semibold text-gray-500 dark:text-gray-100">
                            <p className=" text-dark-500  hover:underline text-lg ">
                                {post.member.name} <span className="text-gray-500 font-normal text-sm">@{post.member.username}</span>{" "}
                            </p>
                            <span className="text-sm text-gray-500 dark:text-gray-100 font-light  ">{new Date(post.createDate).toDateString()}</span>
                        </span>
                    </div>
                </div>
                {checkAuth() && (
                    <p className="text-gray-400 w-4 h-4 pb-14 mr-4 cursor-pointer relative">
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>setHidden(!hidden)} fill={hidden ? "#FF1493" : "#ccc"} viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg>
                        
                            {hidden && (
                                <div className="transition z-100000 absolute bg-white top-10 -left-16 !w-200 border rounded overflow-hidden ">
                                    <p onClick={handelEditPost} className="px-4 py-2 hover:bg-gray-300 hover:text-white">Edit</p>
                                    <p onClick={handelDelPost} className="px-4 py-2 hover:bg-gray-300 text-red-400">Delete</p>
                                </div>
                            )}
                    </p>
                )}
            </div>

            <div>
                <h5 className="px-4 mb-2 text-lg font-bold text-pink-600 line-clmap-4">{post.postBody}</h5>
                <ul className="px-4 mb-2 flex gap-2  flex-wrap ">
                    {post.recipe.tool &&
                        post.recipe.tool?.map((item, index) => {
                            return <li key={index} className="border rounded-full px-2 py-1 min-w-40 text-center hover:border-pink-600 hover:text-pink-600 transition">#{item}</li>;
                        })}
                </ul>
                <ul className="px-4 mb-4">
                    {post.recipe.steps &&
                        post.recipe.steps?.map((item, index) => {
                            return (
                                <li key={index} className="flex gap-2 items-center">
                                    <p className="text-pink-400 font-bold text-sm bg-pink-100 border border-pink-300 rounded-full w-5 h-5 text-center">{index + 1}</p>
                                    <p>{item.step}</p>
                                </li>
                            );
                        })}
                </ul>
                <Link to={`/post/${post.id}`}>
                    <p className="px-4 mb-4 underline hover:text-pink-600">Xem thêm</p>
                </Link>
                <Link to={`/post/${post.id}`}>


                    <div className="flex flex-wrap  cursor-pointer">
                        {post.recipe.steps.length ? (
                            ""
                        ) : (
                            <div className="w-full h-full" style={{ height: "30rem" }}>
                                <img alt="" src="https://source.unsplash.com/random/?bakery,bake,1" className="w-full h-full object-cover" />
                            </div>
                        )}
                        {post.recipe?.steps &&
                            post.recipe.steps?.map((item, index) => {
                                if (post.recipe.steps.length <= 1 || post.recipe.steps.length === null) {
                                    if(item.image) {
                                        return (
                                            <div key={index} className="w-full h-full" style={{ height: "30rem" }}>
                                                    <img
                                                        src={item.image}
                                                        alt="recipe"
                                                        className="w-full h-full object-cover"
                                                    />
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <div className="h-1"></div>
                                        );
                                    }
                                }
                                if (post.recipe.steps.length === 2) {
                                    if(item.image){
                                        return (
                                            <div key={index} className="w-full  border-2 border-white rounded-md overflow-hidden" >
                                                <div className="w-full  object-cover ">
                                                    <img src={item.image} alt="" className="w-full h-full object-cover" />
                                                </div>
                                            </div>
                                        );
                                    } else{
                                        return ;
                                    }
                                }
                                if (post.recipe.steps.length >= 3) {
                                    if (index <= 2) {
                                        return (
                                            <div key={index} className="h-[15rem] w-[50%] object-cover rounded-md overflow-hidden  border-white border-2 relative">
                                                <img src={item.image} alt="" className="w-full h-full object-cover" />
                                            </div>
                                        );
                                    }
                                }
                                return null;
                            })}
                        {post.recipe.steps.length >= 3 ? (
                            <div
                                className=" relative h-[15rem] w-[50%] object-cover bg-gray-500 p-[70px] pl-[90px] rounded-md overflow-hidden border-white border-2"
                                style={{ backgroundImage: `url(https://png.pngtree.com/thumb_back/fh260/background/20210207/pngtree-gray-simple-gradient-background-image_557031.jpg)` }}
                            >
                                <div className="absolute w-full h-full bg-pink-1s00 inset-0 opacity-50"></div>
                                <div className="w-20 h-20 text-white object-cover opacity-90 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 448 512">
                                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                                    </svg>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </Link>
            </div>
            <Comment post={post} />
        </div>
    );
}

export default DataPost;
