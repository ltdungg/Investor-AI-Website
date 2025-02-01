import { CiSearch} from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { IoMicOutline } from "react-icons/io5";
import "./SearchBar.css";

function SearchBar(){
    return(
        <>
            <div className="Search_Bar">
                <IoIosSearch className="search_icon"/>
                <input type="text" placeholder="Tìm kiếm theo mã cổ phiếu hoặc từ khoá..."/>
                <IoMicOutline className="mic_icon"/>
                
            </div>
        </>
    );
}

export default SearchBar;