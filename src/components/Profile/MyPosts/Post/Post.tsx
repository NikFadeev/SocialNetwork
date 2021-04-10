import s from './Post.module.css';

type PostPropsType = {
    message: string,
    likesCount: number
}

const Post = (props: PostPropsType) => {
    return (
        <div className={s.item}>
            <img
                src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
                alt=""/>
                {props.message}
            <div>
                <span>like ({props.likesCount})</span>
            </div>
        </div>
    )
}

export default Post;