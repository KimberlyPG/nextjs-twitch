const UserImage = ({ imageUrl, user, extraStyle }) => {

    return (
        <img 
            className={`rounded-full ${extraStyle}`}
            src={imageUrl} 
            alt={`${user} profile image`} 
        />
    )
}

export default UserImage;