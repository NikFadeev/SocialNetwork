import css from './Loader.module.css';

function Preloader() {
    return <div className={css.ldsRing}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
}

export default Preloader;