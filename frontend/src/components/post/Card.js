import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dateParser, isEmpty } from "../Utils";
import LikeButton from "./LikeButton";

const Card = ({ post }) => {
    const [isLoadind, setIsLoading] = useState(true);
    const usersData = useSelector((state) => state.usersReducer);

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false);
    }, [usersData])

    return (
        <li className='card-container' key={post._id}>
            {isLoadind ? (
                <i className='fas fa-spinner fa-spin'></i>
            ) : (
                <>
                    <div className='card-right'>
                        <div className='card-header'>
                            <div className='pseudo'>
                                <h3>
                                    {
                                        !isEmpty(usersData[0]) &&
                                        usersData
                                            .map((user) => {
                                                if (user._id === post.userId)
                                                    return user.lastName + ' ' + user.firstName
                                                else return null
                                            })
                                            .join('')
                                    }
                                </h3>
                            </div>
                            <span>{dateParser(post.createdAt)}</span>
                        </div>
                        <p>{post.message}</p>
                        {post.picture && (
                            <img src={post.picture} alt="illustration de la publication" className='card-pic' />
                        )}
                        <div className='card-footer'>
                            <LikeButton post={post} />
                        </div>
                    </div>
                </>
            )}
        </li>
    );
};

export default Card;