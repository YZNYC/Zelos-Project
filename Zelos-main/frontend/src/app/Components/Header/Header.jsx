export default function Header() {
    return (
        <nav>
            <div className={`
    hidden sm:flex
    w-full
    p-5 pt-8
    flex-col justify-between
    z-10
    fixed top-0  
    h-[165px]  
  `}
  style={{ backgroundColor: '#ED1C24'}}>
  <img src="/Zelos-Logo-Header.png" alt="Logo" className="w-120 h-160 mt-[-90px] ml-[-80px]" />
            </div>
          
        </nav>
    )
}