const UserImage = ({ imageUrl, user, extraStyle }) => {

    return (
        <div>
            <img 
                className={`rounded-full ${extraStyle}`}
                src={imageUrl} 
                alt={`${user} profile image`} 
            />
        </div>
    )
}

export default UserImage;