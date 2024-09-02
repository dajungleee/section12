import "./Header.css";

const Header = ({title, leftChild, rightChlid})=>{
    return (
        <header className="Header">
            <div className="header_left">{leftChild}</div>
            <div className="header_center">{title}</div>
            <div className="header_right">{rightChlid}</div>
        </header>
    )
}

export default Header;